import { EVENTS } from './types';
import { POST, GET_L, PATCH, DELETE_L } from './http.service';
import { API_URL } from '../env';

const api_url = API_URL + "api/";

export const refreshMessage = (dispatch) => {
	dispatch({ type: EVENTS.REFRESH_MESSAGE });
}

export const shareCircle = (calendarid, circleid, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	};
	let obj = {
		share_circle: circleid,
	}
	PATCH(api_url + "calendar/" + calendarid + "/", obj, header).then((res) => {
		dispatch({ type: EVENTS.SHARE_CIRCLE, calendarid: calendarid, message: "ok" });
	}).catch((err) => {
		dispatch({ type: EVENTS.SHARE_CIRCLE, calendarid: calendarid, message: "error" });
	});
}


export const LoadBrokerCalendars = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "calendar/broker_calendars/", header).then((res) => {
			let response = [];
			res.forEach((re) => {
				let temp = {};
				temp.id = re.id.toString();
				temp.backgroundColor = re.color;
				temp.summary = re.name;
				temp.create_by = re.create_by;
				temp.email = re.email;
				temp.status = re.status;
				temp.share_circle = re.share_circle;
				temp.is_display = re.is_display;
				response.push(temp);
			});

			dispatch({ type: EVENTS.GET_BROKER_CALENDARS, items: response });
		}).catch((err) => {
		});
	}
}


export const saveGoogleCalendarToLocal = (calendar, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	};
	GET_L(api_url + "calendar/" + calendar.id + "/").then((res) => {
	}).catch((err) => {
		let obj = {
			color: calendar.backgroundColor,
			email: calendar.id,
			name: calendar.summary,
			status: "",
		}
		POST(api_url + "calendar/", obj, header).then((re) => {
			let obj = {
				id: re.id.toString(),
				email: re.email,
				backgroundColor: re.color,
				summary: re.name,
				created_by: re.created_by,
				status: re.status,
				share_circle: re.share_circle,
				is_display: re.is_display,
			}
			dispatch({ type: EVENTS.SAVE_CALENDAR, obj: obj });
		}).catch((er) => {
		});
	});
}

export const deleteGoogleCalendar = (calendar, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	};
	DELETE_L(api_url + "calendar/" + calendar.id, header).then((res) => {
		dispatch({ type: EVENTS.DELETE_GOOGLE_CALENDAR, calendar: calendar, message: "ok" });
	}).catch((err) => {
		dispatch({ type: EVENTS.DELETE_GOOGLE_CALENDAR, calendar: calendar, message: "error" });
	});

}

export const changeCalendarColor = (newColor, calendar, all_events, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	};
	let obj = {
		color: newColor
	};
	PATCH(api_url + "calendar/" + calendar.id + "/", obj, header).then((res) => {
		let col = {
			color: newColor,
		}
		all_events.forEach((eve) => {
			if (eve.organizer.email == calendar.id || eve.organizer.email == calendar.email) {
				PATCH(api_url + "event/" + eve.id + "/", col, header).then((re) => {
				}).catch((er) => {
				});
			}
		});
		dispatch({ type: EVENTS.CHANGE_LOCAL_CALENDAR_COLOR, color: newColor, calendar: calendar });
	}).catch((err) => {
	});

}

export const getCirles = (dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	GET_L(api_url + "circle/", header).then((res) => {
		dispatch({ type: EVENTS.GET_CIRLCES, circles: res });
	}).catch((err) => {
	});
}

export const deleteLocalEvent = (eventid, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	DELETE_L(api_url + "event/" + eventid + "/", header).then((res) => {
		dispatch({ type: EVENTS.DELETE_LOCAL_EVENT, eventid: eventid });
	}).catch((err) => {
		dispatch({ type: EVENTS.DELETE_LOCAL_EVENT, eventid: eventid });
	});
}

