import React from 'react';
import InputBox from '../../../components/inputbox';
import LeadPill from '../../../components/leadpill';
import './index.scss';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import CreateCircle from '../createcircle';
import {getCircles, createCircles, deleteCircles, updateCircles, getCircle_leads, addLeadToCircle} from '../../../services/actions/circles';
import {getLeads} from '../../../services/actions/leads';
import CustomConfirmAlert, { confirmAlert } from '../../../components/confirmdialog';
//updates
const mapDispatchToProps = (dispatch) => {
    return ({
        getCircles: () => {getCircles(dispatch); },
        deleteCircles: (params) => {deleteCircles(params, dispatch);},
        getCircle_leads : (param1, param2) => {getCircle_leads(param1, param2, dispatch);},
        addLeadToCircle : (param1, param2) => {addLeadToCircle(param1, param2, dispatch);},
        updateCircles : (params) => {updateCircles(params, dispatch);},
    });
}

const mapStateToProps = (state) => {
    return ({ 
        circles: state.circles.circles,
        circle_leads: state.circles.circle_leads,
        user: state.auth.user,
    });
}

class NewLeads extends React.Component {

    constructor(props) {
        super();
        this.state = {
            addlead : '',
            addlead_id : '',
            reminder_day : '',
            status : "FILTER",
            order_by : 'SORT BY',
            open : ''
        }
        this.delete = this.delete.bind(this);
        this.addLeadToCircle = this.addLeadToCircle.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.update = this.update.bind(this);
    }

    componentWillMount(){
        this.props.getCircles();
        this.props.getCircle_leads(this.props.match.params.id, "first_name");
    }

    sortBy(param) {
        this.props.getCircle_leads(this.props.match.params.id, param);
    }

    update(circle) {
        this.props.updateCircles(circle);
    }

