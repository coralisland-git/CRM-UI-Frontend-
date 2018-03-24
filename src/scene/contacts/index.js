import React from 'react';
import CheckBox from '../../components/checkbox';
import DatePicker from '../../components/datepicker';
import TimePicker from '../../components/timepicker';
import DropdownBox from '../../components/dropdownbox';
import InputBox from '../../components/inputbox';
import EmailBox from '../../components/emailbox';
import PhoneBox from '../../components/phonebox';
import PopupBox from '../../components/popupbox';
import ProgressBar from '../../components/progressbar';
import { NavLink } from 'react-router-dom';
import Tag from '../../components/tag';
import CustomConfirmAlert, { confirmAlert } from '../../components/confirmdialog';
import avatar from '../../styles/assets/images/avatar0.png';
import './index.scss';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import {getLeads, createLeads, deleteLeads,deleteLeadsBuck, updateLeads, convertToLeadOrContact} from '../../services/actions/leads';

import {CSVLink, CSVDownload} from 'react-csv';
import * as csvutil from '../../utils/csv';

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: () => { getLeads(dispatch); },
        createLeads: (params) => {createLeads(params, dispatch);},
        updateLeads: (params) => {updateLeads(params, dispatch);},
        deleteLeads: (params) => {deleteLeads(params, dispatch);},
        deleteLeadsBuck: (params) => {deleteLeadsBuck(params, dispatch);},
        convertToLeadOrContact : (param1, param2) => {convertToLeadOrContact(param1, param2, dispatch);}
    });
}  

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads,
        user: state.auth.user
    });
}

class Contacts extends React.Component {

    constructor(props){
        super()
        this.state = {
            pageNum : 1,
            countPerPage : 5,
            startIndex : 0,
            endIndex : 5,
            number : 0,
            selecteditem : -1,
            selectedItemList: [],
            status: [],
            leads: [],
            selectedBuck: false,
            lead_list: []
        }
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.validIndex = this.validIndex.bind(this);
        this.convertToLeadOrContact = this.convertToLeadOrContact.bind(this);
      }

    componentWillMount(){
        this.props.getLeads();
    }

    create(lead) {
        if (lead !== undefined)
            this.props.createLeads(lead)
    }

    delete() {
        confirmAlert({
            template: "danger",
            message: "The contact is deleted successfully.",
        });
        if (this.state.selectedItemList.length !== 0)
            this.props.deleteLeadsBuck(this.state.selectedItemList)
            .then((res)=>{
                toast.success('Succeed removing selected Contacts', {autoClose: 10000});
            }).catch((err) => {
                toast.error("Error removing!", {autoClose: 10000});
            });
    }

    update(lead) {
        if (lead !== undefined)
            this.props.updateLeads(lead)
    }

    convertToLeadOrContact(){
        if(this.state.selectedItemList.length !== 0)
            this.props.convertToLeadOrContact(this.state.selectedItemList, true);
    }

   next(len) {
        var next = this.state.startIndex + this.state.countPerPage;
        var end = next + this.state.countPerPage;
        if(next > len){
        }
        else {
            this.setState({pageNum : this.state.pageNum +1});
            this.setState({startIndex : next, endIndex : end});
        }
      }
    back(e) {
        var back = this.state.startIndex - this.state.countPerPage;
        var end = back + this.state.countPerPage;
        if(back < 0) {
        
        }
        else {
            this.setState({pageNum : this.state.pageNum -1});
            this.setState({startIndex : back, endIndex: end});
        }
    }

    first(e) {
        this.setState({pageNum : 1});
        this.setState({startIndex: 0, endIndex: this.state.countPerPage});
    }

    last(all) {
        this.setState({pageNum : Math.ceil(all/this.state.countPerPage)});
        this.setState({startIndex: (Math.floor(all/this.state.countPerPage))*this.state.countPerPage, endIndex: (Math.ceil(all/this.state.countPerPage))*this.state.countPerPage})
    }

    validIndex(i) {
        if ((this.state.startIndex <= i) && (i < this.state.endIndex)) return true;
        return false;
    }

