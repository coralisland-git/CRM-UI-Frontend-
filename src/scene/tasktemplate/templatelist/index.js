import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateTemplate from '../../../components/createtemplate';
import { getTemplates } from './../../../services/actions/templates';
import '../index.scss';


class TemplateList extends React.Component {
    constructor() {
        super();

        this.state = {
            templates: []
        }

        this.saveTemplate = this.saveTemplate.bind(this);
    }

    saveTemplate(templates) {
        this.setState({ templates: templates })
    }

    componentWillMount() {
        this.props.getTemplates();
    }

    render() {

        let {templates} = this.props;
        if (templates) {
            return (
                <div className="clearfix task-template" id="TemplateList">
                    <div className="row item template__header">
                        <span className="heading template-list-heading">Task Template</span>
                        <CreateTemplate 
                            btnClass="custom-btn no-icon" 
                            saveTemplate={this.saveTemplate}
                             />
                    </div>
                    <div className="row item template__content border">
                        <div className="item__row item__row--header">
                            <div className="item__column item__column--name">Name</div>
                            <div className="item__column item__column--step">Steps</div>
                            <div className="item__column item__column--progress">Progress</div>
                        </div>
                        {
                            templates.map((template, key) => {
                                let steps = 0;
                                let tasks = [];
                                let progress = 0;

                                if (template.action) {
                                    steps = JSON.parse(template.action);
                                    template.tasks.map(task => {
                                        steps.map((step) => {
                                            if (task.title == step.action) {
                                                tasks.push(task)
                                                if (task.status == "open") {
                                                    progress += 1;
                                                }
                                            }
                                        })
                                    })
                                }
                                
                                return (
                                    <div 
                                        className="item__row item__row--content point-cursor" 
                                        key={key}
                                        onClick={()=> this.props.changeViewMode(2, template)} >
                                        <div className="item__column item__column--name">
                                            <div>
                                                <div className="sub__heading">{template.name}</div>
                                                <div>{template.goal}</div>
                                            </div>
                                        </div>
                                        <div className="item__column item__column--step">{steps.length}</div>
                                        <div className="item__column item__column--progress">{progress}</div>
                                        <div className="item__column item__column--other">
                                            <i className="fa fa-angle-right" onClick={()=> this.props.changeViewMode(2, template)}></i>
                                        </div>
                                    </div>   
                                ) 
                                
                            })
                        }
                    </div>
                </div>
            )
        } else {
            return ('')
        }
    }
}

TemplateList.propsTypes = {
    changeViewMode: PropTypes.func.isRequired,
    templates: PropTypes.array
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getTemplates: () => { getTemplates(dispatch); }
    })
}

const mapStateToProps = (state) => {
    return ({ 
        templates: state.templates.templates,
        user: state.auth.user,
        leads: state.leads.leads,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);