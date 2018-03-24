import React from 'react';
import {bindActionCreators} from 'redux';
import axios, { post } from 'axios';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import TagInput from './taginput';
import InputBox from '../../../components/inputbox';
import DropDown from '../../../components/dropdown';
import CustomConfirmAlert, { confirmAlert } from '../../../components/confirmdialog';
import avatar from '../../../styles/assets/images/avatar.jpg';
import LeadPill from '../../../components/leadpill';
import './index.scss';
import LeadInfo from './leadinfo';
import LeadInteraction from './leadinteraction';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {getLeads, createLeads, deleteLeads, updateLeads, getCurrentLead, getLeadCircles, uploadDocs, addRelatedContact, getRelatedContacts, deleteRelatedContact, updateRelatedContact, getDocFiles, deleteDocFile, addDocFile, patchLead, getTags, addTag } from '../../../services/actions/leads';
import {getCircles, addLeadToCircle, removeLeadFromCircle} from '../../../services/actions/circles';
import * as interactionActions from '../../../services/actions/interations';
import * as userActions from '../../../services/actions/users';        
import * as inboxActions from '../../../actions/inbox';

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: (params) => {getLeads(dispatch);},
        getCurrentLead: (params) => { return getCurrentLead(params, dispatch);},
        createLeads: (params) => {createLeads(params, dispatch);},
        updateLeads: (params) => {updateLeads(params, dispatch);},
        deleteLeads: (params) => {deleteLeads(params, dispatch);},
        patchLead: (lead_id, obj) => patchLead(lead_id, obj, dispatch),
        addLeadToCircle : (param1, param2) => {addLeadToCircle(param1, param2, dispatch);},
        removeLeadFromCircle : (param1, param2) => {removeLeadFromCircle(param1, param2, dispatch);},
        getCircles: () => {getCircles(dispatch); },
        getLeadCircles : (param) => { getLeadCircles(param, dispatch);},
        uploadDocs : (param1, param2) => { uploadDocs(param1, param2, dispatch);},
        addRelatedContact : (param1, param2, param3) => { addRelatedContact(param1, param2, param3, dispatch)},
        getRelatedContacts:  (params) => { getRelatedContacts(params, dispatch);},
        deleteRelatedContact : (param1, param2) => { deleteRelatedContact(param1, param2, dispatch);},
        updateRelatedContact : (param1, param2, param3,param4) => {updateRelatedContact(param1, param2, param3, param4);},
        getDocFiles : () => { getDocFiles(dispatch);},
        deleteDocFile : (params) => {deleteDocFile(params, dispatch);},
        addDocFile : (param1, param2) => {addDocFile(param1, param2, dispatch);},
        getTags: () => {getTags(dispatch); },
        addTag: (param) => {addTag(param, dispatch); },
        actions: bindActionCreators({...interactionActions, ...userActions, ...inboxActions}, dispatch),
    });
}

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads,
        user : state.auth.user,
        circles : state.circles.circles,
        lead_circles : state.leads.lead_circles,
        related_contacts : state.leads.related_contacts,
        doc_files : state.leads.doc_files,
        current_lead : state.leads.current_lead,
        inboxData: state.inbox.inboxMessages,      
        sentData: state.inbox.sentMessages,       
        gapi_status: state.gapi.status,
        tags : state.leads.tags,
        users: state.users.users,
    });
}

class AddLeads extends React.Component {

    constructor(props){
        super()
        this.state = {
            alert : '',
            status: [],
            tags: [],
            relatedContact_name : '',
            relatedContact_id : '',
            relation_ship : 'Relation',
            id : '',
            document : "",
            mode : false,
            disabled : false,
            team_filter: '',
            open : '',
            household_open : '',
            addhousehold_name : '',
            addhousehold : {},
            def_leads : {
                    id: '',
                    image: '',
                    first_name : '',
                    last_name :  '',
                    company :'',
                    title :  '',
                    office : '',
                    phone_home : '',
                    phone_mobile :  '',
                    phone_mobile2 :  '',
                    phone_mobile3 :  '',
                    phone_office :  '',
                    phone_office2 :  '',
                    phone_office3 :  '',
                    fax : '',
                    website : '',
                    email :  '',
                    email2 :  '',
                    email3 :  '',
                    address : '',
                    address2 : '',
                    city : '',
                    state :  '',
                    zipcode :  '',
                    household_contact :  '',
                    status:  '',
                    is_lead : '',
                    created_by : '',
                    status : '',
                    source : '',
                    facebook : '',
                    twitter : '',
                    linkedin : '',
                    google_plus : '',
                    instagram : '',
                    household : '',
                    team: [],
                    address_2 : '',
                    address2_2 : '',
                    city_2 : '',
                    state_2 :  '',
                    zipcode_2 :  '',
                    address_3 : '',
                    address2_3 : '',
                    city_3 : '',
                    state_3 :  '',
                    zipcode_3 :  '',
                    address_4 : '',
                    address2_4 : '',
                    city_4 : '',
                    state_4 :  '',
                    zipcode_4 :  '',
                    address_5 : '',
                    address2_5 : '',
                    city_5 : '',
                    state_5 :  '',
                    zipcode_5 :  '',
                }
        }

        this.load_messages = false;       
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.addLeadToCircle = this.addLeadToCircle.bind(this);
        this.convertToContact = this.convertToContact.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.warningDialog = this.warningDialog.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addRelatedContact = this.addRelatedContact.bind(this);
        this.updateRelatedContact = this.updateRelatedContact.bind(this);
        this.deleteRelatedContact = this.deleteRelatedContact.bind(this);
        this.deleteDocFile = this.deleteDocFile.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.append_household = this.append_household.bind(this);
      }

