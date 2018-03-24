import { EVENTS } from '../actions/types';

const InitialState = {
    events: [],
    i_color_array: [],
    status: false
}

const EventsReducer  = (state = InitialState, action) => {
    switch(action.type) {

        case EVENTS.REFRESH_MESSAGE:
            return { ...state, message: "" }

        case EVENTS.DELETE_GOOGLE_CALENDAR:
            let temp333 = state.selected_calendars.filter((ca) => {
                return ca.id != action.calendar.id;
            });
            return { ...state, selected_calendars: temp333, message: "delete_google_calendar_ok" }

        case EVENTS.SHARE_CIRCLE:
            if (action.message == "ok") {
                return { ...state, message: "share_circle_ok" }
            }
            if (action.message == "error") {
                return { ...state, message: "share_circle_error" }
            }
            return state;

        case EVENTS.GET_BROKER_CALENDARS:
            return { ...state, broker_calendars: action.items };

        case EVENTS.ERROR_EVENT_UPDATE:
            return { ...state, error: "event updating error" };

        case EVENTS.CHANGE_LOCAL_CALENDAR_COLOR:
            let cale = action.calendar;
            cale.backgroundColor = action.color;
            let temp99 = state.local_calendars.filter((cal) => {
                return cal.id != cale.id;
            });
            temp99.push(cale);
            let temp999 = state.selected_calendars.filter((cal) => {
                return cal.id != cale.id;
            });
            temp999.push(cale);
            let temp_events_1 = [];
            state.events.forEach((even) => {
                if (even.organizer.email == cale.id || even.organizer.email == cale.email) {
                    even.color = cale.backgroundColor;
                }
                temp_events_1.push(even);
            });
            let temp_events_2 = [];
            state.all_events.forEach((even) => {
                if (even.organizer.email == cale.id || even.organizer.email == cale.email) {
                    even.color = cale.backgroundColor;
                }
                temp_events_2.push(even);
            });
            return {...state, selected_calendars: temp999, local_calendars: temp99, events: temp_events_1, all_events: temp_events_2 };

        case EVENTS.CHANGE_CALENDAR_STATUS:

            if (action.status == "Display only this calendar") {
                let temp_all_events = state.all_events;
                let temp_events1 = temp_all_events.filter((event) => {
                    return event.organizer.email == action.calendar_id || event.organizer.email == action.calendar.email;
                });
                return {...state, events: temp_events1 }
            }
            if (action.status == "Hide this calendar from the list") {
                let temp_events = state.events;
                let temp_events2 = temp_events.filter((event) => {
                    return event.organizer.email != action.calendar_id && event.organizer.email != action.calendar.email;
                });
                return {...state, events: temp_events2 }
            }
            if (action.status == "Display all calendars") {
                let temp_events = state.all_events;
                return {...state, events: temp_events}
            }
            
            return state;

        case EVENTS.CHANGE_DISPLAY:
            let events_me = [];
            let temp_cals_s = Object.assign([], state.local_calendars);
            let seletected_cal_s = temp_cals_s.filter((cal) => {
                return cal.id == action.calendar_id;
            });
            if (seletected_cal_s.length > 0) {
                seletected_cal_s[0].is_display = action.is_display;
            }
            let temp_cals = Object.assign([], state.selected_calendars);
            let seletected_cal = temp_cals.filter((cal) => {
                return cal.id == action.calendar_id;
            });
            if (seletected_cal.length > 0) {
                seletected_cal[0].is_display = action.is_display;
                events_me = state.events;
                let temp_events2 = events_me.filter((event) => {
                    return event.organizer.email == action.calendar_id || event.organizer.email == action.calendar.email;
                });
                temp_events2.forEach((event) => {
                    event.is_display = action.is_display;
                });
            }

            return { ...state, local_calendars: temp_cals_s, selected_calendars: temp_cals, events: events_me };


        case EVENTS.SAVE_EVENTS:
            let temp_events = [];
            let tem_events = [];
            if (state.events == undefined) {
                temp_events = action.events;
            } else {
                temp_events = state.events.concat(action.events);
            }
            if (state.all_events == undefined) {
                tem_events = action.events;
            } else {
                tem_events = state.all_events.concat(action.events);
            }
            return { ...state, events: temp_events, all_events: tem_events, display_mode: "other" }

        case EVENTS.SAVE_CALENDAR:
            let temp_arr = [];
            if (state.local_calendars == undefined) {
             temp_arr["calendars"] = [action.obj];
            } else {
             temp_arr["calendars"] = [...state.local_calendars, action.obj];
            }
            if (state.selected_calendars == undefined) {
             temp_arr["selected_calendars"] = [action.obj];
            } else {
             temp_arr["selected_calendars"] = [...state.selected_calendars, action.obj];
            }
            return { ...state, local_calendars: temp_arr["calendars"], selected_calendars: temp_arr['selected_calendars'] }

        case EVENTS.SELECT_CALENDAR:
            if (state.selected_calendars === undefined) {
                let tempcals = state.calendars.filter((calendar) => {
                  return calendar.id == action.calendar_id;
                });
                return { ...state, selected_calendars: tempcals }
            } else {
                let flag_select_calendars = state.selected_calendars.filter((calendar) => {
                    return calendar.id == action.calendar_id;
                });
                if (flag_select_calendars.length == 0) {
                    let tempcals = state.calendars.filter((calendar) => {
                      return calendar.id == action.calendar_id;
                    });
                    let temp3 = [];
                    temp3 = state.selected_calendars.concat(tempcals);
                    return { ...state, selected_calendars: temp3 }
                } else {
                    return {...state, display_mode: "other"};
                }
            }
            return state;

        case EVENTS.SAVE_CALENDARS:
            return { ...state, calendars: action.calendars }

        case EVENTS.DELETE_EVENT:
            let temp5 = state.events.filter((event) => {
                return event.id != action.eventid;
            });
            let temp6 = state.all_events.filter((event) => {
                return event.id != action.eventid;
            });
            return {...state, events: temp5, all_events: temp6, display_mode: "other" }

        case EVENTS.INSERT_GOOGLE_EVENT:
            let temp7 = [];
            if (state.events.length == 0) {
                temp7.push(action.item);
            } else {
                temp7 = state.events.concat(action.item);
            }
            let temp8 = [];
            if (state.all_events == undefined) {
                temp8.push(action.item);
            } else {
                temp8 = state.all_events.concat(action.item);
            }
            return {...state, events: temp7, all_events: temp8, display_mode: "other"};

        case EVENTS.UPDATE_GOOGLE_EVENT:
            let temp9 = state.all_events.filter((event) => {
                return event.id == action.eventid;
            });
            if (temp9.length > 0) {
                temp9[0].summary = action.obj.summary;
                temp9[0].location = action.obj.location;
                temp9[0].description = action.obj.description;
                temp9[0].event_type = action.obj.event_type;
                temp9[0].invite_circle = action.obj.invite_circle;
                temp9[0].calendar = action.obj.calendar;
                temp9[0].lorem = action.obj.lorem;
                temp9[0].image = action.obj.image;
            }
            let temp10 = state.events.filter((event) => {
                return event.id == action.eventid;
            });
            if (temp10.length > 0) {
                temp10[0].summary = action.obj.summary;
                temp10[0].location = action.obj.location;
                temp10[0].description = action.obj.description;
                temp10[0].event_type = action.obj.event_type;
                temp10[0].invite_circle = action.obj.invite_circle;
                temp10[0].calendar = action.obj.calendar;
                temp10[0].lorem = action.obj.lorem;
                temp10[0].image = action.obj.image;
            }
            return {...state, display_mode: "other"};

        case EVENTS.GET_LOCAL_CALENDARS:
            let temp22 = action.items;
            let temp222 = Object.assign([], action.items);
            if (state.selected_calendars == undefined) {
                return {...state, local_calendars: temp22, selected_calendars: temp222 };
            }
            return state;

        case EVENTS.GET_CIRLCES:
            let temp33 = action.circles;
            if (state.circles == undefined) {
                return {...state, circles: temp33};
            }
            return state;


        case EVENTS.SAVE_LOCAL_EVENT:
            
            let temp77 = [];
            if (state.events.length == 0) {
                temp78.push(action.obj);
            } else {
                temp77 = state.events.concat(action.obj);
            }
            let temp88 = [];
            if (state.all_events == undefined) {
                temp88.push(action.obj);
            } else {
                temp88 = state.all_events.concat(action.obj);
            }
            return {...state, events: temp77, all_events: temp88, error: "update ok"};

        case EVENTS.UPDATE_LOCAL_EVENT:
            
            let templocals = state.events.filter((event) => {
                return event.id != action.eventid;
            });
            templocals.push(action.obj);
            let templocalssss = state.all_events.filter((event) => {
                return event.id != action.eventid;
            });
            templocalssss.push(action.obj);
            return {...state, events: templocals, all_events: templocalssss, error: "update ok"};

        case EVENTS.GET_LOCAL_EVENTS:
            let temp76 = [];
            if (state.events.length == 0) {
                temp76 = action.items;
            } else {
                temp76 = state.events;
            }
            let temp87 = [];
            if (state.all_events == undefined) {
                temp87 = action.items;
            } else {
                temp87 = state.all_events;
            }
            return {...state, events: temp76, all_events: temp87};

        case EVENTS.GET_BROKER_LOCAL_EVENTS:
            let temp_items = [];
            action.items.forEach((item) => {
                let temp_cal = state.broker_calendars.filter((ca) => {
                    return ca.id == item.organizer.email || ca.email == item.organizer.email;
                });
                if (temp_cal.length > 0) {
                    if (temp_cal[0].share_circle != "0") {
                        temp_items.push(item);
                    }
                }
            });
            return {...state, broker_events: temp_items};

        case EVENTS.GET_AGENT_LOCAL_EVENTS:
            let temp_agent = [];
            temp_agent = action.items;
            return {...state, broker_events: temp_agent};

        case EVENTS.GET_BROKER:
            return {...state, broker: action.broker};

        case EVENTS.GET_AGENT:
            return {...state, agents: action.agents};

        case EVENTS.DELETE_LOCAL_EVENT:
            let test_me = state.events.filter((event) => {
                return event.id == action.eventid;
            });
            debugger
            let temp55 = state.events.filter((event) => {
                return event.id != action.eventid;
            });
            let temp66 = state.all_events.filter((event) => {
                return event.id != action.eventid;
            });
            return {...state, events: temp55, all_events: temp66 }

        case EVENTS.SAVE_COLOR:
            let color_list = [];
            color_list = state.i_color_array.concat(action.color);
            return {...state, i_color_array: color_list };

        case EVENTS.GET_COLOR:
            let col_list = [];
            if (state.i_color_array.length == 0 ) {
                col_list = action.colors;
            } else {
                col_list = action.colors;
            }
            return {...state, i_color_array: col_list };

        case EVENTS.SET_GOOGLE_CAL_STATUS:
            return {...state, status: action.status }

        case EVENTS.REFRESH_ERROR:
            return { ...state, error: "" };

        default:
            return state;


    }
        
}
export default EventsReducer;
