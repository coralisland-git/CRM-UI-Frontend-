import React from 'react';
import { NavLink } from 'react-router-dom';

import Contacts from './children/contacts';
import Completed from './children/completed';
import AccountStatus from '../dashboard/children/accountstatus';
import Analytics from './../dashboard/children/analytics';
import CreateTemplate from '../../components/firstjourney';
import FirstJourney from '../../components/createtemplate';
import MiniCalendar from '../../components/calendar-mini';
import '../../styles/assets/plugins/sweetalert/sweetalert.min.js';
import avatar from '../../styles/assets/images/avatar.jpg';
import * as d_actions from '../../services/actions/dashboard';
import './style.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../services/actions/users';
import { getLeads, deleteLeads } from './../../services/actions/leads';
import { getCircles } from './../../services/actions/circles';
import { getTemplates } from './../../services/actions/templates';
import {getTasks, createTasks, deleteTasks, updateTasks, completeTasks, getLeadsByUser} from '../../services/actions/tasks';

class TodoList extends React.Component {

  constructor(props){
		super(props);
	}

  componentWillMount(){
    this.props.actions.getTeamMembers();

    if (!this.props.leads || this.props.leads.length == 0) {
      this.props.getLeads();
    }

    if (!this.props.tasks || this.props.tasks.length == 0) {
      this.props.getTasks();
    }

    if (!this.props.circles || this.props.circles.length == 0) {
      this.props.getCircles();
    }

    if (!this.props.templates || this.props.templates.length == 0) {
      this.props.getTemplates();
    }

  }

	render() {
		return (
			<div className="todolist" id="todoMyList">
				<div className="content">
					<div className="row clearfix">
						<div className="col-lg-9 col-sm-9">
							<div className="">
								<Contacts > </Contacts>
							</div>
							<div className="">
								<Completed />
							</div>
						</div>
						<div className="col-lg-3 col-sm-3  no-left-padding">
							<div className="border">
								<AccountStatus> </AccountStatus>
							</div>
							<div className="border" style={{ padding: "0px" }}>
								<MiniCalendar> </MiniCalendar>
							</div>
              <div className="border">
                <Analytics> </Analytics>
              </div>
						</div>
					</div>
				</div>
				<span>
        <div className="modal fade alarm-modal" id="alarm" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="header">
                          <i className="material-icons pull-right">alarm</i>
                          <div className="userpill">
                                <img className="avatar" src={avatar} />
                                <div className="info">
                                    <strong> Denver Jones </strong>
                                    <label> Creative Director </label>
                                </div>
                            </div>
                      </div>
                      <div className="content">
                            <div className="alarm_title">
                                <span className="h5 font-bold">Task</span> <br />
                                <span className="weak">Curabitur a felis in nunc fringilla tristique.</span>
                            </div>
                            <div className="alarm_description">
                                <span className="weak">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            </div>
                      </div>
                      <div className="date_select"> 
                          <div className="sel_group">
                          		<span className="h5 font-bold">Month</span>
                          		<select className="form-control">
                          			<option>January</option>
                          			<option>Febuary</option>
                          			<option>March</option>
                          			<option>April</option>
                          			<option>May</option>
                          			<option>June</option>
                          		</select>
                          </div>
                          <div className="sel_group">
                          		<span className="h5 font-bold">Day</span>
                          		<select className="form-control">
                          			<option>1</option>
                          			<option>2</option>
                          			<option>3</option>
                          			<option>4</option>
                          			<option>5</option>
                          			<option>6</option>
                          		</select>
                          </div>
                          <div className="sel_group">
                          		<span className="h4 font-bold">Year</span>
                          		<select className="form-control">
                          			<option>2018</option>
                          			<option>2017</option>
                          			<option>2016</option>
                          			<option>2015</option>
                          			<option>2014</option>
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
                          <button className="btn btn-md btn-raised waves-effect" data-dismiss="modal" id="set-smoose">SET SMOOSE</button>
                          <button className="btn btn-default btn-md btn-raised waves-effect" data-dismiss="modal">CANCEL</button>
                      </div>
                  </div>
              </div>
          </div>
      </span>
			</div>
		);
	}

}

const mapDispatchToProps = (dispatch) => {
	return ({
		getLeads: () => { getLeads(dispatch); },
    getTasks: () => { getTasks(dispatch); },
    getTemplates: () => { getTemplates(dispatch); },
    getCircles: () => { getCircles(dispatch); },
    actions: bindActionCreators({...userActions}, dispatch)
	})
}

const mapStateToProps = (state) => {
    return ({ 
		  user: state.auth.user,
    	leads: state.leads.leads,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);