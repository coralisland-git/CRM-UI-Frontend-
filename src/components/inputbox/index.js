import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


class InputBox extends React.Component {

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
            <input className="form-control"
              type={this.props.type}
              placeholder={this.props.placeholder}
              value={this.props.value}
              onChange={this.props.onChange}
              id={this.props.id}
              disabled={this.props.disabled}
              onFocus={ this.props.onfocus }
           />
          </div>
        </div>
    );
  }
}

InputBox.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className : PropTypes.string
};

export default InputBox;