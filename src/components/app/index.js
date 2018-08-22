import React from 'react';
import Hall from '.././hall';
import Cart from '.././cart';
import Movies from '.././movies';

import Datetime from 'react-datetime';
import moment from 'moment';
import '../../../node_modules/react-datetime/css/react-datetime.css';
import { SEAT_STATES, HALLS_INFO } from '../../const';
import './app.css';


const randomInteger = (min, max) => {
	let rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

const setRandomBookedSeats = (randomNumbers, seats) => {
	for(let i = 0; i < randomNumbers.length; i++ ) {
		seats[randomNumbers[i]].status = SEAT_STATES.booked;
	}
}

const now = new Date();
const yy = now.getFullYear(), 
	mm = now.getMonth(), 
	dd = now.getDate();

const movies = [
	{
		name: 'The meg',
		description: 'After escaping an attack by what he claims was a 70-foot shark, Jonas Taylor must confront his fears to save those trapped in a sunken submersible.',
		sessions: [
			{
				date:  new Date(yy, mm, dd, 10, 55),
				hall: '1',
				counOfBookedSeats: '3',
			},
			{
				date:  new Date(yy, mm, dd, 12, 55),
				hall: '2',
				counOfBookedSeats: '5',
			},
			{
				date:  new Date(yy, mm, dd + 1, 10, 55),
				hall: '1',
				counOfBookedSeats: '6',
			},
			{
				date:  new Date(yy, mm, dd + 1, 12, 55),
				hall: '2',
				counOfBookedSeats: '4',
			},
			{
				date:  new Date(yy, mm, dd + 2, 20, 55),
				hall: '1',
				counOfBookedSeats: '20',
			},
			{
				date:  new Date(yy, mm, dd + 2, 22, 55),
				hall: '2',
				counOfBookedSeats: '3',
			}
		]
	},
	{
		name: 'Mamma mia 2',
		description: 'After escaping an attack by what he claims was a 70-foot shark, Jonas Taylor must confront his fears to save those trapped in a sunken submersible.',
		sessions: [
			{
				date:  new Date(yy, mm, dd, 21, 5),
				hall: '3',
				counOfBookedSeats: '10',
			},
			{
				date:  new Date(yy, mm, dd, 22, 0),
				hall: '4',
				counOfBookedSeats: '4',
			},
			{
				date:  new Date(yy, mm, dd + 1, 21, 5),
				hall: '3',
				counOfBookedSeats: '2',
			},
			{
				date:  new Date(yy, mm, dd + 1, 22, 0),
				hall: '4',
				counOfBookedSeats: '9',
			},
			{
				date:  new Date(yy, mm, dd + 2, 21, 5),
				hall: '3',
				counOfBookedSeats: '8',
			},
			{
				date:  new Date(yy, mm, dd + 2, 22, 0),
				hall: '4',
				counOfBookedSeats: '7',
			}
		]
	},
	{
		name: 'Hotel Artemis',
		description: 'After escaping an attack by what he claims was a 70-foot shark, Jonas Taylor must confront his fears to save those trapped in a sunken submersible.',
		sessions: [
			{
				date:  new Date(yy, mm, dd, 23, 0),
				hall: '1',
				counOfBookedSeats: '8',
			},
			{
				date:  new Date(yy, mm, dd, 21, 0),
				hall: '2',
				counOfBookedSeats: '7',
			},
			{
				date:  new Date(yy, mm, dd + 1, 23, 0),
				hall: '1',
				counOfBookedSeats: '8',
			},
			{
				date:  new Date(yy, mm, dd + 1, 21, 0),
				hall: '2',
				counOfBookedSeats: '12',
			},
			{
				date:  new Date(yy, mm, dd + 2, 23, 0),
				hall: '1',
				counOfBookedSeats: '2',
			},
			{
				date:  new Date(yy, mm, dd + 2, 21, 0),
				hall: '2',
				counOfBookedSeats: '12',
			}
		]
	}
]

class App extends React.Component {
	state = {
		movies: movies,
		currentDate: moment(),
		page: 'films',
		selectedSession: null,
		countOfRows: null,
		countOfColumns: null,
		seats: null,
	}

	inputHandler = (date) => {
		const newCurrentDay = date;
		const newState = this.state;
		newState.currentDate = newCurrentDay;
		this.setState({ currentDate: newState.currentDate });
	}
	
	toggleSeatStatus = (n) => {
		const newState = this.state;
	
		if (this.state.seats[n].status === SEAT_STATES.free) {
			newState.seats[n].status = SEAT_STATES.selected;
		} else newState.seats[n].status = SEAT_STATES.free;
		
		this.setState({ seats: newState.seats });
	}

	switchPage = (currentPage) => {
		const newState = this.state;
		newState.page = currentPage;
		this.setState({ page: newState.page });
	}

	selectSession = (currentHall) => {
		const newState = this.state;
		newState.selectedSession = currentHall;
		this.setState({ selectedSession: newState.selectedSession });
		this.changeSeatsState();

	}

	changeCountOfSeats = (rows, cols) => {
		const newState = this.state;
		newState.countOfRows = rows;		
		newState.countOfColumns = cols;
		this.setState({ 
			countOfRows: newState.countOfRows,
			countOfColumns: newState.countOfColumns
		});
	}

	changeSeatsState = () => {
		const newState = this.state;
		newState.seats = this.generateSeats(this.state.selectedSession,  this.state.movies);
		this.setState({ seats: newState.seats });
	}

	generateSeats = (selectedSession, movies) => {
		let countOfBookedSeats = null;
		movies.forEach((movie, index) => {
			if (movie.name === selectedSession.name) {
				movie.sessions.forEach(session => {
					if (session.date === selectedSession.date) {
						countOfBookedSeats = session.counOfBookedSeats;
					}
				})
			}
		});
	
		let indexOfHall = null;
	
		HALLS_INFO.forEach((hall, index) =>{
			if (hall.number === selectedSession.hall) {
				indexOfHall = index;
			}
			return indexOfHall;
		})
	
		const countOfRows = HALLS_INFO[indexOfHall].countOfRows;
		const countOfColumns = HALLS_INFO[indexOfHall].countOfColumns;
		const numberOfSeats = countOfRows * countOfColumns;
		const seats = [];
		const randomNumbers = [];
	
		this.changeCountOfSeats(countOfRows, countOfColumns);
	
		for (let i = 0; i < numberOfSeats; i++) {
			const stateOfSeat = {
				id: i,
				status: SEAT_STATES.free,
			};
			seats.push(stateOfSeat);
		}
	
		while (randomNumbers.length < countOfBookedSeats ) {
			const newRandomNumber = randomInteger(0, numberOfSeats);
			if (randomNumbers.indexOf(newRandomNumber) === -1) {
				randomNumbers.push(newRandomNumber);
			}
		}
		setRandomBookedSeats(randomNumbers, seats);
		return seats;
	}

	calculateNumbersOfSelectedSeat = () => {
		let selectedSeats = [];

		for (let i = 0; i < this.state.seats.length; i++) {
			if (this.state.seats[i].status === SEAT_STATES.selected) {
				selectedSeats.push(this.state.seats[i].id);
			}
		}

		const col = this.props.countOfColumns;
		selectedSeats = selectedSeats.map(function(item){
			return {
				numberOfRow: (Math.floor(item / col) + 1),
				numberOfSeat: (item % col + 1),
			}
		});
		return 	selectedSeats;	
	}

	resetSelectedSeats = () => {
		for (let i = 0; i < this.state.seats.length; i++) {
			
			const newState = this.state;
	
			if (this.state.seats[i].status === SEAT_STATES.selected) {
				newState.seats[i].status = SEAT_STATES.free;
			}
			
			this.setState({ seats: newState.seats });
		}
	}

	bookSelectedSeats = () => {
		for (let i = 0; i < this.state.seats.length; i++) {
			
			const newState = this.state;
	
			if (this.state.seats[i].status === SEAT_STATES.selected) {
				newState.seats[i].status = SEAT_STATES.booked;
			}
			
			this.setState({ seats: newState.seats });
		}
	}
	
	renderPage = () => { 
		switch (this.state.page) {
			case 'films': 
				const yesterday = Datetime.moment().subtract( 1, 'day' );
				const valid = function( current ){
					return current.isAfter( yesterday );
				};
				return (
					<div>	
						<Datetime 
							dateFormat="DD-MM-YYYY" 
							timeFormat={false}
							isValidDate={ valid }
							onChange={this.inputHandler}
						/>
						<Movies 
							movies={this.state.movies}
							currentDate={this.state.currentDate}
							switchPage={this.switchPage}
							selectSession={this.selectSession}
							countOfRows={this.state.countOfRows}
							countOfColumns={this.state.countOfColumns}
						/>
					</div>
				);
			case 'hall': 
				return (
					<React.Fragment>
						<div>{this.state.selectedSession.name}</div>
						<div>Hall {this.state.selectedSession.hall}</div>
						<div className="hall">
							<Hall
								seats={this.state.seats}
								toggleSeatStatus={this.toggleSeatStatus}
								rows={this.state.countOfRows}
								cols={this.state.countOfColumns}
							/>
							<Cart 
								calculateNumbersOfSelectedSeat={this.calculateNumbersOfSelectedSeat}
								ticketPrice={this.props.ticketPrice}
								bookSelectedSeats={this.bookSelectedSeats}
								resetSelectedSeats={this.resetSelectedSeats}
							/>
						</div>
						
					</React.Fragment>
				);
			default: 
				return <p>Page not found</p>
		}
	}

	render() {
		return (
			<div className="app">
				{this.renderPage()}
			</div>
		);
	}
}

export default App;
