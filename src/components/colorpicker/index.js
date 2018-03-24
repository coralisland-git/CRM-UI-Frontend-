import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css';
import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js';

import './style.scss';


class ColorPicker extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            inputClass: this.props.inputClass || "",
            labelClass: this.props.labelClass || "margin-top-5 white",
            labelValue: this.props.labelValue || "Choose a Color",
            firstparentClass: this.props.firstparentClass || "col-sm-12 no-padding",
            secondparentClass: this.props.secondparentClass || "col-sm-2 no-padding",
            picker_id: this.props.id || "",
            onchanged: this.props.onChanged,
            value: this.props.value || "#B63D23",
        }
    }

    onclickclose = (e) => {
        e.preventDefault();
        $("#pickerme_" + this.state.picker_id).css("display", "none");
    }

    showSelectModal = (e) => {
        e.preventDefault();
        var x = e.pageX - $('#colorpickercomponent_' + this.state.picker_id).offset().left;
        var y = e.pageY - $('#colorpickercomponent_' + this.state.picker_id).offset().top;
        $("#pickerme_" + this.state.picker_id).css({'top':y,'left':x, 'position':'absolute', 'z-index': '10'});
        $("#pickerme_" + this.state.picker_id).css("display", "block");
    }

    onChanged = (e, val) => {
        e.preventDefault();
        this.setState({value: val});
        this.state.onchanged(val);
        $("#pickerme_" + this.state.picker_id).css("display", "none");
    }


	render() {

        if (!this.state) {
            return (<div>loading...</div>);
        }

        let picker_id = "pickerme_" + this.state.picker_id;
        let modal_id = "colorpickercomponent_" + this.state.picker_id;

		return (
            <div id={ modal_id } className="colorpickercomponent">
                <label className="i_color_lg" onClick={this.showSelectModal} style={{ backgroundColor: this.state.value, color: "transparent" }}>&nbsp;</label>
                <div id={ picker_id } className="card" style={{ display: 'none', width: "300px" }}>
                    <div className="body">
                        <ul className="list-group">
                            <li className="list-group-item clearfix no-border bg-light-blue">
                                <label className={ this.state.labelClass }>{ this.state.labelValue }</label>
                                <i className="material-icons right white close padding-top-8" onClick={this.onclickclose}>close</i>
                            </li>
                            <li className="list-group-item no-border clearfix">
                                <div className={ this.state.firstparentClass }>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#B63D23" }} onClick={(e) => {this.onChanged(e, "#B63D23")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#C9DA1F" }} onClick={(e) => {this.onChanged(e, "#C9DA1F")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#66DA1F" }} onClick={(e) => {this.onChanged(e, "#66DA1F")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#1FDA8D" }} onClick={(e) => {this.onChanged(e, "#1FDA8D")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#1FDAC3" }} onClick={(e) => {this.onChanged(e, "#1FDAC3")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#1F9FDA" }} onClick={(e) => {this.onChanged(e, "#1F9FDA")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#1F28DA" }} onClick={(e) => {this.onChanged(e, "#1F28DA")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#601FDA" }} onClick={(e) => {this.onChanged(e, "#601FDA")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#AA1FDA" }} onClick={(e) => {this.onChanged(e, "#AA1FDA")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#DA1FCF" }} onClick={(e) => {this.onChanged(e, "#DA1FCF")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#209c60" }} onClick={(e) => {this.onChanged(e, "#209c60")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#3322e7" }} onClick={(e) => {this.onChanged(e, "#3322e7")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#231e59" }} onClick={(e) => {this.onChanged(e, "#231e59")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#d42bdc" }} onClick={(e) => {this.onChanged(e, "#d42bdc")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#1cebe1" }} onClick={(e) => {this.onChanged(e, "#1cebe1")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#7b7c12" }} onClick={(e) => {this.onChanged(e, "#7b7c12")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#8f901a" }} onClick={(e) => {this.onChanged(e, "#8f901a")}}>&nbsp;</label></div>
                                    <div className={ this.state.secondparentClass }><label className="i_color" style={{ backgroundColor: "#b7b84a" }} onClick={(e) => {this.onChanged(e, "#b7b84a")}}>&nbsp;</label></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>          
            </div>
		);
	}

}

ColorPicker.propTypes = {
    labelClass: PropTypes.string,
    labelValue: PropTypes.string,
    firstparentClass: PropTypes.string,
    secondparentClass: PropTypes.string,
    onChanged: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default ColorPicker;