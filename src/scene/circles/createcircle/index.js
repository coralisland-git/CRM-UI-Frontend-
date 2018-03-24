import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import InputBox from '../../../components/inputbox';
// import '../../../styles/assets/plugins/colorpicker/css/colorpicker.css';
import '../../../styles/assets/plugins/colorpicker/js/colorpicker.js';
import ColorPicker from '../../../components/colorpicker';
import './index.scss';

const mapDispatchToProps = (dispatch) => {
    return ({
      // getCircles: getCircles(dispatch)
    });
}

const mapStateToProps = (state) => {
    return ({ 
        circles: state.circles.circles
    });
}

class CreateCircle extends React.Component {


  constructor(props){
    super(props);
       this.state = {
          name : this.props.circle.name || '',
          color : this.props.circle.color || '#bff216',
          goal : this.props.circle.goal || '',
          reminder_day : this.props.circle.reminder_day || '',
          id : this.props.circle.id || '',
          created_by : this.props.circle.created_by || ''
      }
  }

  componenwillRecieveProps(newProps) {
  }

  componentDidMount() {
  }

  onchangeColor = (color_str) => {
    this.setState({color: color_str});
  }
      
  render() {
    let btn;
    let submit_btn;
    let target ;
    target = "#modal" + this.props.number;
    if(this.props.type == "Add"){
      btn = (<button className="btn btn-default btn-md btn-raised waves-effect pull-right" data-toggle="modal" data-target={target} >CREATE A CIRCLE</button>);
      submit_btn = (
        <button className="btn btn-md btn-raised waves-effect create_bt" data-dismiss="modal" onClick={() => { this.props.create(this.state); this.setState({name : '',
                goal : '', color : '', reminder_day : '', created_by : this.state.created_by}) }}>Save</button>
      ); 
    }
    else if ( this.props.type == "Edit"){
      btn = (<i className="fa fa-pencil" data-toggle="modal" data-target={target} ></i>);
      submit_btn = (
        <button className="btn btn-md btn-raised waves-effect create_bt" data-dismiss="modal" onClick={() => { this.props.update(this.state) }}>Update</button>
      );
    }
    return (
      <span className="addModal">
          { btn }
         <div className="modal fade" id={"modal"+ this.props.number} key={"modal"+ this.props.number} tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                  <div className="modal-content add-circle">
                      <div className="header">
                          <i className="material-icons pull-right" data-dismiss="modal">close</i>
                          <span className="modal-title  font-bold h4" id="createModalLabel">{this.props.type} Circle</span>
                      </div>
                      <div className="modal-body content"> 
                          <div className="row modal_control">
                              <span className="h5 col-xs-2">Name</span>
                              <span className="col-xs-10"><InputBox className="form-group-lg" placeholder="Vannessa" key='name' value={this.state.name} onChange={(e) => this.setState({'name': e.target.value})} /></span>
                          </div>
                          <div className="row modal_control">
                              <span className="h5 col-xs-2">Color:</span>
                              <span className="col-xs-10">
                               <div className="form-line form-group form-group-lg" id="inputbox">
                                <div className="form-line">
                                    <ColorPicker id={"circlecolor"+this.state.id} value={this.state.color} inputClass=  {"form-control"} onChanged={ this.onchangeColor } />
                                  </div>
                               </div>
                              </span>
                          </div>
                          <div className="row modal_control">
                              <span className="h5 col-xs-2">Goal:</span>
                              <span className="col-xs-10"><InputBox className="form-group-lg" placeholder="Please add a description of this circle's desired goal" value={this.state.goal} onChange={(e) => this.setState({'goal': e.target.value})}/></span>
                          </div>
                          <div className="row modal_control">
                              <span className="h5 col-xs-2">Reminder (Days)</span>
                              <span className="col-xs-10">
                                <InputBox type="number" className="form-group-lg" placeholder="0" value={this.state.reminder_day.toString()} onChange={(e) => this.setState({'reminder_day': e.target.value })}/>
                                <span>Agent Cloud automatically reminds you to follow up with contacts in this circle after the amount of day's you've posted.</span>
                              </span>
                          </div>
                      </div>
                      <div className="footer">
                          <div className="row">
                              <span className="h5 col-xs-3"></span>
                              { submit_btn }
                              <button className="btn btn-default btn-md btn-raised waves-effect cancel_bt" data-dismiss="modal">Cancel</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </span>
    );
  }
}

CreateCircle.propTypes = {
    type: PropTypes.string,
};

export default CreateCircle;