import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { confirmAlert } from '../../../components/confirmdialog';

import '../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import './style.scss';

import mail_img from '../../../styles/assets/images/gmail.png';
import RightNav from '../components/rightnav';
import * as userActions from '../../../services/actions/users';
import { LoadLocalCalendar, saveGoogleCalendars, saveGoogleCalendarToLocal, saveGoogleEventsToLocal, deleteGoogleCalendar, refreshMessage, deleteLocalEvent, LoadLocalEvents, changeDisplay } from '../../../services/actions/events';

import { googleLogin } from '../../../services/actions/gapi';
import { get_g_key } from '../../../services/env';

const mapDispatchToProps = (dispatch) => {
    return ({
      actions: bindActionCreators({...userActions}, dispatch),
      LoadLocalCalendar: (id) => { LoadLocalCalendar(id, dispatch) },
      googleLogin: googleLogin(dispatch),
      saveGoogleCalendars: (items) => { saveGoogleCalendars(items, dispatch) },
      saveGoogleCalendarToLocal: (calendar) => { saveGoogleCalendarToLocal(calendar, dispatch) },
      deleteGoogleCalendar: (calendar) => { deleteGoogleCalendar(calendar, dispatch) },
      refreshMessage: () => { refreshMessage(dispatch) },
      deleteLocalEvent: (eventid) => { deleteLocalEvent(eventid, dispatch) },
      LoadLocalEvents: (id) => { LoadLocalEvents(id, dispatch) },
      saveGoogleEventsToLocal: (c_id, color, user, items) => { saveGoogleEventsToLocal(c_id, color, user, items, dispatch) },
      changeDisplay: (is_display, calendar_id, calendar) => { changeDisplay(is_display, calendar_id, calendar, dispatch) },
    });
}

const mapStateToProps = (state) => {
  return ({
    gapi_status: state.gapi.status,
    selected_calendars: state.events.selected_calendars,
    calendars: state.events.calendars,
    user: state.auth.user,
    users: state.users,
    selected_cal_id: "",
    message: state.events.message,
    all_events: state.events.all_events,
  });
}


