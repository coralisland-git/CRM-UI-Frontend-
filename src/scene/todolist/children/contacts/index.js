import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import InputBox from '../../../../components/inputbox';
import DatePicker from '../../../../components/datepicker';
import {connect} from 'react-redux';
import './style.scss';
import avatar from '../../../../styles/assets/images/avatar.jpg';
import CreateTask from '../../../../components/createtask';
import SelectBox from '../../../../components/selectbox';
import {getTasks, createTasks, deleteTasks, updateTasks, completeTasks, getLeadsByUser} from '../../../../services/actions/tasks';
import { getLeads, deleteLeads } from './../../../../services/actions/leads';
import { getCircles } from './../../../../services/actions/circles';
import CreateTemplate from '../../../../components/createtemplate';
import ApplyTemplate from '../../../../components/applytemplate';
import CustomConfirmAlert, { confirmAlert } from '../../../../components/confirmdialog';

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: () => { getLeads(dispatch);},
        deleteLeads: (lead_id) => { deleteLeads({id: lead_id}, dispatch); },
        getTasks: () => { getTasks(dispatch);},
        createTasks: (params) => {createTasks(params, dispatch);},
        updateTasks: (params) => {updateTasks(params, dispatch);},
        completeTasks: (params) => {completeTasks(params, dispatch);},
        deleteTasks: (params) => {deleteTasks(params, dispatch);},
        getCircles: () => { getCircles(dispatch); }
    });
}

const mapStateToProps = (state) => {
    return ({ 
        tasks: state.tasks.tasks,
        leads: state.leads.leads,
        user: state.auth.user,
    });
}

class Contacts extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			'title': '',
            'description' : '',
            'due_date' : '',
            'assign_to' : '',
            'isTemplate': false,
            tasks:[]

		};

         this.create = this.create.bind(this);
         this.delete = this.delete.bind(this);
         this.update = this.update.bind(this);
         this.doComplete = this.doComplete.bind(this);
         this.confirmDelete = this.confirmDelete.bind(this);
	}	

    create(task) {
        this.props.createTasks(task);
    }

    update(task) {
        this.props.updateTasks(task);
    }

    delete(task) {
        this.props.deleteTasks(task);
    }

    doComplete(task) {
        let data = Object.assign({}, task);
        data.status = 'completed';
        this.props.completeTasks(data);
    }

	confirmDelete(task) {

        var self = this;
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            confirmBgColor: '#eac215',
            onConfirm: () => {
                self.delete(task);
                setTimeout(() => {
                    confirmAlert({
                        template: "success",
                        message: "Success! Task has been deleted"
                    });
                    self.setState({isTemplate: !this.state.isTemplate})
                }, 100)
            }
        });

	}

	generateAvatar(lead, size=42) {

        let image = lead.image;

        if(image) 
            return <img src={image} className="avatar" style={{height: size+"px"}} />

        let leadname = (lead.first_name + ' ' + lead.last_name).trim()
        if(leadname.length == 0)
            leadname = lead.email;

        if(!leadname)
            leadname="Not Assigned";
        let short_name = leadname.trim()[0] + leadname.trim()[leadname.trim().search(' ')+1];
        let hash =0;
        for (let i = 0; i < leadname.length; i++) {
           hash = leadname.charCodeAt(i) + ((hash << 5) - hash);
        }
        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        c = "00000".substring(0, 6 - c.length) + c;

        return (
            <div className="avatar" style={{ backgroundColor: "#"+c, height: size+"px", width: size+"px" }} >
                <span>
                    {short_name.toUpperCase()}
                </span>
            </div>
        )
    }

	render() {
		let no_avatar = this.generateAvatar('Amirul Babu');
		/*
		 * For user in user:
		 *		if user.avatar:
		 *  		push(<img src={avatar} />)
		 * 		else:
		 * 			no_avatar = this.no_avatar(user)
		 */

        let def_task = {
           title : '',
           description : '',
           assign_to : ''
        };

        let tasks = [];
        // let tasks = this.state.tasks;
        let leads = [];

        if (this.props.leads)
            leads = this.props.leads;
        if (this.props.tasks) {
            this.props.tasks.map((task, i) => {
                if (task.status != 'completed') { tasks.push(task) }
            })
        }
         
        tasks.sort((a, b) => {
            if (a.created_at < b.created_at) {
                return 1; 
            }
        })

        if (this.props.user) {
            return (
            
                <div className="todolist tab-content contactcontents no-padding">
                    <div role="tabpanel" className="todolist-container tab-pane fade in active" id="recentlyadded">
                        <div className="summary-pane">
                            <span className="h4 font-bold pull-left">TO DO LIST</span>
                            <div className="ctrls">
                                {/*
                                    <SelectBox 
                                    data={tmpData}
                                    heading="select below"
                                    type="value" />
                                */}
                                
                                <ApplyTemplate btnClass="btn-xs m-r-15" />
                                <CreateTemplate btnClass="btn-xs m-r-15" />
                                <CreateTask type="Add" task={def_task} number={0} />

                            </div>
                        </div>
                        <ul className="list-group custom-scroll">
                            {tasks.map((task, i) => {
                                let lead = {}
                                leads.forEach((element) => {
                                    if (element.id == task.lead) {
                                        lead = element;
                                    }
                                })
                                let avatar1;

                                if (lead.first_name) {
                                    avatar1 = this.generateAvatar(lead);
                                } else {
                                    avatar1 = this.generateAvatar(lead);
                                }
                                console.log('todo contact++++++++++++++++++++++++++')
                                return (
                                    <li to="#" className="list-group-item todo-item" key={i}>
                                        <div className="lead-user">
                                            <div className="checker" onClick={() => {this.doComplete(task)}}>
                                                <i className="material-icons"> check </i>
                                            </div>
                                            <Link to={"/addLeads/lead/" + lead.id } className="no-link">
                                                <div className="userpill">
                                                    {avatar1}
                                                    <div className="info custom-info">
                                                        <strong className="sub__heading"> 
                                                            {
                                                                lead.first_name
                                                                    ? lead.first_name + ' ' + lead.last_name
                                                                    : lead.username 
                                                                        ? lead.username
                                                                        : lead.email
                                                            }
                                                        </strong>
                                                        <label> 
                                                        { 
                                                            lead.company ?
                                                                lead.company + ' / ' + lead.title
                                                            :
                                                                lead.title
                                                        } 
                                                        </label>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="description">
                                            <strong className="sub__heading">{task.title}</strong>
                                            <p>{task.description}</p>
                                        </div>
                                        <div className="userpill assigned">
                                            <div className="info assign-info">
                                                <strong>{moment(task.due_date).format('ddd, ll')} </strong>
                                                <label> Assigned to </label>
                                            </div>
                                            <div className="m-l-20">
                                                { 
                                                    this.generateAvatar(this.props.user)
                                                }
                                            </div>
                                        </div>
                                        <div className="operators">
                                            <CreateTask number={task.id} task={task} type="Edit" />
                                            <span className="trash-icon">
                                                <i className="fa fa-trash"
                                                    onClick={() => { this.confirmDelete(task) }}></i>
                                            </span>
                                        </div>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div>
            );
        } else {
            return ('');
        }

  
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);