export const LoadLocalEvents = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "event/", header).then((res) => {
			let response = [];
			res.forEach((re) => {
				let temp = {};
				temp.id = re.id.toString();
				temp.event_type = re.notification_type;
				temp.lorem = re.notification_sendtype;
				temp.end = { dateTime: re.end }
				temp.submission_type = re.submission_type;
				temp.notification_sendtype = re.notification_sendtype;
				temp.attachments = re.attachments;
				temp.start = { dateTime: re.start };
				temp.image = re.image;
				temp.invite_circle = re.invited_group;
				temp.attachment = re.attachment;
				temp.longitude = re.longitude;
				temp.host_name = re.host_name;
				temp.calendar_type = re.calendar_type;
				temp.notifincation_reminderperiod = re.notifincation_reminderperiod;
				temp.description = re.description;
				temp.latitude = re.longitude;
				temp.invite_email = re.invited_email;
				temp.creator = { email: re.created_by };
				temp.type = re.type;
				temp.user = re.created_by;
				temp.timezone = re.timezone;
				temp.summary = re.title;
				temp.notification_type = re.notification_type;
				temp.color = re.color
				temp.location = re.location;
				temp.organizer = { email: re.calendar_type };
				temp.flag_modal = re.submission_type;
				temp.is_display = re.is_display;
				response.push(temp);
			});
			dispatch({ type: EVENTS.GET_LOCAL_EVENTS, items: response });
		}).catch((err) => {
		});
	}
}

export const LoadBrokerLocalEvents = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "event/broker_events/", header).then((res) => {
			let response = [];
			res.forEach((re) => {
				let temp = {};
				temp.id = re.id.toString();
				temp.event_type = re.notification_type;
				temp.lorem = re.notification_sendtype;
				temp.end = { dateTime: re.end }
				temp.submission_type = re.submission_type;
				temp.notification_sendtype = re.notification_sendtype;
				temp.attachments = re.attachments;
				temp.start = { dateTime: re.start };
				temp.image = re.image;
				temp.invite_circle = re.invited_group;
				temp.attachment = re.attachment;
				temp.longitude = re.longitude;
				temp.host_name = re.host_name;
				temp.calendar_type = re.calendar_type;
				temp.notifincation_reminderperiod = re.notifincation_reminderperiod;
				temp.description = re.description;
				temp.latitude = re.longitude;
				temp.invite_email = re.invited_email;
				temp.creator = { email: re.created_by };
				temp.type = re.type;
				temp.user = re.created_by;
				temp.timezone = re.timezone;
				temp.summary = re.title;
				temp.notification_type = re.notification_type;
				temp.color = re.color
				temp.location = re.location;
				temp.organizer = { email: re.calendar_type };
				temp.flag_modal = "broker-event";
				temp.is_display = re.is_display;
				if (id != re.created_by) {
					response.push(temp);
				}
			});

			dispatch({ type: EVENTS.GET_BROKER_LOCAL_EVENTS, items: response });
		}).catch((err) => {
		});
	}
}

export const LoadContactLocalEvents = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "event/contact_events/", header).then((res) => {
			let response = [];
			res.forEach((re) => {
				let temp = {};
				temp.id = re.id.toString();
				temp.event_type = re.notification_type;
				temp.lorem = re.notification_sendtype;
				temp.end = { dateTime: re.end }
				temp.submission_type = re.submission_type;
				temp.notification_sendtype = re.notification_sendtype;
				temp.attachments = re.attachments;
				temp.start = { dateTime: re.start };
				temp.image = re.image;
				temp.invite_circle = re.invited_group;
				temp.attachment = re.attachment;
				temp.longitude = re.longitude;
				temp.host_name = re.host_name;
				temp.calendar_type = re.calendar_type;
				temp.notifincation_reminderperiod = re.notifincation_reminderperiod;
				temp.description = re.description;
				temp.latitude = re.longitude;
				temp.invite_email = re.invited_email;
				temp.creator = { email: re.created_by };
				temp.type = re.type;
				temp.user = re.created_by;
				temp.timezone = re.timezone;
				temp.summary = re.title;
				temp.notification_type = re.notification_type;
				temp.color = re.color
				temp.location = re.location;
				temp.organizer = { email: re.calendar_type };
				temp.flag_modal = "broker-event";
				temp.is_display = re.is_display;
				if (id != re.created_by) {
					response.push(temp);
				}
			});
			dispatch({ type: EVENTS.GET_AGENT_LOCAL_EVENTS, items: response });
		}).catch((err) => {
		});
	}
}

