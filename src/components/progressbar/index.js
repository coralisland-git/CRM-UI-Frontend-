import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class ProgressBar extends React.Component {

	// @params: 
    // value: status of progressbar
    // classVal: class

	render() {
		let val = this.props.val;

		return (
			<div className="progress">
				<div 
					className={ !this.props.classVal ? "progress-bar" : "progress-bar " + this.props.classVal } 
					role="progressbar" 
					aria-valuenow={val} 
					aria-valuemin="0" 
					aria-valuemax="100" 
					style={{width: val +'%'}}></div>
            </div>
		);
	}

}

ProgressBar.propTypes = {
    val: PropTypes.number.isRequired,
    classVal: PropTypes.string
}


export default ProgressBar;