    addLeadToTeam(member) {
        let team = this.state.def_leads.team;
        if (team.indexOf(member.id) == -1) 
            team.push(member.id);
        else 
            team.splice(team.indexOf(member.id), 1);
        

        if( this.props.match.params.id ){
            this.props.patchLead(this.props.match.params.id, {team: this.state.def_leads.team})
            .then((lead) => {
            });
        }
        //  else {
        //     this.setState({def_leads: {...this.state.def_leads, team: team}});    
        // }

        this.setState({def_leads: {...this.state.def_leads, team: team}});   
    }

    create(lead) {
        lead.tags = this.state.tags.join(',');
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(lead.first_nme == "" || lead.last_name == "") {
            confirmAlert({
                toastContent: "danger",
                message: "Please provide first name, last name.",
                outerClick : true
            });
        }
        else{
            if (lead.email !== '' || lead.email ) {
                if ( re.test(lead.email)) {
                    if ((lead.email2 !== "" && !re.test(lead.email2)) || (lead.email3 !== "" && !re.test(lead.email3))) {
                        confirmAlert({
                            toastContent: "danger",
                            message: "Please provide valid email.",
                            outerClick : true
                        });        
                    }
                    else {
                        this.props.createLeads(lead);
                        this.setState({alert : ''});
                        confirmAlert({
                            toastContent: "success",
                            message: "The "+this.props.match.params.type+" is created successfully.",
                            outerClick : true
                        });
                        // this.props.history.goBack();
                        this.props.history.push('/leads/'+this.props.match.params.type);
                    }
                }
                else {
                    confirmAlert({
                        toastContent: "danger",
                        message: "Please provide valid email.",
                        outerClick : true
                    });
                }
            }
            else {
                this.props.createLeads(lead);
                this.setState({alert : ''});
                confirmAlert({
                    toastContent: "success",
                    message: "The "+this.props.match.params.type+" is created successfully.",
                    outerClick : true
                });
                // this.props.history.goBack();
                this.props.history.push('/leads/'+this.props.match.params.type);
            }
        }
    }

