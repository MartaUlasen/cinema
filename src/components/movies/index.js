import React from 'react';
import './movies.css';
import moment from 'moment';


const isBetween = (dateOfSeans, currentDate) => {
	const REFERENCE = moment();
	const TODAY = REFERENCE.clone().startOf('day');
	
	currentDate.isSame(TODAY, 'd') ? currentDate = moment() : currentDate = currentDate;
	dateOfSeans = moment(dateOfSeans);
	const startOfCurrentDate = moment(currentDate);
	const endOfCurrentDay = moment(currentDate).endOf('day');

	return ((endOfCurrentDay >= dateOfSeans) && (startOfCurrentDate <= dateOfSeans));
}

class Movies extends React.Component {
	filterMovies = (date) => {
		const filteredMovies = [];
		for (let i = 0; i < this.props.movies.length; i++) {
			for (let j = 0; j < this.props.movies[i].sessions.length; j++) {
				
				if (isBetween(this.props.movies[i].sessions[j].date, date)) {
					filteredMovies.push(this.props.movies[i]);
					break;
				}
			}
		}

		return filteredMovies;

	}

	renderMovies = () => {
		let movies = this.props.movies;
		let template = null;
		if (this.props.currentDate !== null) {
			movies = this.filterMovies(this.props.currentDate);
		}

		if (movies.length) {
			template = movies.map((item, index) => {
				return (
					<div className="movie" key={index}>
						<h4 className="movie__title">{item.name}</h4>
						<div className="movie__description">{item.description}</div>
					</div>
				)
			})
		} 
		return template;
	}
	render() {
		
		return (
			<div className="movies">
				<h3>{this.props.currentDate !== null ? moment(this.props.currentDate).format('DD MMMM') : 'Now'} at the cinema</h3>
				<div className="list-of-movies">
					{this.renderMovies()}
				</div>

			</div>
		)
	}
}

export default Movies;