export const GetBroker = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "user/broker/", header).then((res) => {
			dispatch({ type: EVENTS.GET_BROKER, broker: res });
		}).catch((err) => {
		});
	}
}

export const GetAgents = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "user/agent/", header).then((res) => {
			dispatch({ type: EVENTS.GET_AGENT, agents: res });
		}).catch((err) => {
		});
	}
}

export const LoadLeadEvents = (id, leadid, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	GET(api_url + "event/" + leadid).then((res) => {
		res.forEach((re) => {
			re.id = re.id.toString();
			re.summary = re.title;
			re.creator.email = re.creator;
			re.start.dateTime = re.start;
			re.end.dateTime = re.end;
			re.organizer.email = re.calendar_type;
			re.flag_modal = "normal";
		});
		dispatch({ type: EVENTS.GET_LOCAL_EVENTS, items: res });
	}).catch((err) => {
	});
}

export const LoadLocalCalendar = (id, dispatch) => {
	if (id) {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token " + window.localStorage.getItem('token'),
		}
		GET_L(api_url + "calendar/", header).then((res) => {
			let response = [];
			res.forEach((re) => {
				let temp = {};
				temp.id = re.id.toString();
				temp.backgroundColor = re.color;
				temp.summary = re.name;
				temp.create_by = re.create_by;
				temp.email = re.email;
				temp.status = re.status;
				temp.share_circle = re.share_circle;
				temp.is_display = re.is_display;
				response.push(temp);
			});

			dispatch({ type: EVENTS.GET_LOCAL_CALENDARS, items: response });
		}).catch((err) => {
		});
	}
}

export const InsertGoogleEvent = (item, color, dispatch) => {
	item.flag_modal = "normal";
	item.color = color;
	dispatch({type: EVENTS.INSERT_GOOGLE_EVENT, item: item});
}

export const UpdateGoogleEvent = (eventid, obj, dispatch) => {
	dispatch({type: EVENTS.UPDATE_GOOGLE_EVENT, eventid: eventid, obj: obj});
}

export const DeleteEvent = (eventid, calendarid, dispatch) => {
	dispatch({type: EVENTS.DELETE_EVENT, eventid: eventid, calendarid: calendarid });
}

export const changeCalendarStatus = (calendar_id, calendar, str, dispatch) => {
	dispatch({type: EVENTS.CHANGE_CALENDAR_STATUS, calendar_id: calendar_id, calendar: calendar, status: str});
}

export const changeDisplay = (is_display, calendar_id, calendar, dispatch) => {
	dispatch({ type: EVENTS.CHANGE_DISPLAY, is_display: is_display, calendar_id: calendar_id, calendar: calendar });
}

export const saveCalendar = (calendar_name, calendar_color, email, userid, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}

	let sending_obj = {
		email: email,
		color: calendar_color,
		name: calendar_name,
		create_by: userid,
		status: "",
	}

	POST(api_url + "calendar/", sending_obj, header).then((res) => {
		let obj = {
			id: res.id.toString(),
			email: res.email,
			backgroundColor: res.color,
			summary: res.name,
			created_by: userid,
			status: res.status,
			share_circle: res.share_circle,
			is_display: res.is_display,
		}
		dispatch({ type: EVENTS.SAVE_CALENDAR, obj: obj });
	}).catch((err) => {
	});

}

export const saveGoogleCalendars = (items, dispatch) => {
	items.forEach((item) => {
		item.status = "";
		item.share_circle = false;
		item.is_display = true;
	});
	dispatch({ type: EVENTS.SAVE_CALENDARS, calendars: items });
}

