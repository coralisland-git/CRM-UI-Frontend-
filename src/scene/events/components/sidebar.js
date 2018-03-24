import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveGoogleCalendars, updateGoogleCalStatus, LoadColor, LoadLocalCalendar, GetAgents, getCirles } from '../../../services/actions/events';

import MiniCalendar from '../../../components/calendar-mini';
import ListModal from '../../../components/modals/listmodal';
import GoogleCalendarModal from '../../../components/modals/googlecalendarmodal';
import AddCalendarModal from '../../../components/modals/addcalendarmodal';
import AddColorModal from '../../../components/modals/addcolormodal';
import ColorPicker from '../../../components/colorpicker';

import { get_g_key } from '../../../services/env';


const mapDispatchToProps = (dispatch) => {
	return ({
		saveGoogleCalendars: (items) => { saveGoogleCalendars(items, dispatch) },
		LoadLocalCalendar: (id) => { LoadLocalCalendar(id, dispatch) },
		updateGoogleCalStatus: (status) => { updateGoogleCalStatus(status, dispatch) },
		LoadColor: () => { LoadColor(dispatch) },
    GetAgents: (id) => { GetAgents(id, dispatch) },
    getCirles: () => { getCirles(dispatch) },
	});
}

const mapStateToProps = (state) => {
	return ({
		user: state.auth.user,
    agents: state.events.agents,
		status: state.events.status,
    calendars: state.events.calendars,
		selected_calendars: state.events.selected_calendars,
		i_color_array: state.events.i_color_array,
    gapi_status: state.gapi.status,
    circles: state.events.circles,
	});
}


class SideBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user || {},
			status: this.props.status || false,
			selected_calendars: this.props.selected_calendars || [],
			i_color_array: this.props.i_color_array || [],
      circles: this.props.circles || [],
		}
	}

	componentWillMount() {
		this.props.LoadColor();
    this.props.getCirles();
		if (this.state.user != undefined) {
      if (this.props.selected_calendars == undefined) {
        this.props.LoadLocalCalendar(this.state.user.id);
      }
      if (this.state.user.role == "broker") {
        if (this.props.agents == undefined) {
          this.props.GetAgents(this.state.user.id);
        }
      }
    }
	}

  componentDidMount() {
    
  }

	componentWillReceiveProps(newProps) {
		this.props = newProps;
    if (newProps.user != undefined && newProps.user != this.state.user) {
        this.setState({user: newProps.user});
        if (newProps.selected_calendars == undefined) {
          this.props.LoadLocalCalendar(newProps.user.id);
        }
        if (this.state.user.role == "broker") {
          if (newProps.agents == undefined) {
            this.props.GetAgents(newProps.user.id);
          }
        }
    } 
		this.setState({status: newProps.status});
		this.setState({selected_calendars: newProps.selected_calendars || []});
		this.setState({i_color_array: newProps.i_color_array});
    this.setState({circles: newProps.circles || []});
    if (newProps.gapi_status == true) {
      if (this.props.calendars == undefined) {
        setTimeout(() => {
          if (gapi.client.calendar) {
            this.updateSigninStatus(true);
          }
          else {
            this.loadGoogleApi();
          }
        }, 1000);
      }
    }
	}

	loadGoogleApi() {
      let self = this;
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js";
      var CLIENT_ID = get_g_key();
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
      var SCOPES = 'https://www.googleapis.com/auth/calendar';
  
      script.onload = () => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
              discoveryDocs: DISCOVERY_DOCS,
              clientId: CLIENT_ID,
              scope: SCOPES
            }).then(function () {
              gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);
              self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
              self.props.updateGoogleCalStatus(true);
            });
        });

        setTimeout(() => {
          gapi.auth2.getAuthInstance().signIn();
        }, 1000);
      };
      document.body.appendChild(script);
  }

  updateSigninStatus(status) {
      this.getGoogleCalendarList();
  }

  getGoogleCalendarList () {
      gapi.client.calendar.calendarList.list().then((res) => {
          this.props.saveGoogleCalendars(res.result.items);
      }).catch((err) => {
          console.log("getting calendar list error", err);
      });
  }

  onclickburger = (e, burger_id) => {
    var x = e.pageX - $('#side_bar_cal').offset().left;
    var y = e.pageY - $('#side_bar_cal').offset().top;
    $("#burger_modal_" + burger_id.replace(/[^\w\s]/gi, '')).css({'top':y,'left':x-260, 'position':'absolute', 'z-index': '5'});
    $("#burger_modal_" + burger_id.replace(/[^\w\s]/gi, '')).css("display", "block");
    $("#burger_modal_" + burger_id.replace(/[^\w\s]/gi, '')).on("mouseout", function(){
        $("#burger_modal_" + burger_id.replace(/[^\w\s]/gi, '')).css("display", "none");
    });
    $("#burger_modal_" + burger_id.replace(/[^\w\s]/gi, '')).on("mouseover", function(){
        $("#burger_modal_" + burger_id.replace(/[^\w\s]/gi, '')).css("display", "block");
    });
	}

	onclickGoogleCalendar = (e) => {
    this.updateSigninStatus(true);
    var x = e.pageX - $('#side_bar_cal').offset().left;
    var y = e.pageY - $('#side_bar_cal').offset().top;
    $("#googlecalendarmodal").css({'top':y,'left':x, 'position':'absolute', 'z-index': '5'});
    $("#googlecalendarmodal").css("display", "block");
    $("#addcalendarmodal").css("display", "none");
	}

	onclickaddcalendar = (e) => {
    var x = e.pageX - $('#side_bar_cal').offset().left;
    var y = e.pageY - $('#side_bar_cal').offset().top;
    $("#addcalendarmodal").css({'top':y,'left':x, 'position':'absolute', 'z-index': '5'});
    $("#addcalendarmodal").css("display", "block");
    $("#googlecalendarmodal").css("display", "none");
	}

	render() {

    let calendar_list = [];
    let burger_list = [];
    let calendars = this.state.selected_calendars || [];

    calendars.forEach((calendar, key) => {
      if (calendar.is_display == true) {
        calendar_list.push(<div key={key} className="col-sm-12 drop-custum force-margin-top-0">
                                <label className="i_calendar" style={{backgroundColor: calendar.backgroundColor }}>&nbsp;</label>
                                <label className="cal-list" title={ calendar.summary }>&nbsp;&nbsp;{ calendar.summary }</label>
                                <i className="material-icons right no-padding burger padding-top-10" onClick={((e) => this.onclickburger(e, calendar.id))}>settings</i>
                            </div>);
        let idval = "burger_modal_" + calendar.id.replace(/[^\w\s]/gi, '');
        key = key + calendar.id;
        burger_list.push(<div key={key} id={ idval } style={{display: 'none'}}><ListModal key={key+"_"+calendar.id} user={this.state.user} flag_listmodal={"burger"} calendar={calendar} i_color_array={this.state.i_color_array || []} /></div>);
      }
    });

		return (
			<div>
				<div id="sidebar" className="card card-me no-border">
          <div className="body">
            <div className="MiniCalendar">
              <ul className="list-group">
                <li className="list-group-item clearfix">
                  <div className="row">
                    <div className="col-sm-6 col-xs-6 display-flex padding-top-8">
                      <i className="fa fa-calendar-o padding-top-15"></i>&nbsp;
                      <label id="label_calendar" className="black">Calendar</label>
                    </div>
                    <div className="col-sm-6 col-xs-6 right">
                      <NavLink to="/events/add" className="btn btn-md btn-raised btn-default waves-effect right">CREATE EVENT</NavLink>
                    </div>        
                  </div>
                </li>
                <li id="minical" className="list-group-item clearfix">
                  <MiniCalendar />
                </li>
                <li className="list-group-item clearfix p-b-15">
                  <button type="button" className="col-sm-12 btn btn-md btn-raised btn-default waves-effect" onClick={this.onclickaddcalendar}>ADD NEW CALENDAR</button>
                  <button type="button" className="col-sm-12 btn btn-md btn-raised btn-default waves-effect" onClick={this.onclickGoogleCalendar}>ADD NEW GOOGLE CALENDAR</button>
                </li>
                <li className="list-group-item text-center">
                  <label className="heading-semi">My Calendar</label>
                </li>
                <li className="list-group-item clearfix">
                  <div className="col-sm-12 drop-custum clearfix">
                  </div>
                  { calendar_list }
                </li>
              </ul>
            </div>
          </div>
        </div>

        { burger_list }

        <div id="addgooglecalendar">
          <GoogleCalendarModal />
        </div>
        <div id="addcalendar">
          <AddCalendarModal />
        </div>
        <div id="addcolor">
          <AddColorModal />
        </div>

			</div>
		);

	}

}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);


