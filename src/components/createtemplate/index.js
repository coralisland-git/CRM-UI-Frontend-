import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import InputBox from '../inputbox';
import DatePicker from '../datepicker';
import { getTemplates, createTemplates } from '../../services/actions/templates';
import { getCircles } from '../../services/actions/circles';

// import '../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
// import '../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
// import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js';
// import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css';

import './index.scss';

class CreateTemplate extends React.Component {

  constructor(props){
    super(props);
       this.state = {
            name: '',
            goal: '',
            isAddCircle: false,
            isCircle: false,
            isTask: false,
            currentCircles: [],
            currentTasks: [],
            showTasks: [],
            tempAction: '',
            nameError: false,
            goalError: false,
            templates: [],
            isError: false,
            errMessage: ''
        };

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.addCircleData = this.addCircleData.bind(this);
        this.removeCircleData = this.removeCircleData.bind(this);
        this.addCurrentTasks = this.addCurrentTasks.bind(this);
        this.validation = this.validation.bind(this);
  }

  componentWillMount() {
    this.props.getCircles();
    // this.props.getTemplates();
  }

  create(data) {

  }

  update(data) {
    
  }

  addCircleData(e, value) {
    e.preventDefault();
    
    let circle = JSON.parse(value);
    
    if (circle.id && circle.id != '') {
      let currentCircles = Object.assign([], this.state.currentCircles);
      
      let a = currentCircles.filter((task) => {
        return task.id === circle.id
      })
      
      if (a.length == 0)
        currentCircles.push(circle);
      this.setState({ isCircle: true, currentCircles: currentCircles })
    }
      
  }

  removeCircleData(id) {
    let currentCircles = Object.assign([], this.state.currentCircles);
    
    let index = -1;
    currentCircles.forEach((element, key) => {
      if (element.id == id) {
        index = key;
      }
    })

    if (index != -1) {
      currentCircles.splice(index, 1)
    }

    this.setState({ isCircle: true, currentCircles: currentCircles }) 
  }

  addTask() {
    let self = this;
    let currentTasks = Object.assign([], this.state.currentTasks);
    let id = Math.random().toString(36).substring(2, 15);
    let options = [];

    currentTasks.push({delay: 1, action: ''})

    this.setState({ isTask: true, currentTasks: currentTasks })

  }

  addCurrentTasks(e, attr, key) {
    let currentTasks = Object.assign([], this.state.currentTasks);
    currentTasks[key][attr] = e.target.value

    this.setState({ currentTasks: currentTasks, tempAction: e.target.value })
  }

  validation() {
    let error = {}

    if (this.state.name != '') {
      error.nameError = false;

      if (this.state.goal != '') {
        error.goalError = false;
      } else {
        error.goalError = true;
      }
    } else {
      error.nameError = true;
    }
    this.error = error;
    this.setState(error)
  }

  saveTemplate() {
    let {templates, currentCircles, currentTasks} = this.state;
    let data = {};

    this.validation();

    if (this.error.nameError == false && this.error.goalError == false) {
      let circleData = [];
      if (currentCircles.length > 0 && currentTasks.length > 0) {
        currentCircles.map(element => {
          circleData.push(element.id);
        })
        data = {
          name: this.state.name,
          goal: this.state.goal,
          circles: circleData,
          action: JSON.stringify(currentTasks),
          leads: [],
          progress: 0
        };

        templates.push({
          name: this.state.name,
          goal: this.state.goal,
          circles: currentCircles,
          leads: [],
          action: currentTasks
        });

        this.setState({ isError: false, errMessage: '' })
        this.props.createTemplates(data)
        $('#templateModal').modal('hide')
      } else {
        this.setState({ isError: true, errMessage: 'A Circle or Task should be added at least'})
      }
      
    } else {
      this.setState({ isError: true, errMessage: 'Name or Goal can\'t be empty'})
    }
  }
 
