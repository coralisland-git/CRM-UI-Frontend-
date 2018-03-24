import React from 'react';
import InputBox from '../../../../components/inputbox';
import DatePicker from '../../../../components/datepicker';
import DatepickerCustom from '../../../../components/datepicker/DatepickerCustom';
import avatar from '../../../../styles/assets/images/avatar0.png';
import './index.scss';

import {toast} from 'react-toastify';

declare var gapi;
const INTERACTION_TYPE = {
    'call': 'Call',
    'email': 'Email',
    'note': 'Note',
    'text': 'Text',
    'note': 'Note',
    'in_person': 'In Person',
    'other': 'Other'
}
const ICONS = {
    'call': <i className="material-icons">phone</i>,
    'email': <i className="material-icons">email</i>,
    'note': <i className="material-icons">launch</i>,
    'text': <i className="material-icons">speaker_notes</i>,
    'note': <i className="material-icons">speaker_notes</i>,
    'in_person': <i className="material-icons">account_circle   </i>,
    'other': <i className="material-icons">date_range</i>   
}

class LeadInteraction extends React.Component {
    state = {
        interaction: {
            description: '',
            due_date: moment().format('MM-DD-YYYY'),
            type: '',
        },
        filters: {
            type: '',
            fromDate: moment().startOf('month').format('MM-DD-YYYY'),
            toDate: moment().endOf('month').format('MM-DD-YYYY'),   
        },
        interactions: []
    }

    componentWillReceiveProps(props) {

        let {lead, actions} = props;

        if (lead.id) {
            let {filters} = this.state;
            filters.lead_id = lead.id;
            this.setState({filters: {...filters, lead: lead.id}});
            
            this.loadInteractions.bind(this)(this.state.filters, props);
        }
    }

    addInteraction() {
        
        let {lead, actions} = this.props;
        let {interaction, filters} = this.state;
        if(interaction.description == ''){
            toast.error('Description should not be empty.'); return
        }
        if(interaction.type == '') {
            toast.error('Please choose one of iteraction type.'); return
        } 
        if(lead.id) {
            actions.createInteractions({...interaction, lead: lead.id}).then((interaction)=>{
                return this.loadInteractions.bind(this)(filters);
            }).then((interactions)=>{
                this.setState({interaction: {...this.state.interaction, description: '', type: ''}});
            });
        }
        
    }

    loadInteractions(filters, props) {
        
        let {inboxData, sentData} = props ? props : this.props;
        let {lead, actions} = this.props;
        if(lead.id) {
                
            let email_interactions = [];
            let mails = inboxData.filter((mail)=>{
                return ((mail.from_email == this.props.lead.email) &&
                // (moment(mail.send_time).isSameOrAfter(moment(filters.fromDate)) && moment(mail.send_time).isSameOrBefore(moment(filters.toDate))) );
                (moment(mail.send_time).isBetween(moment(filters.fromDate), moment(filters.toDate))))
            });
            // mails.concat(sentData.filter((mail)=>{
            //     return ((mail.to_email == this.props.lead.email) &&
            //     (moment(mail.send_time).isSameOrAfter(moment(filters.fromDate)) && moment(mail.send_time).isBefore(moment(filters.toDate))) );
            // }));

            email_interactions = email_interactions.concat(mails.map((mail)=>{
                return {
                    description: mail.subject,
                    due_date: mail.send_time,
                    type: 'email',
                    mailobj: mail
                }
            }));
            if(filters.type == 'email') {
                this.setState({interactions: email_interactions});
            } else {
                actions.getInteractions(filters)
                .then((interactions)=>{
                    if(filters.type == '')
                        interactions = interactions.concat(email_interactions);
                    this.setState({interactions});
                });
            }
        }
    }

    typeChanged(type) {

        let {interaction, filters} = this.state;
        this.setState({filters: {...filters, 'type': type}}); 
        this.loadInteractions.bind(this)({...filters, 'type': type});
    }

    inteactionClicked(interaction) {
        if(interaction.type == 'email')
            this.props.history.push('/inbox/' + interaction.mailobj.id);
    }

