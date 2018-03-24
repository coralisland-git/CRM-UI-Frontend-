import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { changeCalendarStatus, changeCalendarColor, refreshMessage } from '../../services/actions/events';

import CircleModal from './circlemodal';
import { confirmAlert } from '../confirmdialog';

import './styles.scss';
import rect_add from '../../styles/assets/images/rect_add.png';

const mapDispatchToProps = (dispatch) => {
    return ({
        changeCalendarStatus: (calendarid, calendar, str) => { changeCalendarStatus(calendarid, calendar, str, dispatch) },
        changeCalendarColor: (newColor, calendar, all_events) => { changeCalendarColor(newColor, calendar, all_events, dispatch) },
        refreshMessage: () => { refreshMessage(dispatch) },
    });
}

const mapStateToProps = (state) => {
    
    return ({
    	message: state.events.message,
    	calendars: state.events.calendars,
    	selected_calendars: state.events.selected_calendars,
    	all_events: state.events.all_events,
    	i_color_array: state.events.i_color_array,
    });
}


class ListModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			calendar: this.props.calendar || {},
			i_color_array: this.props.i_color_array || [],
			calendars: this.props.calendars || [],
			selected_calendars: this.props.selected_calendars || [],
			all_events: this.props.all_events || [],
			user: this.props.user || {},
		}
	}

	componentWillReceiveProps(newProps) {
		this.props = newProps;
		this.setState({calendars: newProps.calendars || []});
		this.setState({selected_calendars: newProps.selected_calendars || []});
		this.setState({all_events: newProps.all_events || []});
		this.setState({i_color_array: newProps.i_color_array || []});
		if (newProps.message == "share_circle_ok") {
			confirmAlert({
		        template: "success",
		        message: "This calendar shared with circles."
	      	});
	      	newProps.refreshMessage();
		}
		if (newProps.message == "share_circle_error") {
			confirmAlert({
		        template: "danger",
		        message: "This calendar didn't share with circles because of server error."
	      	});
	      	newProps.refreshMessage();
		}
	}

	changeStatus = (e, str) => {
		e.preventDefault();
		$("#item_burger_1_" + this.state.calendar.id.replace(/[^\w\s]/gi, '')).removeClass("bg-light-blue");
		$("#item_burger_2_" + this.state.calendar.id.replace(/[^\w\s]/gi, '')).removeClass("bg-light-blue");
		$("#item_burger_3_" + this.state.calendar.id.replace(/[^\w\s]/gi, '')).removeClass("bg-light-blue");
		if (str == "Display only this calendar") {
			$("#item_burger_1_" + this.state.calendar.id.replace(/[^\w\s]/gi, '')).addClass("bg-light-blue");
			$("#item_burger_1_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").addClass("white");
			$("#item_burger_2_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").removeClass("white");
			$("#item_burger_3_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").removeClass("white");
		}
		if (str == "Hide this calendar from the list") {
			$("#item_burger_2_" + this.state.calendar.id.replace(/[^\w\s]/gi, '')).addClass("bg-light-blue");
			$("#item_burger_2_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").addClass("white");
			$("#item_burger_1_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").removeClass("white");
			$("#item_burger_3_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").removeClass("white");
		}
		if (str == "Display all calendars") {
			$("#item_burger_3_" + this.state.calendar.id.replace(/[^\w\s]/gi, '')).addClass("bg-light-blue");
			$("#item_burger_3_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").addClass("white");
			$("#item_burger_1_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").removeClass("white");
			$("#item_burger_2_" + this.state.calendar.id.replace(/[^\w\s]/gi, '') + " > label").removeClass("white");
		}

		this.props.changeCalendarStatus(this.state.calendar.id, this.state.calendar, str);
		
	}

	addColor = (e) => {
		var x = e.pageX - $('#side_bar_cal').offset().left;
        var y = e.pageY - $('#side_bar_cal').offset().top;
        $("#addcolormodal").css({'top':y,'left':x, 'position':'absolute', 'z-index': '5'});
        $("#addcolormodal").css("display", "block");
	}

	selectColor = (e, item) => {
		let temp = this.state.calendars.filter((cal) => {
			return cal.id == this.state.calendar.id;
		});
		if (temp.length == 0) {
			this.props.changeCalendarColor(item, this.state.calendar, this.state.all_events);
		} else {
			this.props.changeCalendarColor(item, this.state.calendar, this.state.all_events);
		}
		let idval = "burger_modal_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');
		$("#" + idval).css("display", "none");
	}

    list_view = (items) => {
    	let idval = "colorpicker_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');

		return (

			<li key="popup_list" className="list-group-item no-border clearfix">
	    		<label className="margin-top-5">Choose Calendar Colour</label><br/>
	    		<div className="col-sm-12 mine-col">
		    		{ items }
		    		<div className="col-sm-2 mine-col"><label className="material-icons" style={{ fontSize: "22px", top: "-1px", left: "-2px", position: "absolute", cursor: "pointer" }} onClick={this.addColor}>add_circle_outline</label></div>
	    		</div>
	    	</li>

		);
	}

	render() {

		let list_content = [];
		let icon_content = [];
		let icon_list = [];

		if (this.props.flag_listmodal == "burger") {
			let idval1 = "item_burger_1_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');
			let idval2 = "item_burger_2_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');
			let idval3 = "item_burger_3_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');
			let idval4 = "item_burger_4_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');
			let idval5 = "item_burger_5_" + this.state.calendar.id.replace(/[^\w\s]/gi, '');
			if (this.state.calendar.status == "Display only this calendar") {
				list_content.push(<li key={ idval1 } id={ idval1 } className="item-burger list-group-item no-border clearfix bg-light-blue"  onClick={(e) => {this.changeStatus(e, "Display only this calendar")} }><label className="margin-top-5 white">Display only this calendar</label></li>);
			} else {
				list_content.push(<li key={ idval1 } id={ idval1 } className="item-burger list-group-item no-border clearfix " onClick={(e) => {this.changeStatus(e, "Display only this calendar")} }><label className="margin-top-5 ">Display only this calendar</label></li>);
			}
			if (this.state.calendar.status == "Hide this calendar from the list") {
				list_content.push(<li key={ idval2 } id={ idval2 } className="item-burger list-group-item no-border clearfix bg-light-blue" onClick={(e) => {this.changeStatus(e, "Hide this calendar from the list")} }><label className="margin-top-5 white">Hide this calendar from the list</label></li>);
			} else {
				list_content.push(<li key={ idval2 } id={ idval2 } className="item-burger list-group-item no-border clearfix " onClick={(e) => {this.changeStatus(e, "Hide this calendar from the list")} }><label className="margin-top-5 ">Hide this calendar from the list</label></li>);
			}
			if (this.state.calendar.status == "Display all calendars") {
				list_content.push(<li key={ idval3 } id={ idval3 } className="item-burger list-group-item no-border clearfix bg-light-blue" onClick={(e) => {this.changeStatus(e, "Display all calendars")} }><label className="margin-top-5 white">Display all calendars</label></li>);
			} else {
				list_content.push(<li key={ idval3 } id={ idval3 } className="item-burger list-group-item no-border clearfix " onClick={(e) => {this.changeStatus(e, "Display all calendars")} }><label className="margin-top-5 ">Display all calendars</label></li>);
			}
			

			list_content.push(<li key={ idval4 } id={ idval4 } className="item-burger list-group-item no-border clearfix "><label className="margin-top-5 "><NavLink to="/settings/calendar">Calendar Settings</NavLink></label></li>);

			if (this.state.user && this.state.user.role == "broker") {
				list_content.push(<CircleModal key={ idval5 } id={ idval5 } calendar={ this.state.calendar } />);
			}

			this.state.i_color_array.forEach((item, key) => {
				let style = {
					"backgroundColor": item,
				};
				icon_list.push(<div key={key+"_"+item} className="col-sm-2 mine-col"><label className="i_calendar" style={style} onClick={(e) => {this.selectColor(e, item)}}>&nbsp;</label></div>);
			});

			list_content.push(this.list_view(icon_list));

		}

		if (this.props.flag_listmodal == "popup") {
			let evs = this.props.arrs || [];
			if (evs.length > 0) {
				evs.forEach((item, key) => {
					let style_li = {
						"backgroundColor": item.color,
					}
					let url = "/events/edit/" + item.id;
					let key_val = item.id+"_"+key;
					list_content.push(<li key={ key_val } id="item-popup" className="list-group-item no-border clearfix"><label className="bar" style={style_li}>&nbsp;</label>&nbsp;&nbsp;<label className="popup-text">{ item.summary }</label></li>);
				});
			}
		}

		return (

			<div id="listmodal" className="card">
				<div className="body">
	                <ul className="list-group">
	                	<li className="list-group-item no-border clearfix">
	                	</li>
	                	{ list_content }
	                </ul>
                </div>
            </div>
		);
	}

}

ListModal.propTypes = {
	flag_listmodal: PropTypes.string,
	caelendar: PropTypes.object,
}


export default connect(mapStateToProps, mapDispatchToProps)(ListModal);
