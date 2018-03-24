import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { saveEvents, saveGoogleCalendarToLocal, saveGoogleEventsToLocal } from '../../services/actions/events';
import '../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import './styles.scss';
import { confirmAlert } from '../confirmdialog';


const mapDispatchToProps = (dispatch) => {
	return ({
		saveEvents: (c_id, color, items) => { saveEvents(c_id, color, items, dispatch); },
		saveGoogleEventsToLocal: (c_id, color, user, items) => { saveGoogleEventsToLocal(c_id, color, user, items, dispatch) },
		saveGoogleCalendarToLocal: (calendar) => { saveGoogleCalendarToLocal(calendar, dispatch) },
	});
}

const mapStateToProps = (state) => {
	return ({
		user: state.auth.user,
		calendars: state.events.calendars,
		selected_calendars: state.events.selected_calendars,
	});
}

class GoogleCalendarModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			c_id: "",
			calendars: this.props.calendars || [],
			selected_calendars: this.props.selected_calendars || [],
		}
		
	}

	componentDidMount () {
		$("#myselect").selectpicker();
	}

	componentWillReceiveProps (newProps, newState) {
		this.props = newProps;
		this.setState({calendars: newProps.calendars || []});
		this.setState({selected_calendars: newProps.selected_calendars || []});
	}

  componentDidUpdate () {
      $("#myselect").selectpicker("refresh");
  }

  getAllEventsFromGoogle (c_id, color) {
  	gapi.client.calendar.events.list({ calendarId: c_id }).then((res) => {
  		this.props.saveGoogleEventsToLocal(c_id, color, this.props.user, res.result.items);
  	}).catch((err) => {
  	});
  }

  onclickclose = (e) => {
  	$("#googlecalendarmodal").css("display", "none");
  }

  onchangeSelect = (e) => {
  	e.preventDefault();
  	if (e.target.value != "-- Please select --") {
  		$("#googlecalendarmodal").css("display", "none");
  		let selected_calendar = this.state.calendars.filter((calendar) => {
  			return calendar.id == e.target.value;
  		});

		this.setState({c_id: e.target.value});
		if (this.state.selected_calendars.length == 0) {
			this.props.saveGoogleCalendarToLocal(selected_calendar[0]);
			this.getAllEventsFromGoogle(e.target.value, selected_calendar[0].backgroundColor);
		} else {
			let already_calendar = this.state.selected_calendars.filter((calendar) => {
				return calendar.email == e.target.value;
			});
			if (already_calendar.length == 0) {
				this.props.saveGoogleCalendarToLocal(selected_calendar[0]);
				this.getAllEventsFromGoogle(e.target.value, selected_calendar[0].backgroundColor);
			} else {
				confirmAlert({
	        template: "danger",
	        message: "You already imported this calendar."
	      });
			}		
		}
  	}
  }


	render() {

		let calendars = [];
		let listContent = [];
		calendars = this.state.calendars || [];
		if (calendars.length != 0) {
			calendars.map((content, key)=> {
          listContent.push(<option key={key} value={content.id}>{ content.summary }</option>); 
    	});
		}
		
		return (

			<div id="googlecalendarmodal" className="card" style={{ display: 'none' }}>
				<div className="body">
	                <ul className="list-group">
	                	<li className="list-group-item no-border clearfix bg-light-blue"><label className="margin-top-5 white">Add New Google Calendar</label>
	                		<i className="material-icons right white close padding-top-8" onClick={((e) => this.onclickclose(e))}>close</i>
	                	</li>
	                	<li id="googlecalendarlist" className="list-group-item no-border clearfix googlecalendar">
	                		<select id="myselect" className="" onChange={this.onchangeSelect}>
	                			<option>-- Please select --</option>
                        { listContent }
                      </select>
	                	</li>
	                </ul>
                </div>
            </div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleCalendarModal);

