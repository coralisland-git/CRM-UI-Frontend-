import React from 'react';
import {bindActionCreators} from 'redux';
import InputBox from '../../../components/inputbox';
import avatar from '../../../styles/assets/images/avatar0.png';
import CustomConfirmAlert, { confirmAlert } from '../../../components/confirmdialog';
import './index.scss';
import LeadInfo from './leadinfo';
import LeadInteraction from '../../leads/addleads/leadinteraction';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {getLeads, createLeads, deleteLeads, updateLeads, getLeadCircles} from '../../../services/actions/leads';
import {getCircles, addLeadToCircle, removeLeadFromCircle} from '../../../services/actions/circles';
import * as interactionActions from '../../../services/actions/interations';
const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: (params) => {getLeads(dispatch);},
        createLeads: (params) => {createLeads(params, dispatch);},
        updateLeads: (params) => {updateLeads(params, dispatch);},
        deleteLeads: (params) => {deleteLeads(params, dispatch);},
        addLeadToCircle : (param1, param2) => {addLeadToCircle(param1, param2, dispatch);},
        removeLeadFromCircle : (param1, param2) => {removeLeadFromCircle(param1, param2, dispatch);},
        getCircles: () => {getCircles(dispatch); },
        getLeadCircles : (param) => { getLeadCircles(param, dispatch);},
        actions: bindActionCreators({...interactionActions}, dispatch)
    });
}

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads,
        user : state.auth.user,
        circles : state.circles.circles,
        lead_circles : state.leads.lead_circles
    });
}


class AddContacts extends React.Component {

    constructor(props){
        super();
        this.state = {
            alert : ''
        }
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.addLeadToCircle = this.addLeadToCircle.bind(this);
        this.convertToLead = this.convertToLead.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.warningDialog = this.warningDialog.bind(this);
      }

