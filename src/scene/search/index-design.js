import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLeadsByKey } from '../../services/actions/leads';
import { getProperties } from '../../services/actions/properties';
import { getSearchKey } from '../../services/actions/search';
import { withRouter, route } from 'react-router';
import './style.scss';

import { bindActionCreators } from 'redux';
import * as propertyAction from '../../services/actions/properties';

import mail_img from '../../styles/assets/images/avatar6.jpg';
import property_img from '../../styles/assets/images/puppy-1.jpg';

class SearchResult extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			properties: [],
			leads: [],
			isLoading: true
		}

		this.gotoDetail = this.gotoDetail.bind(this);
	}

	generateAvatar(lead, size=42) {
        let image = lead.image;

        if(image) 
            return (
            	<Link to={"/addleads/lead/" + lead.id} style={{cololr: 'white', textDecoration: 'none'}}>
            		<img src={image} className="avatar" style={{height: size+"px"}} />
            	</Link>
            )

        let leadname = (lead.first_name + ' ' + lead.last_name).trim()
        if(leadname.length == 0)
            leadname = lead.email;

        if(!leadname)
            leadname="Not Assigned";
        let short_name = leadname.trim()[0] + leadname.trim()[leadname.trim().search(' ')+1];
        let hash =0;
        for (let i = 0; i < leadname.length; i++) {
           hash = leadname.charCodeAt(i) + ((hash << 5) - hash);
        }
        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        c = "00000".substring(0, 6 - c.length) + c;

        return (
            <div className="avatar" style={{ backgroundColor: "#"+c, height: size+"px", width: size+"px" }} >
                <span>
                    <Link to={"/addleads/lead/" + lead.id} style={{color: 'white', textDecoration: 'none'}}>{short_name.toUpperCase()}</Link>
                </span>
            </div>
        )
    }

    componentWillMount() {
    	let query = this.props.match.params.query;
    	this.props.getLeadsByKey(query);
    	$("#totalSearch").val(query)
    }


    componentDidMount() {
    	let query = this.props.history.location.pathname.split('/');
    	query = query[query.length - 1]
    	setTimeout(()=> {
    		$("#totalSearch").val(query)
    	}, 1000)
    	

    	this.props.history.listen((location, action) => {

    	  	let query = location.pathname.split('/');
    	  	query = query[query.length - 1];
    	  	$("#totalSearch").val(query)
    	  	console.log('%%%: ', query)
    	  	this.props.getLeadsByKey(query);
    	  	let param = 'info_391a258r:991140483qd62526';
    	  	// c2ltcGx5cmV0czpzaW1wbHlyZXRz
    	  	this.props.propertyAction.searchProperties('q='+query, 'c2ltcGx5cmV0czpzaW1wbHlyZXRz');
    	  	
	    });
    }


    gotoDetail(lead) {
    	this.props.history.push('/addleads/lead/' + lead.id);
    }
	
	render () {
		let leads = [];
		let properties = [];
		let key = ''
		let a = this.props;

		if (this.props.searchKey) {
			key = this.props.searchKey;
		}	
		
		leads = this.props.leads;

		// this.props.leads.map((lead, i) => {
		// 	let cnt = 0;

		// 	if (lead.first_name) {
		// 		if (lead.first_name.indexOf(key) > -1)
		// 			cnt += 1;
		// 	}
		// 	if (lead.last_name) {
		// 		if (lead.last_name.indexOf(key) > -1)
		// 			cnt += 1;
		// 	}
		// 	if (lead.username) {
		// 		if (lead.username.indexOf(key) > -1)
		// 			cnt += 1;
		// 	}
		// 	if (lead.email) {
		// 		if (lead.email.indexOf(key) > -1)
		// 			cnt += 1;
		// 	}
		// 	if (cnt >0 ) leads.push(lead)
		// })

		if (this.props.properties.searchResults)
			properties = this.props.properties.searchResults;
		
		if (leads.length > 9) {
			leads = leads.slice(0, 9)
		}
		return (
			<div className="container-fluid" id="search_result_page">
				<div className="row">
					<div className="col-sm-12">
						<div className="block-header clearfix">
						<h2 className="padding-top heading-me">Search Results</h2>
						</div>
						<div className="col-sm-12 no-padding">
							<label className="heading-profile">PEOPLE</label><br/>
							{
								leads.length == 0 
									? <div>No leads</div>
									: <div className="row padding-bottom">
										{
											leads.map((lead, i) => {
												let avatar = this.generateAvatar(lead)
												return ( 
													<div className="col-sm-4" key={i} onClick={()=> this.gotoDetail(lead)}>
														<div className="card card-me pointer-cursor">
															<div className="body clearfix flexing">
																<div className="img-center">
																{avatar}
																</div>
																<div className="col-sm-12 flex-table-center">
																	{
																		lead.first_name 
																			? <label className="user_name pointer-cursor">{ lead.first_name + ' ' + lead.last_name } </label>
																			: lead.username 
																				 ? <label className="user_name pointer-cursor"> { lead.username } </label>
																				 : ''
																	}
																	<label className="pointer-cursor">{ lead.email }</label>
																</div>
															</div>
														</div>
													</div>
												)
											})
										}
									</div>
							}
							<label className="heading-profile">PROPERTIES</label><br/>
							<div className="row padding-bottom">
								{
									properties.map((property, i) => {
										return (
											<div className="col-sm-4" key={i}>
												<div className="card card-me">
													<div className="body clearfix">
														<div className="col-sm-4 no-padding">
															<img className="property_img" src={property.photos[0]} />
														</div>
														<div className="col-sm-8 no-padding">
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>MLS</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.mlsId}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Status</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.mls.status}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Address</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.address.streetName}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>City</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.address.city}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Price</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.listPrice}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Bedrooms</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.property.bedrooms}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Bathrooms</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.property.bathrooms}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Sq Ft</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">{property.property.area}</label>
																</div>
															</div>
															<div className="col-sm-12">
																<div className="col-sm-5 no-padding">
																	<label>Role</label>
																</div>
																<div className="col-sm-7 no-padding">
																	<label className="property_name">Seller</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

const mapDispatchToProps = (dispatch) => {
    return ({
		getLeads: () => { getLeads(dispatch); },
		getLeadsByKey: (key) => { getLeadsByKey(key, dispatch); },
		propertyAction: bindActionCreators(propertyAction, dispatch)
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        leads: state.leads.leads,
		properties: state.property,
		searchKey: state.search.searchKey
    });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult));
