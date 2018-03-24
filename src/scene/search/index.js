import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLeadsByKey } from '../../services/actions/leads';
import { searchPropertiesC } from '../../services/actions/properties';
import { getSearchKey } from '../../services/actions/search';
import { getTemplates } from '../../services/actions/templates';
import { withRouter, route } from 'react-router';
import './style.scss';

import mail_img from '../../styles/assets/images/avatar6.jpg';
import property_img from '../../styles/assets/images/puppy-1.jpg';

import SearchLead from './lead';
import SearchProperty from './property';
import SearchTemplate from './card';

class SearchResult extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchKey: "",
			isLoading: true
		}
	}

	componentWillMount() {
		let query = this.props.match.params.query;
		this.setState({ searchKey: query });
		this.props.getLeadsByKey(query);
		// let url = "q=" + query;
		// let param = "c2ltcGx5cmV0czpzaW1wbHlyZXRz";
		// this.props.searchPropertiesC(url, param);
		// this.props.getTemplates();
		$("#totalSearch").val(query);
		
	}

	componentDidMount() {
		let query = this.props.history.location.pathname.split('/');
		query = query[query.length - 1]
		setTimeout(()=> {
			$("#totalSearch").val(query);
		}, 1000);
		this.props.history.listen((location, action) => {
			let query = location.pathname.split('/');
			query = query[query.length - 1];
			this.setState({ searchKey: query });
			$("#totalSearch").val(query);
			this.props.getLeadsByKey(query);
			// let url = "q=" + query;
			// let param = "c2ltcGx5cmV0czpzaW1wbHlyZXRz";
			// this.props.searchPropertiesC(url, param);
			// this.props.getTemplates();
		});
	}

	componentDidUpdate() {
		$("#totalSearch").val(this.state.searchKey);
	}

	componentWillReceiveProps(newProps) {
		this.props = newProps;
	}
	
	render () {
		let leads = [];
		let properties = [];
		let key = this.state.searchKey || "";
		
		return (
			<div className="container-fluid" id="search_result_page">
				<div className="row">
					<div className="col-sm-12">
						<div className="block-header clearfix">
							<h2 className="padding-top heading-me">Search Results</h2>
						</div>
						<SearchLead query={ key } parent = { this.props } />
					</div>
				</div>
			</div>
		);
	}

}

const mapDispatchToProps = (dispatch) => {
	return ({
		getLeads: () => { getLeads(dispatch) },
		getLeadsByKey: (key) => { getLeadsByKey(key, dispatch) },
		searchPropertiesC: (url, param) => { searchPropertiesC(url, param, dispatch) },
		getTemplates: () => { getTemplates(dispatch) },
	});
}

const mapStateToProps = (state) => {
	return ({ 
		user: state.auth.user,
		leads: state.leads.leads,
		properties: state.property,
		templates: state.templates.templates,
		searchKey: state.search.searchKey
	});
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult));