    componentWillReceiveProps(newProps) {
        let lead_list = [];
        if (this.state.leads !== newProps.leads) {
            let status = [];

            if (newProps.leads.length == 0) return;

            for (var i=0;i<newProps.leads.length;i ++){
                if (!newProps.leads[i].is_lead){
                    lead_list.push(newProps.leads[i]);
                    status.push(false);
                }
            }

            this.setState({leads: lead_list, status: status, selectedItemList: [], selectedBuck: false});
        }
    }

    selectCheckbox(index, event, lead) {
        let status = [];
        let selectedItemList = [...this.state.selectedItemList];

        for (let i = 0; i < this.state.status.length ; i++) {
            if (i == index) {
                status.push(event.target.checked);
                let value = this.state.leads[index].id;
                
                if (event.target.checked == true)
                    selectedItemList.push(value)
                else
                    selectedItemList = selectedItemList.filter(item => item !== value);
            } else {
                status.push(this.state.status[i]);
            }            
        }

        let list = [ ...new Set(selectedItemList) ];

        this.setState({status: status, selectedItemList: list});
    }

    selectedCountIndex(event) {
        let status =[],  selectedItemList = [];
        selectedItemList = [...this.state.selectedItemList];
        this.setState({selectedBuck: event.target.checked});

        for (let i = 0; i < this.state.status.length ; i++) {
            if (i >= this.state.startIndex && i < this.state.endIndex) {
                status.push(event.target.checked);
                let value = this.state.leads[i].id;

                if (event.target.checked == true)
                    selectedItemList.push(value);
                else
                    selectedItemList = selectedItemList.filter(item => item !== value);
            } else {
                status.push(this.state.status[i]);
            }
        }

        let list = [ ...new Set(selectedItemList) ];

        this.setState({status: status, selectedItemList: list});
    }

    selectAll() {
        let status = [];
        let selectedItemList = [...this.state.selectedItemList];

        this.setState({selectedBuck: true});

        for (let i = 0; i < this.state.status.length ; i++) {
            status.push(true);
            let value = this.state.leads[i].id;
            selectedItemList.push(value)
        }

        let list = [ ...new Set(selectedItemList) ];

        this.setState({status: status, selectedItemList: list});
    }

    deSelectAll() {
        let status = [];
        this.setState({selectedBuck: false});
        for (let i = 0; i < this.state.status.length ; i++) {
            status.push(false);
        }        
        this.setState({status: status, selectedItemList: []});   
    }

    getValidDate(date) {
        date = new Date(date);
        var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return str;
    }


