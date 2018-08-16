import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App  from './components/app';


ReactDOM.render(
	<App 
		countOfRows={10}
		countOfColumns={10}
		ticketPrice={100}
	/>, 
	document.getElementById('root')
);

