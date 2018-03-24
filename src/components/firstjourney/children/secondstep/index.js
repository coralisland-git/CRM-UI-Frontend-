import React from 'react';

import './style.scss';

class SecondStep extends React.Component {

	constructor(props) {
		super(props);
		this.connectCalendar = this.connectCalendar.bind(this);
	}

	connectCalendar() {
		this.props.connectCalendar();
	}

	render() {
		return (
			<div className="secondstep">
				<h4> CONNECT CALENDAR </h4>
				<p> Agent Cloud organizes your calendar and sycing everything that is needed as you connect calendars</p>
        		<button className="btn btn-default">
        			<div>
						<img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/gmail.svg" />
						<label> Connect to your Google mail account </label>
					</div>
					<span className="btn btn-warning btn-raised pull-right" onClick={this.connectCalendar} > CONNECT </span>
				</button>
				<hr />
				<div className="footerbuttons">
					<a href="#first" data-toggle="tab"> 
						<i className="material-icons"> navigate_before </i>
						Previous 
					</a>
					<a> &nbsp; </a>
					<a href="#third" data-toggle="tab"> 
						Next 
						<i className="material-icons"> navigate_next </i>
					</a>
				</div>
			</div>
		);s
	}
}

export default SecondStep
