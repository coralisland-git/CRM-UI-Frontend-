import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { getLeads, getLeadsByKey } from '../../services/actions/leads';
import { saveSearchKey } from './../../services/actions/search';
import { bindActionCreators } from 'redux';
import * as propertyAction from '../../services/actions/properties';

import './style.scss';

var SEARCH_RESULT = '/search_result'

class SearchBox extends React.Component {

	constructor() {
		super();

		this.state = {
			searchKey: '',
			currentUrl: '/',
			isSearch: false
		}

		this.searh = this.search.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
	}

	search(e) {
		e.preventDefault()

		this.setState({ searchKey: e.target.value, currentUrl: this.props.location.pathname });
	}

	_handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (this.state.searchKey == '') {
				$("#totalSearch").val("")
				this.props.history.push('/');
				this.props.getLeads();
			} else {		
				this.props.history.push({
					pathname: '/search_result/' + this.state.searchKey, 
					state: {searchKey: this.state.searchKey}
				})
			}
			
		}
	  }

	render() {
		return (
			<div className="searchbox">
		        <div className="form-group m-0">
		            <input 
		            	type="search"
		            	id="totalSearch"
		            	placeholder="" 
		            	className="form-control searchinput"
		            	value={this.state.searchKey}
		            	onChange={(e) => this.search(e)}
						onKeyPress={this._handleKeyPress} />
		        </div>
		        <i className="material-icons"> search </i>
			</div>
		);
	}

}


const mapDispatchToProps = (dispatch) => {
    return ({
        getLeadsByKey: (key) => { getLeadsByKey(key, dispatch); },
        getLeads: () => { getLeads(dispatch); },
		saveSearchKey: (key, url) => { saveSearchKey(key, url, dispatch); },
		propertyAction: bindActionCreators(propertyAction, dispatch)
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        leads: state.leads.leads,
        properties: state.property.properties,
        // currentUrl: state.search.currentUrl
    });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));