  render() {
    let showCircleData = [];
    let getCircleData = [];
    let { currentCircles } = this.state;

    if(this.props.circles) {
        this.props.circles.map((element, key) => {
            getCircleData.push(
                <li key={key}>
                  <Link 
                    to="/" 
                    value={JSON.stringify(element)}
                    onClick={(e) => this.addCircleData(e,JSON.stringify(element))}>{element.name}</Link>
                </li>
            )
        })
    }

    if (currentCircles) {
        currentCircles.map((element, key) => {
            showCircleData.push(
                <span className="circle-item my-border col-sm-4" key={key}>
                    <span className="m-r-10">{element.name}</span>
                    <span><i className="zmdi zmdi-close" onClick={() => this.removeCircleData(element.id) }></i></span>
                </span>
            )
        })
    }

    let showTasks = [];
    let { currentTasks } = this.state;

    currentTasks.map((element, keyVal) => {
      showTasks.push(
          <div className="inline-form" id={'task' + keyVal} key={keyVal}>
              <div className="detail-left color-black form-line" >
                <input
                  placeholder=""
                  type="number"
                  className="form-control font-sm"
                  key={keyVal}
                  value={element['delay']} 
                  onChange={(e) => {this.addCurrentTasks(e, 'delay', keyVal)}} />
              </div>
              <div className="detail-right color-black form-line">
                <input 
                  type="text" 
                  className="form-control font-sm" 
                  value={element.action} 
                  onChange={(e) => {this.addCurrentTasks(e, 'action', keyVal)}} />
              </div>
          </div>
       )
    })

    return (
      <div className="todolist tab-content contactcontents">
        <button 
          className={ 
            this.props.btnClass? 
              "btn btn-raised waves-effect pull-right " + this.props.btnClass 
            : 
              "btn btn-raised waves-effect pull-right"
          } 
          data-toggle="modal" 
          data-target="#templateModal">
            <i className="fa fa-plus"></i>CREATE TEMPLATE
        </button>
        <div className="modal fade" id="templateModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {
                          this.state.isError ?
                            <div className="alert alert-danger">{this.state.errMessage}</div>    
                          :
                            ''
                        }
                        
                        <div className="header">
                            <span className="modal-title  font-bold h4" id="createModalLabel">CREATE NEW TEMPLATE</span>
                        </div>
                        <div className="modal-body"> 
                            <div className="row control">
                                <div className="col-md-6 p-l-0">
                                    <span className="sub__heading font-bold">Name</span>
                                    <InputBox 
                                      placeholder=""
                                      className={this.state.nameError ? 'validation-error' : 'tempalte-input-control'} 
                                      key='templateName' 
                                      value={this.state.name} 
                                      onChange={(e) => this.setState({name: e.target.value, nameError: false})} />
                                </div>
                                <div className="col-md-6 p-r-0">
                                    <span className="sub__heading font-bold">Goal</span>
                                    <InputBox 
                                      placeholder="" 
                                      className={this.state.goalError ? 'validation-error' : 'tempalte-input-control'}
                                      key='templateGoal' 
                                      value={this.state.goal} 
                                      onChange={(e) => this.setState({goal: e.target.value, goalError: false})} />
                                </div>
                            </div>
                            
                                {
                                    this.state.isCircle ? 
                                      <div className="inline-form-group row">
                                         {showCircleData}
                                      </div>
                                    : 
                                        ''
                                }
                            <div className="row control">
                                <div className="sub__heading font-bold">Add Leads to Circle</div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default btn-raised btn-add-lead btn-with-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="fa fa-plus m-r-10"></i>
                                      <span>ADD CIRCLE</span>
                                    </button>
                                    <ul className="dropdown-menu add-circle-menu">
                                        { getCircleData }
                                    </ul>
                                </div>
                            </div>
                            <div className="row border-bottom m-t-55">
                               <div className="h-table sub__heading">Task</div>
                               <div className="my-border">
                                    <div className="inline-form">
                                        <div className="detail-left color-black sub__heading no-m-bottom">Deliver on (Days)</div>
                                        <div className="detail-right color-black sub__heading no-m-bottom">Action</div>
                                    </div>
                                    {
                                      showTasks
                                    }
                               </div>
                               <div>
                                    <button to="#" className="btn btn-default btn-raised btn-add-task btn-with-icon i" onClick={this.addTask.bind(this)}>
                                        <i className="fa fa-plus m-r-10"></i>
                                        <span>Create Task</span>
                                    </button>
                               </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="row">
                                <button 
                                    className="btn btn-raised waves-effect yellow save-btn m-r-10"
                                    onClick={this.saveTemplate.bind(this)}>Save</button>
                                <button className="btn btn-default btn-raised waves-effect" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    );
  }
}

CreateTemplate.propTypes = {
    type: PropTypes.string,
    btnClass: PropTypes.string,
    saveTemplate: PropTypes.func,
    templates: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
    return ({
        getTemplates: () => { getTemplates(dispatch); },
        getCircles: () => { getCircles(dispatch); },
        createTemplates: (template) => { createTemplates(template, dispatch); }
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        circles: state.circles.circles
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplate);