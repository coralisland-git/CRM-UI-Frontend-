import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';


class MainPopModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			deleteEvent: this.props.deleteEvent,
		}
	}


  componentDidMount() {
      
  }

  onclickclose = (e) => {
  	$("#mainpopmodal_" + this.props.flag_modal + "_" + this.props.id).css("display", "none");
  	$("#mainpopmodal_" + this.props.flag_modal + "_" + this.props.id).removeClass("arrow-me");
  	$("#mainpopmodal_" + this.props.flag_modal + "_" + this.props.id).removeClass("arrow-me-right");
  }

  toUtcMoment = (date) => {
    let d = new Date();
    let offset = d.getTimezoneOffset();
    // return moment(date).add(offset, 'minutes');
    return moment(date);
  }

  deleteEvent = (e) => {
  	e.preventDefault();
  	this.state.deleteEvent(this.state.id);
  	$("#mainpopmodal_" + this.props.flag_modal + "_" + this.props.id).css("display", "none");
  	$("#mainpopmodal_" + this.props.flag_modal + "_" + this.props.id).removeClass("arrow-me");
  	$("#mainpopmodal_" + this.props.flag_modal + "_" + this.props.id).removeClass("arrow-me-right");
  }


  content_view = (event, start_string, end_string, location, buttonContent, host_name) => {
	return (
		<div className="row" id="event_modal">
  			<div className="col-sm-5">
  				<div className="form-group">
  					<label>Host</label>
  					<div className="form-line no-bottom-border">
  						{ host_name }
  					</div>
  				</div>
  			</div>
  			<div className="col-sm-7">
  				<div className="form-group">
  					<label>When</label>
  					<div className="form-line no-bottom-border">
  						{ start_string } ~ { end_string }
  					</div>
  				</div>
  			</div>
  			<div className="col-sm-8">
  				<div className="form-group">
  					<label>Location</label>
  					<div className="form-line no-bottom-border">
  						{ location }
  					</div>
  				</div>
  			</div>
  			{ buttonContent }
  		</div>
	);
  	
  }


	render() {

		let buttonContent = [];
		let edit_url = "/events/edit/" + this.props.id;
		let view_url = "/events/view/" + this.props.id;

		if (this.props.flag_modal == "RVSP") {
			buttonContent.push(<div key="RVSP" className="col-sm-12">
	                				<NavLink to={ view_url } type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-primary waves-effect left">&nbsp;&nbsp;&nbsp;VIEW & EDIT&nbsp;&nbsp;&nbsp;</NavLink>&nbsp;&nbsp;&nbsp;
	                				<button type="button" id="btn_delete" className="btn btn-sm btn-raised waves-effect left" onClick={ this.deleteEvent }>&nbsp;&nbsp;&nbsp;Delete&nbsp;&nbsp;&nbsp;</button>
	                			</div>);

		}

		if (this.props.flag_modal == "normal") {
			buttonContent.push(<div key="normal" className="col-sm-12">
	                				<NavLink to={ view_url } type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-primary waves-effect left">&nbsp;&nbsp;VIEW&nbsp;&nbsp;</NavLink>&nbsp;&nbsp;&nbsp;
	                				<NavLink to={ edit_url } type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-success waves-effect left">&nbsp;&nbsp;EDIT&nbsp;&nbsp;</NavLink>&nbsp;&nbsp;&nbsp;
	                				<button type="button" id="btn_delete" className="btn btn-sm btn-raised waves-effect left" onClick={ this.deleteEvent }>&nbsp;&nbsp;&nbsp;Delete&nbsp;&nbsp;&nbsp;</button>
	                			</div>);
		}

		let temp_id = "mainpopmodal_" + this.props.flag_modal + "_" + this.props.id;

		let event = this.props.event || {};
		let start = event.start.dateTime || event.start.date;
		start = this.toUtcMoment(start);
		let start_string = start.format('MM') + "-" + start.format('DD') + "-" +  start.format('YYYY');
		let end = event.end.dateTime || event.end.date;
		end = this.toUtcMoment(end);
		let end_string = end.format('MM') + "-" + end.format('DD') + "-" + end.format('YYYY');
		let location = event.location || "There is no location";

		let host_name = this.props.user.first_name + " " + this.props.user.last_name;
		let content = this.content_view(event, start_string, end_string, location, buttonContent, host_name);

		return (


			<div id={temp_id} className="mainpopmodal card" style={{display: 'none'}}>
				<div className="body">
	          <ul className="list-group">
	          	<li className="list-group-item no-border clearfix green"><label className="margin-top-5 white">{ event.summary || event.title }</label>
	          		<i className="material-icons right white close padding-top-8" onClick={((e) => this.onclickclose(e))}>close</i>
	          	</li>
	          	<li className="list-group-item no-border clearfix">
	          		{ content }
	          	</li>
	          </ul>
	        </div>
	    </div>
		);
	}

}

MainPopModal.propTypes = {
	flag_modal: PropTypes.string,
	id: PropTypes.string,
	deleteEvent: PropTypes.func,
}

export default MainPopModal;