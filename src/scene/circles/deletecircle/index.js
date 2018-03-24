import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import InputBox from '../../../components/inputbox';

class DeleteCircle extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <span>
         <i className="material-icons" data-toggle="modal" data-target="#Delete">delete</i>
         <div className="modal fade" id="Delete" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="header">
                          <i className="material-icons pull-right" data-dismiss="modal">close</i>
                          <span className="modal-title  font-bold h4" id="defaultModalLabel">Delete Circle</span>
                      </div>
                      <div className="del-confirm"> 
                          <span className="h5">Are you sure want to delete this Circle?</span>
                      </div>
                      <div className="footer">
                          <div className="row">
                              <span className="h5 col-xs-6"></span>
                              <button className="btn btn-warning btn-md btn-raised waves-effect" data-dismiss="modal" onClick={() => { this.props.delete(this.props.circle) }}>Delete</button>
                              <button className="btn btn-default btn-md btn-raised waves-effect" data-dismiss="modal">Cancel</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </span>
    );
  }
}

export default DeleteCircle;