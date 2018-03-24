import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css';
import '../../styles/assets/plugins/waitme/waitMe.css';
import '../../styles/assets/plugins/sweetalert/sweetalert.css';
import '../../styles/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js';
import '../../styles/assets/plugins/jquery-validation/jquery.validate.js';
import '../../styles/assets/plugins/jquery-steps/jquery.steps.js';
import '../../styles/assets/plugins/sweetalert/sweetalert.min.js';


class TimePicker extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            validationMessage: this.props.validationMessage || 'This field is required',
            type: this.props.type || 'text',
            placeholder: this.props.placeholder || '16: 40'
        }

        this.onChanged = this.onChanged.bind(this);
    }

    componentDidMount () {

        // initializing the time picker
        $('.timepicker').bootstrapMaterialDatePicker({
            format: 'HH:mm',
            clearButton: true,
            date: false
        });

        // validation the date picker
        $('#timepicker').validate({
            rules: {
                'time': {
                    required: true
                }
            },
            highlight: function (input) {
                $(input).parents('.form-line').addClass('error');
            },
            unhighlight: function (input) {
                $(input).parents('.form-line').removeClass('error');
            },
            errorPlacement: function (error, element) {
                $(element).parents('.form-group').append(error);
            }
        });

    }

    componentDidUpdate(state, props) {
        console.log("+++++++++++ componentDidUpdate +++++++++", this.state);
        if (this.state.value == '' || this.state.value == undefined) {
            this.state.isValidated = false;
        } else {
            this.state.isValidated = true;
        }
    }

    error_view = (mess, key) => {
        return (
            <label key={key} className="text-danger">{ mess }</label>
        );
    }

    onChanged (e) {
        e.preventDefault();
        console.log("++++++++ changed date picker +++++++++++");
        this.setState({value: e.target.value});
        if (this.state.value == '') {
            this.setState({isValidated: false});
        } else {
            this.setState({isValidated: true});
        }
    }

	render() {

        console.log("++++++++++++ status validation ++++++++++++", this.state.isValidated)

        let error_message = [];
        let validation = this.state.validationMessage;

        if (this.state.isValidated == false) {
            error_message.push(this.error_view(validation, "4"));
        } else {
            error_message.push(<label></label>);
        }

		return (
			<div id="timepicker" className="col-sm-12">
                <div id="picker" className="form-group">
                    <div className="form-line">
                        <input type={this.state.type} className="timepicker form-control" placeholder={this.state.placeholder} onChange={this.onChanged} data-dtp="dtp_odjSj" />
                    </div>
                </div>
                { error_message }
            </div>
		);
	}

}


TimePicker.propTypes = {
  value: PropTypes.string,
  isvalidated: PropTypes.bool,
  validationMessage: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default TimePicker;