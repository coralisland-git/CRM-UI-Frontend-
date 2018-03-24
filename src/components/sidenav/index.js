import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';
import logo from '../../styles/assets/images/logo_1.png';

class SideNav extends React.Component {

	componentDidMount() {
		$(document).ready(() => {
			setTimeout(() => {
				$("li.crm>a").click();
			}, 1000);
		})

	}

	componentDidUpdate() {

	}

	render() {
		return (
			<aside id="leftsidebar" className="sidebar">

				<div className="user-info">
					<div className="admin-image">
						<NavLink to="">
							<img className="logo" src={logo} alt="" />
						</NavLink>
					</div>
				</div>

				<div className="menu">
					<ul className="list">
						<li className="home">
							<a href="//printbuilder.agentcloud.com">
								<span className="leftborder"></span>
								<i className="zmdi zmdi-home home"></i><span>Home</span>
							</a>
						</li>
						<li className="crm"> 
							<NavLink className="menu-toggle" to="/dashboard">
								<span className="leftborder"></span><i className="zmdi zmdi-email crm"></i><span>CRM</span> 
							</NavLink>
							<ul className="ml-menu">
								<li> <NavLink to="/inbox"> Inbox </NavLink> </li>
								<li> <NavLink to="/tasks"> ToDoList </NavLink> </li>
								<li> <NavLink to="/tasktemplate"> Task Template </NavLink> </li>
								<li> <NavLink to="/property"> Property </NavLink> </li>
								<li> <NavLink to={`/leads/${"lead"}`} > Leads </NavLink> </li>
								<li> <NavLink to={`/leads/${"contact"}`} > Contacts </NavLink> </li>
								<li> <NavLink to="/circles"> Circles </NavLink> </li>
							</ul>
						</li>
						<li className="events">
							<a className="menu-toggle" href="/#/events" >
								<span className="leftborder"></span><i className="zmdi zmdi-calendar-check events"></i><span>Events</span> 
							</a>
							<ul className="ml-menu">
								<li><NavLink to="/events/add">Add Events</NavLink></li>
							</ul>
						</li>
						<li className="print-builder">
							<a className="menu-toggle" href="https://printbuilder.agentcloud.com/products">
								<span className="leftborder"></span><i className="zmdi zmdi-city print-builder"></i><span>PrintBuilder</span> 
							</a>
							<ul className="ml-menu">
								<li><a href="https://printbuilder.agentcloud.com/checkout"> ViewCart </a></li>
							</ul>
						</li>
						<li className="web-builder">
							<NavLink to="/webbuilder"> <i className="zmdi zmdi-accounts-outline web-builder"></i><span>WebBuilder</span> </NavLink> 
							</li>
						<li className="transactions">
							<NavLink to="/transactions"> <i className="zmdi zmdi-blogger transactions"></i><span>Transactions</span> </NavLink> 
							</li>
						<li className="screen-cast">
							<NavLink to="/screencast"> <i className="zmdi zmdi-copy screen-cast"></i><span>ScreenCast</span> </NavLink> 
							</li>
						<li className="privacypolicy" >
							<a href="https://agentcloud.com/privacy-policy/" target="_blank" > 
								<i className="material-icons"> lock </i> 
								Privacy and Policy
							</a> 
						</li>
						<li className="changelog">
							<a href="https://agentcloud.com/change-log/" target="_blank" > 
								<i className="material-icons"> edit </i> 
								Change Log
							</a> 
						</li>
					</ul>
				</div>

			</aside>
		);
	}

}

export default SideNav;