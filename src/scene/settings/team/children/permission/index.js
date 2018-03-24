import React from 'react';

import './style.scss';

class PermissionComponent extends React.Component {
	state={
		teamsetting : {contactDataExport: false, shareAllContacts: false, archievingDeleting: false, shareLastContact: false}
	}
	componentWillReceiveProps(props) {
		let user = props.user;
		let teamsetting;
		if(user.team_settings){
			teamsetting = JSON.parse(user.team_settings);
		} else {
			teamsetting = {contactDataExport: false, shareAllContacts: false, archievingDeleting: false, shareLastContact: false};
		}
		this.setState({teamsetting: teamsetting});	
	}

	handleToggleChange(key){
		let temp = this.state.teamsetting;
		temp[key] = !this.state.teamsetting[key];
		this.setState({teamsetting: temp});	
	}

	handleSave() {
		let obj = {};
		obj['team_settings'] = JSON.stringify(this.state.teamsetting);
		let actions = this.props.actions;
		actions.updateUser(this.props.user, obj).then((user)=>{

		}).catch(err => {
			
		});
	}

	render() {
		let teamsetting = this.state.teamsetting;
		return (
			<div className="permissioncomponent">
				<ul className="list-group">
					<li className="list-group-item">
						<div className="m-b-5"><strong> Contact Data Export </strong> </div>
						<input type="checkbox" id="contact-data-expert" checked={teamsetting.contactDataExport} onChange={this.handleToggleChange.bind(this, 'contactDataExport')}/>
						<label htmlFor="contact-data-expert">
							I want all the team members to be able to export contact data. (Unchecking this would limit export capability to admin only).
						</label>
					</li>
					<li className="list-group-item">
						<div className="m-b-5"><strong> Share All Contacts </strong>  </div>
						<input type="checkbox" id="share-all-contacts"  checked={teamsetting.shareAllContacts} onChange={this.handleToggleChange.bind(this, 'shareAllContacts')} />
						<label htmlFor="share-all-contacts">
							When enabled all team members to be able to see every contact in the team's account.
						</label>
					</li>
					<li className="list-group-item">
						<div className="m-b-5"><strong> Archiving and Deleting Contacts </strong>  </div>
						<input type="checkbox" id="archive-and-deleting"  checked={teamsetting.archievingDeleting} onChange={this.handleToggleChange.bind(this, 'archievingDeleting')}/>
						<label htmlFor="archive-and-deleting">
							I want all the team members to be able to archive and delete any contact shared with them. (Unchecking this would limit your team members to archiving and deleting their contacts only).
						</label>
					</li>
					<li className="list-group-item">
						<div className="m-b-5"><strong> Share last Contacted Information </strong>  </div>
						<input type="checkbox" id="share-list"  checked={teamsetting.shareLastContact} onChange={this.handleToggleChange.bind(this, 'shareLastContact')}/>
						<label htmlFor="share-list">
							I want all the team memebers to be able to see when the last time any member of the team spoke with a contact. (Team admins will still be able to see the information accross the team)
						</label>
					</li>
				</ul>
				<div className="m-l-20">
					<button className="btn btn-raised btn-success m-r-20 waves-effect" data-toggle="modal" data-target="#newusermodal" onClick={this.handleSave.bind(this)} >
						SAVE SETTINGS
					</button>
				</div>
			</div>
		);
	}
}

export default PermissionComponent;