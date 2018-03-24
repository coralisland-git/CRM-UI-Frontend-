import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import { GetAgents } from '../../../services/actions/events';

import SideBar from '../components/sidebar';

import img_url from '../../../styles/assets/images/avatar0.png';

import '../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import '../style.scss';

import html2canvas from 'html2canvas';

const mapDispatchToProps = (dispatch) => {
		return ({
			GetAgents: (id) => { GetAgents(id, dispatch) },
		});
}

const mapStateToProps = (state) => {

		return ({ 
				user: state.auth.user,
				agents: state.events.agents,
				events: state.events.events,
				broker_events: state.events.broker_events,
				selected_calendars: state.events.selected_calendars,
				broker_calendars: state.events.broker_calendars,
		});
}


class ViewEvents extends React.Component {

		constructor (props) {
				super(props);
				this.state = {
						user: this.props.user || {username: ""},
						agents: this.props.agents || [],
						events: this.props.events || [],
						broker_events: this.props.broker_events || [],
						selected_calendars: this.props.selected_calendars || [],
						broker_calendars: this.props.broker_calendars || [],
						current_event_id: this.props.match.params.eventid,
						currentPage: 1,
      			perPage: 4,
				};
		}

		componentDidMount () {
			$(".myselectbox").selectpicker();
		}

		componentDidUpdate () {
			$(".myselectbox").selectpicker("refresh");
		}

		componentWillReceiveProps(newProps) {
				this.props = newProps;
				if (newProps.user != undefined && newProps.user != this.state.user) {
						this.setState({user: newProps.user});
						
				}
				this.setState({selected_calendars: newProps.selected_calendars || []});
				this.setState({events: newProps.events || []});
				this.setState({agents: newProps.agents || []});
				this.setState({broker_events: newProps.broker_events || []});
				this.setState({ broker_calendars: newProps.broker_calendars || [] });
		}

		toUtcMoment = (date) => {
	    let d = new Date();
	    let offset = d.getTimezoneOffset();
	    // return moment(date).add(offset, 'minutes');
	    return moment(date);
	  }

		render() {

			if (this.state.agents.length == 0) {
				this.props.GetAgents(this.state.user.id);
			}

			let current_events = this.state.events.filter((eve) => {
					return eve.id == this.state.current_event_id;
			});

			let is_broker = false;
			if (current_events.length == 0) {
				current_events = this.state.broker_events.filter((eve) => {
					return eve.id == this.state.current_event_id;	
				});
				is_broker = true;
			}

			let current_event = current_events[0] || {};
			let edit_url = "/events/edit/" + this.state.current_event_id;
			let calendarid = "";
			if (current_event.organizer)
				calendarid = current_event.organizer.email;
			else
				calendarid = current_event.calendar_type;
			let current_calendars = this.state.selected_calendars.filter((cal) => {
					return cal.id == calendarid || cal.email == calendarid;
			});
			let color = "";
			let calendar_name = "";
			if (current_calendars.length > 0) {
					if (current_calendars[0].backgroundColor) 
						color = current_calendars[0].backgroundColor;
					else 
						color = current_calendars[0].color;
					if (current_calendars[0].summary) 
						calendar_name = current_calendars[0].summary;
					else
						calendar_name = current_calendars[0].name;
			} else {
				calendar_name = "No Calendar Name";
				color = current_event.color;
				if (this.state.broker_calendars.length != 0) {
					let temp_cals = this.state.broker_calendars.filter((cal) => {
						return cal.id == calendarid || cal.email == calendarid;
					});
					if (temp_cals.length > 0) {
						if (temp_cals[0].summary)
							calendar_name = temp_cals[0].summary;
						else
							calendar_name = temp_cals[0].name;
					}
				}
			}

			let content = {};
			content = this.view_content(current_event, calendar_name, color);

			return ( 
					<div id="viewevents_page" className="container-fluid">
							<div className="block-header col-sm-6 clearfix">
									<h2 className="padding-top-8 heading-me">Events</h2>
							</div>
							<div className="block-header col-sm-6">
									<NavLink to="/events" className="btn btn-md btn-raised btn-default waves-effect right">BACK TO CALENDAR</NavLink>
									{is_broker ? '' : 
										<NavLink to={ edit_url } id="btn_refresh" className="btn btn-md btn-raised btn-primary waves-effect right">EDIT EVENT</NavLink>
									}
							</div>
							<div className="row">
									<div id="side_bar_cal" className="col-sm-3 no-right-padding">
											
											<SideBar />

									</div>

									<div className="col-sm-9">
											<div className="card card-me no-border">
													<div className="body">
															<div className="body_section">
																	<ul className="list-group">
																			<li className="list-group-item clearfix">
																					<div className="block-header">
																							<h2>EVENTS: { current_event.summary || current_event.title }</h2>
																					</div>
																			</li>
																			<li className="list-group-item clearfix no-padding-top no-padding-bottom">
																					{ content }
																			</li>
																	</ul>
															</div>
													</div>
											</div>
									</div>
							</div>
					</div>
			);
		}

		clickPageBtn = (e, status_str) => {
			e.preventDefault();
			if (status_str == "first") {
				this.setState({ currentPage: 1 });
			}
			if (status_str == "prior") {
				let temp = this.state.currentPage;
				if (temp > 1) {
					temp = temp - 1;
					this.setState({ currentPage: temp });
				}
			}
			if (status_str == "next") {
				let temp = Math.ceil(this.state.agents.length / this.state.perPage);
				let next = this.state.currentPage;
				if (temp >= next + 1) {
					this.setState({ currentPage: next + 1 });
				} 
			}
			if (status_str == "last") {
				let temp = Math.ceil(this.state.agents.length / this.state.perPage);
				this.setState({ currentPage: temp });
			}
		}

		printList = (e) => {
			e.preventDefault();
			const input = document.getElementById('agents_list');
			var mywindow = window.open('', '', 'width=1000, height=1500');
    	mywindow.document.write('<html><head>');
    	mywindow.document.write('<style>.black { color: black; font-weight: normal; } .flexing { display: flex; } .img-sec { width: 100px; height: 100px; margin-right: 30xp; } .img-des { height: 100px; line-height: 100px; text-align: center; }</style>');
	    mywindow.document.write('</head><body>');
	    mywindow.document.write('<h2>Agent List</h2>');
	    let temp_list = this.state.agents;
	    temp_list.forEach((val, key) => {
	    	let temp_img = val.profile_image || img_url;
	    	let temp_name = val.first_name + " " + val.last_name;
	    	mywindow.document.write('<div class="flexing" style="margin-bottom: 20px;"><div style="margin-right: 30px;"><img class="img-sec" src="' + temp_img + '" /></div><div class="img-des"><label><b class="black">' + temp_name + '</b> | ' + val.email + '</label></div></div>');
	    });
	    mywindow.document.write('<script>window.print(); setTimeout(function(){ window.close(); }, 500);</script>');
	    mywindow.document.write('</body></html>');
		}

