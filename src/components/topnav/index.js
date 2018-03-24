import React from 'react';
import { NavLink } from 'react-router-dom';

import SearchBox from '../searchbox';
import './style.scss';

import avatar from '../../styles/assets/images/avatar.jpg'
import Alerts from '../alerts'

class TopNav extends React.Component {

	timerangeUpdate(new_range) {
		this.setState({
			timerange: new_range
		});
	}

	componentWillReceiveProps(nextProps) {

	}

	render() {
		let name = '';
		let user = this.props.user;
		let user_image;

		if(this.props.user && this.props.user.profile_image)
			user_image = this.props.user.profile_image;
		if(!user_image)
			user_image = avatar;
		if(user) {
			name = user.first_name + ' ' + user.last_name
			name = name.trim()
			if(name == '') name = user.email
		}
		return (
			<nav className="navbar clearHeader topnav">
                <div className="navbar-header"> 
                    <a href="javascript:void(0);" className="bars">
                    </a> 
                </div>
                <div className="navbar-header"> 
                    <SearchBox> </SearchBox>
                </div> 
		        <ul className="nav navbar-nav navbar-right">
                    {/* <Alerts {...this.props} type="message"/>
                    <li className="spliter"> </li> */}
                    <Alerts {...this.props} type="notification"/>
                    <li className="spliter"> </li>
		            <li className="dropdown avatar">
		            	<a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button">
			            	<span> 
                                { name } &nbsp;
                                <i className="fa fa-caret-down"> </i>
                            </span>
			            	<img src={user_image} />
			            </a>
			            <ul className="dropdown-menu">
                            {(user && user.role == 'team' && !user.is_admin) ? 
                                null
                                :
                                <li >
                                    <NavLink to="/settings/email"> Settings </NavLink>
                                </li>
                            }
	            			<li>
	            				<a href="javascript:void(0)" onClick={this.props.logOut} > Logout </a>
	            			</li>
			            </ul>
		            </li>
		        </ul>
			</nav>
		);
	}

}

export default TopNav;
