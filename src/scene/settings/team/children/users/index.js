import React from 'react';
import CustomSwitch from '../../../components/customswitch';
import './style.scss';

import {toast} from 'react-toastify';

import CustomConfirmAlert, { confirmAlert } from '../../../../../components/confirmdialog';
class UsersComponent extends React.Component {
	state = {
		user:{
			first_name: '',
			last_name: '',
			email: '',
			is_active: false,
			is_admin: false,
			role: 'team',
			bre_number: ''
		},
		error: ''
	}

	handleSave(user) {
		let actions = this.props.actions;
		// if(user.first_name != '')
		user.broker_license = this.props.user.bre_number;
		user.bre_number = 100;

		actions.createUser(user).then((user)=>{
			this.setState({error: ''});
			$('#newusermodal').hide();
		}).catch(err => {
			this.setState({error: err.message ? err.message : err[Object.keys(err)[0]][0]});

		});

	}

	deleteUser(member) {
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            template : 'warning',
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                this.props.actions.deleteMember(member.id)
                .then((res)=>{
                	toast.success(`Succeed Delete ${member.first_name + ' ' + member.last_name}`, {autoClose: 10000});
                })
            }
        });
	}

	handleChange(member, field) {
		let obj = {};
		obj[field] = !member[field];
		let actions = this.props.actions;
		actions.updateUser(member, obj).then((user)=>{

		}).catch(err => {
			
		});
	}

	render() {
		let actions = this.props.actions;
		let {user, error} = this.state;
		let members = this.props.members;
		
		let membersRender = members.map((member)=>{
			return (
				<li className="item list-group-item" key={member.id}>
					<div className="flex-3">
						<strong> {member.first_name + ' ' + member.last_name} </strong> <br/>
						<span> {member.email} </span>
					</div>
					<div className="flex-2">
						{moment(member.created_at).format('MM-DD-YYYY')}
					</div>
					<div className="flex-2">
						{member.last_login ? moment(member.last_login).format('MM-DD-YYYY HH:MM:SS') : ''}
					</div>
					<div className="flex-2"  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CustomSwitch value={member.is_admin} onChange={this.handleChange.bind(this, member, 'is_admin')} />
					</div>
					<div className="flex-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CustomSwitch value={member.is_active} onChange={this.handleChange.bind(this, member, 'is_active')}/>
					</div>
					<div className="flex-1" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <i className="fa fa-trash" onClick={(ev)=>this.deleteUser.bind(this)(member)}/>
					</div>
				</li>);
		})
		return (
			<div className="userscomponent">
				<div className="infobar">
					<label className="m-l-20"> <strong style={{color: '#535353'}}> Team Members </strong> | {members.length} seats active </label>
					<button className="btn btn-raised btn-success m-r-20 waves-effect" data-toggle="modal" data-target="#newusermodal"  >
						ADD NEW USER
					</button>
				</div>
				{members.length > 0 ?
					<div className="table">
						<ul className="list-group table-header">
							<li className="list-group-item header" style={{border:0}}>
								<div className="flex-3" style={{marginLeft: 10}}>
									Name
								</div>
								<div className="flex-2" style={{marginLeft: 10}}>
									Create Date
								</div>
								<div className="flex-2" style={{marginLeft: 10}}>
										Last Sign In
								</div>
								<div className="flex-2" style={{marginLeft: 10}}>
									Admin?
								</div>
								<div className="flex-2" style={{marginLeft: 10}}>
									Active?
								</div>
								<div className="flex-1" style={{marginLeft: 10}}>
									
								</div>
							</li>
						</ul>
						<ul className="body list-group">
							{membersRender}

						</ul>
					</div> 
					:

					<div className="table text-center">
						No Members
					</div>

				}

				<div className="modal fade" id="newusermodal" role="dialog">
				    <div className="modal-dialog" role="document">
				    	<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" > Add New User </h4>
							</div>
							<div className="modal-body">
								{error !== ''? <div className="form-group withbadge">
									<span className="text-danger">  {error} </span>
								</div> : null}
								<div className="form-group withbadge">
									<label> First Name </label>
									<input value={user.first_name} type="text" className="form-control" name="first_name" autoComplete="name" onChange={(ev)=>{this.setState({user: {...user, first_name: ev.target.value}})}}/>
									<span  className="badge pull-right"> &# </span>
								</div>
								<div className="form-group">
									<label> Last Name </label>
									<input value={user.last_name} type="text" className="form-control" name="last_name" autoComplete="lname"  onChange={(ev)=>{this.setState({user: {...user, last_name: ev.target.value}})}}/>
								</div>
								<div className="form-group">
									<label> Email </label>
									<input value={user.email} type="email" className="form-control" name="frmEmailC" autoComplete="email"  onChange={(ev)=>{this.setState({user: {...user, email: ev.target.value}})}}/>
								</div>
							</div>
							<button className="btn btn-success btn-raised m-l-20 m-r-10" onClick={this.handleSave.bind(this, user)}> SAVE </button>
							<button className="btn btn-default" data-dismiss="modal" > CANCEL </button>
							<div className="modal-footer">
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UsersComponent;
