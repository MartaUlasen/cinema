import React from 'react';
import Seat from '../seat';
import './hall.css';

class Hall extends React.Component {
	renderRow = (n) => {
		const row = [];
		
		for (let i = 0; i < this.props.cols; i++) {
			const seat = this.renderSeat(n, i);
			row.push(seat);
		}

		return (
			<div className="seats__row" key={n}>
				<div className="seats__number-of-row">Row {n + 1}</div>
				{row}
			</div>
		)
	}

	renderSeat = (rowNum, colNum) => {
		const n = rowNum * this.props.cols + colNum;

		return <Seat
			key={colNum}
			number={n}
			numberInRow={colNum}
			data={this.props.seats[n]}
			toggleSeatStatus={this.props.toggleSeatStatus} />
	}

	render() {
		const rows = [];

		for (let i = 0; i < this.props.rows; i++) {
			rows.push(this.renderRow(i));
		}

		return ( 
			<div>
				{rows}
			</div>
		);
	}
}

export default Hall;
