import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TemplateList from './templatelist';
import SingleTemplate from './singletemplate';
import { getTemplates } from './../../services/actions/templates';
import { getLeads, createLeads } from './../../services/actions/leads';
import { getCircles } from './../../services/actions/circles';

import './index.scss';

class TaskTemplate extends React.Component {
    constructor() {
    	super();

    	this.state = {
    		page: 1,
    		currentTemplate: {}
    	}

    	this.changeViewMode = this.changeViewMode.bind(this);
    }

    changeViewMode(page, template) {
    	if (template) {
    		this.setState({page: page, currentTemplate: template})
    	} else {
    		this.setState({page: page})
    	}
    	
    }

    comonentWillMount() {
    	this.props.getLeads();
    }

    render() {
    	let self = this;

    	let { page } = this.state;
    	let { templates } = this.props;
    	return (
    			page == 1 ?
    				<TemplateList 
    					changeViewMode={this.changeViewMode} />
    			:
    				<SingleTemplate 
    					template={this.state.currentTemplate} 
    					changeViewMode={this.changeViewMode} />		
    		
    	);
    }
}

const mapDispatchToProps = (dispatch) => {
	return ({
		// getTemplates: () => { console.log('AAAA'); getTemplates(dispatch); },
		// getLeads: () => { getLeads(dispatch); }
	})
}

const mapStateToProps = (state) => {
    return ({ 
    	templates: state.templates.templates,
		user: state.auth.user,
    	leads: state.leads.leads,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTemplate);