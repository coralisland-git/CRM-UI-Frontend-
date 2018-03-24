import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import InputBox from '../inputbox';
import DatePicker from '../datepicker';
import { getTemplates, applyTemplates, updateTemplates } from '../../services/actions/templates';
import { getCircles } from '../../services/actions/circles';
import CustomComponents from '../image-select/CustomComponents';

import './index.scss';
import '../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
import '../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';

class ApplyTemplate extends React.Component {

  constructor(props){
    super(props);
       this.state = {
            name: 'APPLY TASK TEMPLATE TO LEAD' || this.props.type,
            goal: '',
            isAddCircle: false,
            isCircle: false,
            isTask: false,
            currentCircles: [],
            currentTasks: [],
            showTasks: [],
            tempAction: '',
            nameError: false,
            goalError: false,
            templates: [],
            isError: false,
            errMessage: ''
        };

        this.creatNewTemplate = this.creatNewTemplate.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.addLeadTemplate = this.addLeadTemplate.bind(this);
  }

  componentDidMount() {
    const self = this;

    setTimeout(()=> {
      $('select').selectpicker();
    }, 500)

    $("#openApplyBtn").click(function() {
      self.setState({ currentTasks: [] })
      $("#applyTemplates").modal('show')
    }) 
  }

  creatNewTemplate() {
    let self = this;
    let currentTasks = Object.assign([], this.state.currentTasks);
    let id = Math.random().toString(36).substring(2, 15);
    let options = {lead: {}, template: {}};
    
    if (this.props.leads.length != 0 && this.props.templates.length != 0) {
      options.lead = this.props.leads[0];
      options.template = this.props.templates[0];
      currentTasks.push(options)

      this.setState({ currentTasks: currentTasks })
    } else {
      alert('there is no lead or template')
    }

    setTimeout(()=> {
      $('select').selectpicker();
    }, 500)
  }

  addCurrentTemplate(e, attr) {
    let currentTasks = Object.assign([], this.state.currentTasks);
    let index = e.target.selectedOptions[0].attributes[1].value;
    currentTasks[index][attr] = JSON.parse(e.target.value);

    this.setState({ currentTasks: currentTasks });
  }

  addLeadTemplate(option, key) {
    let currentTasks = Object.assign([], this.state.currentTasks);
    currentTasks[key]['lead'] = option;

    this.setState({ currentTasks: currentTasks });
  }

  saveTemplate() {
    let {currentTasks} = this.state;
    let data = {};

    currentTasks.forEach((item, key) => {
      // let template = {};
      // let tLead = [];
      // tLead.push(item.lead.id);
      // template.id = item.template.id;
      // template.leads = tLead;
      // this.props.applyTemplates(template);

      let template = {};
      let leads = [];
      let name = '';
      let goal = '';

      leads.push(item.lead.id);
      template.leads = leads;
      template.id = item.template.id;
      template.name = item.template.name;
      template.goal = item.template.goal;
      this.props.applyTemplates(template);
    });

    // $('#applyTemplateModal').modal('hide')
  }

  generateAvatar(lead, size=42) {
    let image = lead.image;

    if(image) 
        return <img src={image} className="avatar" style={{height: size+"px"}} />

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
                {short_name.toUpperCase()}
            </span>
        </div>
    )
  }

  openSelect() {
    $(".select-custom-menu").addClass('active');
  }
 
  render() {
    let leads = [];
    let templates = [];
    if (this.props.inputLeads) {
      leads = this.props.inputLeads
    } else if (this.props.leads) {
      leads = this.props.leads;
    }
    if (this.props.templates) {
      templates = this.props.templates;
    }

    leads = leads.sort(function(a, b) { 
      let val1 =  (a.first_name + ' ' +a.last_name);
      let val2 =  (b.first_name + ' ' +b.last_name);

      const ret = val1.localeCompare(val2);
      return ret;
    }).reverse();

    let tTemp = leads[0];

    return (
      <div className="todolist tab-content">
        <button 
          id="openApplyBtn"
          className={ 
            this.props.btnClass? 
              "btn btn-raised waves-effect pull-right " + this.props.btnClass 
            : 
              "btn btn-raised waves-effect pull-right"
          } 
          data-toggle="modal" 
          data-target="#applyTemplateModal">
            <i className="fa fa-plus"></i>{this.state.name}
        </button>
        <div className="modal fade" id="applyTemplateModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                  {
                    this.state.isError ?
                      <div className="alert alert-danger">{this.state.errMessage}</div>    
                    :
                      ''
                  }
                  
                  <div className="header">
                      <span className="modal-title  font-bold h4" id="createModalLabel">APPLY TEMPLATE TO LEADS</span>
                  </div>
                  <div className="modal-body no-side-padding">
                    <div className="row control">
                      <div className="col-sm-6 sub__heading p-l-20">Lead</div>
                      <div className="col-sm-6 sub__heading p-l-20">Template</div>
                    </div>
                    {
                      this.state.currentTasks.map((element, key) => {
                        
                        return (
                          <div className="row" key={key} id={"newtemplate" + key}>
                          
                            <div className="col-sm-6 form-line">
                            {
                              this.props.isParam
                                ? <input 
                                    type="text"
                                    className="leadDefaultInput form-control"
                                    value={(tTemp.first_name+""+tTemp.last_name).trim().length > 0? tTemp.first_name+""+tTemp.last_name : tTemp.email }
                                    disabled />
                                : <CustomComponents 
                                    users={leads}
                                    returnLead={this.addLeadTemplate}
                                    keyVal={key}
                                    label="" />

                            }
                            </div>
                            <div className="col-sm-6 fomr-line">
                              <select 
                                className="new-select template-select form-control"
                                onChange={(e) => {this.addCurrentTemplate(e, 'template')}}>
                                {
                                  templates.map((template, tempKey) => {
                                    return (
                                      <option key={tempKey} value={JSON.stringify(template)} valkey={key}>{template.name}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        );
                      })
                    }
                    <div className="apply-template-btn">
                        <button 
                           to="#" 
                           className="btn btn-default btn-raised btn-add-task btn-with-icon i apply-btn" 
                           onClick={this.creatNewTemplate.bind(this)}>
                            <i className="fa fa-plus m-r-10"></i>
                            <span>Add</span>
                        </button>
                   </div>
                  </div>
                  <div className="footer">
                      <div className="row">
                          <button 
                              className="btn btn-raised waves-effect save-btn m-r-10"
                              onClick={() => {this.saveTemplate()}}>Save</button>
                          <button className="btn btn-default btn-raised waves-effect" data-dismiss="modal">Cancel</button>
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

ApplyTemplate.propTypes = {
    type: PropTypes.string,
    btnClass: PropTypes.string,
    inputLeads: PropTypes.array,
    isParam: PropTypes.boolean
};

const mapDispatchToProps = (dispatch) => {
    return ({
        getTemplates: () => { getTemplates(dispatch); },
        applyTemplates: (template) => { applyTemplates(template, dispatch); },
        updateTemplates: (template) => { updateTemplates(template, dispatch); },
        getCircles: () => { getCircles(dispatch); }
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        leads: state.leads.leads,
        templates: state.templates.templates
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyTemplate);