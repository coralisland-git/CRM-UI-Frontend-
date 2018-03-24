import React from 'react';
import {bindActionCreators} from 'redux';
import RightNav from '../components/rightnav';
import UsersComponent from './children/users';
import PermissionComponent from './children/permission';

import {connect} from 'react-redux';
import './style.scss';

import * as userActions from '../../../services/actions/users';
const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators({...userActions}, dispatch)
    });
}   

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads,
        user: state.auth.user,
        users: state.users
    });
}
class TeamSettings extends React.Component {

	componentDidMount() {
		this.props.actions.getTeamMembers();
	}

    componentDidUpdate() {
        $(".myselectbox").selectpicker("refresh");
    }

	render() {
		let {user} = this.props;
		let {users} = this.props;
		let members = users.users ? users.users : [];

		let teamsettingUser = user;
		if(user.role == 'team')
			user = users.parent;
		
		return (
			<div className="teamsetting container-fluid">
				<div className="row teamsetting-content">
					<div className="col-md-9">
						<div className="block-header clearfix">
              <h2 className="padding-top heading-me">{!user ? '' : user.email}</h2>
            </div>
            <div className="card card-me">
    					<div className="body no-padding">
                <div className="col-sm-12">
                	<div className="row leftside">
		                <ul className="nav nav-tabs tab-nav-right" role="tablist">
		                    <li role="presentation" className="active"><a href="#users" data-toggle="tab">Users</a></li>
		                    <li role="presentation" style={{display: 'none'}}><a href="#permission" data-toggle="tab">Permission</a></li>
		                </ul>
		                <div className="tab-content contactcontents">
		                	<div role="tabpanel" className="tab-pane fade in active" id="users">
		                		<UsersComponent members={members} actions={this.props.actions} user={user}> </UsersComponent>
		                	</div>
		                	<div role="tabpanel" className="tab-pane fade" id="permission">
		                		<PermissionComponent actions={this.props.actions} user={user}> </PermissionComponent>
		                	</div>
		                </div>
		             	</div>
                </div>
              </div>
            </div>
					</div>
					<div className="col-md-3 no-left-padding">
						<RightNav />
					</div>
				</div>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSettings);
