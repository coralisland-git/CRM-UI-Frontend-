import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/assets/plugins/fullcalendar/fullcalendar.css';
import '../../styles/assets/plugins/fullcalendar/fullcalendar.js';

import './style.scss';

const mapDispatchToProps = (dispatch) => {
    return ({});
}

const mapStateToProps = (state) => {
    return ({
        events: state.events.events,
        broker_events: state.events.broker_events,  
    });
}


class Calendar extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.draw_calendar(this.build_events(this.props));
    }

    componentWillReceiveProps(newProps, newState) {
        this.props = newProps;
        $("#calendar").fullCalendar('removeEvents');
        let events = this.build_events(newProps);
        $("#calendar").fullCalendar('addEventSource', events);
        
    }

    build_events = (newProps) => {
        let events = newProps.events || [];
        let broker_events = newProps.broker_events || [];
        let g_events = events.concat(broker_events);
        let evs = [];
        g_events.forEach((event) => {
            if (event.is_display == true) {
                let temp = {
                    id: event.id,
                    title: event.summary,
                    start: moment(event.start.date || event.start.dateTime).format("MM DD YYYY HH:mm"),
                    end: moment(event.end.date || event.end.dateTime).format("MM DD YYYY HH:mm"),
                    textColor: '#000000',
                    color: event.color,
                    flag_modal: event.flag_modal
                };
                evs.push(temp);
            }
        });
        return evs;
    }

    draw_calendar = (evs) => {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            titleFormat: {
                month: 'MMMM'
            },
            editable: false,
            droppable: false,
            drop: function() {
            },
            eventLimit: true,
            eventRender: function (event, element) {
                var border_style = "3px solid " + event.color;
                element[0].style.borderLeft = border_style;
                element[0].style.backgroundColor = "#fffff0";
            },
            eventClick: function(calEvent, jsEvent, view) {
                var current_width = $(window).width();
                var current_po_x = jsEvent.pageX;
                var current_po_y = jsEvent.pageY;

                var flag_position = current_width - current_po_x;

                var x = jsEvent.pageX - $('#calendar_parent').offset().left;
                var y = jsEvent.pageY - $('#calendar_parent').offset().top;
                $(".mainpopmodal").css("display", "none");
                $(".imgmodal").css("display", "none");
                if (calEvent.flag_modal == "RVSP") {
                    if (flag_position < 400) {
                        $("#mainpopmodal_RVSP_" + calEvent.id).css({'top':y - 120,'left':x - 400, 'position':'absolute', 'z-index': '5'});
                        $("#mainpopmodal_RVSP_" + calEvent.id).removeClass('arrow-me-right arrow-me').addClass("arrow-me-right");
                        $("#mainpopmodal_RVSP_" + calEvent.id).css("display", "block");
                    } else {
                        $("#mainpopmodal_RVSP_" + calEvent.id).css({'top':y - 120,'left':x, 'position':'absolute', 'z-index': '5'});
                        $("#mainpopmodal_RVSP_" + calEvent.id).removeClass('arrow-me-right arrow-me').addClass("arrow-me");
                        $("#mainpopmodal_RVSP_" + calEvent.id).css("display", "block");
                    }
                }
                if (calEvent.flag_modal == "normal") {
                    if (flag_position < 400) {
                        $("#mainpopmodal_normal_" + calEvent.id).css({'top':y - 120,'left':x - 400, 'position':'absolute', 'z-index': '5'});
                        $("#mainpopmodal_normal_" + calEvent.id).removeClass('arrow-me-right arrow-me').addClass("arrow-me-right");
                        $("#mainpopmodal_normal_" + calEvent.id).css("display", "block");
                    } else {
                        $("#mainpopmodal_normal_" + calEvent.id).css({'top':y - 120,'left':x, 'position':'absolute', 'z-index': '5'});
                        $("#mainpopmodal_normal_" + calEvent.id).removeClass('arrow-me-right arrow-me').addClass("arrow-me");
                        $("#mainpopmodal_normal_" + calEvent.id).css("display", "block");
                    }
                }
                if (calEvent.flag_modal == "broker-event") {
                    if (flag_position < 400) {
                        $("#imgmodal_" + calEvent.id).css({'top':y - 120,'left':x - 400, 'position':'absolute', 'z-index': '5'});
                        $("#imgmodal_" + calEvent.id).removeClass('arrow-me-right arrow-me').addClass("arrow-me-right");
                        $("#imgmodal_" + calEvent.id).css("display", "block");
                    } else {
                        $("#imgmodal_" + calEvent.id).css({'top':y - 120,'left':x, 'position':'absolute', 'z-index': '5'});
                        $("#imgmodal_" + calEvent.id).removeClass('arrow-me-right arrow-me').addClass("arrow-me");
                        $("#imgmodal_" + calEvent.id).css("display", "block");
                    }
                }

            },
            events: evs,
        });

        $('#cal-prev').click(function(){
            $(".mainpopmodal").css("display", "none");
            $(".imgmodal").css("display", "none");
            $('#calendar').fullCalendar( 'prev' );
        });
        $('#cal-next').click(function(){
            $(".mainpopmodal").css("display", "none");
            $(".imgmodal").css("display", "none");
            $('#calendar').fullCalendar( 'next' );
        });
        $('#change-view-month').click(function(){
            $(".mainpopmodal").css("display", "none");
            $(".imgmodal").css("display", "none");
            var parent_element = $(this).parent();
            $("li.active").removeClass("active");
            parent_element.addClass("active");
            $('#calendar').fullCalendar('changeView', 'month');
            $('#content .main').fadeOut(0, function() {
                setTimeout( function() {
                    $('#content .main').css({'display':'table'});
                }, 0);
            });
        });
        $('#change-view-week').click(function(){
            $(".mainpopmodal").css("display", "none");
            $(".imgmodal").css("display", "none");
            var parent_element = $(this).parent();
            $("li.active").removeClass("active");
            parent_element.addClass("active");
            $('#calendar').fullCalendar( 'changeView', 'agendaWeek');
            $('#content .main').fadeOut(0, function() {
                setTimeout( function() {
                    $('#content .main').css({'display':'table'});
                }, 0);
            });
        });
        $('#change-view-day').click(function(){
            $(".mainpopmodal").css("display", "none");
            $(".imgmodal").css("display", "none");
            var parent_element = $(this).parent();
            $("li.active").removeClass("active");
            parent_element.addClass("active");
            $('#calendar').fullCalendar( 'changeView','agendaDay');
            $('#content .main').fadeOut(0, function() {
                setTimeout( function() {
                    $('#content .main').css({'display':'table'});
                }, 0);
            });
        });
        $('#change-view-today').click(function(){
            $(".mainpopmodal").css("display", "none");
            $(".imgmodal").css("display", "none");
            var parent_element = $(this).parent();
            $("li.active").removeClass("active");
            parent_element.addClass("active");
            $('#calendar').fullCalendar('changeView', 'month');
        });
    
    }

    render() {

        return (
            <div id="calendar"></div>
        );
    }

}

Calendar.propTypes = {
    events: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);