export const updateLocalEvent = (eventid, obj, color, modal_type, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	let item = {
		  end: obj.end,
		  submission_type: modal_type || "",
		  attachments: obj.attechments || "files",
		  start: obj.start,
		  invited_group: obj.invite_circle || "invite circle",
		  attachment: obj.attachment || "file",
		  longitude: 0,
		  host_name: obj.host_name || "host_name",
		  calendar_type: obj.calendarid || 0,
		  notifincation_reminderperiod: obj.notifincation_reminderperiod || 0,
		  description: obj.description || "description",
		  latitude: 0,
		  invited_email: obj.invite_email || "email",
		  type: 0,
		  timezone: obj.timezone || "time zone",
		  title: obj.title || "title",
		  color: color || "#444444",
		  location: obj.location || "location",
		  notification_type: obj.event_type || "",
		  notification_sendtype: obj.lorem,
	}
	if (obj.image != undefined && obj.image != "" && obj.image.indexOf('http') == -1) {
		item.image = obj.image;
	}

	PATCH(api_url + "event/" + eventid + "/", item, header).then((res) => {
		let send_obj = {
				id: res.id.toString(),
				end: { dateTime: res.end },
				event_type: res.notification_type,
				lorem: res.notification_sendtype,
				submission_type: res.submission_type || "",
				notification_sendtype: res.notification_sendtype || "notofication send tpe",
				attachments: res.attachments || "files",
				start: { dateTime: res.start },
				image: res.image || "#ececec",
				invite_circle: res.invited_group || "string",
				attachment: res.attachment || "file",
				longitude: 0,
				host_name: res.host_name || "host_name",
				calendar_type: res.calendar_type,
				notifincation_reminderperiod: res.notifincation_reminderperiod || 0,
				description: res.description || "description",
				latitude: 0,
				invite_email: res.invited_email || "email",
				creator: { email: res.created_by },
				type: 0,
				user: res.created_by,
				timezone: res.timezone || "time zone",
				summary: res.title || "title",
				notification_type: res.notification_type || "notification_type",
				color: color || "#444444",
				location: res.location || "location",
				organizer: { email: res.calendar_type.toString() },
				flag_modal: res.submission_type,
				is_display: res.is_display,
		}
		dispatch({ type: EVENTS.UPDATE_LOCAL_EVENT, obj: send_obj, eventid: eventid });
	}).catch((err) => {
		dispatch({ type: EVENTS.ERROR_EVENT_UPDATE });
	});	

}

export const saveLocalEvent = (obj, color, modal_type, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	let item = {
		  end: obj.end,
		  submission_type: modal_type || "",
		  attachments: obj.attachments || "files",
		  start: obj.start,
		  invited_group: obj.invite_circle || "invite circle",
		  attachment: obj.attachment || "file",
		  longitude: 0,
		  host_name: obj.host_name || "host_name",
		  calendar_type: obj.calendarid || 0,
		  notifincation_reminderperiod: obj.notifincation_reminderperiod || 0,
		  description: obj.description || "description",
		  latitude: 0,
		  invited_email: obj.invite_email || "email",
		  type: 0,
		  timezone: obj.timezone || "time zone",
		  title: obj.title || "title",
		  color: color || "#444444",
		  location: obj.location || "location",
		  notification_type: obj.event_type || "",
		  notification_sendtype: obj.lorem
	}

	if (obj.image != undefined || obj.image != "") item.image = obj.image;

	POST(api_url + "event/", item, header).then((res) => {
		let send_obj = {
				id: res.id.toString(),
				end: { dateTime: res.end },
				event_type: res.notification_type,
				lorem: res.notification_sendtype,
				submission_type: res.submission_type || "",
				notification_sendtype: res.notification_sendtype || "notofication send tpe",
				attachments: res.attachments || "files",
				start: { dateTime: res.start },
				image: res.image || "#ececec",
				invite_circle: res.invited_group || "string",
				attachment: res.attachment || "file",
				longitude: 0,
				host_name: res.host_name || "host_name",
				calendar_type: res.calendar_type,
				notifincation_reminderperiod: res.notifincation_reminderperiod || 0,
				description: res.description || "description",
				latitude: 0,
				invite_email: res.invited_email || "email",
				creator: { email: res.created_by },
				type: 0,
				user: res.created_by,
				timezone: res.timezone || "time zone",
				summary: res.title || "title",
				notification_type: res.notification_type || "notification_type",
				color: color || "#444444",
				location: res.location || "location",
				organizer: { email: res.calendar_type.toString() },
				flag_modal: res.submission_type,
				is_display: res.is_display,
		}
		dispatch({ type: EVENTS.SAVE_LOCAL_EVENT, obj: send_obj });
	}).catch((err) => {
		dispatch({ type: EVENTS.ERROR_EVENT_UPDATE });
	});

}


