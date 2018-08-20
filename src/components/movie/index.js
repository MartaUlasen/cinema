import React from 'react';
import moment from 'moment';

class Movie extends React.Component {
	state = {
		selectedFilm: null,
	}
	
	sheduleHandler = () => {
		console.log(this.props.data)
	}

	getShedule = (sessions) => {
		let shedule = sessions.map((session, index) => {
			return (
				<button className="button" 
					type="button" 
					key={index}
					onClick={()=>{
						this.sheduleHandler();
					}}>
					{moment(session.date).format('LT')}
				</button>)
			
		})
		return shedule;
	}

	render() {
		const {name, description, sessions} = this.props.data;
		return (
			<div className="movie" >
				<h4 className="movie__title">{name}</h4>
				<div className="movie__description">{description}</div>
				<div className="movie__sessions">
				{
					this.getShedule(sessions)
				}
				</div>
			</div>
		)
	}
}

export default Movie;