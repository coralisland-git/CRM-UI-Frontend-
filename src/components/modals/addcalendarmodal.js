import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCalendar } from '../../services/actions/events';

import ColorPicker from '../colorpicker';
import { confirmAlert } from '../confirmdialog';

import './styles.scss';


const mapDispatchToProps = (dispatch) => {
	return ({
		onSubmit: (calendar_name, calendar_color, email, userid) => { saveCalendar(calendar_name, calendar_color, email, userid,  dispatch) }
	});
}

const mapStateToProps = (state) => {
	return ({
		user: state.auth.user,
	});
}

class AddCalendarModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			calendar_name: "",
			color: "#B63D23",
		}
	}

  onclickclose = (e) => {
  	e.preventDefault();
  	$("#addcalendarmodal").css("display", "none");
  }

  onChange = (e) => {
  	e.preventDefault();
  	this.setState({calendar_name: e.target.value});
  }

  onchangeColor = (color_str) => {
  	this.setState({color: color_str});
  }

  onSubmit = (e) => {
  	e.preventDefault();
  	if (this.state.calendar_name != "") {
  		$("#addcalendarmodal").css("display", "none");
	  	this.props.onSubmit(this.state.calendar_name, this.state.color, this.props.user.email, this.props.user.id);
  	} else {
  		confirmAlert({
        template: "danger",
        message: "Please input your new Calendar Name."
      });
  	}
	  	
  }

	render() {

		return (

			<div id="addcalendarmodal" className="card" style={{ display: 'none' }}>
				<div className="body">
	          <ul className="list-group">
	          	<li className="list-group-item no-border clearfix bg-light-blue"><label className="margin-top-5 white">Add New Local Calendar</label>
	          		<i className="material-icons right white close padding-top-8" onClick={this.onclickclose}>close</i>
	          	</li>
	          	<li className="list-group-item no-border clearfix">
	          		<div className="form-group">
				          <div className="form-line">
				            <input className="form-control padding-left-10" type="text" placeholder="Calendar Name" autoFocus="true" value={this.state.calendar_name} onChange={this.onChange} />
				          </div>
		         		</div>
	          	</li>
	          	<li className="list-group-item no-border clearfix">
	          		<div className="col-sm-6">
	          			<ColorPicker id={"addcalendar"} inputClass={"form-control"} onChanged={ this.onchangeColor } />
	          		</div>
	          		<div className="col-sm-6" style={{ paddingRight: "0px" }}>
	          			<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect" onClick={ this.onSubmit } style={{ marginTop: "7px", marginRight: "0px", float: "right" }}>ADD CALENDAR</button>
	          		</div>
	          	</li>
	          </ul>
	        </div>
	    </div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendarModal);