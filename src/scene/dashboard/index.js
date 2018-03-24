import React from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Contacts from './children/contacts';
import DailyTask from './children/dailytask';
import AccountStatus from './children/accountstatus';
import Analytics from './children/analytics';
import MiniCalendar from '../../components/calendar-mini';
import FirstJourney from '../../components/firstjourney';
import { getLeads, deleteLeads } from '../../services/actions/leads';
import * as d_actions from '../../services/actions/dashboard';
import { getTasks, updateTasks, deleteTasks } from '../../services/actions/tasks';

import '../../styles/assets/plugins/sweetalert/sweetalert.min.js';

import './style.scss';

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.journey = null;
		this.journey_recall = false;
		this.state = {
			loading: true
		}

		this.deleteLead = (lead_id) => {
			this.props.deleteLeads(lead_id);
		}

		this.deleteTask = (task_id) => {
			this.props.deleteTasks(task_id);
		}

		this.updateTask = (task) => {
			this.props.updateTasks(task);
		}

		this.pinLead = (lead) => {
			this.props.d_actions.updateLeads(lead);
		}

		this.deleteLead = this.deleteLead.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.pinLead = this.pinLead.bind(this);
	}

	componentWillMount() {

		setTimeout(() => {
			this.props.getTasks();
		}, 300);

		this.props.d_actions.getMyLeads();
	}

	componentWillReceiveProps(nextProps) {
		var self = this;
		if(nextProps.leads.length > 0)
			this.setState({
				loading: false
			})
		else if(self.state.loading) {
			setTimeout(() => {
				self.setState({
					loading: false
				})
			}, 1500)
		}
	}

	render() {
		if(!this.props.user) return (<div> Loading ... </div>);
		let leads = this.props.leads.reduce((all, msg) => {
			if(msg.is_lead)
				all.push(msg);
			return all;
		}, []);
		let recentLeads = leads.slice(0,19);
		let hotLeads = [];
		this.props.leads.map(lead => {
			if(lead.hot_lead && lead.is_lead)
				hotLeads.push(lead);
		})
		// if(hotLeads.length > 4)
		// 	hotLeads = hotLeads.slice(0, 4);
		let tasks = this.props.tasks;
		/* <FirstJourney> </FirstJourney>  */
		return (
			<div className="dashboard">
				{ this.journey }
				<div className="pagetitle" > 
					<h4> Dashboard </h4>
					<small> Welcome to Agent Cloud {this.props.user.first_name.toUpperCase()}! </small>
				</div>

				<div className="pull-right addsection">
					<NavLink to="/addleads">
						<button type="button" className="btn btn-default btn-raised waves-effect">
							<span className="fa fa-plus"> </span>
							LEAD
						</button>
					</NavLink>
					<NavLink to="/addleads">
						<button type="button" className="btn btn-default btn-raised waves-effect">
							<span className="fa fa-plus"> </span>
							CONTACTS
						</button>
					</NavLink>
					<NavLink to="/tasks">
						<button type="button" className="btn btn-default btn-raised waves-effect">
							<span className="fa fa-plus"> </span>
							TASK
						</button>
					</NavLink>
					<NavLink to="inbox">
						<button type="button" className="btn btn-default btn-raised waves-effect">
							<span className="fa fa-envelope"> </span>
							MESSAGE
						</button>
					</NavLink>
				</div>

				<div className="clearfix"> </div>

				<div className="content no-padding">
					<div className="row clearfix">
						<div className="col-lg-9 col-sm-9">
							<div className="border">
								<Contacts 
									recentLeads={recentLeads} 
									hotLeads={hotLeads}
									deleteLead={this.deleteLead}
									pinLead={this.pinLead}
									loading={this.state.loading} > </Contacts>
							</div>
							<div className="border">
								<DailyTask tasks={tasks} 
									user={this.props.user} 
									leads={this.props.leads}
									deleteTask={this.deleteTask}
									updateTask={this.updateTask} > </DailyTask>
							</div>
						</div>
						<div className="col-lg-3 col-sm-3  no-left-padding">
							<div className="border">
								<AccountStatus> </AccountStatus>
							</div>
							<div className="border calendar">
								<MiniCalendar> </MiniCalendar>
							</div>
							<div className="border">
								<Analytics> </Analytics>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}

}

const mapDispatchToProps = (dispatch) => {
	return ({
		getTasks: () => { getTasks(dispatch); },
		updateTasks: (task) => { updateTasks(task, dispatch); },
		deleteLeads: (lead_id) => { deleteLeads(lead_id, dispatch); },
		deleteTasks: (task_id) => { deleteTasks({id: task_id}, dispatch); },
		d_actions: bindActionCreators(d_actions, dispatch)
	});
}

const mapStateToProps = (state) => {
    return ({ 
    	user: state.auth.user,
    	events: state.events.events,
    	leads: state.leads.leads,
        tasks: state.tasks.tasks
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

/*
<div className="border">
	<Analytics> </Analytics>
</div>
*/
