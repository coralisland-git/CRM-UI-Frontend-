import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { saveLocalEvent, DeleteEvent, InsertGoogleEvent, UpdateGoogleEvent, deleteLocalEvent, updateLocalEvent, getCirles, refreshError } from '../../../services/actions/events';

import SideBar from '../components/sidebar';

import '../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import '../../../styles/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css';
import '../../../styles/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js';
import { confirmAlert } from '../../../components/confirmdialog';
import '../style.scss';


const mapDispatchToProps = (dispatch) => {
  return ({
    saveLocalEvent: (obj, color, modal_type) => { saveLocalEvent(obj, color, modal_type, dispatch) },
    DeleteEvent: (eventid, calendarid) => { DeleteEvent(eventid, calendarid, dispatch) },
    InsertGoogleEvent: (item, color) => { InsertGoogleEvent(item, color, dispatch) },
    UpdateGoogleEvent: (eventid, obj) => { UpdateGoogleEvent(eventid, obj, dispatch) },
    deleteLocalEvent: (eventid) => { deleteLocalEvent(eventid, dispatch) },
    updateLocalEvent: (eventid, obj, color, modal_type) => { updateLocalEvent(eventid, obj, color, modal_type, dispatch) },
    getCirles: () => { getCirles(dispatch) },
    refreshError: () => { refreshError(dispatch) },
  });
}

const mapStateToProps = (state) => {
  return ({ 
    user: state.auth.user,
    events: state.events.events,
    selected_calendars: state.events.selected_calendars,
    calendars: state.events.calendars,
    circles: state.events.circles,
    error: state.events.error,
  });
}

