import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

import Calendar from '../../components/calendar';
import MainPopModal from '../../components/modals/mainpopmodal';
import ImgModal from '../../components/modals/imgmodal';
import SideBar from './components/sidebar';

import { deleteLocalEvent } from '../../services/actions/events';
import { confirmAlert } from '../../components/confirmdialog';

import html2canvas from 'html2canvas';

import './style.scss';


const mapDispatchToProps = (dispatch) => {
    return ({
        deleteLocalEvent: (eventid) => { deleteLocalEvent(eventid, dispatch) },
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        broker: state.events.broker,
        events: state.events.events,
        broker_events: state.events.broker_events,
    });
}


class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user || {},
        }
    }

    componentWillReceiveProps(newProps) {
        this.props = newProps;
        if (newProps.user != undefined && newProps.user != this.state.user) {
            this.setState({user: newProps.user});
        }   
    }


    printCalendar = (e) => {
        e.preventDefault();
        const input = document.getElementById('print_cal');
        html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          pdf.save("calendar.pdf");
        });
    }

    deleteEvent = (event_id) => {
        this.props.deleteLocalEvent(event_id);
        confirmAlert({
            template: "success",
            message: "Event deleted",
        });
    }

    render() {
        let events = [];
        let broker_events = [];
        let modal_events = [];
        if (this.props.events) {
            events = this.props.events || [];
            events.forEach((event, key) => {
                if (event.is_display == true) {
                    if (this.state.user.role == "broker") {
                        modal_events.push(<MainPopModal key={key} flag_modal={event.flag_modal} id={event.id} event={event} user={this.props.user} deleteEvent={ this.deleteEvent } />);
                    } else {
                        modal_events.push(<MainPopModal key={key} flag_modal={event.flag_modal} id={event.id} event={event} user={this.props.user} deleteEvent={ this.deleteEvent } />);
                    }
                }
            });
        }
        if (this.props.broker_events) {
            broker_events = this.props.broker_events || [];
            broker_events.forEach((event, key) => {
                if (event.is_display == true) {
                    modal_events.push(<ImgModal key={event.id + "_" +key} id={event.id} event={event} />); 
                }
            });
        }

        
        return ( 

            <div id="event_page" className="container-fluid">
                <div className="block-header col-sm-6 clearfix">
                    <h2 className="padding-top-8 heading-me">Events</h2>
                </div>
                <div className="block-header col-sm-6">
                    <button type="button" className="btn btn-md btn-raised btn-default waves-effect right" onClick={this.printCalendar.bind(this)} >&nbsp;&nbsp;<i className="material-icons btn_prefix">print</i>&nbsp;PRINT&nbsp;&nbsp;</button>
                    <NavLink to="/events" id="btn_refresh" className="btn btn-md btn-raised btn-default waves-effect right"><i className="material-icons btn_prefix">refresh</i>&nbsp;REFRESH</NavLink>
                </div>
                <div className="row">
                    <div id="side_bar_cal" className="col-sm-3 no-right-padding">
                        
                        <SideBar />

                    </div>
                    <div className="col-sm-9">
                        <div className="card card-me border-me">
                            <div className="body">
                                <div id="print_cal" className="FullCalendar">
                                    <ul id="calendar-nav" className="nav nav-tabs m-t-20 margin-top-0" role="tablist">
                                        <li role="presentation" className="active">
                                            <a href="javascript:void;" id="change-view-today" data-toggle="tab" aria-expanded="true"><span className="cal_nav_font">Today</span></a>
                                        </li>
                                        <li role="presentation" className="">
                                            <a href="javascript:void;" id="change-view-day" data-toggle="tab" aria-expanded="false"><span className="cal_nav_font">Day</span></a>
                                        </li>
                                        <li role="presentation" className="">
                                            <a href="javascript:void;" id="change-view-week" data-toggle="tab" aria-expanded="false"><span className="cal_nav_font">Week</span></a>
                                        </li>    
                                        <li role="presentation" className="">
                                            <a href="javascript:void;" id="change-view-month" data-toggle="tab" aria-expanded="false"><span className="cal_nav_font">Month</span></a>
                                        </li>       
                                    </ul>
                                    
                                    <div id="calendar_parent" className="tcol" style={{ position: "relative" }}>                       
                                        <Calendar events={events} />
                                        { modal_events }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
