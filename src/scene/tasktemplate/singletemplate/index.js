import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateTemplate from '../../../components/createtemplate';
import Steps from './steps';
import Contacts from './contacts';
import Leads from './leads';
import '../index.scss';

import { deleteTemplates } from './../../../services/actions/templates';
import { getLeads, createLeads } from './../../../services/actions/leads';
import CustomConfirmAlert, { confirmAlert } from '../../../components/confirmdialog';
import { withRouter, route } from 'react-router';
import { Route } from 'react-router-dom';


class SingleTemplate extends React.Component {
    constructor() {
        super();

        this.state = {
            template: {},
            isStepPage: 1
        }

        this.deleteTemplates = this.deleteTemplates.bind(this);
    }

    componentWillMount() {
        this.props.getLeads();
    }

    componentDidMount() {
    	$('.select-item').click(function () {
    		$(this).siblings().removeClass('active');
    		$(this).addClass('active')
    	})
    }

    deleteTemplates() {
    	let self = this;

        confirmAlert({
            title: 'Are you sure?',
            message: null,
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                this.props.deleteTemplates(self.props.template);
                setTimeout(() => {
                    confirmAlert({
                        template: "success",
                        message: "Success! Task has been deleted"
                    });
                    this.props.history.go('/tasktemplate');
                }, 100)
            }
        });
    }

    render() {
    	let self = this;
        let { template } = this.props;
        let tabData = [];
        
        switch(this.state.isStepPage) {
            case 1:
                tabData.push(<Steps template={this.props.template} key="step" changeViewMode={this.props.changeViewMode} />);
                break;
            case 2:
                tabData.push(<Contacts template={this.props.template} key="contacts" changeViewMode={this.props.changeViewMode} />);
                break;
            default:
                tabData.push(<Leads template={this.props.template} key="leads" changeViewMode={this.props.changeViewMode} />);
        }

    	return (
    		<div className="task-template" id="TemplateList">
                <div className="row item template__header">
                	<div className="flex-box">
	                	<span className="left-arrow"  onClick={() => this.props.changeViewMode(1)}>
	                		<i className="fa fa-angle-left"></i>
	                	</span>
	                	<div>
	                		<div className="heading">{template.name}</div>
	                		<div className="description">{template.goal}</div>
	                	</div>
	                </div>
                	<div className="item-header-right">
	                    <CreateTemplate btnClass="no-icon" saveTemplate={this.saveTemplate} />
	                    <button 
	                    	className="btn btn-default btn-raised m-l-15"
	                    	onClick={() => this.deleteTemplates()}
	                    	>
	                    	Delete
	                    </button>
	                </div>
                </div>
                <div className="row item template__content border">
                    <div className="item__row">
                        <div className="select-item active" onClick={() => this.setState({isStepPage: 1})}>Steps</div>
                        <div className="select-item" onClick={() => this.setState({isStepPage: 2})}>Contacts</div>
                        <div className="select-item" onClick={() => this.setState({isStepPage: 3})}>Leads</div>
                    </div>
                    {
                        tabData
                    }
                </div>
            </div>
    	)
    }
}

SingleTemplate.propTypes = {
	template: PropTypes.object,
	changeViewMode: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return ({
        deleteTemplates: (template) => { deleteTemplates(template, dispatch); },
        getLeads: () => { getLeads(dispatch); }
    })
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        leads: state.leads.leads,
    });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleTemplate));
