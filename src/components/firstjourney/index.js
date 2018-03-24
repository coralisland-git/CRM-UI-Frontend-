import React from 'react';

import FirstStep from './children/firststep';
import SecondStep from './children/secondstep';
import ThirdStep from './children/thirdstep';
import FourthStep from './children/fourthstep';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/actions/firstjourney';
import { googleLogin } from '../../services/actions/gapi';
import { get_g_key } from '../../services/env';
import * as parser from 'parse-address';

import './style.scss';

class FirstJourney extends React.Component {


	constructor(props) {
		super(props);

		this.props.actions.getDefaultCircles();

		this.step = props.step;

		this.state = {
			step: 1,
			contacts: [],
		}
		this.percents = props.percents

		this.googleLogin = (SCOPES) => {
	    	this.props.googleLogin()
	    }

		this.addGoogleContacts = () => {
			if(gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn.get())
				this.updateSigninStatus(true);
			else
	    		this.props.googleLogin();
	    }

	    this.updateSigninStatus = (status) => {
	    	console.log("STATUS   ", status);
	    	var self=this;
	        gapi.client.people.people.connections.list({
	           'resourceName': 'people/me',
	           'pageSize': 25,
	           'personFields': 'names,emailAddresses,addresses,phoneNumbers',
	        }).then(function(response) {
	        	let tmp_contacts = [];
	        	if(response.result.connections) {
		        	response.result.connections.map(item => {
		        		let name = "", address="", city="", state="", zipcode="", phone="", email="";
		        		email = (item.emailAddresses && item.emailAddresses[0].value) || "";
		        		if(item.names && item.names[0])
		        			name = item.names[0].displayNameLastFirst;
		        		else name = email;
		        		if(name.indexOf('@') > -1)
		        			name = name.split('@')[0];
		        		if(item.addresses && item.addresses[0]) {
		        			let full_addr = parser.parseLocation(item.addresses[0].formattedValue);
		        			full_addr.number = full_addr.number? ''+full_addr.number: '';
		        			full_addr.prefix = full_addr.prefix? ''+full_addr.prefix: '';
		        			address= item.addresses[0].streetAddress || (full_addr.number+' '+full_addr.prefix+' '+full_addr.street) || "";
		        			city=item.addresses[0].city || full_addr.city || "";
		        			state=item.addresses[0].region || full_addr.state || "";
		        			zipcode=item.addresses[0].postalCode || full_addr.zip || "";

		        			// Validation
		        			if(city == "") {
		        				let t;
		        				t = item.addresses[0].formattedValue.split(",")[1]
		        				if(t && t!="") city = t.trim();
		        			}
		        			address = address.replace(city, "").trim(' ').trim(',').trim(' ');
		        		}
		        		if(item.phoneNumbers && item.phoneNumbers[0]) {
		        			phone=item.phoneNumbers[0].value || "";
		        		}
		        		tmp_contacts.push({
		        			email: email,
		        			name: name,
		        			address: address,
		        			city: city,
		        			state: state,
		        			zipcode: zipcode,
		        			phone: phone
		        		});
		        	});
		        	console.log(tmp_contacts);
		        	self.setState({
		        		contacts: tmp_contacts
		        	});
		        }
	        	self.stepUpdate(0, 33);
	        	self.newStep(self.step || 2);
			})
	    }

	    this.stepUpdate = (step, percent) => {
	    	let p = this.percents;
	    	console.log(p, step, percent);
	    	if(!p) p = "0,0,0";
	    	p = p.split(','); p[step] = percent;
	    	p = p.join(',');
	    	this.percents = p;
	    	this.props.actions.stepUpdate(p);
	    }

	    this.newStep = (step) => {
	    	this.setState({
	    		step: step
	    	})
	    }

	    this.stepUpdate = this.stepUpdate.bind(this);
	    this.updateSigninStatus = this.updateSigninStatus.bind(this);
	}

	componentDidMount() {
		$("#firstjourney").modal({
			backdrop: 'static',
			show: true,
			keyboard: false
		});
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function() {
		    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	    if(this.step) {
	    	if(this.step > 1 && this.props.user.gmail && this.props.user.gmail != "") {
	    		this.addGoogleContacts();
		    	this.newStep(this.step);
		    }
	    	this.step = null;
	    }
	}

	componentWillReceiveProps(nextProps) { 
		if(!this.props.gapi_status && nextProps.gapi_status)
			this.updateSigninStatus(true);
	}

	render() {
		let step_active = ["","active", "",""], i;
		let tab_active = ["", "", "", ""];
		for(i = 1; i <= this.state.step; i ++)
			step_active[i] = "active";
		tab_active[this.state.step] = "active in";
		return(
			<div className="firstjourney">
				<input type="hidden" defaultValue={this.state.contacts} />
				<div className="modal in fade" id="firstjourney" role="dialog">
				    <div className="modal-dialog modal-lg" role="document">
				        <div className="modal-content">
				            <div className="modal-header">
		                        <ul className="nav nav-tabs tab-nav-right nav-justified" role="tablist">
		                            <li role="presentation" className={step_active[1]} ><a> 1. Connect Google Account </a></li>
		                            <li role="presentation" className={step_active[2]} ><a> 2. Add 25 Contacts to Circle </a></li>
		                            <li role="presentation" className={step_active[3]} ><a> 3. Send Message </a></li>
		                            {/* <li role="presentation"><a> 2. Connect Calendar </a></li> */}
		                        </ul>
				            </div>
				            <div className="modal-body"> 
				            	<div className="tab-content">
				            		<div role="tabpanel" className={"tab-pane fade "+tab_active[1]} id="first">
				            			<FirstStep authGmail={this.addGoogleContacts} 
				            				newStep={this.newStep}> </FirstStep>
				            		</div>
				            		<div role="tabpanel" className={"tab-pane fade "+tab_active[2]} id="third">
				            			<ThirdStep stepUpdate={this.stepUpdate} 
				            				contacts={this.state.contacts} 
				            				circles={this.props.circles} 
				            				newStep={this.newStep}
				            				update={this.props.update}> </ThirdStep>
				            		</div>
				            		<div role="tabpanel" className={"tab-pane fade "+tab_active[3]} id="fourth">
				            			<FourthStep 
				            				complete={this.props.complete} 
				            				stepUpdate={this.stepUpdate} 
				            				newStep={this.newStep}
				            				dismiss={this.props.dismiss} > </FourthStep>
				            		</div>
				       			</div>
				            	<div role="tabpanel" className="tab-pane fade in active" id="home"></div>
				            </div>
				            <div className="modal-footer">
				            </div>
				        </div>
				    </div>
				</div>
				<div className="modal-backdrop fade in"></div>
			</div>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
    return { 
    	actions: bindActionCreators(actions, dispatch),
    	googleLogin: () => googleLogin(dispatch)
    }
}

const mapStateToProps = (state) => {
    return ({ 
    	circles: state.journey.circles, 
    	user: state.auth.user,
    	gapi_status: state.gapi.status
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstJourney);
