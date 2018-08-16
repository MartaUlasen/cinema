import React from 'react';
import './cart.css';

class Cart extends React.Component {
	renderSeats = () => {
		const numbersOfSelectedSeats = this.props.calculateNumbersOfSelectedSeat();
		let template = null;

		if (numbersOfSelectedSeats.length) {
			template = numbersOfSelectedSeats.map((item, index) => {
				return (
					<div className="cart__current-seats" key={index}>{/* INDEX??? */}
						<div>Row {item.numberOfRow} Seat {item.numberOfSeat}</div>
						<div>{this.props.ticketPrice}</div>
					</div>
				)
			})
		} else {
			template = <p>Select seats</p>
		}
		return template;
	}
	render() {
		let totalPrice = 0;
		if (this.renderSeats().length) {
			totalPrice = this.props.ticketPrice * this.renderSeats().length
		}		
		
		return(
			<div className="cart">
				<div className="cart__title">CART</div>
				<div className="cart__body">
					{this.renderSeats()}
					<div className="cart__total-price">
						<div>Your total price:</div>
						<div>{totalPrice}</div>
					</div>
				</div>
				<div className="buttons">
					<button className="button" type="bytton" onClick={this.props.resetSelectedSeats}>Cancel</button>
					<button className="button" type="bytton" onClick={this.props.bookSelectedSeats}>Pay</button>
				</div>
			</div>
		);
	}
}

export default Cart;