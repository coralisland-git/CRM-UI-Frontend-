import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';


class CheckBox extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    let mark = "basic" + this.props.param;
    return (
      <span>
        <input type="checkbox" id={mark} className={this.props.className} onChange={this.props.onChange} onClick={this.props.onClick} checked={this.props.checked}/>
        <label htmlFor={mark}>
        </label>
      </span>
    );
  }
}

export default CheckBox;