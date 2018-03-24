import React from 'react';
import { connect } from 'react-redux';

import { createLeads } from '../../../../services/actions/leads';
import { addLeadsToCircle } from '../../../../services/actions/firstjourney';


import '../../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import '../../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import './style.scss';

class ThirdStep extends React.Component {


	constructor(props) {
		super(props);

		this.createdleads = false;

		this.leadCircleAssign = {};

		this.default_circles_select = [];

		for(let key in props.circles) {
			let item = props.circles[key]
			this.default_circles_select.push(
				<option key={item.id} value={item.id} >
					<i className="material-icons" style={{color: item.color }} > fiber_manual_record </i>
					<span> {item.name} </span>
            	</option>
			)
		}

		this.createLeads = () => {
			if(this.createdleads || this.props.contacts.length == 0) return;
			this.createdleads = true;
			let user_id = this.props.user.id;
			let count = 25;
			this.props.contacts.map(item => {
				if(count <= 0) return;
				count = count - 1;
				let names = item.name.split(',');
				let email = item.email
				let f_name = names[names.length - 1].trim();
				let l_name = names[0].trim();
				if(f_name == l_name)
					l_name = l_name[0] || "";
				if(f_name.length == 0) {
					f_name = "N";
					l_name = "A";
				}
				let lead = {
					'email': email,
					'first_name': f_name,
					'last_name': l_name,
					'is_lead': false,
					'created_by': user_id
				}
				if(item.address) lead.address = item.address;
				if(item.city) lead.city = item.city;
				if(item.state) lead.state = item.state;
				if(item.zipcode) lead.zipcode = item.zipcode;
				if(item.phone) lead.phone_home = item.phone;
				this.props.createLeads(lead);
			})
		}

		this.saveCircles = () => {
			var self = this;
			let data = {};
			for(let key in this.props.circles) {
				let item = this.props.circles[key];
				data[item.id] = [];
				for(let lead_id in self.leadCircleAssign) {
					if(self.leadCircleAssign[lead_id].indexOf(""+item.id) != -1) {
						data[item.id].push(parseInt(lead_id))
					}
				}
			};
			self.props.addLeadsToCircle(data);
			if(self.props.contacts.length ==25)
				self.props.stepUpdate(1, 33);
			self.props.newStep(3);
		}

		this.changeCircleInfo = (ev, lead_id) => {
			this.leadCircleAssign[lead_id] = [].concat($(ev.target).val());
		}

		this.createLeads = this.createLeads.bind(this);
		this.saveCircles = this.saveCircles.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.createLeads();
		this.default_circles_select = [];
		this.leadCircleAssign = {};
		for(let key in nextProps.circles) {
			let item = nextProps.circles[key]
			this.default_circles_select.push(
				<option key={item.id} value={item.id} >
					<i className="material-icons" style={{color: item.color }} > fiber_manual_record </i>
					<span> {item.name} </span>
            	</option>
			)
		}
	}

	componentDidUpdate() {
		$("select").selectpicker('destroy');
		$("select#thirdstepselect").selectpicker('refresh');
	}

	componentDidMount() {
		$("select").selectpicker('destroy');
		$("select#thirdstepselect").selectpicker();
	}

	render() {
		let contact_list = [];
		this.props.leads.slice(0,25).map(item => {
			contact_list.push(
				<div className="row" key={item.id} >
					<div className="col-md-6"> 
		                <div className="form-group">
							<div className="inputgroup form-line">
								<input type="text" className="form-control" value={item.first_name+' '+item.last_name} readOnly />
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="dropdowncontainer">
							<select id="thirdstepselect" className="selectpicker form-control" multiple onChange={ev => { this.changeCircleInfo(ev, item.id) }} >
								{this.default_circles_select}
							</select>
						</div>
					</div>
				</div>
			)
		})
		let no_contacts = false;
		if(contact_list.length == 0) {
			no_contacts = true;
			contact_list.push(<div key={null}> No contacts found on your Google Account </div>);
		}
		return (
			<div className="thirdstep">
				<div className="contactlistcontainer custom-scroll">
					{contact_list}
				</div>
				<div className="pull-right">
					<a href="#fourth" data-toggle="tab"> <button className="btn btn-default btn-raised waves-effect m-r-15">
						Setup this later
					</button> </a>
					{ no_contacts == false? 
						<button className="btn btn-warning btn-raised waves-effect" onClick={this.saveCircles}>
							Add
						</button>
						: null
					}
				</div>
				<div className="clearfix"> </div>
				<hr />
				<div className="footerbuttons">
					<a href="#first" data-toggle="tab" onClick={() => {this.props.newStep(1);}} > 
						<i className="material-icons"> navigate_before </i>
						Previous 
					</a>
					<a> &nbsp; </a>
					<a href="#fourth" data-toggle="tab" onClick={() => {this.props.newStep(3);}} > 
						Next 
						<i className="material-icons"> navigate_next </i>
					</a>
				</div>
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
    return { 
    	createLeads: lead => { createLeads(lead, dispatch); }, 
    	addLeadsToCircle: data => { addLeadsToCircle(data, dispatch); }
    }
}

const mapStateToProps = (state) => {
    return ({ 
    	leads: state.leads.leads,
    	user: state.auth.user
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep);
