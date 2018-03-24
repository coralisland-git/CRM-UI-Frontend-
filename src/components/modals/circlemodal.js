import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { shareCircle } from '../../services/actions/events';
import '../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import './styles.scss';


const mapDispatchToProps = (dispatch) => {
	return ({
		shareCircle: (calendarid, circleid) => { shareCircle(calendarid, circleid, dispatch) },
		refreshMessage: () => { refreshMessage(dispatch) },
	});
}

const mapStateToProps = (state) => {
	return ({
		user: state.auth.user,
		circles: state.events.circles,
	});
}

class CircleModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			circle_id: "",
			circles: this.props.circles || [],
			key: this.props.key || "my_cirlce",
			id: this.props.id || "my_cirlce",
			calendar: this.props.calendar || {},
		}
		
	}

	componentDidMount () {
		$(".myselect").selectpicker();
	}

	componentWillReceiveProps (newProps, newState) {
		this.props = newProps;
		this.setState({circles: newProps.circles || []});
	}

	componentDidUpdate () {
	  $(".myselect").selectpicker("refresh");
	}

	onclickclose = (e) => {
		let id = this.state.id;
		$("#circlemodal_" + id).css("display", "none");
	}

	onchangeSelect = (e) => {
		e.preventDefault();
		if (e.target.value != "-- Please select --") {
			let id = this.state.id;
			$("#circlemodal_" + id).css("display", "none");
			this.props.shareCircle(this.state.calendar.id, e.target.value);
		}
	}

	showModal = (e) => {
		e.preventDefault();
		let id = this.state.id;
		var x = e.pageX - $('#' + id).offset().left;
        var y = e.pageY - $('#' + id).offset().top;
        $("#circlemodal_" + id).css({'top':y,'left':x, 'position':'absolute', 'z-index': '5'});
        $("#circlemodal_" + id).css("display", "block");
	}


	render() {

		let circles = [];
		let listContent = [];
		circles = this.state.circles || [];
		if (circles.length > 0) {
			circles.map((circle, key)=> {
          listContent.push(<option key={key + circle.id} value={circle.id}>{ circle.name }</option>); 
    	});
		}

		let key = this.state.key;
		let id = this.state.id;
		
		return (

			<li key={ key } id={ id } className="item-burger list-group-item no-border clearfix">
				<label className="margin-top-5" onClick={ this.showModal }>Share calendar to circle</label>
				<div id={"circlemodal_" + id} className="card" style={{ display: 'none' }}>
					<div className="body">
		                <ul className="list-group">
		                	<li className="list-group-item no-border clearfix bg-light-blue"><label className="margin-top-5 white">Select a Circle</label>
		                		<i className="material-icons right white close padding-top-8" onClick={((e) => this.onclickclose(e))}>close</i>
		                	</li>
		                	<li id="googlecalendarlist" className="list-group-item no-border clearfix googlecalendar">
		                		<select className="myselect col-sm-12" onChange={this.onchangeSelect}>
		                			<option>-- Please select --</option>
	                        		{ listContent }
	                      </select>
		                	</li>
		                </ul>
	                </div>
	            </div>
			</li>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CircleModal);