    render() {

        let {inboxData, sentData} = this.props;
        let {lead} = this.props;
        let {interactions, interaction, filters} = this.state;
        let interactionTypes = [];
        let typeSelects = [];
        let self = this;



        for (let key in INTERACTION_TYPE) {
            if(key == 'email') continue;  
            interactionTypes.push(<option key={key} value={key}>{INTERACTION_TYPE[key]}</option>)                            
            
        }

        typeSelects.push(<span key={"all"} className={'' + (filters.type == '' ? 'selected-type' : ' ')} onClick={(e)=>this.typeChanged.bind(this)('')}> All</span>)
        for (let key in INTERACTION_TYPE) {
            typeSelects.push(<span key={key} className={'' + (filters.type == key ? 'selected-type' : ' ')} style={{cursor:'pointer'}} onClick={(e)=>this.typeChanged.bind(this)(key)}> {INTERACTION_TYPE[key]}</span>)            
        }

        return (
        <div id="leadinteraction">
            <ul className="nav nav-tabs m-t-20 " role="tablist">
                 <li role="presentation" className="active col-xs-6" id="interaction"><a href="#interaction1" data-toggle="tab" style={{background: 'transparent'}}><span className="">INTERACTION</span></a></li>
                <li role="presentation" className="col-xs-6" id="property"><a href="#property1" data-toggle="tab"> <span className="">PROPERTY</span></a></li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane fade active in" id="interaction1">
                    <div className="header">
                        <textarea className="interaction-description form-control m-t-20" 
                            value={interaction.description} onChange={(e) => {
                            if(e.target.value ==  '') {
                                $(e.target).addClass('error');
                            } else $(e.target).removeClass('error');
                            this.setState({interaction: {...interaction, 'description': e.target.value}})}}
                            placeholder="Add Interactions..."></textarea>
                        <div className="form-line-custom">
                            <span id="sel-box">
                                <DatepickerCustom unique="due_date" value={interaction.due_date} onChange={(date) => {self.setState({interaction: {...interaction, due_date: date}});  }} /> 
                                <select className="form-control m-l-20" style={{height:30, width: 200}} value={interaction.type} onChange={(e) => {this.setState({interaction: {...interaction, type: e.target.value}})}} placeholder="Select Interaction" >

                                    <option key="none" value="" disabled={true}>SELECT INTERACTION</option>
                                    { interactionTypes }
                                </select>
                            </span>
                            <button className="btn btn-sm btn-raised waves-effect pull-right add_bt" onClick={this.addInteraction.bind(this)} >ADD INTERACTION</button>
                        </div>
                    </div>
                    <div className="body" style={{minHeight: 500}}>
                        <ul className="list-group">
                            <li className="list-group-item" style={{border: '1px solid #dddddd', color: '#575757'}}>
                                <div className="row datepicker_tool">
                                    <div>
                                        <div>{typeSelects}</div>

                                        <div style={{display: 'flex', alignItems:'center'}}>

                                            <span style={{marginRight: 20}} className="">From</span>
                                            <DatepickerCustom value={filters.fromDate} unique={'formDate'} onChange={(date, e) => {
                                                if(moment(date).isAfter(moment(filters.toDate))){
                                                    toast.error("From Date should be before To Date.", {autoClose: 10000});
                                                    e.target.value = filters.fromDate;
                                                    return false;
                                                }
                                                self.setState({filters: {...filters, fromDate: moment(date).format('MM-DD-YYYY')}}); 
                                                self.loadInteractions.bind(self)({...filters, fromDate: moment(date).format('MM-DD-YYYY')}); }} 
                                                /> 
                                            <span style={{marginLeft: 20}} className="">To</span>
                                            <DatepickerCustom value={filters.toDate}  unique={'toDate'} onChange={(date, e) => {

                                                if(moment(date).isBefore(moment(filters.fromDate))){
                                                    toast.error("To Date should be after From Date.", {autoClose: 10000});
                                                    e.target.value = filters.toDate;
                                                    return false;
                                                }
                                                self.setState({filters: {...filters, toDate: moment(date).format('MM-DD-YYYY')}}); self.loadInteractions.bind(self)({...filters, toDate: moment(date).format('MM-DD-YYYY')}); }} /> 
                                            </div>
                                    </div>
                                </div>
                            </li>
                            {interactions.map((interaction, i) =>
                                <li style={{cursor: 'pointer'}} className="list-group-item" key={i} onClick={this.inteactionClicked.bind(this, interaction)}>
                                     <div className="item">
                                          <div className="left " >
                                            
                                            {ICONS[interaction.type]}
                                            <img className="avatar" src={this.props.user.profile_image ? this.props.user.profile_image : avatar} />
                                            <span id="title">
                                                <span className="h4 direction" style={{color: '#bdbdbc'}}>{this.props.user.first_name + ' ' + this.props.user.last_name}: > {this.props.lead.first_name + ' ' + this.props.lead.last_name} </span>
                                                <span className="h4">{interaction.description}</span>
                                            </span>
                                          </div>
                                        <span className="h4 reminder pull-right" style={{color: '#afafae', minWidth: 97}}>{moment(interaction.due_date).format('MM-DD-YYYY')}</span> 
                                    </div>
                                </li>
                            )}
                            {interactions.length == 0 ? <li className='text-center' style={{fontSize: 16, marginTop: 30}}>No Interactions</li> : ''}
                        </ul>
                    </div>
                </div>
               <div role="tabpanel" className="tab-pane fade" id="property1">
                    <span>Feature not available during beta test</span>
               </div>
            </div>                    
        </div>
        )
    }

}

export default LeadInteraction;