    create(lead) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(lead.first_nme == "" || lead.last_name == "" || lead.email == "") {
            this.setState({alert : 'Please provide first name, last name, email.'});
        }
        else{
            if ( re.test(lead.email)) {
                this.props.createLeads(lead);
                this.setState({alert : ''});
                confirmAlert({
                    template: "success",
                    message: "The contact is created successfully.",
                });
                this.props.history.goBack();
                // this.props.history.push('/leads');
            }
            else {
                this.setState({alert: 'Please provide valid email.'})
            }
        }
    }

    delete(lead) {
        this.props.deleteLeads(lead);
        confirmAlert({
            template: "danger",
            message: "THe contact is deleted successfully.",
        });
    }

    update(lead) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(lead.first_nme == "" || lead.last_name == "" || lead.email == "") {
            this.setState({alert : 'Please provide first name, last name, email.'});
        }
        else{
            if ( re.test(lead.email)) {
                this.props.updateLeads(lead);
                this.setState({alert : ''});
                confirmAlert({
                    template: "success",
                    message: "The contact is upated successfully.",
                });
                this.props.history.goBack();
                // this.props.history.push('/leads');
            }
            else {
                this.setState({alert: 'Please provide valid email.'})
            }
        }
    }

    addLeadToCircle(circle_id, lead_id) {
        var send_data = []
        send_data.push(lead_id);
        this.props.addLeadToCircle(circle_id, send_data);
    }

    convertToLead(lead) {
        this.props.updateLeads(lead);
    }

    componentDidMount() {
        this.props.getLeads();
        this.props.getCircles();
        if (this.props.match.params.id) {
            this.props.getLeadCircles(this.props.match.params.id);
        }
        else {

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

    warningDialog () {
        confirmAlert({
            template: "warning",
            message: "The circle cannot be added unless contact is saved.",
        });
    }

	render() {

        let def_leads ={
            id: '',
            first_name : '',
            last_name :  '',
            company :'',
            title :  '',
            office : '',
            phone_home : '',
            phone_mobile :  '',
            phone_office :  '',
            fax : '',
            website : '',
            email :  '',
            email2 : '',
            email3 : '',
            address : '',
            city : '',
            state :  '',
            zipcode :  '',
            household_contact :  '',
            status:  '',
            is_lead : false,
            created_by : '',
            status : '',
            source : ''
        }

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


        let myfunc = this.create;
        let lead_list = []
        if (this.props.match.params.id){
            for (var i=0;i<this.props.leads.length;i ++){
                if (!this.props.leads[i].is_lead){
                    lead_list.push(this.props.leads[i]);
                }
                if (this.props.leads[i].id == this.props.match.params.id) {
                    def_leads = this.props.leads[i]
                }
            }
            myfunc = this.update;
        }

		return (
			<div id="addcontacts">
                <div id="left_side">
                    <LeadInfo lead={def_leads} create={myfunc} userInfo={currentUser} convertToLead={this.convertToLead} alert={this.state.alert}/>
                    {def_leads.id ? <LeadInteraction {...this.props} lead={def_leads} user={this.props.user} /> : '' }
                </div>
                <div id="right_side" className="border">
                    <div id="team">
                        <div className="header">
                            <span className="htxt">
                                <span className="h3 font-bold">TEAM </span>
                                <span className="h4 font-bold">Assign Team Member</span>
                            </span>
                            <button className="btn btn-default btn-xs btn-raised waves-effect pull-right"><i className="material-icons">add</i>ADD</button>
                            <div>
                                <img className="avatar" src={avatar} />
                                <img className="avatar" src={avatar} />
                                <img className="avatar" src={avatar} />
                            </div>
                        </div>
                        <div className="body">
                            <button className="btn btn-default btn-xs btn-raised waves-effect pull-right"><i className="material-icons">add</i>Add</button>
                            <span className="h3 font-bold">RELATED CONTACTS</span><br />
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td className="name"><span className="h4 ">Jack Heronini</span></td>
                                        <td><span className="h4">Friend</span></td>
                                        <td className="tools">
                                            <i className="material-icons">edit</i>
                                            <i className="material-icons">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="name"><span className="h4">Jack Heronini</span></td>
                                        <td><span className="h4">Friend</span></td>
                                        <td className="tools">
                                            <i className="material-icons">edit</i>
                                            <i className="material-icons">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="name"><span className="h4">Jack Heronini</span></td>
                                        <td><span className="h4">Co-worker</span></td>
                                        <td className="tools">
                                            <i className="material-icons">edit</i>
                                            <i className="material-icons">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="name"><span className="h4">Jack Heronini</span></td>
                                        <td><span className="h4">Friend</span></td>
                                        <td className="tools">
                                            <i className="material-icons">edit</i>
                                            <i className="material-icons">delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="name"><span className="h4">Jack Heronini</span></td>
                                        <td><span className="h4">Co-worker</span></td>
                                        <td className="tools">
                                            <i className="material-icons">edit</i>
                                            <i className="material-icons">delete</i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="footer">
                            <button className="btn btn-default btn-xs btn-raised waves-effect">SAVE</button>
                        </div>
                    </div>
                    <div id="circle">
                        <div className="header">
                            <span className="h3 font-bold">CIRCLES</span>
                        </div>
                        <div className="body">
                             <ul className="list-group">
                            {  this.props.match.params.id? this.props.circles.map((circle, i) =>
                                <li className="list-group-item" key={i} >
                                    <input type="checkbox" id={ "check"+ circle.id.toString() } onChange={this.selectCheckbox.bind(this, circle.id, this.props.match.params.id)} className="filled-in" checked={this.checkStatus(circle.id)}/>
                                    <label htmlFor={ "check"+circle.id.toString() }   ></label>
                                    <span><label className="mark" style={{backgroundColor : circle.color}}></label></span>
                                    <span className="check_circle"><NavLink to={`/newleads/${circle.id}`}>{circle.name}</NavLink></span>
                                </li>
                            ) :
                                this.props.circles.map((circle, i) =>
                                <li className="list-group-item" key={i} disabled="true" >
                                    <input type="checkbox" id={ "check"+ circle.id.toString() } onChange={ this.warningDialog } className="filled-in" checked={this.checkStatus(circle.id)}/>
                                    <label htmlFor={ "check"+circle.id.toString() }   ></label>
                                    <span><label className="mark" style={{backgroundColor : circle.color}}></label></span>
                                    <span className="check_circle" style={{ cursor : "pointer"}}>{circle.name}</span>
                                </li>
                            )}
                            </ul>
                        </div>
                    </div>
                    <div id="document">
                        <div className="header">
                            <span className="h3 font-bold">DOCUMENTS</span>
                            <div className="file">
                                <span className="h4 htxt">File Sample docs</span>
                                <span className="pull-right">
                                    <i className="material-icons">edit</i>
                                    <i className="material-icons">delete</i>
                                </span>
                            </div>
                            <button className="btn btn-default btn-xs btn-raised waves-effect"><i className="material-icons">add</i>ADD DOCUMENTS</button>
                        </div>
                    </div>
                    <div id="tags">
                        <div className="header">
                            <span className="h3 font-bold">Tags</span>
                            <div className="tlist">
                                <span><i className="material-icons">edit</i></span>
                                <span className="label label-primary">Tag1</span>
                                <span className="label label-success">Tag 0002</span>
                                <span className="label label-warning">Tag 003</span>
                                <span className="label label-danger">Tag4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContacts);
