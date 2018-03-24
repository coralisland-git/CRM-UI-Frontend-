import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';

import '../../styles/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css';
import '../../styles/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js';


class DatePicker extends React.Component {

    constructor(props){
        super(props);

        let today = new Date();
        let date_string = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
        this.state = {
            validationMessage: this.props.validationMessage || 'This field is required',
            placeholder: this.props.placeholder || date_string,
            value: this.props.value || date_string,
            firstparentClass: this.props.firstparentClass || "col-sm-12",
            secondparentClass: this.props.secondparentClass || "form-group",
             thirdparentClass: this.props.thirdparentClass || "form-line",
            selfClass: this.props.selfClass || "",
            onChange: this.props.onChange,
        }

    }


    componentDidMount() {
        
        $('.datepicker').bootstrapMaterialDatePicker({
            format: 'MM-DD-YYYY',
            weekStart: 1,
            time: false
        });
    
    }


	render() {

        let error_message = [];
        let validation = this.state.validationMessage;

        if (this.state.isValidated == false) {
            error_message.push(this.error_view(validation, "4"));
        } else {
            error_message.push(<label></label>);
        }

        let selfclass = "datepicker " + this.state.selfClass;

		return (
			<div id="datepicker" className={ this.state.firstparentClass }>
                <div id="picker" className={ this.state.secondparentClass }>
                    <div className={ this.state.thirdparentClass }>
                        <input type="text" className={ selfclass } placeholder={this.state.placeholder} onChange={this.state.onChange} data-dtp="dtp_iR8Yp" />
                        <i className="fa fa-calendar calendar-icon"></i>
                    </div>
                </div>
            </div>
		);
	}

}


DatePicker.propTypes = {
  validationMessage: PropTypes.string,
  firstparentClass: PropTypes.string,
  secondparentClass: PropTypes.string,
  thirdparentClass: PropTypes.string,
  selfclass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};


export default DatePicker;