class CalendarSetting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      calendars: this.props.calendars || [],
      selected_calendars: this.props.selected_calendars || [],
      all_events: this.props.all_events || [],
      members: [],
      checked: {},
      connect_status: {check: false, label_text: "not connected", btn_text: "CONNECT"},
    }
  }

  componentWillMount() {
    if (this.props.users !== undefined) {
      
      this.setState({members: this.props.users.users ? this.props.users.users : []});
    }
    if (this.state.user != undefined) {
      if (this.props.all_events == undefined) {
          this.props.LoadLocalEvents(this.state.user.id);
      }
    }
    if (this.props.selected_calendars == undefined) {
      this.props.LoadLocalCalendar(this.props.user.id);
    } else {
      this.setState({selected_calendars: this.props.selected_calendars})
    }
    if (this.props.gapi_status == true) {
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

  componentDidMount() {
    this.props.actions.getTeamMembers();
    $(".myselectbox").selectpicker();
    if (this.state.calendars.length > 0) {
      let temp_cal = this.state.calendars[0];
      this.setState({ selected_cal_id: temp_cal.id });
      if (this.state.selected_calendars.length > 0) {
        let flag_cal = this.state.selected_calendars.filter((cal) => {
          return cal.email == temp_cal.id;
        });
        if (flag_cal.length > 0) {
          let connect_status = {check: true, label_text: "connected", btn_text: "DISCONNECT"}
          this.setState({ connect_status: connect_status });
        } else {
          let connect_status = {check: false, label_text: "not connected", btn_text: "CONNECT"}
          this.setState({ connect_status: connect_status });
        }
      }
    }
  }

  componentDidUpdate() {
    $(".myselectbox").selectpicker("refresh");
  }

  componentWillReceiveProps(newProps) {
    if (newProps.gapi_status == true) {
      setTimeout(() => {
        if (!newProps.calendars) {
          this.getGoogleCalendarList();
        }
        else {
          this.setState({calendars: newProps.calendars});
        }
      }, 1000);
    }
    if (newProps.users != this.props.users) {
      this.setState({members: newProps.users.users ? newProps.users.users : []}); 
    }
    if (newProps.user != undefined && newProps.user != this.state.user) {
      this.setState({user: newProps.user});
      if (newProps.all_events == undefined) {
          newProps.LoadLocalEvents(newProps.user.id);
      }
    }
    if (newProps.selected_calendars !== this.props.selected_calendars)  {
      this.setState({selected_calendars: newProps.selected_calendars})
    }
    if (newProps.all_events !== this.props.all_events) {
      this.setState({ all_events: newProps.all_events });
    }
    if (newProps.calendars !== this.props.calendars) {
      this.setState({calendars: newProps.calendars});
      if (newProps.calendars.length > 0) {
        let temp_cal = newProps.calendars[0];
        this.setState({ selected_cal_id: temp_cal.id });
        if (newProps.selected_calendars.length > 0) {
          let flag_cal = newProps.selected_calendars.filter((cal) => {
            return cal.email == temp_cal.id;
          });
          if (flag_cal.length > 0) {
            let connect_status = {check: true, label_text: "connected", btn_text: "DISCONNECT"}
            this.setState({ connect_status: connect_status });
          } else {
            let connect_status = {check: false, label_text: "not connected", btn_text: "CONNECT"}
            this.setState({ connect_status: connect_status });
          }
        }
      }
    }
    newProps.refreshMessage();
    this.props = newProps;
  }

  loadGoogleApi = () => {
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

  updateSigninStatus = (status) => {
      this.getGoogleCalendarList();
  }

  getGoogleCalendarList = () => {
      gapi.client.calendar.calendarList.list().then((res) => {
          this.props.saveGoogleCalendars(res.result.items);
      }).catch((err) => {
          console.log("getting calendar list error", err);
      });
  }

  onSelectCalendar = (e) => {
    this.setState({ selected_cal_id: e.target.value });
    let selected_calendars = this.state.selected_calendars || [];
    let temp_cal = selected_calendars.filter((cal) => {
      return e.target.value == cal.email;
    });
    if (temp_cal.length > 0) {
      let connect_status = {check: true, label_text: "connected", btn_text: "DISCONNECT"}
      this.setState({ connect_status: connect_status });
    } else {
      let connect_status = {check: false, label_text: "not connected", btn_text: "CONNECT"}
      this.setState({ connect_status: connect_status });
    }
  }

  onChecked = (tag, check) => {
    let checked = this.state.checked;
    checked[tag] = check;
    this.setState({checked: checked});
  }

  getAllEventsFromGoogle = (c_id, color) => {
    gapi.client.calendar.events.list({ calendarId: c_id }).then((res) => {
      this.props.saveGoogleEventsToLocal(c_id, color, this.props.user, res.result.items);
    }).catch((err) => {
    });
  }

  connectCalendar = (e) => {
    e.preventDefault();
    let selected_cal_id = this.state.selected_cal_id;
    let connect_status = this.state.connect_status;
    let calendars = this.state.calendars;
    let selected_calendars = this.state.selected_calendars;
    let all_events = this.state.all_events;
    if (connect_status.btn_text == "DISCONNECT") {
      let cals = calendars.filter((ca) => {
        return ca.id == selected_cal_id;
      });
      if (cals.length > 0) {
        let real_cals = selected_calendars.filter((sel) => {
          return sel.email == cals[0].id;
        });
        if (real_cals.length > 0) {
          this.props.deleteGoogleCalendar(real_cals[0]);
          confirmAlert({
            template: "success",
            message: "Calendar disconnected from your account",
          });
          let connect_status = {check: false, label_text: "not connected", btn_text: "CONNECT"}
          this.setState({ connect_status: connect_status });
          if (this.state.all_events != undefined && this.state.all_events.length > 0) {
            let deleted_events = all_events.filter((event) => {
              return event.organizer.email == real_cals[0].email || event.organizer.email == real_cals[0].id; 
            });
            deleted_events.forEach((de_event) => {
              this.props.deleteLocalEvent(de_event.id);
            });
          }
        } else {
          confirmAlert({
            template: "danger",
            message: "Calendar connecting error",
          });
        }
      } else {
        confirmAlert({
          template: "danger",
          message: "Calendar connecting error",
        });
      }
    }
    if (connect_status.btn_text == "CONNECT") {
      let cals = calendars.filter((ca) => {
        return ca.id == selected_cal_id;
      });
      if (cals.length > 0) {
        this.props.saveGoogleCalendarToLocal(cals[0]);
        this.getAllEventsFromGoogle(cals[0].id, cals[0].backgroundColor);
        confirmAlert({
          template: "success",
          message: "Calendar connecting success",
        });
        let connect_status = {check: true, label_text: "connected", btn_text: "DISCONNECT"}
        this.setState({ connect_status: connect_status });
      } else {
        confirmAlert({
          template: "danger",
          message: "Calendar connecting error",
        });
      }
    }
  }


  changeDisplay = (e, calendar_id) => {
    e.preventDefault();
    let is_display = false;
    if (e.target.checked == false) {
      is_display = false;
    } else {
      is_display = true;
    }
    let selected_calendars = this.state.selected_calendars;
    let sel_cals = selected_calendars.filter((cal) => {
      return cal.id == calendar_id;
    });
    this.props.changeDisplay(is_display, calendar_id, sel_cals[0]);
  }


  render() {

    let checked = this.state.connect_status.check;
    let label_text = this.state.connect_status.label_text;
    let btn_text = this.state.connect_status.btn_text;

    let google_calendars = this.state.calendars || [];
    let selected_calendars = this.state.selected_calendars || [];
    let connected_calendars = [];

    google_calendars.forEach((item) => {
      let filtered_calendars = selected_calendars.filter((s_item) => {
        return s_item.email == item.id;
      });
      if (filtered_calendars.length > 0) {
        connected_calendars.push(filtered_calendars[0]);
      }
    });

    let connected_calendar_list = this.view_connected_calendar_list(connected_calendars);
    let selected_calendar_list = this.view_selected_calendar_list(selected_calendars);
    
    return (

      <div className="container-fluid" id="calendar_setting_page">
        <div className="row">
          <div className="col-sm-9">
            <div className="block-header clearfix">
              <h2 className="padding-top heading-me">Calendar Settings</h2>
            </div>
            <ul className="list-group">
              <li className="list-group-item clearfix no-border-bottom">
                <div className="col-sm-12">
                  <h2 className="heading-me-first">Connect your calendar</h2>
                  <label>Agent Cloud organizes your calendar and sycing everything that is needed as you connect calendars</label>
                </div>
                <div className="col-sm-12 padding-top-30">
                  <div className="col-sm-12 no-padding padding-bottom-30">
                    <div className="card card-me border-me padding-bottom-60 padding-top-60">
                        <div className="body no-padding padding-left-right">
                          <div className="col-sm-12">

                            <div className="col-sm-1 no-padding">
                              <img className="col-sm-12 no-padding mail_icon" src={mail_img} />
                            </div>

                            <div className="col-sm-2">
                              <label className="col-sm-12 no-padding label_m">Choose calendar</label>&nbsp;&nbsp;
                            </div>
                            
                            <div className="col-sm-3 no-padding">
                              <select className="myselectbox col-sm-12" onChange={(e) => this.onSelectCalendar(e)} >
                                  {this.state.calendars.length && this.state.calendars.map(cal => {
                                    return <option key={cal.id} value={cal.id}>{cal.summary}</option>;
                                  })}
                              </select>
                            </div>
                              
                            <div className="col-sm-4 label_m">
                              <label title="Connect to your Google account" className="no-padding">Connect to your Google account</label><br/>
                              <input type="checkbox" id="connect_status" checked={ checked } />
                              <label id="connect_status_label" htmlFor="connect_status">{ label_text }</label>
                            </div>

                            <div className="col-sm-2 no-padding">
                              <button id="btn_connect" type="button" className="btn-me btn btn-default btn-raised waves-effect btn-md right" onClick={ this.connectCalendar }>{ btn_text }</button>
                            </div>
                              
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item clearfix">
                <div className="col-sm-12">
                  <h2 className="heading-me-first">Share your calendars</h2>
                </div>

                { connected_calendar_list }

              </li>

              <li className="list-group-item clearfix">
                <div className="col-sm-12">
                  <h2 className="heading-me-first">Show in list</h2>
                </div>
                <div className="col-sm-12">

                { selected_calendar_list }

                </div>
                <div className="col-sm-12 padding-top">
                  <NavLink to="/events/add" className="btn btn btn-success btn-raised waves-effect btn-md">CREATE NEW CALENDAR</NavLink>
                </div>
              </li>

            </ul>
					</div>
		      <div className="col-sm-3 no-left-padding">
						<RightNav />
					</div>
				</div>
			</div>

    );

  }

  view_connected_calendar_list = (connected_calendars) => {
    let content = [];
    if (connected_calendars.length > 0) {
      connected_calendars.forEach((cal) => {
        content.push(  
            <div key={cal.id} className="col-sm-12 padding-top-30">
              <div className="col-sm-12 no-padding padding-bottom-30">
                <div className="card card-me border-me padding-top-30 padding-bottom-30">
                  <div className="body no-padding padding-left-right">
                    <div className="col-sm-12 flexing">
                      <i className="i_calendar"></i>&nbsp;&nbsp;
                      <label className="padding-right-60 col-sm-3">{cal.summary}</label>
                      <input type="checkbox" id={cal.id} onChange={(e)=>{ this.onChecked(cal.id, e.target.value) }} />
                      <label htmlFor={cal.id}>Allow all users to access calendar or Share with team member</label>
                    </div>
                    <div className="col-sm-12">
                      <div className="col-sm-4">
                      </div>
                      {this.state.members.length == 0 ? 
                        <div className="col-sm-6">
                        <p>No members.</p>
                        </div>
                        : ''
                      }
                      <div className="col-sm-6">
                      {this.state.members.map(member => {
                        return (
                          <div key={member.id} className="col-sm-12">
                            <div className="col-sm-6 my_form">
                              <div className="form-group">
                                <div className="form-line">
                                  <input type="text" className="form-control my_input" placeholder={member.email} readOnly />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <select className="myselectbox col-sm-12">
                                  <option value="">Permission Settings</option>
                                  <option value="modify">Modify Event</option>
                              </select>
                            </div>
                          </div>
                        )
                      })}
                      </div>
                      
                      <div className="col-sm-2 no-padding">
                        <button type="button" className="btn btn-me btn-success btn-raised waves-effect btn-md right">SHARE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      });
    }
    if (connected_calendars.length == 0) {
      content.push(<div key="empty_calendars"><label>There are no calendars.</label></div>);
    }
    return content;
  }

  view_selected_calendar_list = (selected_calendars) => {
    let content = [];
    if (selected_calendars.length > 0) {
      selected_calendars.forEach((cal) => {
        let idval = "cal_list_" + cal.id;
        content.push(
              <div key={ idval }>
                <input type="checkbox" id={ idval } checked={ cal.is_display } onClick={ (e) => { this.changeDisplay(e, cal.id) } } /><label htmlFor={ idval } className="black">{ cal.summary }</label><br/>
              </div>
        );
      });
    }
    if (selected_calendars.length == 0) {
      content.push(<div key="empty_calendars"><label>There are no calendars.</label></div>);
    }
    return content;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSetting);