    delete(circle) {
        confirmAlert({
            title: 'Are you sure?',
            message: null,
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    this.props.deleteCircles(circle);
                    confirmAlert({
                        toastContent: "success",
                        message: "The circle is deleted successfully.",
                        outerClick : true
                    });
                    this.props.history.push('/circles');
                }, 100)
            }
        });
    }

    addLeadToCircle() {
        if (this.state.addlead_id && this.state.addlead_id != '')
        {
            var send_data = []
            send_data.push(this.state.addlead_id);
            this.props.addLeadToCircle(this.props.match.params.id, send_data);
            this.setState({
                addlead : '',
                addlead_id : '',
                open:''
            })
        }
        else {
            confirmAlert({
                template: "warning",
                message: "Please select lead or contact.",
                outerClick : true
            });
        }
    }

    changeReminderDay (current_circle, current_reminder_day) {
        current_circle.reminder_day = this.state.reminder_day;
        if (this.state.reminder_day == '') {
            current_circle.reminder_day = current_reminder_day;

        }
        this.props.updateCircles(current_circle);
    }

    render() {

        let def_circle = {
            id: this.props.match.params.id
        }


        let current_circle = {};
        for(var i=0;i < this.props.circles.length; i++) {
            if(this.props.circles[i].id == this.props.match.params.id) {
                current_circle = this.props.circles[i]
            }
        }        

        let lead_list = []
        if (this.props.circle_leads.members){
            if (this.state.status == "FILTER") {
                for(var i=0;i<this.props.circle_leads.members.length;i++){
                    lead_list.push(this.props.circle_leads.members[i]);
                }
            }
            if (this.state.status == "Filter Contacts By") {
                for(var i=0;i<this.props.circle_leads.members.length;i++){
                    if (!this.props.circle_leads.members[i].is_lead){
                        lead_list.push(this.props.circle_leads.members[i]);
                    }
                }
            }
            if (this.state.status == "Filter Leads By") {
                for(var i=0;i<this.props.circle_leads.members.length;i++){
                    if (this.props.circle_leads.members[i].is_lead){
                        lead_list.push(this.props.circle_leads.members[i]);
                    }
                }
            }
        }

        return (
            <div className="container-fluid" id="newleads">
                <span className="font-bold h4 pull-left"></span>
                <NavLink to="/addleads"><span className="font-bold h4 pull-left m-t-20" style={{color : "black"}}>New Leads</span></NavLink>
                <button className="btn btn-default btn-md btn-raised waves-effect pull-right" onClick={ (e)=> {this.delete(def_circle)}}>DELETE CIRCLE</button>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                    <div className="">
                        <div className="top row">
                            <div className="pull-left">
                                <span className="font-bold h4 m-r-20">{current_circle.name}</span> <CreateCircle number={current_circle.id} key={"modal"+current_circle.id} circle={current_circle} type="Edit" update={this.update}/>
                                <br />
                                <span>{current_circle.goal}</span>
                            </div>
                            <ul className="list-group pull-right">
                                <li className="list-group-item" id="reminder_txt">
                                    <span id="reminder" className="h5">Reminder (Days)   </span>
                                </li>
                                <li className="list-group-item" id="reminder_num">
                                    <input type="text" id="count" placeholder={current_circle.reminder_day} value={this.state.reminder_day} onChange={ (e) => { this.setState({reminder_day : e.target.value});}} onBlur={() => { this.changeReminderDay(current_circle, current_circle.reminder_day)}} />
                                </li>
                            </ul>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <div className="control row">
                                    <span className="font-bold h4">Lead</span>
                                    <label className="font-bold mark" style={{backgroundColor : current_circle.color}}><h4>{  this.props.circle_leads.members? this.props.circle_leads.members.length : ''  }</h4></label>
                                    <div className={"custom-group mr-10 sel1 "+this.state.open}>
                                        <InputBox type="text" className="form-group-lg" value={this.state.addlead} onChange={ (e) => {this.setState({addlead : e.target.value, open:'open'} )}}/>
                                        <i className="material-icons search_icon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">search</i>
                                        <ul className="dropdown-menu">
                                            { this.props.circle_leads.not_members? this.props.circle_leads.not_members.map((lead, i) =>
                                                {
                                                    return (lead.first_name+ " " + lead.last_name).toLowerCase().includes(this.state.addlead.toLowerCase())?
                                                    <li key={i} ><a href="javascript:void(0);" onClick={(e) => {this.setState({addlead : lead.first_name+ " " + lead.last_name, addlead_id : lead.id , open: ''}) }} >{lead.first_name+ " " + lead.last_name}</a></li>
                                                    : ''
                                                }
                                            ) : <li>no result</li>
                                        }
                                        </ul>
                                    </div>
                                    <div className="row pull-right controls">
                                        <button className="btn btn-success btn-md btn-raised waves-effect" id="add_bt" onClick={(e) => {this.addLeadToCircle()}} >Add Lead</button>&nbsp;&nbsp;
                                        <div className="btn-group custom-group mr-10 sel2">
                                            <button type="button" className="btn btn-default btn-md waves-effect">{ this.state.order_by }</button>
                                            <button type="button" className="btn btn-default btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="javascript:void(0);" onClick={ (e) => { this.sortBy("created_at"); this.setState({order_by : "Most Recent" })} }>Most Recent</a></li>
                                                <li><a href="javascript:void(0);" onClick={ (e) => { this.sortBy("-created_at"); this.setState({order_by : "Least Recent" })} } >Least Recent</a></li>
                                                <li><a href="javascript:void(0);" >Most Contacted</a></li>
                                                <li><a href="javascript:void(0);" >Least Contacted</a></li>
                                                <li><a href="javascript:void(0);" onClick={ (e) => { this.sortBy("first_name"); this.setState({order_by : "First Name" })} } >First Name</a></li>
                                                <li><a href="javascript:void(0);" onClick={ (e) => { this.sortBy("-first_name"); this.setState({order_by : "First Name(Z-A)" })} } >First Name(Z-A)</a></li>
                                                <li><a href="javascript:void(0);" onClick={ (e) => { this.sortBy("last_name"); this.setState({order_by : "Last Name" })} } >Last Name</a></li>
                                                <li><a href="javascript:void(0);" onClick={ (e) => { this.sortBy("-last_name"); this.setState({order_by : "Last Name(Z-A)" })} } >Last Name(Z-A)</a></li>
                                            </ul>
                                        </div>
                                        <div className="btn-group custom-group mr-10 sel2">
                                            <button type="button" className="btn btn-default btn-md waves-effect">{ this.state.status }</button>
                                            <button type="button" className="btn btn-default btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                            <ul className="dropdown-menu">
                                            <li><a href="javascript:void(0);" onClick={ ()=> {this.setState({status : "FILTER"})}} >ALL</a></li>
                                                <li><a href="javascript:void(0);" onClick={ ()=> {this.setState({status : "Filter Contacts By"})}} >Filter Contacts By</a></li>
                                                <li><a href="javascript:void(0);" onClick={ ()=> {this.setState({status : "Filter Leads By"})}}>Filter Leads By</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Circles</td>
                                                <td>Assigned</td>
                                                <td>Last Contact</td>
                                                <td>Tags</td>
                                                <td>Location</td>
                                                <td>Phone</td>
                                            </tr>
                                        </thead>
                                        <tbody>                                            
                                            { lead_list? lead_list.map((lead, i) =>
                                              <tr key={i}>
                                                <td className="title_avatar">
                                                    <LeadPill className=""
                                                            link={"/addleads/"+ (lead.is_lead? 'lead' : 'contact') +"/"+lead.id}
                                                            lead={lead}
                                                            info={true}
                                                            size={53}
                                                            />
                                                </td>
                                                <td style={{ minWidth: 120}}><div className="title1">{current_circle.name}</div></td>
                                                <td><div className="title1">{lead.assigned_user}</div></td>
                                                <td></td>
                                                <td style={{ maxWidth : 300, wordBreak: "break-all" }}><div className="title1">{lead.tags}</div></td>
                                                <td><div className="title1">{lead.location}</div></td>
                                                <td><div className="title1">{lead.phone_mobile? lead.phone_mobile : ''} </div></td>
                                              </tr>
                                            ) : '' }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewLeads);