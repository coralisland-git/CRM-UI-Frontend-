import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/assets/plugins/sweetalert/sweetalert-dev.js';
import '../../styles/assets/plugins/sweetalert/sweetalert.min.js';
import '../../styles/assets/plugins/sweetalert/sweetalert.css';


class ConfirmBox extends React.Component {

  constructor(props){
    super(props);
      this.state = {
          value : this.props.value || 'Click Me',
          headerText : this.props.headerText || 'title',
          contentText : this.props.contentText || 'content',
          OkButtonText : this.props.OkButtonText || 'Ok',
          NoButtonText : this.props.NoButtonText || 'Cancel'
      }

    this.showDialog = this.showDialog.bind(this)

  }

   showDialog() {
      var header = this.state.headerText;
      var content = this.state.contentText;
      var okbt = this.state.OkButtonText;
      var cancelbt = this.state.NoButtonText;

      $('#js-sweetalert').on('click', function () {
          swal({
              title: header,
              text: content,
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: okbt,
              closeOnConfirm: false
          });
      });
    }

  render() {
    return (
       <button id="js-sweetalert" className="btn btn-raised btn-primary waves-effect" data-type="confirm" onClick={this.showDialog}>{this.state.value}
       </button>
    );
  }
}

ConfirmBox.propTypes = {
    value : PropTypes.string,
    headerText: PropTypes.string,
    contentText: PropTypes.string,
    OkButtonText: PropTypes.string,
    NoButtonText: PropTypes.string,
};

export default ConfirmBox;