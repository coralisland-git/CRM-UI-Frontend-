import React from 'react';

import './style.scss';

class CustomSwitch extends React.Component {
  componentDidMount() {

  }

  handleClick(ev) {
    $(ev.target).toggleClass('activate');
    this.props.onChange(ev);
  }

  render() {
    let value = this.props.value;
    return (
      <div className={'custom-switch-container ' + (value ? 'activate' : '')} onClick={this.handleClick.bind(this)}>
        <div className='slider-locked text-center'>
          <i className="fa fa-lock" > </i>
        </div>
      </div> 
    );
  }
}

export default CustomSwitch;