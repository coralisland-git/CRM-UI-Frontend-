import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { saveColor } from '../../services/actions/events';

import ColorPicker from '../colorpicker';
import './styles.scss';

const mapDispatchToProps = (dispatch) => {
    return ({
        saveColor: (selected_color) => { saveColor(selected_color, dispatch) }
    });
}

const mapStateToProps = (state) => {
    return ({ 
        i_color_array: state.events.i_color_array,
    });
}


class AddColorModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			color: "#ffffff",
		}
	}

	onclickclose = (e) => {
		e.preventDefault();
  	$("#addcolormodal").css("display", "none");
  }

  onchangeColor = (color_str) => {
  	this.setState({color: color_str});
  }

  onSubmit = (e) => {
  	if (this.state.color != "#ffffff") {
  		this.props.saveColor(this.state.color);
	  	$("#addcolormodal").css("display", "none");
  	}
  }


	render() {

		return (
			<div id="addcolormodal" className="card" style={{ display: 'none' }}>
				<div className="body">
	          <ul className="list-group">
	          	<li className="list-group-item no-border clearfix bg-light-blue"><label className="margin-top-5 white">Add New Color</label>
	          		<i className="material-icons right white close padding-top-8" onClick={this.onclickclose}>close</i>
	          	</li>
	          	<li className="list-group-item no-border clearfix">
	          		<div className="form-group m-t-0">
	          			<div className="form-line">
	          				<ColorPicker id={"addcolor"} inputClass={"form-control"} onChanged={ this.onchangeColor } />
	          			</div>
	          		</div>
	          		<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect right" onClick={ this.onSubmit }>ADD COLOR</button>
	          	</li>
	          </ul>
	        </div>
	    </div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(AddColorModal);
