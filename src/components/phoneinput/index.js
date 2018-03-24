import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import './index.scss';


class PhoneInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        className:'input form-line form-group',
        type: this.props.type || 'text'
    }
  }

  render() {
    let className = this.props.className + " " + this.state.className;
    return (
        <div className={className}>
          <div className="form-line">
           <NumberFormat format="+1 (###) ###-####" 
                mask="_" className="form-control"
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange}
              id={this.props.id}
              disabled={this.props.disabled}
            />
          </div>
        </div>
    );
  }
}

PhoneInput.propTypes = {
  type: PropTypes.string,
  className : PropTypes.string
};

export default PhoneInput;