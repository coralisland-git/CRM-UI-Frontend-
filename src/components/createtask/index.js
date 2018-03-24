import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import InputBox from '../inputbox';
import DatePicker from '../datepicker';
import {getTasks, createTasks, deleteTasks, updateTasks, completeTasks, getLeadsByUser} from '../../services/actions/tasks';
import { getLeads, deleteLeads } from '../../services/actions/leads';

import './index.scss';

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: () => { getLeads(dispatch); },
        deleteLeads: (lead_id) => { deleteLeads({id: lead_id}, dispatch); },
        createTasks: (params) => {createTasks(params, dispatch);},
        updateTasks: (params) => {updateTasks(params, dispatch);}
    });
}

const mapStateToProps = (state) => {
    return ({ 
        tasks: state.tasks.tasks,
        leads: state.leads.leads,
        user: state.auth.user,
        users: state.users.users
    });
}


class CreateTask extends React.Component {

  constructor(props){
    super(props);
       this.state = {
            'id': this.props.task.id || -1,
            'title': this.props.task.title || '',
            'description' : this.props.task.description || '',
            'assign_to' : this.props.task.assign_to || 1,
            'due_date' : this.props.task.due_date || '2018-02-10'.anchor,
            'changeVal': true,
            'titleError': false,
            'desError': false,
            'leadId': this.props.task.lead || ''
        };

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEditMenu = this.showEditMenu.bind(this);
  }

  create(data, leadValue) {
    if (this.state.description != "" && this.state.title != "") {
        let _data = Object.assign({}, data);

        let leadId;
        if (!leadValue) {
            leadId = $("#leadId").val();
        } else {
            leadId = leadValue;
        }
        let assignedId = $("#assignedId").val();
        const query = '#modal0' + ' .datepicker';
        let due_date = moment($(query).val()).format('YYYY-MM-DD');
        
        _data['due_date'] = due_date;
        _data['lead'] = leadId;
        _data['assign_to'] = assignedId;

        this.props.createTasks(_data);
        $('.task-modal').modal('hide');
    } else {
        let result = {};

        if (this.state.title == '') {
            result['titleError'] = true;
        } else {
            result['titleError'] = false;
        }

        if (this.state.description == '') {
            result['desError'] = true;
        } else {
            result['desError'] = false;
        }

        this.setState(result);
    }
    
  }

  update(data) {
    if (data.description != "" && data.title != "") {
        let _data = Object.assign({}, data);
        let leadId = this.state.leadId;
        let assignedId = this.state.assign_to;
        const query = '#modal' + data.id + ' .datepicker';
        let due_date = moment($(query).val()).format('YYYY-MM-DD');

        _data['lead'] = leadId;
        _data['assign_to'] = assignedId;
        _data['due_date'] = due_date;
        
        this.props.updateTasks(_data);
        $('.task-modal').modal('hide');
    } else {
        let result = {};

        if (data.title == '') {
            result['titleError'] = true;
        } else {
            result['titleError'] = false;
        }

        if (data.description == '') {
            result['desError'] = true;
        } else {
            result['desError'] = false;
        }

        this.setState(result);
    }
  }
 
  componentDidMount() {
    var self = this;

    $('select').selectpicker();
    $('.dtp-btn-ok').click(function() {
        self.setState({due_date: $('#picker input').val()})    
    })

    let query = '#modal' + this.props.task.id + ' .datepicker';
    $(query).val(moment(this.props.task.due_date).format('MM-DD-YYYY').toString());
    if (this.props.lead){ 
        query = '#modal' + this.props.number + ' .datepicker';
       $(query).val(moment().format('MM-DD-YYYY').toString());
    }
    $('#modal0 .datepicker').val(moment().format('MM-DD-YYYY').toString());

  }

  componentDidUpdate() {
    let selector = "#modal"+ this.props.number + " select";
    $(selector).selectpicker('refresh');
  }

  handleChange(event) {
    this.setState({assign_to: event.target.value});
  }

  showEditMenu(target) {
    this.setState({
        changeVal: !this.state.changeVal, 
        titleEror: false, 
        desError:false, 
        leadId: this.props.task.lead
    })
    $(target).modal('show');
  }
  
  render() {
    let btn;
    let submit_btn;
    let target ;
    let users = this.props.users;
    let members = users ? users : [];
    let renderUsers = [];
    if(this.props.user)
        renderUsers.push(<option key={-1} value={this.props.user.id}>ME</option>)
    renderUsers = renderUsers.concat(members.map((user, key)=>{
        return <option key={key} value={user.id}>{user.first_name + ' ' + user.last_name}</option>
    }));

    target = "#modal" + this.props.number;
    if(this.props.type == "Add"){
      btn = (<button className="btn btn-default btn-xs btn-raised waves-effect pull-right" data-toggle="modal" data-target={target} onClick={() => this.setState({changeVal: !this.state.changeVal, titleEror: false, desError:false, title: '', description: ''})} ><i className="fa fa-plus"></i>CREATE</button>);
      submit_btn = (
        <button className="btn btn-md btn-raised waves-effect search-button" onClick={() => { this.create(this.state) }}>Create</button>
      ); 
    }
    else if ( this.props.type == "Edit"){
      btn = (<i className="fa fa-pencil" onClick={() => this.showEditMenu(target)} ></i>);
      submit_btn = (
        <button className="btn search-button btn-md btn-raised waves-effect search-button" onClick={() => { this.update(this.state) }}>Update</button>
      );
    } else {
        btn = (<button className="btn btn-default btn-xs btn-raised waves-effect pull-right" data-toggle="modal" data-target={target} onClick={() => this.setState({changeVal: !this.state.changeVal, titleEror: false, desError:false, title: '', description: ''})} ><i className="fa fa-plus"></i>{this.props.type}</button>);
        submit_btn = (
          <button className="btn btn-md btn-raised waves-effect search-button" onClick={() => { this.create(this.state, this.props.number) }}>Create</button>
        ); 
    }

    let headingTitle;
    if (this.props.type=="Edit") {
        headingTitle = "UPDATE NEW TASK"
    } else {
        headingTitle = "CREATE NEW TASK"
    }

    let defaultLeadId;

    if (this.props.lead) {
        defaultLeadId = this.props.lead.id;
    } else {
        defaultLeadId = this.state.leadId;
    }
    return (
      <div className="todolist tab-content">
       {btn}
        <div className="modal task-modal fade" id={"modal"+ this.props.number} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="header">
                    <span className="modal-title  font-bold h4" id="createModalLabel">{headingTitle}</span>
                </div>
                <div className="modal-body padding-taskmodal"> 
                    <div className="row control">
                        <span className="h5 font-bold">Task Title</span>
                        <InputBox classVal={this.state.titleError ? 'title-error' : ''} placeholder="" id="titleTask" key='title' value={this.state.title} onChange={(e) => this.setState({'title': e.target.value, 'titleError': false})} />
                    </div>
                    <div className="row control leadId">
                        <span className="h5 font-bold">Lead</span>
                        <select className="form-control" id="leadId" value={defaultLeadId} onChange={(e) => {this.setState({leadId: e.target.value})}}>
                            {
                                this.props.leads.map((lead, key) => {
                                    return(
                                        <option 
                                            key={key} 
                                            value={lead.id} 
                                            >
                                            {lead.first_name + ' ' + lead.last_name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="row control">
                        <span className="h5 font-bold">Description</span>
                        <textarea className={ this.state.desError ? "task-des form-control des-error" : "task-des form-control"}  value={this.state.description} onChange={(e) => this.setState({'description': e.target.value, 'desError': false})} ></textarea>
                    </div>
                    <div className="row sel-part">
                          <div className="col-sm-6 p-r-15 p-l-0">
                              <span className="h5 font-bold">Due Date</span>
                              <DatePicker number={0} value={this.props.task.due_date} />
                          </div>
                          <div className="assign-div col-sm-6 p-l-15 p-r-0">
                              <span className="h5 font-bold">Assigned to</span>
                              <select className="form-control"  id="assignedId" value={this.state.assign_to} onChange={this.handleChange}>
                                {   
                                    renderUsers
                                }
                              </select>
                          </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="row">
                        {submit_btn}
                        <button className="btn btn-default btn-md btn-raised waves-effect" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateTask.propTypes = {
    type: PropTypes.string,
    task: PropTypes.object,
    number: PropTypes.number,
    lead: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);