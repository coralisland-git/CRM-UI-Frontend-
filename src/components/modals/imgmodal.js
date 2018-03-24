import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';
import profile from '../../styles/assets/images/noimage.jpg';


class ImgModal extends React.Component {

	constructor(props) {
		super(props);
	}


  componentDidMount() {
      
  }

  onclickclose = (e) => {
  	$("#imgmodal_" + this.props.id).css("display", "none");
  }

  toUtcMoment = (date) => {
    let d = new Date();
    let offset = d.getTimezoneOffset();
    // return moment(date).add(offset, 'minutes');
    return moment(date);
  }

	render() {

		let idname = "imgmodal_" + this.props.id;
		let view_url = "/events/view/" + this.props.id;
		let event = this.props.event;

		let start = event.start.dateTime || event.start.date;
		start = this.toUtcMoment(start);
		let start_string = start.format('MM') + "-" + start.format('DD') + "-" + start.format('YYYY');
		let end = event.end.dateTime || event.end.date;
		end = this.toUtcMoment(end);
		let end_string = end.format('MM') + "-" + end.format('DD') + "-" + end.format('YYYY');
		let location = event.location || "There is no location";

		return (
			<div id={ idname } className="imgmodal card arrow-me" style={{display: 'none'}}>
				<div className="body">
	                <ul className="list-group">
	                	<li className="list-group-item no-border clearfix green"><label className="margin-top-5 white">{ event.summary }</label>
	                		<i className="material-icons right white close padding-top-8" onClick={((e) => this.onclickclose(e))}>close</i>
	                	</li>
	                	<li className="list-group-item no-border clearfix">
	                		<div className="row content">
	                			<div className="col-sm-4">
	                				<img className="col-sm-12 no-padding" src={event.image || profile} />
	                			</div>
	                			<div className="col-sm-8 img-profile">
	                				<div className="col-sm-12 no-padding">
		                				<div className="form-group">
		                					<label>Host</label>
		                					<div className="form-line no-bottom-border">
		                						{ event.host_name }
		                					</div>
		                				</div>
		                			</div>
		                			<div className="col-sm-12 no-padding">
		                				<div className="form-group">
		                					<label>When</label>
		                					<div className="form-line no-bottom-border">
		                						{ start_string } ~ { end_string }
		                					</div>
		                				</div>
		                			</div>
		                			<div className="col-sm-12 no-padding">
		                				<div className="form-group">
		                					<label>Location</label>
		                					<div className="form-line no-bottom-border">
		                						{ location }
		                					</div>
		                				</div>
		                			</div>
	                			</div>
	                		</div>
	                		<div className="row">
		                		<div className="col-sm-12">
		                			<div className="col-sm-4 first">
		                				<NavLink to={view_url} id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect col-sm-12">&nbsp;VIEW&nbsp;</NavLink>
		                			</div>
		                			<div className="col-sm-4">
		                				<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect col-sm-12">&nbsp;RSVP&nbsp;</button>
		                			</div>
		                			<div className="col-sm-4 last">
		                				<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect col-sm-12">&nbsp;DECLINE&nbsp;</button>
		                			</div>
		                		</div>
	                		</div>
	                	</li>
	                </ul>
                </div>
            </div>
		);
	}

}

ImgModal.propTypes = {
	id: PropTypes.string
}

export default ImgModal;