    remove(lead) {
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            template : 'warning',
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    this.props.deleteLeads(lead);
                    confirmAlert({
                        toastContent: "success",
                        message: "The "+this.props.match.params.type+" is deleted successfully.",
                        outerClick : true
                    });
                    this.props.history.goBack();
                }, 100)
            }
        });
    }

    delete(lead) {
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            template : 'warning',
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    this.props.deleteLeads(lead);
                    let def_temp = this.state.def_leads;
                    let updated_household = [];
                    for (let i=0;i<def_temp.household.length ; i++) {
                        if ( def_temp.household[i].id !== lead) {
                            updated_household.push(def_temp.household[i]);
                        }
                    }
                    def_temp.household = updated_household;
                    this.setState({def_leads : def_temp});
                    confirmAlert({
                        toastContent: "success",
                        message: "The household is deleted successfully.",
                        outerClick : true
                    });
                }, 100)
            }
        });
    }

    update(lead) {
        lead.tags = this.state.tags.join(',');
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(lead.first_nme == "" || lead.last_name == "") {
            confirmAlert({
                toastContent: "danger",
                message: "Please provide first name, last name.",
                outerClick : true
            });
        }
        else{
            if (lead.email !== '' || lead.email ) {
                if ( re.test(lead.email)) {
                    if ((lead.email2 !== "" && !re.test(lead.email2)) || (lead.email3 !== "" && !re.test(lead.email3))) {
                        confirmAlert({
                            toastContent: "danger",
                            message: "Please provide valid email.",
                            outerClick : true
                        });        
                    }
                    else {
                        this.props.updateLeads(lead);
                        this.setState({alert : ''});
                        confirmAlert({
                            toastContent: "success",
                            message: "The "+this.props.match.params.type+" is updated successfully",
                            outerClick : true
                        });
                        if (this.props.match.params.id){
                            this.setState({disabled : true});
                            this.props.getCurrentLead(this.props.match.params.id).then(lead=>{
                                this.setState({def_leads : lead});    
                                if (lead.tags !== "" && lead.tags !== null) {
                                    this.setState({tags : lead.tags.split(',')});
                                }
                            });
                        }
                    }
                }
                else {
                    confirmAlert({
                        toastContent: "danger",
                        message: "Please provide valid email.",
                        outerClick : true
                    });
                }
            }
            else {
               this.props.updateLeads(lead);
                this.setState({alert : ''});
                confirmAlert({
                    toastContent: "success",
                    message: "The "+this.props.match.params.type+" is updated successfully",
                    outerClick : true
                });
                if (this.props.match.params.id){
                    this.setState({disabled : true});
                    this.props.getCurrentLead(this.props.match.params.id).then(lead=>{
                        this.setState({def_leads : lead});    
                        if (lead.tags !== "" && lead.tags !== null) {
                            this.setState({tags : lead.tags.split(',')});
                        }
                    });
                }
            }
        }
    }

    append_household() {
        if(this.state.def_leads.id) {
            if (this.state.def_leads.address == null || this.state.def_leads.state == null || 
                this.state.def_leads.city == null || this.state.def_leads.zipcode == null ||
                this.state.def_leads.address == "" || this.state.def_leads.state == "" 
                || this.state.def_leads.city == "" || this.state.def_leads.zipcode == "" ) {
             // if ((this.state.def_leads.address == null || this.state.def_leads.address == "") && (this.state.def_leads.address2 == null || this.state.def_leads.address2 == "") 
             //    &&(this.state.def_leads.city == null || this.state.def_leads.city == "") && (this.state.def_leads.state == null || this.state.def_leads.state == "")
             //    && (this.state.def_leads.zipcode == null || this.state.def_leads.zipcode == "")) {
                 confirmAlert({
                    template: "warning",
                    message: "The household contact cannot be added unless address is valid.",
                    outerClick : true
                });
            }
            else{
                    if (this.state.addhousehold.id) {
                        let temp = {
                            id: this.state.addhousehold.id ||'',
                            image:  this.state.addhousehold.image || '',
                            first_name : this.state.addhousehold.first_name ||  '',
                            last_name :   this.state.addhousehold.last_name || '',
                            company : this.state.addhousehold.company || '',
                            title :   this.state.addhousehold.title || '',
                            office :  this.state.addhousehold.office || '',
                            phone_home :  this.state.addhousehold.phone_home || '',
                            phone_mobile :   this.state.addhousehold.phone_mobile || '',
                            phone_mobile2 :   this.state.addhousehold.phone_mobile2 || '',
                            phone_mobile3 :   this.state.addhousehold.phone_mobile3 || '',
                            phone_office :   this.state.addhousehold.phone_office || '',
                            phone_office2 :   this.state.addhousehold.phone_office2 || '',
                            phone_office3 :   this.state.addhousehold.phone_office3 || '',
                            fax :  this.state.addhousehold.fax || '',
                            website :  this.state.addhousehold.website || '',
                            email :   this.state.addhousehold.email || '',
                            email2 :  this.state.addhousehold.email2 ||  '',
                            email3 :  this.state.addhousehold.email3 ||  '',
                            address : this.state.def_leads.address || '',
                            address2 :  this.state.def_leads.address2 || '',
                            city :  this.state.def_leads.city || '',
                            state :   this.state.def_leads.state || '',
                            zipcode :   this.state.def_leads.zipcode || '',
                            is_lead :  this.state.addhousehold.is_lead,
                            created_by : this.state.addhousehold.created_by ||  '',
                            status :  this.state.addhousehold.status || '',
                            source :  this.state.addhousehold.source || '',
                            facebook :  this.state.addhousehold.facebook || '',
                            twitter :  this.state.addhousehold.twitter || '',
                            linkedin :  this.state.addhousehold.linkedin || '',
                            google_plus :  this.state.addhousehold.google_plus || '',
                            instagram :  this.state.addhousehold.instagram || '',
                            household :  this.state.addhousehold.household || '',
                            team: this.state.addhousehold.team ||  []
                        }
                        this.props.updateLeads(temp);
                        this.setState({addhousehold: {}, addhousehold_name : '' });
                        let def_temp = this.state.def_leads;
                        def_temp.household.push(temp);
                        // this.setState({def_leads, def_temp});
                        // this.props.getCurrentLead(this.state.def_leads.id).then(lead=>{
                        //     this.setState({def_leads : lead});   
                        //     console.log('###############3', lead);
                        //     if (lead.tags !== "" && lead.tags !== null) {
                        //         this.setState({tags : lead.tags.split(',')});
                        //     }
                        // });
                }
                else {
                    confirmAlert({
                        template: "warning",
                        message: "Please select "+this.props.match.params.type+".",
                        outerClick : true
                    });
                }
            }
        }
        else {
             confirmAlert({
                template: "warning",
                message: "The household contact cannot be added unless "+this.props.match.params.type+" is saved.",
                outerClick : true
            });
        }
    }

    addLeadToCircle(circle_id, lead_id) {
        var send_data = []
        send_data.push(lead_id);
        this.props.addLeadToCircle(circle_id, send_data);
    }

    convertToContact(lead) {
        this.props.updateLeads(lead);
    }

    componentDidMount() {
        this.props.getLeads();
        this.props.getTags();
        this.props.getCircles();
        this.props.getDocFiles();
        if (this.props.match.params.id){
            this.setState({disabled : true});
            this.props.getLeadCircles(this.props.match.params.id);
            this.props.getRelatedContacts(this.props.match.params.id);
        }
    }

    componentWillMount() {
        if (this.props.match.params.id){
            this.setState({disabled : true});
            this.props.getCurrentLead(this.props.match.params.id).then(lead=>{
                this.setState({def_leads : lead});    
                if (lead.tags !== "" && lead.tags !== null) {
                    this.setState({tags : lead.tags.split(',')});
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.getCurrentLead(nextProps.match.params.id).then(lead=>{
                    this.setState({def_leads : lead, disabled : true});    
                    if (lead.tags !== "" && lead.tags !== null) {
                        this.setState({tags : lead.tags.split(',')});
                    }
                });
            this.props.getLeadCircles(nextProps.match.params.id);
            this.props.getRelatedContacts(nextProps.match.params.id);
        }
        if(nextProps.gapi_status && !this.load_messages) {      
            this.load_messages = true;        
            this.props.actions.getInboxMessages();        
            this.props.actions.getSentMessages();     
        }
    }

    checkStatus(id) {
        if (this.props.match.params.id) {
            for(let i=0;i<this.props.lead_circles.length;i++) {
                if ( id == this.props.lead_circles[i]) {
                    return true; 
                    break;
                }
            }
        }
        else {
            return false;
        }
    }

    warningDialog () {
        confirmAlert({
            template: "warning",
            message: "The circle cannot be added unless "+this.props.match.params.type+" is saved.",
            outerClick : true
        });
    }

    selectCheckbox(circle_id, lead_id, event) {
        if (lead_id != '' && lead_id)
            {
                if (event.target.checked) {
                    var send_data = []
                    send_data.push(lead_id);
                    this.props.addLeadToCircle(circle_id, send_data);
                }
                else {
                    var send_data = []
                    send_data.push(lead_id);
                    this.props.removeLeadFromCircle(circle_id, send_data);
                }
                this.forceUpdate();
            }
        else {
           
        }
    }

   handleChange(tags) {
    if(this.state.def_leads.id) {
        this.setState({tags});
        let lead = this.state.def_leads;
        lead.tags = tags.join(',');
        this.props.updateLeads(lead);
        this.props.addTag(tags);
    }
    else {
        confirmAlert({
            template: "warning",
            message: "The tag cannot be added unless "+this.props.match.params.type+" is saved.",
            outerClick : true
        });
    }
        // let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if(lead.first_nme == "" || lead.last_name == "") {
        //     confirmAlert({
            //     toastContent: "danger",
            //     message: "Please provide first name, last name.",
            //     outerClick : true
            // });
        // }
        // else{
        //     if ( lead.email !== '' || lead.email) {
        //         if ( re.test(lead.email)) {
        //             if ((lead.email2 !== "" && !re.test(lead.email2)) || (lead.email3 !== "" && !re.test(lead.email3))) {
        //                 confirmAlert({
                            //     toastContent: "danger",
                            //     message: "Please provide valid email.",
                            //     outerClick : true
                            // });        
        //             }
        //             else {
        //                 this.props.updateLeads(lead);
        //                 this.setState({alert : ''});
        //             }
        //         }
        //         else {
        //             this.setState({alert: 'Please provide valid email.' , disabled : false})
        //         }
        //     }
        //     else {
        //          this.props.updateLeads(lead);
        //          this.setState({alert : ''});
        //     }
        // }
  }

  setDefault () {
   this.setState({
        relatedContact_name : 'Contact',
        relatedContact_id : '',
        relation_ship : 'Relation',
        mode : false
   })
  }

  addRelatedContact() {
    if (this.state.relatedContact_id !== "" && this.state.relation_ship !== "Relation" && this.props.match.params.id){
        this.props.addRelatedContact(this.props.match.params.id, this.state.relatedContact_id, this.state.relation_ship);
        this.setState({relatedContact_id : '', relation_ship : 'Relation', id: '', relatedContact_name : "", mode : false});
    }
    else {
        confirmAlert({
            template: "warning",
            message: "Please select lead/contact, relation",
            outerClick : true
        });
    }
  }

  updateRelatedContact() {
    if (this.state.relatedContact_id !== "" && this.state.relation_ship !== "Relation" && this.state.id !== "" && this.props.match.params.id){
        this.props.updateRelatedContact(this.props.match.params.id, this.state.relatedContact_id, this.state.relation_ship, this.state.id);
        this.setState({relatedContact_id : '', relation_ship : 'Relation', id: '', relatedContact_name : "", mode : false});
    }
    else {
        confirmAlert({
            template: "warning",
            message: "Please select lead/contact, relation",
            outerClick : true
        });
    }
  }

  deleteRelatedContact (id) {
    if(this.props.match.params.id) {
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            template : 'warning',
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    this.props.deleteRelatedContact(id, this.props.match.params.id);
                    confirmAlert({
                        toastContent: "success",
                        message: "The related contact is deleted successfully.",
                        outerClick : true
                    });
                }, 100)
            }
        });
    }
  }

    uploadDoc = (e) => {
        if(this.props.match.params.id){
            e.preventDefault();
            let file = e.target.files[0];
            this.props.addDocFile(this.props.match.params.id, file);
        }
        else {
            confirmAlert({
                template: "warning",
                message: "The docment cannot be uploaded unless "+this.props.match.params.type+" is saved.",
                outerClick : true
            });
        }
    }

    deleteDocFile(param) {
        if(param) {
            confirmAlert({
                title: 'Are you sure you want to delete this file?',
                message: null,
                template : 'warning',
                confirmLabel: 'YES',
                cancelLabel: 'CANCEL',
                onConfirm: () => {
                    setTimeout(() => {
                        this.props.deleteDocFile(param);
                        confirmAlert({
                            toastContent: "success",
                            message: "The files is deleted successfully.",
                            outerClick : true
                        });
                    }, 100)
                }
            });
        }
    }

    render() {
        let def_leads = this.state.def_leads;
        let team_filter = this.state.team_filter;
        let members = this.props.users ? this.props.users : [];
        let now_members = members.filter((member)=>(def_leads.team.indexOf(member.id) != -1));
        let not_members = members.filter((member)=>(def_leads.team.indexOf(member.id) == -1));
        not_members = not_members.filter((member)=>{
            let full = member.first_name + member.last_name;
            return full.toLowerCase().indexOf(team_filter.toLowerCase()) != -1;
        });

        let currentUser = {
            first_name : '',
            last_name: '',
            email : '',
            id: ''
        }
        if (this.props.user) {
            def_leads.created_by = this.props.user.id;
            currentUser = this.props.user;
        }
        let type = '';
        if(this.props.match.params.type){
            if (this.props.match.params.type == "lead")  {
                type = true;
            }
            if (this.props.match.params.type == "contact")  {
                type = false;
            }
        }

        def_leads.is_lead = type;
        let myfunc = this.create;
        let content = [];
        
        if (this.props.match.params.id){
            myfunc = this.update;
        }

        if(this.props.related_contacts.not_members){
            for (let i=0;i<this.props.related_contacts.not_members.length; i++) {
                let name = this.props.related_contacts.not_members[i].first_name + ' ' + this.props.related_contacts.not_members[i].last_name;
                let id = this.props.related_contacts.not_members[i].id;
                if ((this.state.def_leads.id) !== this.props.related_contacts.not_members[i].id) 
                {
                    content.push({
                        text: name,
                        action : ()=> {this.setState({relatedContact_name : name,  relatedContact_id : id})}
                    })
                }
            }
        }

        let relation_list = [ 
            {
                text : "Associate",
                action : ()=> { this.setState({relation_ship : "Associate"}) }
            },
            {
                text : "Boss",
                action : ()=> { this.setState({relation_ship : "Boss"}) }
            },
            {
                text : "Colleague",
                action : ()=> { this.setState({relation_ship : "Colleague"}) }
            },
            {
                text : "Friend",
                action : ()=> { this.setState({relation_ship : "Friend"}) }
            },
            {
                text : "Relative",
                action : ()=> { this.setState({relation_ship : "Relative"}) }
            }
        ];

        let not_household_list = [];            
        if(this.props.leads) {
            for(let i=0; i<this.props.leads.length ; i++) {
                let flag = true;
                if(def_leads.household) {
                    for(let j=0; j< def_leads.household.length; j ++){
                        if(this.props.leads[i].id == def_leads.household[j].id || this.props.leads[i].id == this.state.def_leads.id ) {
                            flag = false;
                            break;
                        }
                    }
                }

                if(flag) {
                    not_household_list.push(this.props.leads[i]);
                }
            }
        }

        return (
            <div id="addleads" className="container-fluid">
                <div className="row">
                <div id="left_side" className="col-sm-9 p-t-15">
                    <LeadInfo lead={def_leads} create={myfunc} remove={ this.remove } userInfo={ currentUser } type={type} alert={this.state.alert} disabled={this.state.disabled} setDisabled={ () => {this.setState({disabled : !this.state.disabled})}}/>
                    {def_leads.id ? <LeadInteraction {...this.props} lead={def_leads} user={this.props.user} /> : '' }
                </div>
                <div className="col-sm-3 p-t-15 no-left-padding">
                    <div id="right_side" className="border" role="tablist" aria-multiselectable="true">
                        <div className="panel panel-primary">
                            <div className="panel-heading" role="tab" id="headingOne_1">
                                <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_1" aria-expanded="true" aria-controls="collapseOne_1">
                                    <a >TEAM</a>
                                    <span className=" pull-right">
                                        <i className="fa fa-caret-down"></i>
                                    </span>
                                </h4>
                            </div>
                            <div id="collapseOne_1" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_1">
                                <div id="team">
                                    <div className="header">
                                        <span className="htxt">
                                            <span className="h4 font-bold heading-2">Assign Team Member</span>
                                        </span>
                                    </div>
                                    <div>
                                         <ul className="list-group team-list-group">
                                            
                                            {now_members.map(lead=>(
                                                lead.profile_image ? <img className="avatar" src={lead.profile_image} style={{cursor: 'pointer'}} onClick={this.addLeadToTeam.bind(this,lead)}/> : <label className="font-bold mark" style={{cursor: 'pointer'}} onClick={this.addLeadToTeam.bind(this,lead)}> {lead.first_name.slice(0,1).toUpperCase() + lead.last_name.slice(0,1).toUpperCase() }</label>
                                            ))}

                                            <div className="dropdown">                                    
                                                <span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    
                                                    <label className="mark add-mark" > + </label>
                                                </span>

                                                <ul className="dropdown-menu dropdown-menu-team">
                                                    <li className="select-li-item search-box">
                                                        <input type="text" className="search-control" value={team_filter} placeholder="Search" onChange={(e) => {this.setState({team_filter: e.target.value})}} />
                                                        <i className="fa fa-search"></i>
                                                    </li>
                                                    <div className="select-member-li-container">

                                                        {not_members.map(lead=>(
                                                            <li className="select-member-li" onClick={this.addLeadToTeam.bind(this,lead)}>
                                                                {lead.profile_image ? <img className="avatar small" src={lead.profile_image} /> : <label className="font-bold mark small"> {lead.first_name.slice(0,1).toUpperCase() + lead.last_name.slice(0,1).toUpperCase() }</label>}
                                                                <span style={{marginLeft: 10}}> {lead.first_name + ' ' + lead.last_name} </span>
                                                            </li>
                                                            
                                                        ))}
                                                        {not_members.length == 0 ?
                                                            <li className="select-member-li">
                                                                <span> No Results </span>
                                                            </li> : null}
                                                    </div>
                                                </ul>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading" role="tab" id="headingOne_6">
                                <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_6" aria-expanded="true" aria-controls="collapseOne_1">
                                    <a >RELATED &nbsp;&nbsp;CONTACTS</a>
                                    <span className=" pull-right">
                                        <i className="fa fa-caret-down"></i>
                                    </span>
                                </h4>
                            </div>
                            <div id="collapseOne_6" className="panel-collapse collapse team" role="tabpanel" aria-labelledby="headingOne_6">
                                <div className="body">
                                     <div className="add_new inline">
                                        <span className="h3 font-bold heading-1"></span>
                                        {!this.state.mode?
                                            <div className="rc_control pull-right">
                                                <button id="add_bt" className="btn btn-default btn-xs btn-raised waves-effect pull-right" onClick={ ()=> this.addRelatedContact() } ><i className="material-icons">add</i>Add</button>
                                            </div>
                                        : 
                                            <div className="rc_control pull-right">
                                               <button id="cancel_bt" className="btn btn-default btn-xs btn-raised waves-effect pull-right" onClick={ ()=> this.setDefault() } ><i className="material-icons">cancel</i> Cancel</button>
                                               <button id="add_bt" className="btn btn-default btn-xs btn-raised waves-effect pull-right" onClick={ ()=> this.updateRelatedContact() } ><i className="fa fa-pencil"></i> Edit</button>
                                            </div>
                                    }
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            {
                                                this.props.related_contacts.members? 
                                                this.props.related_contacts.members.map((contact, i) =>
                                                    <tr key={i}>
                                                        <td className="related_contact_info">
                                                            <LeadPill  className=""
                                                                link={"/addleads/"+ (contact.lead.is_lead? 'lead' : 'contact') +"/"+contact.lead.id}
                                                                lead={contact.lead}
                                                                size={53}
                                                            />
                                                            <div className="related_contact_title">
                                                                <NavLink to={`/addleads/${ contact.lead.is_lead? 'lead' : 'contact'}/${contact.lead.id}`} className="">{ contact.lead.first_name + ' ' + contact.lead.last_name}</NavLink>
                                                                <span className="normal_txt">{contact.relation}</span>
                                                            </div>
                                                        </td>
                                                        <td className="tools">
                                                            <span>
                                                                <i className="fa fa-pencil m-r-10" onClick={ ()=> { this.setState({relation_ship : contact.relation, relatedContact_name: contact.lead.first_name + ' ' + contact.lead.last_name, relatedContact_id : contact.lead.id, id: contact.id, mode: true});}} ></i>
                                                                <i className="fa fa-trash" onClick={ ()=> { this.deleteRelatedContact(contact.id) }}></i>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                                : ''
                                            }
                                        </tbody>
                                    </table>
                                    <div className="row m-b-20">
                                        <div className="col-xs-7 m-l-10 rc_input">
                                            <div className={"custom-group mr-10 rc_search "+this.state.open}>
                                                <InputBox type="text" value={this.state.relatedContact_name} onChange={ (e) => {this.setState({relatedContact_name : e.target.value, open:'open'} )}}/>
                                                <i className="material-icons search_icon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">search</i>
                                                <ul className="dropdown-menu">
                                                    { this.props.related_contacts.not_members? this.props.related_contacts.not_members.map((lead, i) =>
                                                        (lead.first_name+ " " + lead.last_name).toLowerCase().includes(this.state.relatedContact_name.toLowerCase())?
                                                            <li key={i} ><a href="javascript:void(0);" onClick={(e) => {this.setState({relatedContact_name : lead.first_name+ " " + lead.last_name, relatedContact_id : lead.id , open: ''}) }} >{lead.first_name+ " " + lead.last_name}</a></li>
                                                            : ''
                                                    ) : <li>no result</li>
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xs-4 rc_input pull-right m-r-10">
                                            <DropDown content={relation_list} key="15" status={this.state.relation_ship} className="btn-xs" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading" role="tab" id="headingOne_2">
                                <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_2" aria-expanded="false" aria-controls="collapseOne_1">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion_2" href="#collapseOne_2" aria-expanded="false" aria-controls="collapseOne_2">HOUSEHOLD &nbsp;&nbsp;CONTACTS</a>
                                    <span className=" pull-right">
                                        <i className="fa fa-caret-down"></i>
                                    </span>
                                </h4>
                            </div>
                            <div id="collapseOne_2" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne_2">
                                <div id="household">
                                    <div className="header">
                                    </div>
                                    <div className="body">
                                        {  def_leads.household? 
                                                def_leads.household.map((household, i) => 
                                                    <div key={"leadpill"+i} className="household_item">
                                                        <LeadPill  className=""
                                                            link={"/addleads/"+ (household.is_lead? 'lead' : 'contact') +"/"+household.id}
                                                            lead={household}
                                                            info={true}
                                                            size={53}
                                                        />
                                                        {/* <div className="delete_household">
                                                            <i className="fa fa-trash" onClick={ ()=> { this.delete(household.id) }}></i>
                                                        </div> */}
                                                    </div>
                                            ): ''
                                        }

                                        <div className="row m-t-20">
                                            <div className="col-xs-8">
                                                <div className={"custom-group mr-10 rc_search "+this.state.household_open}>
                                                    <InputBox type="text" value={this.state.addhousehold_name} onChange={ (e) => {this.setState({addhousehold_name : e.target.value, household_open:'open'} )}}/>
                                                    <i className="material-icons search_icon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">search</i>
                                                    <ul className="dropdown-menu">
                                                        { not_household_list? not_household_list.map((lead, i) =>
                                                            (lead.first_name+ " " + lead.last_name).toLowerCase().includes(this.state.addhousehold_name.toLowerCase())?
                                                                <li key={i} ><a href="javascript:void(0);" onClick={(e) => {this.setState({addhousehold : lead , addhousehold_name: lead.first_name+' ' + lead.last_name, household_open: ''}) }} >{lead.first_name+ " " + lead.last_name}</a></li>
                                                                : ''
                                                        ) : <li>no result</li>
                                                    }
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-xs-3 pull-right">
                                                <button id="add_household" className="btn btn-default btn-xs btn-raised waves-effect pull-right" onClick={ ()=> this.append_household() }><i className="material-icons">add</i>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading" role="tab" id="headingOne_3">
                                <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_3" aria-expanded="false" aria-controls="collapseOne_1">
                                    <a> CIRCLES </a>
                                    <span className=" pull-right">
                                        <i className="fa fa-caret-down"></i>
                                    </span>
                                </h4>
                            </div>
                            <div id="collapseOne_3" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne_3">
                                <div id="circle">
                                    <div className="header">
                                    </div>
                                    <div className="body">
                                        <ul className="list-group">
                                        {  this.props.match.params.id? this.props.circles.map((circle, i) =>
                                            <li className="list-group-item" key={i} >
                                                <input type="checkbox" id={ "check"+ circle.id.toString() } onChange={this.selectCheckbox.bind(this, circle.id, this.props.match.params.id)} className="filled-in" checked={this.checkStatus(circle.id)}/>
                                                <label htmlFor={ "check"+circle.id.toString() }   ></label>
                                                <span><label className="mark" style={{backgroundColor : circle.color}}></label></span>
                                                <span className="check_circle"><NavLink to={`/newleads/${circle.id}`} className="normal_txt">{circle.name}</NavLink></span>
                                            </li>
                                        ) :
                                            this.props.circles.map((circle, i) =>
                                            <li className="list-group-item" key={i} disabled="true" >
                                                <input type="checkbox" id={ "check"+ circle.id.toString() } onChange={ this.warningDialog } className="filled-in" checked={this.checkStatus(circle.id)}/>
                                                <label htmlFor={ "check"+circle.id.toString() }   ></label>
                                                <span><label className="mark" style={{backgroundColor : circle.color}}></label></span>
                                                <span className="check_circle normal_txt" style={{ cursor : "pointer"}} >{circle.name}</span>
                                            </li>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading" role="tab" id="headingOne_4">
                                <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_4" aria-expanded="false" aria-controls="collapseOne_1">
                                    <a> DOCUMENTS</a>
                                    <span className=" pull-right">
                                        <i className="fa fa-caret-down"></i>
                                    </span>
                                </h4>
                            </div>
                            <div id="collapseOne_4" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne_4">
                                <div id="document">
                                    <div className="header">
                                        <div className="file">
                                            {
                                                 this.props.doc_files.map((doc, i) => 
                                                    { 
                                                        return doc.lead == this.props.match.params.id ?  <div style={{marginTop : "10px"}} key={i}>
                                                            <a href={doc.file} target="_blank">{doc.file.split('/').slice(-1)[0]}</a>
                                                            <span className="pull-right">
                                                                <i className="fa fa-trash" onClick={ () => this.deleteDocFile(doc.id)}></i>
                                                            </span>
                                                        </div>: ""
                                                    }
                                                 )
                                            }
                                        </div>
                                        <label htmlFor="doc-upload" className="btn btn-sm btn-raised btn-default waves-effect" >
                                            <i className="material-icons" >add</i>ADD DOCUMENTS    
                                        </label>
                                        <input id="doc-upload" type="file" onChange={this.uploadDoc } />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading" role="tab" id="headingOne_5">
                                <h4 className="panel-title" role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_5" aria-expanded="false" aria-controls="collapseOne_1">
                                    <a> TAGS </a>
                                    <span className=" pull-right">
                                        <i className="fa fa-caret-down"></i>
                                    </span>
                                </h4>
                            </div>
                            <div id="collapseOne_5" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne_5">
                                <div id="tags">
                                    <div className="header">
                                        <div className="tlist">
                                            {/* 
                                                <span><i className="fa fa-pencil"></i></span>
                                                <TagsInput value={this.state.tags} onChange={this.handleChange} style={{ color : "red"}} />  
                                            */}
                                            <TagInput value={this.state.tags} onChange={this.handleChange} tags={this.props.tags}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>  
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLeads);
