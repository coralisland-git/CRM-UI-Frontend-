/* eslint-disable import/no-named-as-default */
import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { HashRouter, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import TopNav from './components/topnav';
import SideNav from './components/sidenav';
import SearchBox from './components/searchbox';
import Blanker from './components/blanker';
import Propert from './components/property-search-detail';
import TermsConditions from './components/terms_conditions';
import Dashboard from './scene/dashboard';
import Events from './scene/events';
import NewEvents from './scene/events/newevents';
import ViewEvents from './scene/events/viewevents';
import Leads from './scene/leads';
import ImportLeads from './scene/leads/importleads';
import Inbox from './scene/inbox';
import NewLeads from './scene/circles/newleads';
import Circles from './scene/circles';
import AddLeads from './scene/leads/addleads';
import AddContacts from './scene/contacts/addleads';
import Property from './scene/property';
import PropertyDetail from './scene/property/detail';
import MergeLeads from './scene/leads/mergeleads';
import TodoList from './scene/todolist';
import TaskTemplate from './scene/tasktemplate';
import Contacts from './scene/contacts';
import ImportContacts from './scene/contacts/importcontacts';
import Screencast from './scene/screencast';
import Webbuilder from './scene/webbuilder';
import Transaction from './scene/transaction';
import EmailSetting from './scene/settings/email';
import TeamSetting from './scene/settings/team';
import ProfileBilling from './scene/settings/profilebilling';
import CalendarSetting from './scene/settings/calendar';

import SearchResult from './scene/search/index';

import SingleProperty from './components/single-property';

import { auth, logOut } from './services/actions/auth';
import { googleLogin } from './services/actions/gapi';

import * as notificationActions from './services/actions/notifications';
import * as userActions from './services/actions/users';
import * as inboxActions from './actions/inbox';

import './styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import './styles/assets/css/main.css';
import './styles/assets/css/themes/all-themes.css';
import './style.css';

import ToastContainerCustom from './components/ToastContainerCustom';
import GapiNotify from './components/gapi_notify';
import LoadingBar from 'react-redux-loading-bar'
import { toast } from 'react-toastify';
// import NotFoundPage from './components/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';

Pusher.logToConsole = true;

var pusher = new Pusher('a0de568def4dc361bf5e', {
  cluster: 'mt1',
  encrypted: true
});

// var channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function(data) {
//   alert(data.message);
// });

setPusherClient(pusher);

class Container extends React.Component {

  state = {
    isAuthenticated: false
  }

  constructor(props) {
    super(props);

    this.state = {
      blanker: <Blanker />,
      gnotify: null,
      tc: null
    }

    $(document).on('ajaxStart', this.props.actions.showLoading)
    $(document).on('ajaxStop', this.props.actions.hideLoading)
  }

  componentDidMount() {
    let token = window.localStorage.getItem('token')
    let user = null;
    this.props.auth(token).then((res) =>{
      user = res;
      this.props.actions.getNotifications();
      this.props.actions.getTeamMembers();
      if (user.role == 'team')
        return this.props.actions.getParent(user.agent);
      else 
        return null;
    }).then(agent=>{
      this.setState({isAuthenticated: true});
      $(window).resize();
      document.getElementById("spinner").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      if(!user.is_first && user.gmail)
        this.props.googleLogin();
    });
  }

  componentWillReceiveProps(nextProps) {
    let self = this;
    let is_auth = (nextProps.user) && (nextProps.user.is_first || (!nextProps.user.is_first && nextProps.gapi_status || !nextProps.user.is_first && !nextProps.gmail))
    if(nextProps.user && this.state.blanker && is_auth) {
      setTimeout(() => {
        this.setState({
          blanker: null
        });
      }, 800);
    }
    if(nextProps.user && nextProps.user.role == 'team' && nextProps.user.is_first)
      this.setState({
        tc: <TermsConditions />
      })
    if(nextProps.gapi_message == "blocked-popup") {
      // toast.error("It appears that your browser's pop-up blocker is enabled. \nPlease disable it before continuing.")
      this.setState({
        gnotify: <GapiNotify />
      })
    } else {
      this.setState({
        gnotify: null
      })
    }
  }

  render() {
    var self=this;
    const activeStyle = { color: 'blue' };

    let {isAuthenticated} = this.state;
    
    let display = (!isAuthenticated ? 'none' : 'block');
    let topContainerStyle = this.state.blanker ? {height: '100vh', overflow: 'hidden'} : {};


    return (
      <div className="theme-deep-orange"
        style={topContainerStyle}>
        { this.state.blanker }
        { this.state.gnotify }
        { this.state.tc }

        <ToastContainerCustom />
        <LoadingBar style={{zIndex: 10000 ,backgroundColor: '#61e3ff' }}/>

        <section className="content">

          <div className="overlay"></div>

          <nav className="navbar clearHeader">
            <TopNav user={this.props.user}
              logOut={this.props.logOut} {...this.props}> </TopNav>
          </nav>
          <SideNav> </SideNav>
          { isAuthenticated?
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/add/" component={NewEvents} />
            <Route exact path="/events/edit/:eventid?" component={NewEvents} />
            <Route exact path="/events/view/:eventid?" component={ViewEvents} />
            <Route exact path="/leads/:type?" component={Leads} />

            <Route exact path="/import-leads/:type" component={ImportLeads} />
            <Route exact path="/inbox/:id?" component={Inbox} />
            <Route exact path="/newleads/:id?" component={NewLeads} />
            <Route exact path="/circles" component={Circles} />
            <Route exact path="/addleads/:type?/:id?" component={AddLeads} />
            <Route exact path="/addcontacts/:id?" component={AddContacts} />
            <Route exact path="/property" component={Property} />
            <Route exact path="/property/detail" component={PropertyDetail} />
            <Route exact path="/property/:id?" component={Propert} />
            <Route exact path="/mergeleads/:ids?" component={MergeLeads} />
            <Route exact path="/tasks" component={TodoList} />
            <Route exact path="/tasktemplate" component={TaskTemplate} />
            <Route exact path="/screencast" component={Screencast} />
            <Route exact path="/webbuilder" component={Webbuilder} />
            <Route exact path="/transactions" component={Transaction} />
            <Route exact path="/contacts/:type?" component={Leads} />
            <Route exact path="/contacts/import-contacts" component={ImportContacts} />

            <Route exact path="/settings/email" component={EmailSetting} />
            <Route exact path="/settings/team" component={TeamSetting} />
            <Route exact path="/settings/profile_billing" component={ProfileBilling} />
            <Route exact path="/settings/calendar" component={CalendarSetting} />

            <Route exact path="/search_result/:query?" component={SearchResult} />
          </Switch>
          :
          <label> Logging in </label>
        }
        </section>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.element
};


const mapDispatchToProps = (dispatch) => {
  return {
    auth: token => auth(token, dispatch),
    logOut: logOut,
    googleLogin: () => googleLogin(dispatch), 
    actions: bindActionCreators({showLoading, hideLoading, ...notificationActions, ...inboxActions, ...userActions}, dispatch)
  }

}

const mapStateToProps = (state) => {
  return ({ 
    user: state.auth.user,
    gapi_status: state.gapi.status,
    gapi_message: state.gapi.message,
    notifications: state.notifications.notifications
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));