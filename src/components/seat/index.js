import React from 'react';
import { SEAT_STATES } from '../../const';
import './seat.css';

class Seat extends React.Component {
	seatHandler = () => {
		const n = this.props.number;
		this.props.toggleSeatStatus(n);
	}

	render () {
		let className = "seat";
		let onClick = this.seatHandler;
		const { numberInRow, data } = this.props;

		if (data.status === SEAT_STATES.selected) {
			className = "seat seat--selected";
		} else if (data.status === SEAT_STATES.booked) {
			className = "seat seat--booked";
			onClick = null;
		}

		return  (
			<div className={className} onClick={onClick}>
				{numberInRow + 1}
			</div>
		);
	}
	
}

export default Seat;