class NewEvents extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user || {username: ""},
      current_event_id: this.props.match.params.eventid || undefined,
      events: this.props.events || [],
      selected_calendars: this.props.selected_calendars || [],
      calendars: this.props.calendars || [],
      circles: this.props.circles || [],
      imagePreviewUrl: undefined,
      temp_location: "",
      title: "",
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      location: "",
      host_name: "",
      image: undefined,
      event_type: "",
      description: "",
      invite_circle: "",
      invite_email: "",
      calendar: "",
      googleid: "",
      lorem: "",

      first_loading: true,
    }
    this.saveEvent = this.saveEvent.bind(this);
  }

  componentDidMount() {

    $(".myselectbox").selectpicker();
    $('.datepicker').bootstrapMaterialDatePicker({
      format: 'MM-DD-YYYY',
      clearButton: true,
      weekStart: 1,
      time: false
    });
    $('.timepicker').bootstrapMaterialDatePicker({
        format: 'hh:mm A',
        clearButton: true,
        shortTime: true,
        date: false
    });

    let self = this;
    $('#start_date').on("change", function(e){
      let start_str = e.target.value;
      let start_date = moment(e.target.value);
      if (self.state.end_date != "") {
        let end_date = moment(self.state.end_date);
        if (start_date > end_date) {
          start_str = "";
          confirmAlert({
            template: "danger",
            message: "You have to input the valid starting date before ending date."
          });
        }
        let temp_str = start_date.format('M') + start_date.format('D') + start_date.format('YYYY');
        let temp_str1 = end_date.format('M') + end_date.format('D') + end_date.format('YYYY');
        if (temp_str == temp_str1) {
          if (self.state.start_time != "" && self.state.end_time != "") {
            let start_time = parseInt(self.state.start_time.split(":")[0]);
            let end_time = parseInt(self.state.end_time.split(":")[0]);
            if (start_time > end_time) {
              start_str = "";
              confirmAlert({
                template: "danger",
                message: "You have to input the valid starting time before ending time."
              });
            }
          }
        }
      }
      self.setState({ start_date: start_str });
    });
    $('#end_date').on("change", function(e){
      let end_str = e.target.value;
      let end_date = moment(e.target.value);
      if (self.state.start_date != "") {
        let start_date = moment(self.state.start_date);
        if (end_date < start_date) {
          end_str = "";
          confirmAlert({
            template: "danger",
            message: "You have to input the valid starting date before ending date."
          });
        }
        let temp_str = end_date.format('M') + end_date.format('D') + end_date.format('YYYY');
        let temp_str1 = start_date.format('M') + start_date.format('D') + start_date.format('YYYY');
        if (temp_str == temp_str1) {
          if (self.state.start_time != "" && self.state.end_time != "") {
            let start_time = parseInt(self.state.start_time.split(":")[0]);
            let end_time = parseInt(self.state.end_time.split(":")[0]);
            if (start_time > end_time) {
              end_str = "";
              confirmAlert({
                template: "danger",
                message: "You have to input the valid starting time before ending time."
              });
            }
          }
        }
      }
      self.setState({ end_date: end_str });
    });
    $('#start_time').on("change", function(e){
      let start_str = e.target.value;
      if (start_str.includes("PM")) {
        let hour = parseInt(e.target.value.split(":")[0]);
        let min = e.target.value.split(":")[1].replace(" PM", "");
        hour += 12;
        start_str = hour + ":" + min;
      }
      if (start_str.includes("AM")) {
        start_str = e.target.value.replace(" AM", "");
      }
      if (self.state.start_date != "" && self.state.end_date != "") {
        if (self.state.start_date == self.state.end_date) {
          if (self.state.end_time != "") {
            let start_time = parseInt(start_str.split(":")[0]);
            let end_time = parseInt(self.state.end_time.split(":")[0]);
            if (start_time > end_time) {
              start_str = "";
              confirmAlert({
                template: "danger",
                message: "You have to input the valid starting time before ending time."
              });
            }
            if (start_time == end_time) {
              let start_min = parseInt(start_str.split(":")[1]);
              let end_min = parseInt(self.state.end_time.split(":")[1]);
              if (start_min > end_min) {
                start_str = "";
                confirmAlert({
                  template: "danger",
                  message: "You have to input the valid starting time before ending time."
                });
              }
            }
          }
        }
      } 
      self.setState({start_time: start_str});
    });
    $('#end_time').on("change", function(e){
      let end_str = e.target.value;
      if (end_str.includes("PM")) {
        let hour = parseInt(e.target.value.split(":")[0]);
        let min = e.target.value.split(":")[1].replace(" PM", "");
        hour += 12;
        end_str = hour + ":" + min;
      }
      if (end_str.includes("AM")) {
        end_str = e.target.value.replace(" AM", "");
      }
      if (self.state.start_date != "" && self.state.end_date != "") {
        if (self.state.start_date == self.state.end_date) {
          if (self.state.start_time != "") {
            let end_time = parseInt(end_str.split(":")[0]);
            let start_time = parseInt(self.state.start_time.split(":")[0]);
            if (start_time > end_time) {
              end_str = "";
              confirmAlert({
                template: "danger",
                message: "You have to input the valid starting time before ending time."
              });
            }
            if (start_time == end_time) {
              let end_min = parseInt(end_str.split(":")[1]);
              let start_min = parseInt(self.state.start_time.split(":")[1]);
              if (start_min > end_min) {
                end_str = "";
                confirmAlert({
                  template: "danger",
                  message: "You have to input the valid starting time before ending time."
                });
              }
            }
          }
        }
      }
      self.setState({end_time: end_str});
    })

    this.initialCKEDITOR();

    if (this.state.current_event_id) {
      
      let current_events = [];
      let current_event = {};
      let calendarid = "";
      let current_calendars = [];
      let calendar_name = "";

      current_events = this.state.events.filter((eve) => {
          return eve.id == this.state.current_event_id;
      });

      current_event = current_events[0] || {};

      if (current_event.organizer) {
        calendarid = current_event.organizer.email;  
      } else {
        calendarid = "";
      }

      current_calendars = this.state.selected_calendars.filter((cal) => {
          return cal.id == calendarid || cal.email == calendarid;
      });
      if (current_calendars.length == 0) {
      } else {
        calendar_name = current_calendars[0].summary;
      }
      
      let start_date = "";
      let end_date = "";
      let start_time = "";
      let end_time = "";
      let temp_date;

      if (current_event.start) {
        temp_date = this.toUtcMoment(current_event.start.date || current_event.start.dateTime);
        start_date = temp_date.format('MM') + "-" + temp_date.format('DD') + "-" +  temp_date.format('YYYY');
        start_time = temp_date.format('HH') + ":" + temp_date.format('mm');
      }

      if (current_event.end) {
        temp_date = this.toUtcMoment(current_event.end.date || current_event.end.dateTime);
        end_date = temp_date.format('MM') + "-" + temp_date.format('DD') + "-" +  temp_date.format('YYYY');
        end_time = temp_date.format('HH') + ":" + temp_date.format('mm');
      }

      this.setState({ title: current_event.summary });
      this.setState({ start_date: start_date });
      this.setState({ start_time: start_time });
      this.setState({ end_date: end_date });
      this.setState({ end_time: end_time });
      this.setState({ image: current_event.image });
      this.setState({ host_name: current_event.host_name || this.state.user.first_name + " " + this.state.user.last_name || "" });
      this.setState({ event_type: current_event.notification_type || current_event.event_type || "" });
      this.setState({ description: current_event.description || "" });
      this.setState({ location: current_event.location || "" });
      this.setState({ invite_circle: current_event.invite_circle || current_event.invited_group || "" });
      this.setState({ invite_email: current_event.invite_email || current_event.invited_email || "" });
      this.setState({ calendar: calendar_name || "" });
      this.setState({ googleid: current_event.attachments });
      this.setState({ lorem: current_event.notification_sendtype || current_event.lorem || "" });
      this.setState({ imagePreviewUrl: current_event.image || undefined });
      if (CKEDITOR.instances.ckeditorme) {
        CKEDITOR.instances.ckeditorme.setData(current_event.description);
      }
    }

    $(".myselectbox").selectpicker("refresh");

  }

  initialCKEDITOR = () => {
    let self = this;
    let configuration = {
      toolbar: "Basic",
      removePlugins: 'about',
      allowedContent: true
    };
    CKEDITOR.replace("ckeditorme", configuration);
    CKEDITOR.instances.ckeditorme.on('change', function () {
      let data = CKEDITOR.instances.ckeditorme.getData();
      self.setState({description: data});
    }.bind(this));
  }

  toUtcMoment = (date) => {
    let d = new Date();
    let offset = d.getTimezoneOffset();
    // return moment(date).add(offset, 'minutes');
    return moment(date);
  }

  componentWillMount () {
    this.props.getCirles();
    let self = this;
    $.getJSON("//freegeoip.net/json/?callback=?", function(data){
      let location = "";
      if (data.city != "") location += data.city + ", ";
      if (data.region_name != "") location += data.region_name + ", ";
      if (data.country_name != "") location += data.country_name;
      self.setState({temp_location: location});
      self.setState({location: location});
    });
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    if (newProps.error == "event updating error") {
      confirmAlert({
        template: "danger",
        message: "Your Event saving failed."
      });
      newProps.refreshError();
    }
    if (newProps.error == "update ok") {
      confirmAlert({
        template: "success",
        message: "Your Event updated."
      });
      newProps.refreshError();
      newProps.history.push("/events");
    }
    if (newProps.user != undefined && newProps.user != this.state.user) {
      this.setState({user: newProps.user});
    }
    this.setState({selected_calendars: newProps.selected_calendars || []});
    this.setState({calendars: newProps.calendars || []});
    this.setState({circles: newProps.circles || []});
    this.setState({events: newProps.events || []});

    if (this.state.current_event_id && newProps.events.length != 0 && newProps.selected_calendars.length != 0) {
      
      let current_events = [];
      let current_event = {};
      let calendarid = "";
      let current_calendars = [];
      let calendar_name = "";

      current_events = newProps.events.filter((eve) => {
          return eve.id == this.state.current_event_id;
      });

      current_event = current_events[0] || {};
      
      if (current_event.organizer) {
        calendarid = current_event.organizer.email;  
      } else {
        calendarid = "";
      }

      current_calendars = newProps.selected_calendars.filter((cal) => {
          return cal.id == calendarid || cal.email == calendarid;
      });
      if (current_calendars.length == 0) {
      } else {
        calendar_name = current_calendars[0].summary;
      }
      
      let start_date = "";
      let end_date = "";
      let start_time = "";
      let end_time = "";
      let temp_date;

      if (current_event.start) {
        temp_date = this.toUtcMoment(current_event.start.date || current_event.start.dateTime);
        start_date = temp_date.format('MM') + "-" + temp_date.format('DD') + "-" +  temp_date.format('YYYY');
        start_time = temp_date.format('HH') + ":" + temp_date.format('mm');
      }

      if (current_event.end) {
        temp_date = this.toUtcMoment(current_event.end.date || current_event.end.dateTime);
        end_date = temp_date.format('MM') + "-" + temp_date.format('DD') + "-" +  temp_date.format('YYYY');
        end_time = temp_date.format('HH') + ":" + temp_date.format('mm');
      }

      this.setState({ title: current_event.summary });
      this.setState({ start_date: start_date });
      this.setState({ start_time: start_time });
      this.setState({ end_date: end_date });
      this.setState({ end_time: end_time });
      this.setState({ image: current_event.image });
      this.setState({ host_name: current_event.host_name || this.state.user.first_name + " " + this.state.user.last_name || "" });
      this.setState({ event_type: current_event.notification_type || current_event.event_type || "" });
      this.setState({ description: current_event.description || "" });
      this.setState({ location: current_event.location || "" });
      this.setState({ invite_circle: current_event.invite_circle || current_event.invited_group || "" });
      this.setState({ invite_email: current_event.invite_email || current_event.invited_email || "" });
      this.setState({ calendar: calendar_name || "" });
      this.setState({ googleid: current_event.attachments });
      this.setState({ lorem: current_event.notification_sendtype || current_event.lorem || "" });
      this.setState({ imagePreviewUrl: current_event.image || undefined });
      if (CKEDITOR.instances.ckeditorme) {
        CKEDITOR.instances.ckeditorme.setData(current_event.description);
      }
    }

  }

  componentDidUpdate () {
    $("#invite_circle").selectpicker("refresh");
    $("#calendar").selectpicker("refresh");
    $("#event_type").selectpicker("refresh");
    $("#lorem").selectpicker("refresh");
    $("#end_time").selectpicker("refresh");
    $("#start_time").selectpicker("refresh");
  }

  refreshCalendars = (e) => {
    e.preventDefault();
    $("#minicalendar").fullCalendar('refresh');
    $("#calendar").fullCalendar('refresh');
  }

  saveEvent = (e) => {
    e.preventDefault();

    let tempo = "";
    if (this.state.event_type == "") {
      tempo = $("#event_type").val();
      this.setState({event_type: tempo});
      this.state.event_type = tempo;
    }
    if (this.state.invite_circle == "") {
      tempo = $("#invite_circle").val();
      if (tempo == "-- please select --") {
      } else {
        this.setState({invite_circle: tempo});
        this.state.invite_circle = tempo;
      }
    }
    if (this.state.calendar == "") {
      tempo = $("#calendar").val();
      this.setState({calendar: tempo});
      this.state.calendar = tempo;
    }
    if (this.state.lorem == "") {
      tempo = $("#lorem").val();
      this.setState({lorem: tempo});
      this.state.lorem = tempo;
    }

    if (this.state.title == "" || this.state.start_date == "" || this.state.end_date == "" || this.state.calendar == "-- please select --") {
      
      let error_msg = 0;
      if (this.state.title == "") {
        confirmAlert({
          template: "danger",
          message: "You didn't input Title",
        });
        error_msg = 1;
        $("#div_title").css("border-color", "red");
      }
      if (this.state.start_date == "") {
        if (error_msg == 0) {
          confirmAlert({
            template: "danger",
            message: "You didn't input Start Date",
          });
        }
        error_msg = 1;
        $("#div_start_date").css("border-color", "red");
      }
      if (this.state.end_date == "") {
        if (error_msg == 0) {
          confirmAlert({
            template: "danger",
            message: "You didn't input End Date",
          });
        }
        error_msg = 1;
        $("#div_end_date").css("border-color", "red");
      }
      if (this.state.calendar == "-- please select --") {
        if (error_msg == 0) {
          confirmAlert({
            template: "danger",
            message: "You didn't input Calendar",
          });
        }
        error_msg = 1;
        $("#calendar").parent("div").addClass("border-red");
      }
    } else {

      let start,end ,obj;
      if (this.state.start_time != "") {
        start = new Date(this.state.start_date + " " + this.state.start_time);
      } else {
        start = new Date(this.state.start_date);
      }
      if (this.state.end_time != "") {
        end = new Date(this.state.end_date + " " + this.state.end_time);
      } else {
        end = new Date(this.state.end_date);
      }

      obj = {
        'title': this.state.title,
        'location': this.state.location,
        'description': this.state.description,
        'start': start,
        'end': end,
        'image': this.state.imagePreviewUrl || undefined,
        'host_name': this.state.host_name,
        'event_type': this.state.event_type,
        'invite_circle': this.state.invite_circle,
        'invite_email': this.state.invite_email,
        'calendar': this.state.calendar,
        'lorem': this.state.lorem,
        'creator': this.state.user.id,
        'useremail': this.state.user.email
      };

      let temp1 = this.state.selected_calendars.filter((calendar) => {
        return calendar.summary == this.state.calendar;
      });
      obj.calendarid = temp1[0].id;

      if (temp1[0]) {
        let modal_type = "";
        if (this.state.user.role == "broker") {
          modal_type = "RVSP";
        } else {
          modal_type = "normal";
        }

        if (this.state.current_event_id) {
          this.props.updateLocalEvent(this.state.current_event_id, obj, temp1[0].backgroundColor, modal_type);
        }
        else {
          this.props.saveLocalEvent(obj, temp1[0].backgroundColor, modal_type);
        }
      } else {
        confirmAlert({
          template: "danger",
          message: "Your Local Calendar Event saving failed."
        });

      }

    }   

  }

  onChangeValue = (e, key) => {
    e.preventDefault();
    if (key == "title") this.setState({title: e.target.value});
    if (key == "event_type") this.setState({event_type: e.target.value});
    if (key == "location") this.setState({location: e.target.value});
    if (key == "invite_circle") {
      if (e.target.value == "-- please select --") {
        this.setState({invite_circle: ""});
      } else {
        this.setState({invite_circle: e.target.value});
      }
    }
    if (key == "invite_email") this.setState({invite_email: e.target.value});
    if (key == "calendar") {
      if (e.target.value == "-- please select --") {
        this.setState({calendar: ""});
      } else {
        this.setState({calendar: e.target.value});
      }
    }
    if (key == "lorem") this.setState({lorem: e.target.value});
  }

  onChangeThumbImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  changeTime12 = (str) => {
    let re_str = "";
    if (str != "") {
      let hour = parseInt(str.split(":")[0]);
      let min = str.split(":")[1];
      if (hour > 12) {
        hour = hour - 12;
        re_str = hour + ":" + min + " PM";
      } else {
        re_str = hour + ":" + min + " AM";
      }
    }
    return re_str;
  }

  render() {

    if (!this.props.match.params.eventid && this.state.first_loading) {
      this.setState({title: ""});
      this.setState({start_date: ""});
      this.setState({start_time: ""});
      this.setState({end_date: ""});
      this.setState({end_time: ""});
      this.setState({location: this.state.temp_location});
      this.setState({imagePreviewUrl: undefined});
      this.setState({event_type: ""});
      this.setState({description: ""});
      this.setState({invite_circle: ""});
      this.setState({invite_email: ""});
      this.setState({calendar: ""});
      this.setState({ googleid: "" });
      this.setState({lorem: ""});
      if (this.state.user) {
        this.setState({ host_name: this.state.user.first_name + " " + this.state.user.last_name });
      }
      this.setState({ location: this.state.temp_location });
      this.setState({first_loading: false});
    }

    let cal_list = [];
    let calendars = this.state.selected_calendars || [];
    calendars.forEach((calendar, key) => {
        cal_list.push(<option key={key} value={calendar.summary}>{calendar.summary}</option>);
    });

    let circle_list = [];
    let circles = this.state.circles;
    circles.forEach((circle, key) => {
      circle_list.push(<option key={key} value={circle.name}>{ circle.name }</option>);
    });
    debugger
    
    let thumb_style = {};
    let thumb_image = [];

    if (this.state.imagePreviewUrl == undefined || this.state.imagePreviewUrl == "#ececec" ) {
      thumb_style = {
        backgroundColor: "#ececec",
      }
      thumb_image.push("");
    } else {
      thumb_image.push(<img src={ this.state.imagePreviewUrl } style={{ width: "100%" }} />);
    }

    let event_type_list = [];
    let type_list = ["Open House", "Class", "Meeting", "Appointment"];
    type_list.forEach((val, key) => {
      event_type_list.push(<option key={key} value={val}>{val}</option>);
    });

    let reminder_list = [];
    let re_list = ["Working", "Enjoying", "Dating", "Meeting"];
    re_list.forEach((val, key) => {
      reminder_list.push(<option key={key} value={val}>{val}</option>);
    });

    let start_time = this.changeTime12(this.state.start_time);
    let end_time = this.changeTime12(this.state.end_time);

    return ( 
      <div id="addeventpages" className="container-fluid">
        <div className="block-header col-sm-6 clearfix">
          <h2 className="padding-top-8 heading-me">Events</h2>
        </div>
        <div className="block-header col-sm-6">
          <NavLink to="/events" id="btn_refresh" className="btn btn-md btn-raised btn-default waves-effect right" onClick={this.deleteEvent}>DISCARD EVENT</NavLink>
          <button type="button" className="btn btn-md btn-raised btn-primary waves-effect right margin-right-10" onClick={this.saveEvent}>SAVE EVENT</button>
        </div>
        <div className="row">
        
          <div id="side_bar_cal" className="col-sm-3 no-right-padding">
            <SideBar />
          </div>

          <div className="col-sm-9">
            <div className="card card-me no-border">
              <div className="body">
                <ul className="list-group">
                  <li className="list-group-item block-header clearfix no-border-bottom">
                    <h2 className="heading-add">&nbsp;&nbsp;&nbsp;ADD / EDIT EVENT</h2>
                  </li>
                  <li className="list-group-item clearfix">
                    <form>
                      <div className="row">
                        <div className="col-sm-8">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label>Event Title: </label>
                                <div id="div_title" className="form-line">
                                  <input id="title" className="form-control padding-left-10" type="text" placeholder="Please input Event Title."  value={this.state.title} onChange={(e) => {this.onChangeValue(e, "title")}} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <label>Date & Time</label>
                            </div>
                            <div className="col-sm-5 padding-right-0 padding-left-0">
                              <div className="col-sm-6 padding-right-0 padding-left-0">
                                <div id="datepicker" className="col-sm-12">
                                  <div id="picker" className="form-group">
                                    <div id="div_start_date" className="form-line">
                                      <input type="text" id="start_date" className="datepicker form-control" palceholder="e.x 2017-04-12" data-dtp="dtp_iR8Yp" value={ this.state.start_date } />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6 padding-right-0 padding-left-0">
                                <div id="timepicker" className="col-sm-12">
                                  <div id="picker" className="form-group">
                                    <div id="div_start_date" className="form-line">
                                      <input type="text" id="start_time" className="timepicker form-control" data-dtp="dtp_odjSj" value={ start_time } />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-2 padding-right-0 padding-left-0 text-center">
                              <label className="padding-top-8">to</label>
                            </div>
                            <div className="col-sm-5 padding-right-0 padding-left-0">
                              <div className="col-sm-6 padding-right-0 padding-left-0">
                                <div id="datepicker" className="col-sm-12">
                                  <div id="picker" className="form-group">
                                    <div id="div_end_date" className="form-line">
                                      <input type="text" id="end_date" className="datepicker form-control"  palceholder="e.x 2017-04-12"  data-dtp="dtp_iR8Yp" value={this.state.end_date} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6 padding-right-0 padding-left-0">
                                <div id="timepicker" className="col-sm-12">
                                  <div id="picker" className="form-group">
                                    <div id="div_end_date" className="form-line">
                                      <input type="text" id="end_time" className="timepicker form-control" data-dtp="dtp_odjSj" value={ end_time } />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label>Location: </label>
                                <div className="form-line">
                                  <input id="location" className="form-control padding-left-10" type="text" placeholder="Please input Event Location."  value={this.state.location} onChange={(e) => {this.onChangeValue(e, "location")}} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4 ">
                          <div id="thumb" className="thumb" style={ thumb_style }>
                            { thumb_image }
                          </div>
                          <div className="bottom-center">
                            <label htmlFor="file-upload" className="custom-file-upload btn btn-sm btn-raised btn-default waves-effect">
                              Upload
                            </label>
                            <input id="file-upload" type="file" onChange={this.onChangeThumbImage } />
                          </div>
                        </div>
                      </div>
                      <div className="row padding-top-5">
                        <div className="col-sm-6">
                          <div className="card card-me" style={{paddingBottom: "10px"}}>
                            <div className="body">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label>Host/Instructor</label>
                                  <div className="form-line">
                                    <input id="host_name" className="form-control padding-left-10" type="text" placeholder="Keller Williams"  value={this.state.host_name} disabled />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <label className="padding-top-30">Event Type: </label>
                                <select id="event_type" className="myselectbox col-sm-12" value={this.state.event_type} onChange={(e) => {this.onChangeValue(e, "event_type")}}>
                                  { event_type_list }
                                </select>
                              </div>
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label>Description </label>
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <textarea name="ckeditorme" id="ckeditorme" ref="contentVal"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="card card-me">
                            <div className="body">
                              <div className="col-sm-6">
                                <label className="padding-top-30">Invite Circle: </label>
                                <select id="invite_circle" className="myselectbox col-sm-12" value={this.state.invite_circle} onChange={(e) => {this.onChangeValue(e, "invite_circle")}}>
                                  <option>-- please select --</option>
                                  { circle_list }
                                </select>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label>Invite Via Email</label>
                                  <div className="form-line">
                                    <input id="invite_email" className="form-control padding-left-10" type="text" placeholder="ADD"  value={this.state.invite_email}  onChange={(e) => {this.onChangeValue(e, "invite_email")}} />
                                  </div>
                                </div>
                              </div>
                              <div id="calendarlist" className="col-sm-12">
                                <label className="padding-top-30">Calendar</label>
                                <select id="calendar" className="myselectbox col-sm-12" value={this.state.calendar}  onChange={(e) => {this.onChangeValue(e, "calendar")}}>
                                  <option>-- please select --</option>
                                  { cal_list }
                                </select>
                              </div>
                              <div className="col-sm-12">
                                <label className="padding-top-30">Reminder</label>
                                <select id="lorem" className="myselectbox col-sm-12" value={this.state.lorem} onChange={(e) => {this.onChangeValue(e, "lorem")}}>
                                  { reminder_list }
                                </select>
                              </div>
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label>Attachment</label>
                                  <div className="form-line">
                                    <input className="form-control padding-left-10" type="text" placeholder="sample.doc"  value="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <input type="text" id="start_time_temp" className="temp_timepicker form-control" data-dtp="dtp_odjSj" value="" style={{ display: "none" }} />

      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvents);