export const saveGoogleEventsToLocal = (c_id, color, user, items, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	items.forEach((item) => {
		let obj = {
			color: color,
			end: item.end.date && (item.end.date + " 00:00:00") || item.end.dateTime,
			host_name: user.first_name + " " + user.last_name,
			calendar_type: item.organizer.email,
			start: item.start.date && (item.start.date + " 00:00:00") || item.start.dateTime,
			title: item.summary,
			submission_type: "normal",
			attachments: item.id,
			invited_group: "invite circle",
			attachment: "file",
			longitude: 0,
			notifincation_reminderperiod: 0,
			description: "description",
			latitude: 0,
			invited_email: "email",
			type: 0,
			timezone: "time zone",
			location: "location",
			notification_type: "",
			notification_sendtype: "nothing",
		}

		POST(api_url + "event/", obj, header).then((res) => {
			let send_obj = {
					id: res.id.toString(),
					end: { dateTime: res.end },
					event_type: res.notification_type,
					lorem: res.notification_sendtype,
					submission_type: res.submission_type || "",
					notification_sendtype: res.notification_sendtype || "notofication send tpe",
					attachments: res.attachments || "files",
					start: { dateTime: res.start },
					image: res.image || "",
					invite_circle: res.invited_group || "string",
					attachment: res.attachment || "file",
					longitude: 0,
					host_name: res.host_name || "host_name",
					calendar_type: res.calendar_type,
					notifincation_reminderperiod: res.notifincation_reminderperiod || 0,
					description: res.description || "description",
					latitude: 0,
					invite_email: res.invited_email || "email",
					creator: { email: res.created_by },
					type: 0,
					user: res.created_by,
					timezone: res.timezone || "time zone",
					summary: res.title || "title",
					notification_type: res.notification_type || "notification_type",
					color: color || "#444444",
					location: res.location || "location",
					organizer: { email: res.calendar_type.toString() },
					flag_modal: res.submission_type,
					is_display: res.is_display,
			}
			dispatch({ type: EVENTS.SAVE_LOCAL_EVENT, obj: send_obj });
		}).catch((err) => {
		});

	});
}

export const saveEvents = (c_id, color, items, dispatch) => {
	items.forEach((item) => {
		item.flag_modal = "normal";
		item.color = color;
		item.is_display = true;
	});
 	dispatch({ type: EVENTS.SAVE_EVENTS, events: items });
}

export const saveColor = (selected_color, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	let obj = {
		value: selected_color,
	}
	POST(api_url + "color/", obj, header).then((res) => {
		dispatch({ type: EVENTS.SAVE_COLOR, color: selected_color });
	}).catch((err) => {
	});
	
}

export const LoadColor = (dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token'),
	}
	GET_L(api_url + "color/", header).then((res) => {
		let temp = [];
		res.forEach((re) => {
			temp.push(re.value);
		});
		dispatch({ type: EVENTS.GET_COLOR, colors: temp });
	}).catch((err) => {
	});
}

export const updateGoogleCalStatus = (status, dispatch) => {
	dispatch({ type: EVENTS.SET_GOOGLE_CAL_STATUS, status: status});
}

export const refreshError = (dispatch) => {
	dispatch({ type: EVENTS.REFRESH_ERROR });
}