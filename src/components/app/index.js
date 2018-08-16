import React from 'react';
import Hall from '.././hall';
import Cart from '.././cart';
import Movies from '.././movies';
import Datetime from 'react-datetime';
import moment from 'moment';
import '../../../node_modules/react-datetime/css/react-datetime.css';
import { SEAT_STATES } from '../../const';
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

const generateSeats = (countOfRows,  countOfColumns) => {
	const numberOfSeats = countOfRows * countOfColumns;
	const seats = [];
	const randomNumbers = [];

	for (let i = 0; i < numberOfSeats; i++) {
		const stateOfSeat = {
			id: i,
			status: SEAT_STATES.free,
		};
		seats.push(stateOfSeat);
	}

	while (randomNumbers.length < 10 ) {
		const newRandomNumber = randomInteger(0, numberOfSeats);
		if (randomNumbers.indexOf(newRandomNumber) === -1) {
			randomNumbers.push(newRandomNumber);
		} 
	}
	setRandomBookedSeats(randomNumbers, seats);
	return seats;
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
			},
			{
				date:  new Date(yy, mm, dd, 12, 55),
				hall: '2',
			},
			{
				date:  new Date(yy, mm, dd + 1, 20, 55),
				hall: '1',
			},
			{
				date:  new Date(yy, mm, dd + 1, 22, 55),
				hall: '2',
			},
			{
				date:  new Date(yy, mm, dd + 2, 20, 55),
				hall: '1',
			},
			{
				date:  new Date(yy, mm, dd + 2, 22, 55),
				hall: '2',
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
			},
			{
				date:  new Date(yy, mm, dd, 22, 0),
				hall: '4',
			},
			{
				date:  new Date(yy, mm, dd + 1, 21, 5),
				hall: '3',
			},
			{
				date:  new Date(yy, mm, dd + 1, 22, 0),
				hall: '4',
			},
			{
				date:  new Date(yy, mm, dd + 2, 21, 5),
				hall: '3',
			},
			{
				date:  new Date(yy, mm, dd + 2, 22, 0),
				hall: '4',
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
			},
			{
				date:  new Date(yy, mm, dd, 21, 0),
				hall: '2',
			},
			{
				date:  new Date(yy, mm, dd + 1, 23, 0),
				hall: '1',
			},
			{
				date:  new Date(yy, mm, dd + 1, 21, 0),
				hall: '2',
			},
			{
				date:  new Date(yy, mm, dd + 2, 23, 0),
				hall: '1',
			},
			{
				date:  new Date(yy, mm, dd + 2, 21, 0),
				hall: '2',
			}
		]
	}
]

class App extends React.Component {
	state = {
		seats: generateSeats(this.props.countOfRows,  this.props.countOfColumns),
		movies: movies,
		currentDate: null,
	}

	inputHandler = (date) => {
		const newCurrentDay = date;
		const newState = this.state;
		newState.currentDate = newCurrentDay;
		this.setState({ currentDate: newState.currentDate });
		console.log(this.state.currentDate)
	}
	
	toggleSeatStatus = (n) => {
		const newState = this.state;
	
		if (this.state.seats[n].status === SEAT_STATES.free) {
			newState.seats[n].status = SEAT_STATES.selected;
		} else newState.seats[n].status = SEAT_STATES.free;
		
		this.setState({ seats: newState.seats });
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

	render() {
		const yesterday = Datetime.moment().subtract( 1, 'day' );
		const valid = function( current ){
			return current.isAfter( yesterday );
		};
		return (
			<div className="app">
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
					/>
				</div>
				
				{/* <Hall
					seats={this.state.seats}
					toggleSeatStatus={this.toggleSeatStatus}
					rows={this.props.countOfRows}
					cols={this.props.countOfColumns} />
				<Cart 
					calculateNumbersOfSelectedSeat={this.calculateNumbersOfSelectedSeat}
					ticketPrice={this.props.ticketPrice}
					bookSelectedSeats={this.bookSelectedSeats}
					resetSelectedSeats={this.resetSelectedSeats}
				/> */}
			</div>
		);
	}
}

export default App;