    render() {

        let self = this;

        let action_list = [
                {
                    name:"Bulk Action",
                    value:"bulkaction"
                },
                {
                    name:"Add to Circle",
                    value:"addtocircle"
                },
                {
                    name:"Merge Contact",
                    value:"mergecontact"
                }
                ,{
                    name:"Print to PDF",
                    value:"printtopdf"
                },
                {
                    name:"Convert to Contact",
                    value:"converttocontact"
                },
                {
                    name:"Delete",
                    value:"delete"
                }

            ]
        
        let lead_list = []
        if (this.props.user.role != 'team') {
            for (var i=0;i<this.props.leads.length;i ++){
                if (!this.props.leads[i].is_lead){
                    lead_list.push(this.props.leads[i]);
                }
            }
        } else {
            for (var i=0;i<this.props.leads.length;i ++){
                this.props.leads[i].team.map((team_id) => {
                    if (this.props.user.id == team_id) {
                        lead_list.push(this.props.leads[i]);
                    }   
                })
            }
        }
        

        let sel_count = this.state.countPerPage;
        if (lead_list.length - this.state.countPerPage*(this.state.pageNum-1) < this.state.countPerPage) {
            sel_count = lead_list.length - this.state.countPerPage*(this.state.pageNum-1);
        }
        else {
            sel_count = this.state.countPerPage;
        }

   
        let csvdownload = csvutil.makeCSVCompatiableJSONA(lead_list);
        return (
            <div className="" id="contacts">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <div className="row top">

                            <span className="font-bold h4 pull-left" id="title">Contacts</span>
                            <div className="pull-right">
                                <NavLink to={`/addleads/${false}`} ><button className="btn btn-default btn-md btn-raised waves-effect">ADD CONTACTS</button></NavLink>  &nbsp;&nbsp;
                                <NavLink to="/contacts/import-contacts"><button className="btn btn-default btn-md btn-raised waves-effect">IMPORT</button></NavLink>    &nbsp;&nbsp;
                                <CSVLink filename="agentcloud-contacts.csv" style={{color: 'transparent' }} data={csvdownload}><button className="btn btn-default btn-md btn-raised waves-effect">EXPORT</button>&nbsp;&nbsp;</CSVLink>
                            </div>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <div className="border">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            	<td style={{width: "30px"}}></td>
                                                <td>Name</td>
                                                <td>Primary Address Street</td>
                                                <td>Home</td>
                                                <td>Email</td>
                                                <td>User</td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="10" className="d-inline-block sel-block">
                                                    <div className="row pull-left sel_box">
                                                        <div className="btn-group custom-group mr-10 sel2">
                                                            <input type="checkbox" id="selcheck" className="filled-in" onChange={this.selectedCountIndex.bind(this)} checked={this.state.selectedBuck}/>
                                                                <label htmlFor="selcheck">
                                                            </label>
                                                            <button type="button" className="btn btn-default btn-xs waves-effect">Select this Page( { sel_count } )</button>
                                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a href="javascript:void(0);" onClick={this.selectAll.bind(this)} >Select All( {lead_list.length} )</a></li>
                                                                <li><a href="javascript:void(0);" onClick={this.deSelectAll.bind(this)} >Deselect All</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="btn-group custom-group mr-10 sel1">
                                                            <button type="button" className="btn btn-default btn-xs waves-effect">Bulk Action</button>
                                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a href="javascript:void(0);">Print to PDF</a></li>
                                                                <li><a href="javascript:void(0);" onClick={() => { this.convertToLeadOrContact() }}>Convert to Contact</a></li>
                                                                <li><a href="javascript:void(0);" onClick={() => { this.delete() }} >Delete</a></li>
                                                            </ul>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="pull-right">
                                                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={this.first}><i className="material-icons">first_page</i></button>&nbsp;&nbsp;
                                                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={this.back}><i className="material-icons">chevron_left</i></button>&nbsp;&nbsp;
                                                        ({this.state.startIndex}-{this.state.endIndex} of {lead_list.length}) &nbsp;&nbsp;
                                                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={() => {this.next(lead_list.length)}}><i className="material-icons">chevron_right</i></button>&nbsp;&nbsp;
                                                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ () => {this.last(lead_list.length)}}><i className="material-icons">last_page</i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                            {lead_list.map((lead, i) =>
                                                { return self.validIndex(i) ? 
                                                    <tr key={i} >
                                                        <td>
                                                            <span className="checkandedit" style={{ "marginTop": "10px", "fontSize": "10px"}}>
                                                                <input type="checkbox" id={ "check"+ lead.id.toString() } onChange={this.selectCheckbox.bind(this, i)} className="filled-in" checked={this.state.status[i]} />
                                                                <label htmlFor={ "check"+lead.id.toString() }   ></label>
                                                            </span>
                                                        </td>
                                                        <td><img className="avatar" src={avatar} /><span className="font-bold">{lead.first_name + ' ' + lead.last_name}</span>
                                                            <NavLink to={`/addleads/${lead.is_lead}/${lead.id}`} style={{ float: "right", "marginTop" : "16px"}}><i className="material-icons edit-icon">edit</i></NavLink>
                                                        </td>
                                                        <td>{lead.address}</td>
                                                        <td>{lead.phone_home}</td>
                                                        <td>{lead.email}</td>
                                                        <td>{lead.user}</td>
                                                        <td>
                                                            <span className="dropdown"><span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="material-icons" style={{ "fontSize":"20px", "marginTop": "3px"}}>info_outline</i></span>
                                                                <ul className="dropdown-menu pull-right" id="detail">
                                                                    <li>
                                                                        <span className="h4">ADDITIONAL DETAILS</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="material-icons">star_border</i>
                                                                        <span className="h4 font-bold">Lead:</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Primary Address:</span><br />
                                                                        <span>{(lead.address || "") + ' ' + (lead.address2 || "" )+ ', ' + (lead.city || "") + ', ' + (lead.state || "") + ', ' + (lead.zipcode || '') }</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Mobile:</span><br />
                                                                        <span> { (lead.phone_mobile || '')}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Home Phone:</span><br />
                                                                        <span>{(lead.phone_home || '') }</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Lead Source:</span><br />
                                                                        <span> {(lead.source || "")}</span>
                                                                    </li>
                                                                </ul>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                :
                                                    <tr key={i} className="hidden">
                                                        <td>
                                                            <span className="checkandedit">
                                                                <input type="checkbox" id={ "check"+ lead.id.toString() } key={i} onClick={() => { this.setState({selecteditem : i})}} className="filled-in" />
                                                                <label htmlFor={ "check"+lead.id.toString() }></label>
                                                                <NavLink to={`/addleads/${lead.is_lead}/${lead.id}`} ><i className="material-icons edit-icon">edit</i></NavLink>
                                                            </span>
                                                        </td>
                                                        <td><span className="font-bold">{lead.first_name + ' ' + lead.last_name}</span></td>
                                                        <td>{lead.address}</td>
                                                        <td>{lead.phone_home}</td>
                                                        <td>{lead.email}</td>
                                                        <td>{lead.user}</td>
                                                        <td>
                                                            <span className="dropdown"><span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="material-icons">info_outline</i></span>
                                                                <ul className="dropdown-menu pull-right" id="detail">
                                                                    <li>
                                                                        <span className="h4">ADDITIONAL DETAILS</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="material-icons">star_border</i>
                                                                        <span className="h4 font-bold">Lead:</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Primary Address:</span><br />
                                                                        <span>{(lead.address || "") + ' ' + lead.address2 || "" + ', ' + lead.city || "" + ', ' + lead.state || "" + ', ' + lead.zipcode || '' }</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Mobile:</span><br />
                                                                        <span> { lead.phone_no}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Home Phone:</span><br />
                                                                        <span>{lead.phone_no}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="h4 font-bold">Lead Source:</span><br />
                                                                        <span> {lead.lead_sourceid}</span>
                                                                    </li>
                                                                </ul>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                }
                                            )}

                                        </tbody>
                                    </table>
                                    <div className="btms">
                                        <div className="row pull-left sel_box">
                                            <div className="btn-group custom-group mr-10 sel2">
                                                <input type="checkbox" id="selcheck" className="filled-in" onChange={this.selectedCountIndex.bind(this)} checked={this.state.selectedBuck}/>
                                                    <label htmlFor="selcheck">
                                                </label>
                                                <button type="button" className="btn btn-default btn-xs waves-effect">Select this Page( { sel_count } )</button>
                                                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                <ul className="dropdown-menu">
                                                    <li><a href="javascript:void(0);" onClick={this.selectAll.bind(this)} >Select All( {lead_list.length} )</a></li>
                                                    <li><a href="javascript:void(0);" onClick={this.deSelectAll.bind(this)} >Deselect All</a></li>
                                                </ul>
                                            </div>
                                            <div className="btn-group custom-group mr-10 sel1">
                                                <button type="button" className="btn btn-default btn-xs waves-effect">Bulk Action</button>
                                                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                <ul className="dropdown-menu">
                                                    <li><a href="javascript:void(0);">Print to PDF</a></li>
                                                    <li><a href="javascript:void(0);" onClick={() => { this.convertToLeadOrContact() }}>Convert to Contact</a></li>
                                                    <li><a href="javascript:void(0);" onClick={() => { this.delete() }} >Delete</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="pull-right">
                                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={this.first}><i className="material-icons">first_page</i></button>&nbsp;&nbsp;
                                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={this.back}><i className="material-icons">chevron_left</i></button>&nbsp;&nbsp;
                                            ({this.state.startIndex}-{this.state.endIndex} of {lead_list.length}) &nbsp;&nbsp;
                                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={() => {this.next(lead_list.length)}}><i className="material-icons">chevron_right</i></button>&nbsp;&nbsp;
                                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ () => {this.last(lead_list.length)}}><i className="material-icons">last_page</i></button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="border">
                                    <div className="row clearfix bottom">
                                        Security Group:Mass Assign &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-default btn-md btn-raised waves-effect">ASSIGN</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-default btn-md btn-raised waves-effect" onClick={() => { this.delete(lead_list[this.state.selecteditem]) }}>REMOVE</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        Group:&nbsp;&nbsp;
                                        <span className="col-xs-1" id="bottom-select">
                                            <select className="form-control show-tick">
                                                <option>None</option>
                                            </select>
                                        </span>
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


export default connect(mapStateToProps, mapDispatchToProps)(Contacts);