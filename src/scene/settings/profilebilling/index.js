import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileImage from '../components/imageupload';

import '../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import "./style.scss";

import profile_img from '../../../styles/assets/images/random-avatar7.jpg';
import credit_type from '../../../styles/assets/images/credit.png';
import RightNav from '../components/rightnav';
import * as userActions from '../../../services/actions/profile';
import { confirmAlert } from '../../../components/confirmdialog';

const mapDispatchToProps = (dispatch) => {
	return ({
		actions: bindActionCreators({...userActions}, dispatch),
	});
}

const mapStateToProps = (state) => {
	return ({ 
		user: state.auth.user,
		change_password_status: state.users.change_password_status
	});
}


class ProfileBilling extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: "",
			last_name: "",
			job_title: "",
			industry: "",
			brokerage: "",
			email: "",
			home_phone: "",
			cell_phone: "",
			address: "",
			address2: "",
			city: "",
			state: "",
			country: "USA",
			zipcode: "",
			profile_image: "",

			password: "",
			new_password: "",
			confirm_password: "",

			card_type: "",
			card_number: "",
			card_zip: "",
			card_cvv: "",
			card_exp_year: "",
			card_exp_month: "",
			card_last_name: "",
			card_number_appear: "",
			card_middle_name: "",
			card_future_use: false,

			shipping_address: "",
			shipping_city: "",
			shipping_state: "",
			shipping_zipcode: "",
			shipping_country: "USA",
			shipping_fax: "",
			shipping_company: "",

			billing_address: "",
			billing_city: "",
			billing_state: "",
			billing_zipcode: "",
			billing_fax: "",
			billing_country: "USA",
			billing_company: "",

			invalidProfileString: [''],
			invalidPasswordString: [''],
			invalidCardString: [''],
			invalidShippingString: [''],
			invalidBillingString: ['']
		};

		this.onChangeValue = this.onChangeValue.bind(this);
		console.log("---------")
	}

	componentWillMount() {
		if (this.props.user !== undefined) 
			this.setPropsToState(this.props.user);
	}

	componentDidMount() {
		if (this.props.user !== undefined) 
			this.setPropsToState(this.props.user);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.user !== this.props.user) {
			this.setPropsToState(newProps.user)
		}
	}

	setPropsToState(user) {
		this.setState({
			first_name: user.first_name,
			last_name: user.last_name,
			job_title: user.job_title || "",
			industry: user.industry || "",
			brokerage: user.brokerage || "",
			email: user.email || "",
			home_phone: user.home_phone || "",
			cell_phone: user.cell_phone || "",
			address: user.address || "",
			address2: user.address2 || "",
			city: user.city || "",
			state: user.state || "",
			country: user.country || "USA",
			zipcode: user.zipcode || "",
			profile_image: user.profile_image || "",
			password: "",
			new_password: "",
			confirm_password: "",

			card_type: user.card_type || "",
			card_number: user.card_number || "",
			card_zip: user.card_zip || "",
			card_cvv: user.card_cvv || "",
			card_exp_year: user.card_exp_year || "",
			card_exp_month: user.card_exp_month || "",
			card_last_name: user.card_last_name || "",
			card_number_appear: user.card_number_appear || "",
			card_middle_name: user.card_middle_name || "",
			card_future_use: false,

			shipping_address: user.shipping_address || "",
			shipping_city: user.shipping_city || "",
			shipping_state: user.shipping_state || "",
			shipping_zipcode: user.shipping_zipcode || "",
			shipping_country: user.shipping_country || "USA",
			shipping_fax: user.shipping_fax || "",
			shipping_company: user.shipping_company || "",

			billing_address: user.billing_address || "",
			billing_city: user.billing_city || "",
			billing_state: user.billing_state || "",
			billing_zipcode: user.billing_zipcode || "",
			billing_fax: user.billing_fax || "",
			billing_country: user.billing_country || "USA",
			billing_company: user.billing_company || "",
		})
	}

	onChangeValue(e, attr) {
		this.setState({
			[attr]: e.target.value, 
			'invalidProfileString': [''],
			'invalidCardString': [''],
			'invalidPasswordString': [''],
			'invalidShippingString': [''],
			'invalidBillingString': [''],
		});
	}

	onSaveProfile() {
		let invalidStr = [];
		var reg_number = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		var reg_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (this.state.first_name.length == 0 ) invalidStr.push('First Name is Required.');
		if (this.state.last_name.length == 0 ) invalidStr.push('Last Name is Required.');
		if (this.state.last_name.length == 0 ) invalidStr.push('Last Name is Required.');
		if (this.state.job_title.length == 0 ) invalidStr.push('Job Title is Required.');
		if (this.state.industry.length == 0 ) invalidStr.push('Industry is Required.');
		if (this.state.brokerage.length == 0 ) invalidStr.push('Brokerage is Required.');
		if (this.state.email.length == 0 ) invalidStr.push('Email is Required.');
		if (!reg_email.test(String(this.state.email).toLowerCase())) invalidStr.push('Email is not valid.');
		if (this.state.home_phone.length == 0 ) invalidStr.push('Phone is Required.');
		if (!reg_number.test(String(this.state.home_phone).toLowerCase())) invalidStr.push('Phone is not valid.');
		if (this.state.cell_phone.length == 0 ) invalidStr.push('Mobile Phone is Required.');
		if (!reg_number.test(String(this.state.cell_phone).toLowerCase())) invalidStr.push('Mobile Phone is not valid.');
		if (this.state.address.length == 0 ) invalidStr.push('Business address is Required.');
		if (this.state.address2.length == 0 ) invalidStr.push('address2 is Required.');
		if (this.state.city.length == 0 ) invalidStr.push('City is Required.');
		if (this.state.state.length == 0 ) invalidStr.push('State is Required.');
		if (this.state.country.length == 0 ) invalidStr.push('Country is Required.');
		if (this.state.zipcode.length == 0 ) invalidStr.push('Zip code is Required.');

		if (invalidStr.length > 0) {
			this.setState({'invalidProfileString': invalidStr});
			return;
		} else {
			let user_profile = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				job_title: this.state.job_title,
				industry: this.state.industry,
				brokerage: this.state.brokerage,
				email: this.state.email,
				home_phone: this.state.home_phone,
				cell_phone: this.state.cell_phone,
				address: this.state.address,
				address2: this.state.address2,
				city: this.state.city,
				state: this.state.state,
				country: this.state.country,
				zipcode: this.state.zipcode
			};

			if (this.state.profile_image !== '' && !this.state.profile_image.includes('http'))
				user_profile['profile_image'] = this.state.profile_image;

			// api call
			this.props.actions.saveProfileInfo(this.props.user, user_profile)
			.then(res => {
				confirmAlert({
				    template: "success",
				    message: "Update Profile has been successfully",
				    outerClick: true
				});
			});
		}

	}

	onChangePassword() {
		let invalidStr = [];

		if (this.state.password.length == 0 ) invalidStr.push('Current Password is Required.');
		if (this.state.password.length < 6 ) invalidStr.push('Current Password must be more than 6 characters.');
		if (this.state.new_password.length == 0 ) invalidStr.push('New Password is Required.');
		if (this.state.new_password.length < 6 ) invalidStr.push('New Password must be more than 6 characters.');
		if (this.state.confirm_password.length == 0 ) invalidStr.push('Confirmed Password is Required.');
		if (this.state.confirm_password.length < 6 ) invalidStr.push('Confirmed Password must be more than 6 characters.');
		if (this.state.new_password !== this.state.confirm_password) invalidStr.push('New Password is not matched to confirm password');

		if (invalidStr.length > 0) {
			this.setState({'invalidPasswordString': invalidStr});
			return;
		} else {
			let password = {
				password: this.state.password,
				new_password1: this.state.new_password,
				new_password2: this.state.confirm_password,
			}

			// call api
			this.props.actions.changePassword(password)
			.then(res => {
				confirmAlert({
				    template: "success",
				    message: "Change Password has been successfully",
				    outerClick: true
				});
			});
		}
	}

	onConnect() {
		let invalidStr = [];
		let invalidShippingStr = [];
		let invalidBillingStr = [];
		let valid = 0;
		let card_data;
		let	shipping_info;
		let	billing_info;

		var reg_number = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		if (this.state.card_type.length == 0 ) invalidStr.push('Card Type is Required.');
		if (this.state.card_number.length == 0 ) invalidStr.push('Card Name is Required.');
		if (this.state.card_exp_year.length == 0 ) invalidStr.push('Expired Year is Required.');
		if (this.state.card_exp_month.length == 0 ) invalidStr.push('Expired Month is Required.');
		if (this.state.card_cvv.length == 0 ) invalidStr.push('Security Code is Required.');
		if (this.state.card_zip.length == 0 ) invalidStr.push('Zip Code is Required.');
		if (this.state.card_number_appear.length == 0 ) invalidStr.push('User Name is Required.');
		if (this.state.card_last_name.length == 0 ) invalidStr.push('User Last Name is Required.');

		if (this.state.shipping_address.length == 0 ) invalidShippingStr.push('Shipping Address is Required.');
		if (this.state.shipping_city.length == 0 ) invalidShippingStr.push('Shipping City is Required.');
		if (this.state.shipping_state.length == 0 ) invalidShippingStr.push('Shipping State is Required.');
		if (this.state.shipping_country.length == 0 ) invalidShippingStr.push('Shipping Country is Required.');
		if (this.state.shipping_zipcode.length == 0 ) invalidShippingStr.push('Shipping Zip code is Required.');
		if (this.state.shipping_company.length == 0 ) invalidShippingStr.push('Shipping Company is Required.');
		if (this.state.shipping_fax.length == 0 ) invalidShippingStr.push('Shipping fax is Required.');
		if (!reg_number.test(String(this.state.shipping_fax).toLowerCase())) invalidShippingStr.push('Shipping Fax is not valid.');
	
		if (this.state.billing_address.length == 0 ) invalidBillingStr.push('Billing Address is Required.');
		if (this.state.billing_city.length == 0 ) invalidBillingStr.push('Billing City is Required.');
		if (this.state.billing_state.length == 0 ) invalidBillingStr.push('Billing State is Required.');
		if (this.state.billing_country.length == 0 ) invalidBillingStr.push('Billing Country is Required.');
		if (this.state.billing_zipcode.length == 0 ) invalidBillingStr.push('Billing Zip code is Required.');
		if (this.state.billing_company.length == 0 ) invalidBillingStr.push('Billing Company is Required.');
		if (this.state.billing_fax.length == 0 ) invalidBillingStr.push('Billing fax is Required.');
		if (!reg_number.test(String(this.state.billing_fax).toLowerCase())) invalidBillingStr.push('Billing Fax is not valid.');

		if (invalidStr.length > 0) {
			this.setState({'invalidCardString': invalidStr});
			valid += 1;
		} else {
			card_data = {
				card_type: this.state.card_type,
				card_number: this.state.card_number,
				card_zip: this.state.card_zip,
				card_cvv: this.state.card_cvv,
				card_exp_year: this.state.card_exp_year,
				card_exp_month: this.state.card_exp_month,
				card_last_name: this.state.card_last_name,
				card_number_appear: this.state.card_number_appear,
				card_middle_name: this.state.card_middle_name,
				card_future_use: this.state.card_future_use,
			}
		}

		if (invalidShippingStr.length > 0) {
			this.setState({'invalidShippingString': invalidShippingStr});
			valid += 1;
		} else {
			shipping_info = {
				shipping_address: this.state.shipping_address,
				shipping_city: this.state.shipping_city,
				shipping_state: this.state.shipping_state,
				shipping_zipcode: this.state.shipping_zipcode,
				shipping_country: this.state.shipping_country,
				shipping_fax: this.state.shipping_fax,
				shipping_company: this.state.shipping_company,
			}
		}

		if (valid == 0) {
			//api call
			debugger
			this.props.actions.saveProfileInfo(this.props.user, Object.assign({}, card_data, shipping_info))
			.then(res => {
				confirmAlert({
				    template: "success",
				    message: "Update Connect Info has been successfully",
				    outerClick: true
				});
			});

		}


	}

	componentDidMount() {
		$(".myselectbox").selectpicker();
	}

	componentDidUpdate() {
		$(".myselectbox").selectpicker("refresh");
	}

	getCropImage = (base_str) => {
		this.setState({profile_image: base_str});
	}

	render() {

		let current_user = {};

		return (
			<div id="profile_billing_page" className="container-fluid">
				<div className="row">
					<div className="col-sm-9">
								<div className="block-header clearfix">
				          	<h2 className="padding-top heading-me">Profile & Billing</h2>
				        </div>
				        <div className="card card-me border-me">
				          	<div className="body">
				          		<div className="col-sm-3 padding-top-60 text-center">
				          			<ProfileImage onGetCrop={this.getCropImage.bind(this)} />
				          		</div>
				          		<div className="col-sm-9 padding-top-60">
				          			<h2 className="heading-profile margin-top-0 padding-bottom">Personal Info</h2>
				          			<div className="col-sm-12 border-top no-padding">
				          				<div className="row">
				          					<div className="col-sm-12 col-red">
				          						{this.state.invalidProfileString.length && this.state.invalidProfileString.map(i => {
		          						            return <p key={i} className="col-red">{i}</p>;
		          						        })}
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>FIRST NAME </label>
					                          		<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="James"  value={this.state.first_name} onChange={(e) => this.onChangeValue(e, 'first_name')} />
				                          			</div>
					                       		</div>
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
			                          				<label>LAST NAME </label>
					                          		<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="Smith"  value={this.state.last_name}  onChange={(e) => this.onChangeValue(e, 'last_name')} />
					                          		</div>
			                        			</div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="row">
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>JOB TITLE </label>
						                          	<div className="form-line">
							                            <input className="form-control" type="text" placeholder="President"  value={this.state.job_title}  onChange={(e) => this.onChangeValue(e, 'job_title')} />
						                          	</div>
			                        			</div>
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>INDUSTRY </label>
						                          	<div className="form-line">
							                            <input className="form-control" type="text" placeholder="CEO"  value={this.state.industry}  onChange={(e) => this.onChangeValue(e, 'industry')} />
						                          	</div>
			                        			</div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="row">
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>BROKERAGE</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="Real Estate - Residential"  value={this.state.brokerage}  onChange={(e) => this.onChangeValue(e, 'brokerage')} />
						                          	</div>
			                        			</div>
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>EMAIL</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="email" placeholder="jamessmith@gmail.com"  value={this.state.email}  onChange={(e) => this.onChangeValue(e, 'email')} />
						                          	</div>
			                        			</div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="row">
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>PHONE NUMBER</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="(205)358-4944"  value={this.state.home_phone}  onChange={(e) => this.onChangeValue(e, 'home_phone')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>MOBILE PHONE</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="(205)358-4944"  value={this.state.cell_phone}  onChange={(e) => this.onChangeValue(e, 'cell_phone')} />
						                          	</div>
						                        </div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="row">
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>ADDRESS LINE 1</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="address"  value={this.state.address}  onChange={(e) => this.onChangeValue(e, 'address')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>ADDRESS LINE 2</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="address2"  value={this.state.address2}  onChange={(e) => this.onChangeValue(e, 'address2')} />
						                          	</div>
						                        </div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="row">
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>CITY</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="Persistance"  value={this.state.city}  onChange={(e) => this.onChangeValue(e, 'city')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>STATE</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="CA"  value={this.state.state}  onChange={(e) => this.onChangeValue(e, 'state')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
				          							<label>ZIPCODE</label>
				          							<div className="form-line">
				          								<input className="form-control" type="text" placeholder="332-4444" value={this.state.zipcode}  onChange={(e) => this.onChangeValue(e, 'zipcode')} />
				          							</div>
				          						</div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="form-group">
				          					<label>COUNTRY</label>
				          					<div className="form-line">
				          						<select className="myselectbox col-sm-12" value={this.state.country}  onChange={(e) => this.onChangeValue(e, 'country')} >
				          							<option readOnly value="USA">USA</option>
				          							<option readOnly value="UK">UK</option>
				          							<option readOnly value="France">France</option>
				          							<option readOnly value="Germany">Germany</option>
				          						</select>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding padding-bottom">
				          				<button type="button" className="btn btn-success btn-raised waves-effect btn-md right btn-padding" onClick={this.onSaveProfile.bind(this)} >SAVE</button>
				          			</div>

				          			<h2 className="heading-profile margin-top-0 padding-bottom">Forgot Password</h2>

				          			<div className="col-sm-12 border-top no-padding">
				          				<div className="row">
			          					<div className="col-sm-12 col-red">
			          						{this.state.invalidPasswordString.length && this.state.invalidPasswordString.map(i => {
	          						            return <p key={i} className="col-red">{i}</p>;
	          						        })}
			          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>CURRENT PASSWORD</label>
						                          	<div className="">
						                            	<input className="form-control" type="password" value={this.state.password}  onChange={(e) => this.onChangeValue(e, 'password')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>NEW PASSWORD</label>
						                          	<div className="">
						                            	<input className="form-control" type="password" value={this.state.new_password}  onChange={(e) => this.onChangeValue(e, 'new_password')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
				          							<label>CONFIRM NEW PASSWORD</label>
				          							<div className="">
				          								<input className="form-control" type="password" value={this.state.confirm_password}  onChange={(e) => this.onChangeValue(e, 'confirm_password')} />
				          							</div>
				          						</div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding padding-bottom border-bottom margin-bottom">
				          				<label className="padding-top-15">FORGOT PASSWORD</label>
				          				<button type="button" className="btn btn-success btn-raised waves-effect btn-md right" onClick={this.onChangePassword.bind(this)} >CHANGE PASSWORD</button>
				          			</div>

				          			<h2 className="heading-profile margin-top-0 padding-bottom">Credit Card Info</h2>

				          			<div className="col-sm-12 no-padding border-top padding-top-15 padding-bottom" >
				          				<label className="heading-profile">Credit Card</label>
				          				<img src={credit_type} alt="" className="credit_type" />
				          			</div>

				          			<div className="col-sm-12 no-padding border-top">
				          				<div className="row">
				          					<div className="col-sm-12 col-red">
				          						{this.state.invalidCardString.length && this.state.invalidCardString.map(i => {
		          						            return <p key={i} className="col-red">{i}</p>;
		          						        })}
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>CREDIT CARD TYPE</label>
						                            <select className="myselectbox form-select col-sm-12" value={this.state.card_type} onChange={(e) => this.onChangeValue(e, 'card_type')} >
									                    <option>Select Type</option>
									                    <option readOnly value="visa">Visa</option>
									                    <option readOnly value="master">Master Card</option>
									                    <option readOnly value="express">American Express</option>
									                    <option readOnly value="maestro">Maestro</option>
									                    <option readOnly value="jcb">JCB</option>
								                  	</select>
						                        </div>
				          					</div>
				          					<div className="col-sm-6">
				          						<div className="form-group">
						                          	<label>CREDIT CARD NUMBER</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="0000 0000 0000 0000"  value={this.state.card_number} onChange={(e) => this.onChangeValue(e, 'card_number')} />
						                          	</div>
						                        </div>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<div className="row">
				          					<div className="col-sm-3">
				          						<div className="form-group">
				          							<label>EXPIRATION DATE</label>
						                            <select className="myselectbox form-select col-sm-12" value={this.state.card_exp_month} onChange={(e) => this.onChangeValue(e, 'card_exp_month')}>
									                    <option>Month</option>
									                    <option readOnly value="01">January</option>
									                    <option readOnly value="02">Feburary</option>
									                    <option readOnly value="03">March</option>
									                    <option readOnly value="04">April</option>
									                    <option readOnly value="05">May</option>
									                    <option readOnly value="06">June</option>
									                    <option readOnly value="07">July</option>
									                    <option readOnly value="08">August</option>
									                    <option readOnly value="09">September</option>
									                    <option readOnly value="10">Octorber</option>
									                    <option readOnly value="11">November</option>
									                    <option readOnly value="12">December</option>
								                  	</select>
				                        		</div>
				          					</div>
				          					<div className="col-sm-3">
				          						<div className="form-group">
						                          	<label>&nbsp;</label>
						                            <select className="myselectbox form-select col-sm-12" value={this.state.card_exp_year} onChange={(e) => this.onChangeValue(e, 'card_exp_year')}>
									                    <option>Year</option>
									                    <option readOnly value="2018">2018</option>
									                    <option readOnly value="2019">2019</option>
									                    <option readOnly value="2020">2020</option>
									                    <option readOnly value="2021">2021</option>
									                    <option readOnly value="2022">2022</option>
									                    <option readOnly value="2023">2023</option>
									                    <option readOnly value="2024">2024</option>
									                    <option readOnly value="2025">2025</option>
									                    <option readOnly value="2026">2026</option>
									                    <option readOnly value="2027">2027</option>
									                    <option readOnly value="2028">2028</option>
									                    <option readOnly value="2029">2029</option>
									                    <option readOnly value="2030">2030</option>
								                 	 </select>
			                        			</div>
				          					</div>
				          					
			          						<div className="col-sm-3">
			          							<div className="form-group">
						                          	<label>SECURITY CODE</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="123"  value={this.state.card_cvv} onChange={(e) => this.onChangeValue(e, 'card_cvv')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-3">
				          						<div className="form-group">
						                          	<label>ZIP POSTAL</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="222 4463"  value={this.state.card_zip} onChange={(e) => this.onChangeValue(e, 'card_zip')} />
						                          	</div>
						                        </div>
					          				</div>
					          			</div>
				          			</div>

				          			<div className="col-sm-12 no-padding padding-bottom-30">
				          				<div className="row">
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>NAME AS IT APPEARS</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="James"  value={this.state.card_number_appear} onChange={(e) => this.onChangeValue(e, 'card_number_appear')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>MIDDLE NAME</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="Aston"  value={this.state.middle_name} onChange={(e) => this.onChangeValue(e, 'card_middle_name')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-4">
				          						<div className="form-group">
						                          	<label>LAST NAME</label>
						                          	<div className="form-line">
						                            	<input className="form-control" type="text" placeholder="Smith"  value={this.state.card_last_name} onChange={(e) => this.onChangeValue(e, 'card_last_name')} />
						                          	</div>
						                        </div>
				          					</div>
				          					<div className="col-sm-12">
				          						<input type="checkbox" id="selcheck" onChange={(e) => this.onChangeValue(e, 'card_future_use')} />
				          						<label htmlFor="selcheck">Do not save this card for future use.</label>
				          					</div>
				          				</div>
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<h2 className="heading-profile margin-top-0">Shipping Address</h2>
			          					<div className="col-sm-12 col-red">
			          						{this.state.invalidShippingString.length && this.state.invalidShippingString.map(i => {
	          						            return <p key={i} className="col-red">{i}</p>;
	          						        })}
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>ADDRESS</label>
					                          	<div className="form-line">
					                            	<input className="form-control" type="text" placeholder="Address"  value={this.state.shipping_address} onChange={(e) => this.onChangeValue(e, 'shipping_address')} />
					                          	</div>
					                        </div>
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>CITY</label>
					                          	<div className="form-line">
				                            		<input className="form-control" type="text" placeholder="City"  value={this.state.shipping_city} onChange={(e) => this.onChangeValue(e, 'shipping_city')} />
				                            	</div>
			                        		</div>
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>STATE/PROVINCE</label>
					                          	<div className="form-line">
					                            	<input className="form-control" type="text" placeholder="NY" value={this.state.shipping_state} onChange={(e) => this.onChangeValue(e, 'shipping_state')} />
					                          	</div>
					                        </div>
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>ZIP/POSTALCODE</label>
					                          	<div className="form-line">
					                            	<input className="form-control" type="text" placeholder="323-3444"  value={this.state.shipping_zipcode} onChange={(e) => this.onChangeValue(e, 'shipping_zipcode')} />
					                          	</div>
					                        </div>
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>FAX</label>
					                          	<div className="form-line">
					                            	<input className="form-control" type="text" placeholder="(205)358-4944"  value={this.state.shipping_fax} onChange={(e) => this.onChangeValue(e, 'shipping_fax')} />
					                          	</div>
					                        </div>
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>COUNTRY</label>
					                          	<div className="form-line">
				                            		<input className="form-control" type="text" placeholder="USA"  value={this.state.shipping_country} onChange={(e) => this.onChangeValue(e, 'shipping_country')} />
				                            	</div>
		                        			</div>
			          					</div>
			          					<div className="col-sm-12">
			          						<div className="form-group">
					                          	<label>COMPANY</label>
					                          	<div className="form-line">
					                            	<input className="form-control" type="text" placeholder="Agent Cloud"  value={this.state.shipping_company} onChange={(e) => this.onChangeValue(e, 'shipping_company')} />
					                          	</div>
					                        </div>
			          					</div>
				          				
				          			</div>

				          			<div className="col-sm-12 no-padding">
				          				<button type="button" className="btn btn-success btn-raised waves-effect btn-md right" onClick={this.onConnect.bind(this)} >CONNECT</button>
				          			</div>

				          		</div>
			          		</div>
			          	</div>
		        	</div>
			        <div className="col-sm-3 no-left-padding">
			        	<RightNav />
			        </div>
		        </div>
			</div>

		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileBilling);