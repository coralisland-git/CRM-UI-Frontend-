import React from 'react';

import './style.scss';

import avatar_photo from '../../../../styles/assets/images/avatar6.jpg'
import InputBox from '../../../../components/inputbox';
import DatePicker from '../../../../components/datepicker';
import CreateTask from '../../../../components/createtask';
import LeadPill from '../../../../components/leadpill';
import { toast } from 'react-toastify';

import '../../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import '../../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';

import CustomConfirmAlert, { confirmAlert } from '../../../../components/confirmdialog';

class DailyTask extends React.Component {

	constructor(props) {
		super(props);
		let today = moment();
		this.state = {
			timerange: "Today",
			datestring: today.format('MMMM D'),
			descstring: today.format('dddd'),
			selectedTask: {}
		}
		this.taskList = [];
		this.overdueList = [];
		this.closedList = [];
		this.range_role = 0;

		this.confirmDelete = this.confirmDelete.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.updateSnooze = this.updateSnooze.bind(this);
		this.completeTask = this.completeTask.bind(this);
	}

	componentDidUpdate() {
		setTimeout(() => {
			$('.selectpicker').selectpicker('refresh');
		}, 500);
	}

	componentDidMount() {
		setTimeout(() => {
			$("select").selectpicker();
		}, 500);
	}

	timerangeUpdate(new_range) {
		let newState = {
			timerange: new_range,
			datestring: '',
			descstring: ''
		}
		switch(new_range) {
			case 'Today':
				this.range_role = 0;
				newState.datestring = moment().format('MMMM D');
				newState.descstring = moment().format('dddd');
				break;
			case 'Tomorrow':
				this.range_role = 1;
				newState.datestring = moment().add(1, 'days').format('MMMM D');
				newState.descstring = moment().add(1, 'days').format('dddd');
				break;
			case 'Next 7 days':
				this.range_role = 2;
				newState.datestring = moment().format('MMMM D')+" ~ "+moment().add(7, 'days').format('MMMM D');
				newState.descstring = ""
				break;
			case 'This Month':
				this.range_role = 3;
				newState.datestring = moment().format('YYYY MMMM');
				newState.descstring = ""
				break;
			case 'All Open':
				this.range_role = 4;
				newState.datestring = "";
				newState.descstring = "";
				break;
		}
		this.setState({
			...this.state,
			...newState
		});
	}

