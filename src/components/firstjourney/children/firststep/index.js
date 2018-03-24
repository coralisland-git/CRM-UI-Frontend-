import React from 'react';

import './style.scss';

class FirstStep extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
		this.connectEmail = this.connectEmail.bind(this);

	}

	connectEmail() {
		this.props.authGmail(this.state);
	}

	render() {
		return (
			<div className="firststep">
				<h4> CONNECT GOOGLE ACCOUNT </h4>
				<p> Agent Cloud organizes your emails and meetings automatically, eliminating manual entry of data forever </p>
				{/* <ul className="dropdown">
					<li className="dropdown" >
                    	<a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                    		<button className="btn btn-default btn-raised">
								<img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/gmail.svg" />
								<label> Connect to your Google mail account </label>
							</button>
                    	</a>
						<ul className="dropdown-menu">
							<li> <a href="javascript:void(0);" >
									<img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/gmail.svg" />
									<label> CONNECT TO YOUR GOOGLE MAIL ACCOUNT </label>
		                    	</a> </li>
						</ul>
					</li>
				</ul>
				<div className="pull-right">
					<button className="btn btn-warning btn-raised waves-effect m-r-15" onClick={this.connectEmail} >
						Connect
					</button>
					<a href="#fourth" data-toggle="tab"
						onClick={() => {this.props.newStep(3);}}> <button className="btn btn-default btn-raised waves-effect">
						Cancel
					</button> </a> 
				</div> */}
				<div className="gmail-connect">
					<img src="./gmail.png" />
					<span> Connect to your Google mail account </span>
					<button className="pull-right btn btn-warning btn-raised waves-effect m-r-10" onClick={this.connectEmail} >
						Connect
					</button>
				</div>
				<div className="clearfix"> </div>
				<hr />
				<div className="footerbuttons">
					<a> &nbsp; </a>
					<a> &nbsp; </a>
					<a href="#third" data-toggle="tab" onClick={() => {this.props.newStep(2);}}> 
						Next 
						<i className="material-icons"> navigate_next </i>
					</a>
				</div>
			</div>
		);
	}
}

export default FirstStep