		exportCSV = (e) => {
			e.preventDefault();
			let currentPage = this.state.currentPage;
			let perPage = this.state.perPage;
			let indexOfLast = currentPage * perPage;
			let indexOfFirst = indexOfLast - perPage;
			let temp_me = this.state.agents;
			let temp_brokers = temp_me.slice(indexOfFirst, indexOfLast);
			let csvContent = "data:text/csv;charset=utf-8,";
			let row = "address, address2, agent, bcc, beta_key, bre_number, broker_license, brokerage, cell_phone, city, company, country, created_at, email, facebook, fax, first_name, gmail, home_phone, industry, instagram, job_title, last_name, lat, linkedin, profile_image, role, state, username, zipcode" + "\r\n";
			csvContent += row + "\r\n";
			temp_brokers.forEach((val, key) => {
				let temp = [val.address, val.address2, val.agent, val.bcc, val.beta_key, val.bre_number, val.broker_license, val.brokerage, val.cell_phone, val.city, val.company, val.country, val.created_at, val.email, val.facebook, val.fax, val.first_name, val.gmail, val.home_phone, val.industry, val.instagram, val.job_title, val.last_name, val.lat, val.linkedin, val.profile_image, val.role, val.state, val.username, val.zipcode];
				let row = temp.join(",");
				csvContent += row + "\r\n";
			});
			let encodedUri = encodeURI(csvContent);
			let link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "agent_list.csv");
			document.body.appendChild(link);
			link.click(); 
		}

		sortAgents = (e) => {
			e.preventDefault();
			if (e.target.value != "-- Select --") {
				if (e.target.value == "First Name") {
					let temp = this.state.agents || [];
					temp.sort(function(a, b){
						if (a.first_name < b.first_name)
					    return -1;
					  if (a.first_name > b.first_name)
					    return 1;
					  return 0;
					});
					this.setState({ agents: temp });
				}
				if (e.target.value == "Last Name") {
					let temp = this.state.agents || [];
					temp.sort(function(a, b){
						if (a.last_name < b.last_name)
					    return -1;
					  if (a.last_name > b.last_name)
					    return 1;
					  return 0;
					});
					this.setState({ agents: temp });
				}
				if (e.target.value == "Fist Name(Z-A)") {
					let temp = this.state.agents || [];
					temp.sort(function(a, b){
						if (a.first_name > b.first_name)
					    return -1;
					  if (a.first_name < b.first_name)
					    return 1;
					  return 0;
					});
					this.setState({ agents: temp });
				}
				if (e.target.value == "Last Name(Z-A)") {
					let temp = this.state.agents || [];
					temp.sort(function(a, b){
						if (a.last_name > b.last_name)
					    return -1;
					  if (a.last_name < b.last_name)
					    return 1;
					  return 0;
					});
					this.setState({ agents: temp });
				}
				if (e.target.value == "Most Recent") {
					let temp = this.state.agents || [];
					temp.sort(function(a, b){
						if (a.created_at > b.created_at)
					    return -1;
					  if (a.created_at < b.created_at)
					    return 1;
					  return 0;
					});
					this.setState({ agents: temp });
				}
				if (e.target.value == "Least Recent") {
					let temp = this.state.agents || [];
					temp.sort(function(a, b){
						if (a.created_at < b.created_at)
					    return -1;
					  if (a.created_at > b.created_at)
					    return 1;
					  return 0;
					});
					this.setState({ agents: temp });
				}
			}
		}

		view_content = (current_event, calendar_name, color) => {

			let offset = -5.0;
			let clientDate;
			let temp_start;
			if (current_event.start) {
				clientDate = this.toUtcMoment(current_event.start.date || current_event.start.dateTime);
	    	temp_start = clientDate.format('MM') + "-" + clientDate.format('DD') + "-" +  clientDate.format('YYYY') + " " + clientDate.format("hh:mm A");
			} else {
				temp_start = "";
			}

			if (current_event.creator) {
			} else {
				current_event.creator = {};
			}

			let broker_list = [];
			let indexOfLast = 0;
			let indexOfFirst = 0;
			if (this.state.agents.length != 0) {
				let currentPage = this.state.currentPage;
				let perPage = this.state.perPage;
				indexOfLast = currentPage * perPage;
				indexOfFirst = indexOfLast - perPage;
				let temp_me = this.state.agents;
				let temp_brokers = temp_me.slice(indexOfFirst, indexOfLast);
				temp_brokers.forEach((val, key) => {
					let temp_name = val.first_name + " " + val.last_name;
					let temp_img = val.profile_image || img_url;
					let agentid = "li_agent_" + key;

					broker_list.push(<li key={key} id={ agentid } className="clearfix flexing"><div><img className="img-sec" src={temp_img} /></div><div className="img-des"><label><b className="black">{ temp_name }</b> | { val.email }</label></div></li>);

				});
				let temp_length = this.state.agents.length;
				if (indexOfLast > temp_length) indexOfLast = temp_length;
			}

			if (this.state.user.role == "broker") {

				if (this.state.agents.length != 0) {
					return (
						<div className="row">
							<div className="col-sm-6 no-padding right-border padding-bottom">
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Event Title: </label>
													<div className="view-item clearfix">
															{ current_event.summary || current_event.title }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Date & Time: </label>
													<div className="view-item clearfix">
															{ temp_start }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Location: </label>
													<div className="view-item clearfix">
															{ current_event.location || "There is no location." }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Course Options </label>
													<div className="view-item clearfix">
															{ current_event.course_option || "There is no course option." }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Host Instructor </label>
													<div className="view-item clearfix">
															{ current_event.host_name || current_event.creator.email }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Description Calendars </label>
													<div className="view-item clearfix">
															<label className="i_calendar " style={{backgroundColor: color}}>&nbsp;</label>
																	{ calendar_name }
													</div>
											</div>
									</div>
							</div>
							<div className="col-sm-6 no-padding left-border padding-bottom">
									<ul className="list-group" style={{ width: "99%" }}>
											<li className="bottom-border list-group-item clearfix no-border">
													<div className="block-header col-sm-4 no-padding">
															<h2 className="padding-top-5">Invites</h2>
													</div>
													<div className="col-sm-8 no-padding">
															<div className="inline-sec right-sec div-sec">
																	<select id="sort_type" className="myselectbox col-sm-12" onChange={ (e) => { this.sortAgents(e) } }>
																		<option>-- Select --</option>
																		<option>Most Recent</option>
																		<option>Least Recent</option>
																		<option>First Name</option>
																		<option>Fist Name(Z-A)</option>
																		<option>Last Name</option>
																		<option>Last Name(Z-A)</option>
																	</select>
															</div>
															<label className="inline-sec right-sec label-sec padding-top-10">Sort by:</label>
													</div>
											</li>
											<li className="list-group-item clearfix no-border top-border">
													<ul className="basic-list">
															<li className="clearfix">Confirmed</li>
															<div id="agents_list" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
																{ broker_list }
															</div>
															<li className="clearfix">
																	<div className="col-sm-6">
																			<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect col-sm-12" onClick={ this.exportCSV }>EXPORT LIST</button>
																	</div>
																	<div className="col-sm-6">
																			<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect col-sm-12" onClick={ this.printList }>PRINT LIST</button>
																	</div>
															</li>
															<li className="text-center">
																	<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect btn-page text-center" onClick={ (e) => { this.clickPageBtn(e, "first") } }><i className="material-icons">first_page</i></button>
																	<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect btn-page" onClick={ (e) => { this.clickPageBtn(e, "prior") } }><i className="material-icons">chevron_left</i></button>

																	<label>({indexOfFirst + 1}-{indexOfLast} of { this.state.agents.length })&nbsp;&nbsp;&nbsp;</label>

																	<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect btn-page" onClick={ (e) => { this.clickPageBtn(e, "next") } }><i className="material-icons">chevron_right</i></button>
																	<button type="button" id="btn_refresh" className="btn btn-sm btn-raised btn-default waves-effect btn-page" onClick={ (e) => { this.clickPageBtn(e, "last") } }><i className="material-icons">last_page</i></button>
															</li>
													</ul>
											</li>
									</ul>
							</div>
					</div>
					);
				} else {
					return (
						<div className="row">
							<div className="col-sm-6 no-padding right-border padding-bottom">
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Event Title: </label>
													<div className="view-item clearfix">
															{ current_event.summary || current_event.title }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Date & Time: </label>
													<div className="view-item clearfix">
															{ temp_start }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Location: </label>
													<div className="view-item clearfix">
															{ current_event.location || "There is no location." }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Course Options </label>
													<div className="view-item clearfix">
															{ current_event.course_option || "There is no course option." }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Host Instructor </label>
													<div className="view-item clearfix">
															{ current_event.host_name || current_event.creator.email }
													</div>
											</div>
									</div>
									<div className="col-sm-12">
											<div className="view-sec">
													<label className="view-label">Description Calendars </label>
													<div className="view-item clearfix">
															<label className="i_calendar " style={{backgroundColor: color}}>&nbsp;</label>
																	{ calendar_name }
													</div>
											</div>
									</div>
							</div>
							<div className="col-sm-6 no-padding left-border padding-bottom">
									<ul className="list-group" style={{ width: "99%" }}>
											<li className="bottom-border list-group-item clearfix no-border">
													<div className="block-header col-sm-4 no-padding">
															<h2 className="padding-top-5">Invites</h2>
													</div>
													<div className="col-sm-8 no-padding">
															<div className="inline-sec right-sec div-sec">
																	<select id="sort_type" className="myselectbox col-sm-12" value="">
																		<option>-- Select --</option>
																		<option>Most Recent</option>
																		<option>Least Recent</option>
																		<option>Most Contacted</option>
																		<option>Least Contacted</option>
																		<option>First Name</option>
																		<option>Fist Name(Z-A)</option>
																		<option>Last Name</option>
																		<option>Last Name(Z-A)</option>
																	</select>
															</div>
															<label className="inline-sec right-sec label-sec padding-top-10">Sort by:</label>
													</div>
											</li>
											<li className="list-group-item clearfix no-border top-border">
													<ul className="basic-list">
															<li className="clearfix">There are no agents.</li>
													</ul>
											</li>
									</ul>
							</div>
					</div>
					);
				}


			} else {
				return (
					<div className="row">
						<div className="col-sm-12 no-padding right-border padding-bottom">
								<div className="col-sm-12">
										<div className="view-sec">
												<label className="view-label">Event Title: </label>
												<div className="view-item clearfix">
														{ current_event.summary || current_event.title }
												</div>
										</div>
								</div>
								<div className="col-sm-12">
										<div className="view-sec">
												<label className="view-label">Date & Time: </label>
												<div className="view-item clearfix">
														{ temp_start }
												</div>
										</div>
								</div>
								<div className="col-sm-12">
										<div className="view-sec">
												<label className="view-label">Location: </label>
												<div className="view-item clearfix">
														{ current_event.location || "There is no location." }
												</div>
										</div>
								</div>
								<div className="col-sm-12">
										<div className="view-sec">
												<label className="view-label">Course Options </label>
												<div className="view-item clearfix">
														{ current_event.course_option || "There is no course option." }
												</div>
										</div>
								</div>
								<div className="col-sm-12">
										<div className="view-sec">
												<label className="view-label">Host Instructor </label>
												<div className="view-item clearfix">
														{ current_event.host_name || current_event.creator.email }
												</div>
										</div>
								</div>
								<div className="col-sm-12">
										<div className="view-sec">
												<label className="view-label">Description Calendars </label>
												<div className="view-item clearfix">
														<label className="i_calendar " style={{backgroundColor: color}}>&nbsp;</label>
																{ calendar_name }
												</div>
										</div>
								</div>
						</div>
					</div>
				);
			}


		}


}


export default connect(mapStateToProps, mapDispatchToProps)(ViewEvents);