	confirmDelete(username, task_id) {

        var self = this;
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    self.props.deleteTask(task_id);
                    confirmAlert({
                        template: "success",
                        message: "Success Task has been deleteLead",
                    });
                }, 100)
            }
        });

	}

	updateTask(task) {
		this.props.updateTask(task);
	}

	completeTask(task) {
		let t = JSON.parse(JSON.stringify(task))
		t.status = 'completed';
		this.updateTask(t);
		toast.warn("Completing Task "+t.title)
	}

	updateSnooze(year, month, day) {
		this.updateTask({
			...this.state.selectedTask,
			reminder_date: moment(year.value, month.value, day.value).format('YYYY-MM-DD')
		});
	}

	generateAvatar(username, email="kd19850511@gmail.com") {

		if(!username)
			username="Not Assigned";
		let short_name = username.trim()[0] + username.trim()[username.trim().search(' ')+1];
		let hash =0;
	    for (let i = 0; i < username.length; i++) {
	       hash = username.charCodeAt(i) + ((hash << 5) - hash);
	    }
	    let c = (hash & 0x00FFFFFF)
	        .toString(16)
	        .toUpperCase();

	    c = "00000".substring(0, 6 - c.length) + c;

	    return (
	    	<div className="avatar" style={{ backgroundColor: "#"+c}} >
	    		<span>
	    			{short_name}
	    		</span>
	    	</div>
	    )
	}

	render() {
		this.taskList = [];
		this.overdueList = [];
		this.closedList = [];
		if(!this.props.user) return <div> Loading ... </div>;
		let name = this.props.user.first_name + ' ' + this.props.user.last_name;
		if(name.trim() == '') name = this.props.user.email;
		let selected_avatar, selected_lead_name="";
		this.props.leads.map(l_item => {
			if(this.selectedTask && this.selectedTask.assign_to == l_item.id)
				selected_lead_name = l_item.first_name+' '+l_item.last_name
		})
		selected_avatar = this.generateAvatar(selected_lead_name);
		if(this.props.tasks) {
			this.props.tasks.map(item => {
				if(item.status == 'completed') return;
				let deadline = moment();
				switch(this.range_role) {
					case 0: 
						break;
					case 1:
						break;
					case 2:
						if(moment(item.due_date).diff(deadline.subtract(1, 'days')) < 0)
							return;
						deadline = deadline.add(7, 'days');
						if(moment(item.due_date).diff(deadline) > 0)
							return;
						break;
					case 3:
						deadline.date(1)
						if(moment(item.due_date).diff(deadline) < 0)
							return;
						deadline = deadline.add(1, 'M');
						if(moment(item.due_date).diff(deadline) > 0)
							return;
						break;
					case 4:
						if(item.status == 'completed')
							return;
				}

				let complete = " text-success";
				let status = 'open';
				let diff_days = moment(item.due_date).add(1, 'days').diff(moment(), 'days');
				if(item.is_deleted)
					status='closed';
				else if(moment(item.due_date).add(1, 'days').diff(moment(), 'days') < 0)
					status = 'overdue';
				let lead;
				this.props.leads.map(l_item => {
					if(item.lead == l_item.id)
						lead = l_item;
				})
				switch(status) {
					case 'open':
						this.taskList.push(
							 <li className="list-group-item" key={item.id}>
							 	<div className="row taskitem">
							 		<div className="col-lg-3">
							 			<div className="checker">
							 				<i className={"material-icons"} 
							 					onClick={() => {this.completeTask(item)}}> check </i>
							 			</div>
							 			<div className="tasksummary">
							 				<label className="time"> {moment(item.due_date).format('MM-DD-YYYY')} </label> <br/>
							 				<strong> Assigned to: </strong> <label> {name} </label> <br/>
							 				<strong> Status </strong> <span className="taskstatusopen text-success" > Open </span>
							 			</div>
							 		</div>
							 		<div className="col-lg-5">
							 			<strong> Task: </strong>
							 			<div className="taskdescription">
							 				<label> {item.title} </label> <br/>
								 			<p> { item.description } </p>
							 			</div>
							 		</div>
							 		<LeadPill className="col-lg-3 contactssection"
							 			lead={lead}
							 			info={true}
							 			size={30}
							 			/>
							 		<div className="col-lg-1 operators">
			                			{/* <i className="material-icons" data-toggle="modal" data-target="#updateTask"
			                				onClick={() => {
			                					this.setState({...this.state, selectedTask: item}); 
			                					$("input.datepicker").val(item.due_date);
			                					$("select.assigned_to").val(item.assign_to); 
			                				}} > mode_edit </i> */}
		                				<CreateTask number={item.id} task={item} type="Edit" />
			                			{/* <i className="material-icons" data-toggle="modal" data-target="#alarm"
			                				onClick={() => {this.setState({...this.state, selectedTask: item})}} > snooze </i> */}
			                			<i className="fa fa-trash"
			                				onClick={() => { this.confirmDelete(name, item.id) }}> </i>
							 		</div>
							 	</div>
							 </li>
						)
						break;
					case 'overdue':
						this.overdueList.push(
							 <li className="list-group-item" key={item.id}>
							 	<div className="row taskitem">
							 		<div className="col-lg-3">
							 			<div className="checker">
							 				<i className={"material-icons text-danger"}
							 					onClick={() => {this.completeTask(item)}}> check </i>
							 			</div>
							 			<div className="tasksummary">
							 				<label className="time text-danger"> {moment(item.due_date).format('MM-DD-YYYY')} | {diff_days} days </label> <br/>
							 				<strong> Assigned to: </strong> <label> {name} </label> <br/>
							 				<strong> Status </strong> <span className="taskstatusopen text-danger" > Overdue </span>
							 			</div>
							 		</div>
							 		<div className="col-lg-5">
							 			<strong> Task: </strong>
							 			<div className="taskdescription">
							 				<label> {item.title} </label> <br/>
								 			<p> { item.description } </p>
							 			</div>
							 		</div>
							 		<LeadPill className="col-lg-3 contactssection"
							 			lead={lead}
							 			info={true}
							 			size={30}
							 			/>
							 		<div className="col-lg-1 operators">
			                			{/* <i className="material-icons" data-toggle="modal" data-target="#updateTask"
			                				onClick={() => {
			                					this.setState({...this.state, selectedTask: item});
			                					$("input.datepicker").val(item.due_date);
			                					$("select.assigned_to").val(item.assign_to); 
			                				}} > mode_edit </i> */}
			                			<CreateTask number={item.id} task={item} type="Edit" />
			                			{/* <i className="material-icons" data-toggle="modal" data-target="#alarm" 
			                				onClick={() => {this.setState({...this.state, selectedTask: item})}} > snooze </i> */}
			                			<i className="fa fa-trash"
			                				onClick={() => { this.confirmDelete(name, item.id) }}>  </i>
							 		</div>
							 	</div>
							 </li>
						)
						break;
				}
			})
		}

		let days = [], months=[];
		for(let i = 1; i <= 31; i ++) days.push(<option key={i}> {i} </option>);
		for(let i = 1; i <= 12; i ++) {
			let m = moment('2000 '+i+' 1').format('MMMM')
			months.push(<option value={i-1} key={i} > {m} </option>)
		}

		let snooze_month, snooze_year, snooze_day;

		let assignto_options = [];
		this.props.leads.map(item => {
			assignto_options.push(
				<option value={item.id} key={item.id}> {item.first_name + ' ' + item.last_name} </option>
			)
		})

		return (
			<div className="dailytask">
				<div className="header">
					<label className="yourdailytask"> YOUR DAILY TASK </label> 
					<br/>
					<div className="dateinfo">
						<label> {this.state.timerange.toUpperCase()} </label>
						{this.state.datestring == ""? '': <span> | </span>}
						<label> {this.state.datestring.toUpperCase()} </label>
						{this.state.datestring == ""? '': <span> | </span>}
						<label> {this.state.descstring.toUpperCase()} </label>
					</div>
					<div className="dateselect">
                        <ul className="header-dropdown m-r--5">
                            <li className="dropdown"> 
                            	<a href="javascript:void(0);" 
                            		className="dropdown-toggle" 
                            		data-toggle="dropdown" role="button" 
                            		aria-haspopup="true" aria-expanded="false"> 
                            		<button className=" btn btn-raised timerange">
	                            		{ this.state.timerange } &nbsp;&nbsp;&nbsp;
	                            		<i className="material-icons">arrow_drop_down</i> 
	                            	</button>
                            	</a>
                                <ul className="dropdown-menu">
                                    <li><a href="javascript:void(0);"
                                    	onClick={() => { this.timerangeUpdate("Today"); }}>Today</a></li>
                                    <li><a href="javascript:void(0);"
                                    	onClick={() => { this.timerangeUpdate("Tomorrow"); }}>Tomorrow</a></li>
                                    <li><a href="javascript:void(0);"
                                    	onClick={() => { this.timerangeUpdate("Next 7 days"); }}>Next 7 days</a></li>
                                    <li><a href="javascript:void(0);"
                                    	onClick={() => { this.timerangeUpdate("This Month"); }}>This Month</a></li>
                                    <li><a href="javascript:void(0);"
                                    	onClick={() => { this.timerangeUpdate("All Open"); }}>
                                    		All Open </a></li>
                                </ul>
                            </li>
                        </ul>
					</div>
				</div>
				<div className="body">
					<ul className="list-group">
						 {this.taskList}
						 <li className="list-group-item text-danger">
						 	OVERDUE
						 </li>
						 {this.overdueList}
					</ul>
				</div>


				<div className="modal fade alarm-modal" id="alarm" tabIndex="-1" role="dialog">
				  <div className="modal-dialog" role="document">
				      <div className="modal-content">
				          <div className="header">
				              <i className="material-icons pull-right">alarm</i>
				              <div className="userpill">
				                    {selected_avatar}
				                    <div className="info">
				                        <strong> { name } </strong>
				                        <label> Creative Director </label>
				                    </div>
				                </div>
				          </div>
				          <div className="content">
				                <div className="alarm_title">
				                    <span className="h5 font-bold">Task</span> <br />
				                    <span className="weak">{ this.state.selectedTask.title }.</span>
				                </div>
				                <div className="alarm_description">
				                    <span className="weak">{ this.state.selectedTask.description }</span>
				                </div>
				          </div>
				          <div className="date_select"> 
				              <div className="sel_group">
				              		<span className="h5 font-bold">Month</span>
				              		<select className="form-control" ref={month => {snooze_month = month}} >
				              			{ months }
				              		</select>
				              </div>
				              <div className="sel_group">
				              		<span className="h5 font-bold">Day</span>
				              		<select className="form-control" ref={day => {snooze_day = day}} >
				              			{ days }
				              		</select>
				              </div>
				              <div className="sel_group">
				              		<span className="h4 font-bold">Year</span>
				              		<select className="form-control" ref={year => {snooze_year = year}} >
				              			<option>2022</option>
				              			<option>2021</option>
				              			<option>2020</option>
				              			<option>2019</option>
				              			<option>2018</option>
				              		</select>
				              </div>
				              <div className="sel_group">
				              		<span className="h4 font-bold">Time</span>
				              		<select className="form-control">
				              			<option>21</option>
				              		</select>
				              </div>
				          </div>
				          <div className="footer">
				              <button className="btn btn-md btn-raised waves-effect" data-dismiss="modal" id="set-smoose" 
				               		onClick={() => {this.updateSnooze(snooze_year, snooze_month, snooze_day)}} >SET SMOOSE</button>
				              <button className="btn btn-default btn-md btn-raised waves-effect" data-dismiss="modal">CANCEL</button>
				          </div>
				      </div>
				  </div>
				</div>


				<div className="modal fade"  tabIndex="-1" role="dialog" id="updateTask">
				    <div className="modal-dialog" role="document">
				        <div className="modal-content">
				            <div className="header">
				                <span className="modal-title  font-bold h4" id="createModalLabel">EDIT TASK</span>
				            </div>
				            <div className="modal-body"> 
				                <div className="row control">
				                    <span className="h5 font-bold">Task Title</span>
				                    <InputBox placeholder="Vannessa" key='title' value={this.state.selectedTask.title} onChange={(e) => this.setState({selectedTask: {...this.state.selectedTask, 'title': e.target.value} })} />
				                </div>
	                           <div className="row control leadId">
	                                <span className="h5 font-bold">Lead</span>
	                                <select className="form-control lead_select" defaultValue={this.state.selectedTask.lead} >
		                              {assignto_options}
	                                </select>
	                            </div>
				                <div className="row control">
				                    <span className="h5 font-bold">Description</span>
				                    <textarea className="task-des form-control"  value={this.state.selectedTask.description} onChange={(e) => this.setState({selectedTask: {...this.state.selectedTask, 'description': e.target.value}})} ></textarea>
				                </div>
				                <div className="row sel-part">
				                      <span>
				                          <span className="h5 font-bold">Due Date</span>
				                          <DatePicker />
				                      </span>
				                      <span>
				                          <span className="h5 font-bold">Assigned to</span>
				                          <select className="form-control show-tick assigned_to" >
				                          	<option value={this.props.user.id}> {this.props.user.first_name + ' ' +this.props.user.last_name} </option>
				                          </select>
				                      </span>
				                </div>
				            </div>
				            <div className="footer">
				                <div className="row">
				                    <button className="btn btn-primary btn-raised waves-effect btn-md" data-dismiss="modal" 
				                    	onClick={() => { 
				                    		this.updateTask({
				                    			...this.state.selectedTask,
				                    			due_date: moment($(".datepicker").val()).format('YYYY-MM-DD'),
				                    			assign_to: $("select.assigned_to").val(),
				                    			lead: $("select.lead_select").val()
				                    		}) 
				                    	}}> Update </button>
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

export default DailyTask;