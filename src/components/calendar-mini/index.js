import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { LoadLocalEvents, LoadBrokerLocalEvents, LoadContactLocalEvents, GetBroker, LoadBrokerCalendars } from '../../services/actions/events';
import ListModal from '../modals/listmodal';

import '../../styles/assets/plugins/fullcalendar/fullcalendar.css';
import '../../styles/assets/plugins/fullcalendar/fullcalendar.js';

import './style.scss';

const mapDispatchToProps = (dispatch) => {
    return ({
        LoadLocalEvents: (id) => { LoadLocalEvents(id, dispatch) },
        LoadBrokerLocalEvents: (id) => { LoadBrokerLocalEvents(id, dispatch) },
        LoadContactLocalEvents: (id) => { LoadContactLocalEvents(id, dispatch) },
        GetBroker: (id) => { GetBroker(id, dispatch) },
        LoadBrokerCalendars: (id) => { LoadBrokerCalendars(id, dispatch) },
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        events: state.events.events,
        broker_events: state.events.broker_events,
        broker_calendars: state.events.broker_calendars,
    });
}


class MiniCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user || {},
        }

    }

    componentDidMount() {
        this.draw_calendar(this.build_events(this.props));
    }

    componentWillMount() {
        if (this.state.user != undefined) {
            if (this.props.events == undefined || this.props.events.length == 0) {
                this.props.LoadLocalEvents(this.state.user.id);
            }
            if(this.state.user.role == 'agent' || this.state.user.role == 'team') {
                if (this.props.broker_events == undefined) {
                    this.props.LoadBrokerLocalEvents(this.state.user.id);
                }
                if (this.props.broker_calendars == undefined) {
                    this.props.LoadBrokerCalendars(this.state.user.id);
                }
            } else {
                if (this.props.broker_events == undefined) {
                    this.props.LoadContactLocalEvents(this.state.user.id);
                }
            }
        }
    }

    componentWillReceiveProps(newProps, newState) {
        this.props = newProps;
        if (newProps.user != undefined && newProps.user != this.state.user) {
            this.setState({user: newProps.user});
            if (newProps.events == undefined || newProps.events.length == 0) {
                this.props.LoadLocalEvents(newProps.user.id);
            }
            if (newProps.user.role == "agent") {
                if (newProps.broker_events == undefined) {
                    this.props.LoadBrokerLocalEvents(newProps.user.id);
                    this.props.GetBroker(newProps.user.id);
                }
                if (newProps.broker_calendars == undefined) {
                    this.props.LoadBrokerCalendars(this.state.user.id);
                }
            }
            if (newProps.user.role == "broker") {
                if (newProps.broker_events == undefined) {
                    this.props.LoadContactLocalEvents(newProps.user.id);
                    this.props.GetBroker(newProps.user.id);
                }
            }
        }
        $("#minicalendar").fullCalendar('removeEvents');
        let events = this.build_events(newProps);
        $("#minicalendar").fullCalendar('addEventSource', events);
    }

    build_events = (newProps) => {
        let events = newProps.events || [];
        let broker_events = newProps.broker_events || [];
        let g_events = events.concat(broker_events);
        let temp_events = [];
        g_events.forEach((event) => {
            if (event.is_display == true) {
                let obj = {
                    id: event.id,
                    title: event.summary,
                    start: moment(event.start.date || event.start.dateTime).format("MM DD YYYY HH:mm"),
                    end: moment(event.end.date || event.end.dateTime).format("MM DD YYYY HH:mm"),
                    color: event.color,
                    flag_modal: event.flag_modal
                };
                temp_events.push(obj);
            }
        });
        return temp_events;
    }

    toUtcMoment = (date) => {
        let d = new Date();
        let offset = d.getTimezoneOffset();
        // return moment(date).add(offset, 'minutes');
        return moment(date);
    }

    draw_calendar = (events) => {
        let self = this;
        $('#minicalendar').fullCalendar({
            header: {
                left: '',
                center: 'prev, title, next',
                right: '',
            },
            titleFormat: {
                month: 'MMMM'
            },
            editable: false,
            droppable: false,
            drop: function() {  
            },
            eventLimit: true,
            viewRender: function ( view, element ) {
                var toDay = $(".fc-day-number.fc-today");
                $.each(toDay, function(key, value){
                    if (value.closest("#minicalendar")) {
                        value.className = "fc-day-number fc-mine";
                        var today_style = "3px solid #007f49";
                        value.style.borderBottom = today_style;
                    }
                });
            },
            eventRender: function (event, element) {
                element.css("display", "none");
                var eventDay = $(".fc-day-number");

                $.each( eventDay, function( key, value ) {
                    if ( value.dataset["date"] == self.toUtcMoment(event.start._i).format("YYYY-MM-DD") ) {

                        var nowday = eventDay.slice(key, key+1);
                        var temp_class = nowday[0].className;
                        
                        if (nowday[0].closest("#minicalendar")) {
                            nowday[0].className = temp_class + " fc-ev";
                            var border_style = "3px solid " + event.color;
                            nowday[0].style.borderBottom = border_style;
                        }

                        nowday[0].onmouseover = function(e){
                            var is_other_month = nowday[0].classList.contains('fc-other-month');
                            if (!is_other_month) {
                                if (nowday[0].closest("#minical")) {
                                    var x = e.pageX - $('#minicalendar').offset().left;
                                    var y = e.pageY - $('#minicalendar').offset().top;
                                    $("#minipop_" + event.id).css({'top':y,'left':x, 'position':'absolute', 'z-index': '5'});
                                    $("#minipop_" + event.id).css("display", "block");
                                }
                            }
                            if (nowday[0].closest(".calendar")) {
                                var current_width = $(window).width();
                                var flag_position = current_width - e.pageX;
                                if (flag_position < 270) {
                                    var x = e.pageX - $('.calendar').offset().left;
                                    var y = e.pageY - $('.calendar').offset().top;
                                    $("#minipop_" + event.id).css({'top':y,'left':x-270, 'position':'absolute', 'z-index': '5'});
                                    $("#minipop_" + event.id).css("display", "block");
                                } else {
                                    var x = e.pageX - $('.calendar').offset().left;
                                    var y = e.pageY - $('.calendar').offset().top;
                                    $("#minipop_" + event.id).css({'top':y,'left':x, 'position':'absolute', 'z-index': '5'});
                                    $("#minipop_" + event.id).css("display", "block");
                                }
                            }
                        }

                        nowday[0].onmouseout = function(){
                            $("#minipop_" + event.id).on("mouseover", function(){
                                $("#minipop_" + event.id).css("display", "block");
                            });
                            $("#minipop_" + event.id).on("mouseout", function(){
                                $("#minipop_" + event.id).css("display", "none");
                            });
                            $("#minipop_" + event.id).css("display", "none");
                        }

                    }

                    if (event.end) {
                        if (value.dataset["date"] > self.toUtcMoment(event.start._i).format("YYYY-MM-DD") && value.dataset["date"] <= self.toUtcMoment(event.end._i).format("YYYY-MM-DD")) {
                            var nowday = eventDay.slice(key, key+1);
                            var temp_class = nowday[0].className;
                            
                            if (nowday[0].closest("#minicalendar")) {
                                nowday[0].className = temp_class + " fc-ev";
                                var border_style = "3px solid " + event.color;
                                nowday[0].style.borderBottom = border_style;
                            }
                        }
                    }
                    
                });

                var toDay = $(".fc-day-number.fc-today");
                $.each(toDay, function(key, value){
                    if (value.closest("#minicalendar")) {
                        value.className = "fc-day-number fc-mine";
                        var today_style = "3px solid #007f49";
                        value.style.borderBottom = today_style;
                    }
                });

            },
            events: events,
        });

        var eventDay = $(".fc-day-number");
        var toDay = $(".fc-day-number.fc-today");
        $.each(toDay, function(key, value){
            if (value.closest("#minicalendar")) {
                value.className = "fc-day-number fc-mine";
                var today_style = "3px solid #007f49";
                value.style.borderBottom = today_style;
            }
        });
        
    }

    pop_view = (arr, key) => {
        let length = arr.length;
        let contents = []
        arr.forEach((ar, key) => {
            let id_val = "minipop_" + ar.id;
            contents.push(<div key={key} id={id_val} style={{display: 'none'}}>
                <ListModal flag_listmodal={"popup"} arrs={ arr } />
            </div>);
        });
        return contents
    }

    render() {

        let mini_pop = [];
        let ev = this.props.events || [];
        let broker_ev = this.props.broker_events || [];
        let g_ev = ev.concat(broker_ev);

        let dateobj = {};
        let target = [];

        g_ev.forEach((e, key) => {
            if (e.is_display == true) {
                let temp = this.toUtcMoment(e.start.dateTime || e.start.date).format("MM-DD-YYYY");
                let d = temp;
                if (dateobj[d] == undefined)
                    dateobj[d] = Object.keys(dateobj).length;
                if (target[dateobj[d]] == undefined)
                    target[dateobj[d]] = [];
                target[dateobj[d]].push(e);
            }
        });

        target.forEach((arr, key) => {
            mini_pop.push(this.pop_view(arr, key));
        });

        return (
            <div id="minicalendar-sec">
                <div id="minicalendar"></div>
                <div id="hover_mini">
                    { mini_pop }
                </div>
            </div>
        );
    }

}

MiniCalendar.propTypes = {
    events: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniCalendar);