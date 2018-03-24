import React from 'react';
import {bindActionCreators} from 'redux';
import CheckBox from '../../components/checkbox';
import DatePicker from '../../components/datepicker';
import TimePicker from '../../components/timepicker';
import DropdownBox from '../../components/dropdownbox';
import InputBox from '../../components/inputbox';
import EmailBox from '../../components/emailbox';
import PhoneBox from '../../components/phonebox';
import PopupBox from '../../components/popupbox';
import LeadPill from '../../components/leadpill';
import TagInput from './addleads/taginput';
import ProgressBar from '../../components/progressbar';
import { NavLink } from 'react-router-dom';
import Tag from '../../components/tag';
import avatar from '../../styles/assets/images/avatar0.png';
import CustomConfirmAlert, { confirmAlert } from '../../components/confirmdialog';
import Dropdown from '../../components/dropdown';
import './index.scss';
import {connect} from 'react-redux';
import {getLeads, createLeads, deleteLeads,deleteLeadsBuck, updateLeads, convertToLeadOrContact, getTags} from '../../services/actions/leads';
import {getCircles, addLeadToCircle, removeLeadFromCircle} from '../../services/actions/circles';
import {CSVLink, CSVDownload} from 'react-csv';
import * as csvutil from '../../utils/csv';
import html2canvas from 'html2canvas';
import * as interactionActions from '../../services/actions/interations';

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: () => { getLeads(dispatch); },
        createLeads: (params) => {createLeads(params, dispatch);},
        updateLeads: (params) => {updateLeads(params, dispatch);},
        deleteLeads: (params) => {deleteLeads(params, dispatch);},
        deleteLeadsBuck: (params) => {deleteLeadsBuck(params, dispatch);},
        getCircles: () => {getCircles(dispatch); },
        convertToLeadOrContact : (param1, param2) => {convertToLeadOrContact(param1, param2, dispatch);},
        getTags: () => {getTags(dispatch); },
        actions: bindActionCreators({...interactionActions}, dispatch),
    });
}   

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads,
        user: state.auth.user,
        circles : state.circles.circles,
        tags : state.leads.tags,
    });
}

class Leads extends React.Component {

    constructor(props){
        super()
        this.state = {
            pageNum : 1,
            countPerPage : 20,
            startIndex : 0,
            endIndex : 20,
            number : 0,
            selecteditem : -1,
            selectedItemList: [],
            selectedItemList_circle : [],
            status: [],
            status_circle : [],
            leads: [],
            selectedBuck: false,
            lead_list: [],
            test : 'bulk action',
            filter_company : "",
            filter_location : "",
            filter_account : "",
            filter_tag : "",
            filter_circle : "",
            tags : [],
            interactions: []

        }
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.validIndex = this.validIndex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.convertToLeadOrContact = this.convertToLeadOrContact.bind(this);

      }

    componentWillMount(){
        this.props.getLeads();
        this.props.getCircles();
        this.props.getTags();

        this.props.actions.getInteractions({
            type: 'note',
            lead_id:1085,

        }).then((interactions) => {
            this.setState({interactions: interactions});
        })
    }

    create(lead) {
        if (lead !== undefined)
            this.props.createLeads(lead)
    }

    delete() {
        if (this.state.selectedItemList.length !== 0) {
                confirmAlert({
                title: 'Are you sure?',
                message: null,
                template : 'warning',
                confirmLabel: 'YES',
                cancelLabel: 'CANCEL',
                onConfirm: () => {
                    setTimeout(() => {
                        this.props.deleteLeadsBuck(this.state.selectedItemList);
                        let msg = '';
                        if (this.state.selectedItemList.length > 1){
                            msg = "The " + this.props.match.params.type + "s are deleted successfully."
                        }
                        else {
                            msg = "The " + this.props.match.params.type + " is deleted successfully.";
                        }
                        confirmAlert({
                            toastContent: "success",
                            message: msg,
                            outerClick : true
                        });
                    }, 100)
                }
            });
        }
        else {
            confirmAlert({
                template: "warning",
                message: "Please select "+this.props.match.params.type+"s.",
                outerClick : true
            });
        }
    }

    update(lead) {
        if (lead !== undefined)
            this.props.updateLeads(lead)
    }

    convertToLeadOrContact(){
        if(this.state.selectedItemList.length !== 0) {
            if (this.props.match.params.type == "contact") {
                this.props.convertToLeadOrContact(this.state.selectedItemList, true);
            }
            if (this.props.match.params.type == "lead") {
                this.props.convertToLeadOrContact(this.state.selectedItemList, false);
            }
        }
    }



    printDocument() {

        let selectedItemList = [...this.state.selectedItemList];
        let leads = this.props.leads;
        let lead_list = leads.filter(lead=>{
            return selectedItemList.indexOf(lead.id) != -1;
        });

        // const input = document.getElementById('divToPrint');
        // html2canvas(input)
        //   .then((canvas) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF();
        //     pdf.addImage(imgData, 'JPEG', 0, 0);
        //     // pdf.output('dataurlnewwindow');
        //     pdf.save("download.pdf");
        //   });

        var mywindow = window.open('', '', 'width=1000, height=600');
        mywindow.document.write('<html><head><title></title>');
        mywindow.document.write('<link rel="stylesheet" href="/wp-content/themes/twentysixteen/custom/assets/css/make-a-request.css" type="text/css" />');
        mywindow.document.write('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
        
        mywindow.document.write('</head><body style="margin: 30px">');
        mywindow.document.write(` <table class="table ">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Primary Address</td>
                                            <td>Home</td>
                                            <td>Email</td>
                                        </tr>
                                    </thead>
                                    <tbody>` + 
                                    lead_list.map((lead) => {
                                        return `<tr>
                                            <td>
                                            <span>` + lead.first_name + ' ' + lead.last_name + `</span>
                                            </td>
                                            <td>` + (lead.address ? lead.address : '') +`</td>
                                            <td>` + (lead.phone_home ? lead.phone_home : '') + `</td>
                                            <td>` + lead.email + `</td>
                                        </tr>`;
                                    }).join('') + 
                                        `
                                    </tbody>
                                </table>`)
        mywindow.document.write('</body><script>window.print(); setTimeout(function(){ window.close(); }, 500); </script><style>@page{size: landscape; margin: 0; }</style></html>');
        mywindow.document.close();
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

    // componentWillReceiveProps(newProps) {
    //     if (this.state.leads !== newProps.leads) {
    //         this.setState({leads: newProps.leads});
    //         let status = [];
    //         if (newProps.leads.length == 0) return;

    //         for (let st of newProps.leads) {
    //             status.push(false);
    //         }

    //         this.setState({status: status});
    //     }
    // }

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
        let status = [],
            lead_list = [];
        let status_circle = [];
        
        if (this.state.leads !== newProps.leads) {
            if (newProps.leads.length == 0) return;
            for (var i=0;i<newProps.leads.length;i ++){
                if (newProps.match.params.type == "lead" && newProps.leads[i].is_lead){
                    lead_list.push(newProps.leads[i]);
                    status.push(false);
                }
                if (newProps.match.params.type == "contact" && !newProps.leads[i].is_lead){
                    lead_list.push(newProps.leads[i]);
                    status.push(false);
                }
            }

            for (let i=0;i<this.props.circles.length;i++){
                status_circle.push(false);
            }

            this.setState({
                leads: lead_list, 
                status: status, 
                selectedItemList: [], 
                selectedBuck: false, 
                status_circle: status_circle,
                selectedItemList_circle: [],
                pageNum : 1,
                countPerPage : 20,
                startIndex : 0,
                endIndex : 20,
            });
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

    selectCheckbox_circle(index, event) {
        let status_circle = [];
        let selectedItemList_circle = [...this.state.selectedItemList_circle];

        for (let i = 0; i < this.state.status_circle.length ; i++) {
            if (i == index) {
                status_circle.push(event.target.checked);
                let value = this.props.circles[index].id;
                if (event.target.checked == true)
                    selectedItemList_circle.push(value)
                else
                    selectedItemList_circle = selectedItemList_circle.filter(item => item !== value);
            } else {
                status_circle.push(this.state.status_circle[i]);
            }            
        }

        let list = [ ...new Set(selectedItemList_circle) ];

        this.setState({status_circle: status_circle, selectedItemList_circle: list});
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

    goto_merge() {
        if(this.state.selectedItemList.length >=2 && this.state.selectedItemList.length <=4){
           this.props.history.push('/mergeleads/'+this.state.selectedItemList.join('+'));
        }
        else {
            confirmAlert({
                template: "warning",
                message: "Please select 2~4 "+this.props.match.params.type+"s.",
                outerClick : true
            });
        }
    }

    handleChange(tags) {
        this.setState({tags});
    }

    render() {
        let self = this;
        let initial_lead_list = [];
        let team_setting = true;
        if (this.props.user.role =="team" && this.props.team_settings) {
            if (!this.props.team_settings.contactDataExport) {
                team_setting = false;    
            }
        }


        let lead_list = [];

        if (this.props.match.params.type) {
            if (this.props.match.params.type == "lead") {
                for (var i=0;i<this.props.leads.length;i ++){
                    if (this.props.leads[i].is_lead){
                        lead_list.push(this.props.leads[i]);
                    }
                }
            }
            if (this.props.match.params.type == "contact") {
                for (var i=0;i<this.props.leads.length;i ++){
                    if (!this.props.leads[i].is_lead){
                        lead_list.push(this.props.leads[i]);
                    }
                }
            }
        }

        if (this.props.user.role == 'team') {
            let tmp = lead_list;
            lead_list = [];
           for (var i=0;i<tmp.length;i ++){
               tmp[i].team.map((team_id) => {
                   if (this.props.user.id == team_id) {
                       lead_list.push(this.props.leads[i]);
                   }   
               })
           }
        }

        function arrayContainsArray (superset, subset) {
          return subset.every(function (value) {
            return (superset.indexOf(value) >= 0);
          });
        }

        if (this.state.tags.length !== 0) {
            let filter_temp = lead_list;
            lead_list = [];
            for (let i=0;i<filter_temp.length;i++){
                if (filter_temp[i].tags !== null) {
                    let tags_tmp = filter_temp[i].tags.split(',')
                    if (arrayContainsArray(tags_tmp, this.state.tags)) {
                        lead_list.push(filter_temp[i]);
                    }
                }
            }
        }

        if (this.state.selectedItemList_circle.length !== 0){
            let filter_temp = lead_list;
            lead_list = [];
            for (let i=0;i<filter_temp.length;i++){
                if (arrayContainsArray(filter_temp[i].circles, this.state.selectedItemList_circle)) {
                    lead_list.push(filter_temp[i]);
                }
            }
        }
        // let lead_list = [];

        // for filter :

        // for(let i=0;i<initial_lead_list.length;i++){
        //     if (this.state.filter_company !== "" || this.state.filter_account !== "" || this.state.filter_location !== "" || this.state.filter_tag !== "") {
        //         if (( initial_lead_list[i].company && initial_lead_list[i].company.includes(this.state.filter_company )) ||
        //             ( initial_lead_list[i].account && initial_lead_list[i].account.includes(this.state.filter_account )) ||
        //             (( initial_lead_list[i].address && initial_lead_list[i].address.includes(this.state.filter_location )) || 
        //                 ( initial_lead_list[i].address2 && initial_lead_list[i].address2.includes(this.state.filter_location )) || 
        //                 ( initial_lead_list[i].state && initial_lead_list[i].state.includes(this.state.filter_location )) || 
        //                 ( initial_lead_list[i].city && initial_lead_list[i].city.includes(this.state.filter_location )) || 
        //                 ( initial_lead_list[i].zipcode && initial_lead_list[i].zipcode.includes(this.state.filter_location ))) && 
        //              (initial_lead_list[i].tags && initial_lead_list[i].tags.includes(this.state.filter_tag))
        //             ){
        //             lead_list.push(initial_lead_list[i]);   
        //         }
        //     }
        //     else {
        //         lead_list.push(initial_lead_list[i]);      
        //     }
        // }
            

        let csvdownload = csvutil.makeCSVCompatiableJSONA(lead_list, this.state.interactions);

        let sel_count = this.state.countPerPage;
        if (lead_list.length - this.state.countPerPage*(this.state.pageNum-1) < this.state.countPerPage) {
            sel_count = lead_list.length - this.state.countPerPage*(this.state.pageNum-1);
        }
        else {
            sel_count = this.state.countPerPage;
        }

        let circle_list = [];
        if (this.state.filter_circle !== "" || this.state.filter_circle == null) {
            for(let i=0;i<this.props.circles.length;i++){
                if(this.props.circles[i].name.toLowerCase().includes(this.state.filter_circle.toLowerCase())) {
                    circle_list.push(this.props.circles[i]);
                }
            }
        }
        else {
            circle_list = this.props.circles;
        }

        return (
            <div className="container-fluid" id="leads">
                <div className="">
                    <div className="row top">
                        <span className="font-bold h4 pull-left" id="title">{this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1)}</span>
                        <div className="pull-right" style={{display: 'flex'}}>
                            <NavLink to={`/addleads/${this.props.match.params.type}`}> <button className="btn btn-default btn-md btn-raised waves-effect">ADD {this.props.match.params.type.toUpperCase()}</button></NavLink>  &nbsp;&nbsp;
                            {
                                team_setting
                                    ? <div>
                                        <NavLink to={`/import-leads/${this.props.match.params.type}`}><button className="btn btn-default btn-md btn-raised waves-effect">IMPORT</button></NavLink>&nbsp;&nbsp;
                                        <CSVLink filename={`agentcloud-${this.props.match.params.type}s.csv`} style={{color: 'transparent' }} data={csvdownload}><button className="btn btn-default btn-md btn-raised waves-effect">EXPORT</button>&nbsp;&nbsp;</CSVLink>
                                      </div>
                                    : ''
                            }
                            
                        </div>
                    </div>
                    <div className="main">
                        <div className="content">
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
                                                            <button type="button" className="btn btn-default btn-xs waves-effect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select this Page( { sel_count } )</button>
                                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a href="javascript:void(0);" onClick={this.selectAll.bind(this)} >Select All( {lead_list.length} )</a></li>
                                                                <li><a href="javascript:void(0);" onClick={this.deSelectAll.bind(this)} >Deselect All</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="btn-group custom-group mr-10 sel1">
                                                            <button type="button" className="btn btn-default btn-xs waves-effect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bulk Action</button>
                                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a href="javascript:void(0);" onClick={this.printDocument.bind(this)}>Print to PDF</a></li>
                                                                <li><a href="javascript:void(0);" onClick={() => { this.convertToLeadOrContact() }}>Convert to { this.props.match.params.type=="lead" ? "Contact":"Lead"}</a></li>
                                                                <li><a href="javascript:void(0);" onClick={() => { this.goto_merge() }} >Merge {"  "+this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1)}</a></li>
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
                                                        <td class="title_avatar">
                                                        <LeadPill className=""
                                                            link={"/addleads/"+this.props.match.params.type+"/"+lead.id}
                                                            lead={lead}
                                                            info={true}
                                                            size={53}
                                                            />
                                                        <NavLink to={`/addleads/${this.props.match.params.type}/${lead.id}`} className="edit_pencil"><i className="fa fa-pencil edit-icon"></i></NavLink>
                                                        </td>
                                                        <td>{lead.address}</td>
                                                        <td>{lead.phone_home}</td>
                                                        <td>{lead.email}</td>
                                                        <td>{lead.user}</td>
                                                        <td>
                                                            <span className="dropdown"><span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="material-icons">info_outline</i></span>
                                                                <ul className="dropdown-menu pull-right" id="detail">
                                                                    <li>
                                                                        <span className="h5">ADDITIONAL DETAILS</span>
                                                                    </li>
                                                                    <li>
                                                                        <div>
                                                                            <i className="material-icons">star_border</i>
                                                                            <span className="font-bold detail_info">{"  "+this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1)}:</span>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Primary Address:</span><br />
                                                                        <span>{ lead.address? lead.address+', ' : ''} {lead.address2? lead.address2+', ' : ''} {lead.state? lead.state+', ' : ''}  {lead.city? lead.city+', ' : ''} { lead.zipcode? lead.zipcode : ''}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Mobile:</span><br />
                                                                        <span> { lead.phone_no}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Home Phone:</span><br />
                                                                        <span>{lead.phone_no}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Lead Source:</span><br />
                                                                        <span> {lead.lead_sourceid}</span>
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
                                                                <NavLink to={`/addleads/${this.props.match.params.type}/${lead.id}`} ><i className="fa fa-pencil edit-icon"></i></NavLink>
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
                                                                        <span className="h5">ADDITIONAL DETAILS</span>
                                                                    </li>
                                                                    <li>
                                                                        <i className="material-icons">star_border</i>
                                                                        <span className="font-bold">{"  "+this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1)}:</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Primary Address:</span><br />
                                                                        <span>{ lead.address? lead.address+', ' : ''} {lead.address2? lead.address2+', ' : ''} {lead.state? lead.state+', ' : ''}  {lead.city? lead.city+', ' : ''} {lead.zipcode? lead.zipcode : ''}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Mobile:</span><br />
                                                                        <span> { lead.phone_no}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Home Phone:</span><br />
                                                                        <span>{lead.phone_no}</span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-bold">Lead Source:</span><br />
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
                                                <button type="button" className="btn btn-default btn-xs waves-effect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select this Page( { sel_count } )</button>
                                                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                <ul className="dropdown-menu">
                                                    <li><a href="javascript:void(0);" onClick={this.selectAll.bind(this)} >Select All( {lead_list.length} )</a></li>
                                                    <li><a href="javascript:void(0);" onClick={this.deSelectAll.bind(this)} >Deselect All</a></li>
                                                </ul>
                                            </div>
                                            <div className="btn-group custom-group mr-10 sel1">
                                                <button type="button" className="btn btn-default btn-xs waves-effect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bulk Action</button>
                                                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                                <ul className="dropdown-menu">
                                                    <li><a href="javascript:void(0);" onClick={this.printDocument.bind(this)}>Print to PDF</a></li>
                                                    <li><a href="javascript:void(0);" onClick={() => { this.convertToLeadOrContact() }}>Convert to { this.props.match.params.type=="lead" ? "Contact":"Lead"}</a></li>
                                                    <li><a href="javascript:void(0);" onClick={() => { this.goto_merge() }} >Merge {"  "+this.props.match.params.type.charAt(0).toUpperCase() + this.props.match.params.type.slice(1)}</a></li>
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
                                   {/*} <div className="border">
                                        <div className="row clearfix bottom">
                                            Security Group:Mass Assign &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-default btn-md btn-raised waves-effect">ASSIGN</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-default btn-md btn-raised waves-effect" onClick={() => { this.delete() }}>REMOVE</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            Group:&nbsp;&nbsp;
                                            <span className="col-xs-1" id="bottom-select">
                                                <select className="form-control show-tick">
                                                    <option>None</option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                    */}
                            </div>
                        </div>
                        <div className="sidebar border">
                            <span className="sidebar_title">FILTER</span>
                            <div id="circle" className="block">
                                <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseCircle" aria-expanded="true"
                                                   aria-controls="collapseCircle">
                                    <div className="font-bold">Circles</div>
                                    <div className="caret"></div>

                                </div>
                                <div id="collapseCircle" className="panel-collapse collapse in" role="tabpanel">
                                    <div className="search">
                                        <InputBox placeholder="Search" value={ this.filter_circle} onChange={ (e) => { this.setState({filter_circle : e.target.value})}} />
                                        <i className="material-icons search_icon">search</i>
                                    </div>
                                    <ul className="list-group">
                                    { circle_list.map((circle, i) =>
                                        <li className="list-group-item" key={i} >
                                            <input type="checkbox" id={ "check"+ circle.id.toString() } onChange={this.selectCheckbox_circle.bind(this, i)}  className="filled-in" checked={this.state.status_circle[i]}/>
                                            <label htmlFor={ "check"+circle.id.toString() }   ></label>
                                            <label className="mark" style={{backgroundColor : circle.color}}></label>
                                            <span className="check_circle"><NavLink to={`/newleads/${circle.id}`}>{circle.name}</NavLink></span>
                                        </li>
                                    )}
                                    </ul>
                                    <div><NavLink to="/circles" className="htxt">Manage Circles</NavLink></div>
                                </div>
                            </div>
                            <div id="status" className="block">
                                <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseStatus" aria-expanded="false"
                                                   aria-controls="collapseStatus">
                                    <div className="font-bold">Status</div>
                                    <div className="caret"></div>

                                </div>
                                <div id="collapseStatus" className="panel-collapse collapse" role="tabpanel">
                                    <div className="search">
                                        <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({search_key : e.target.value})}} />
                                        <i className="material-icons search_icon">search</i>
                                    </div>
                                    <ul className="list-group">
                                        <li className="list-group-item" >
                                            <input type="checkbox" id="check1" className="filled-in"/>
                                            <label htmlFor="check1" ></label>
                                            <span className="check_circle">Hot</span>
                                        </li>
                                        <li className="list-group-item" >
                                            <input type="checkbox" id="check2" className="filled-in"/>
                                            <label htmlFor="check2" ></label>
                                            <span className="check_circle">Nurturing</span>
                                        </li>
                                        <li className="list-group-item" >
                                            <input type="checkbox" id="check3" className="filled-in"/>
                                            <label htmlFor="check3" ></label>
                                            <span className="check_circle">Closed</span>
                                        </li>
                                        <li className="list-group-item" >
                                            <input type="checkbox" id="check4" className="filled-in"/>
                                            <label htmlFor="check4" ></label>
                                            <span className="check_circle">Dead</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div id="tags" className="block">
                                <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseTag" aria-expanded="false"
                                                   aria-controls="collapseTag">
                                    <div className="font-bold">Tags</div>
                                    <div className="caret"></div>
                                </div>
                                <div id="collapseTag" className="panel-collapse collapse" role="tabpanel">
                                    <div className="search">
                                        {/* <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({filter_tag : e.target.value})}} />
                                            <i className="material-icons search_icon">search</i>
                                        */} 
                                        <TagInput value={this.state.tags} onChange={this.handleChange} tags={this.props.tags}/>
                                        <i className="material-icons tag_search_icon">search</i>
                                    </div>
                                </div>
                            </div>
                            {/* <div id="companies" className="block">
                                    <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseCompanies" aria-expanded="false"
                                                       aria-controls="collapseCompanies">
                                        <div className="font-bold">Companies</div>
                                        <div className="caret"></div>
                                    </div>
                                    <div id="collapseCompanies" className="panel-collapse collapse" role="tabpanel">
                                        <div className="search">
                                            <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({filter_company : e.target.value})}} />
                                            <i className="material-icons search_icon">search</i>
                                        </div>
                                        <div className="htxt">Manage Companies</div>
                                    </div>
                                </div>
                            */}
                            {/* <div id="location" className="block">
                                    <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseLocation" aria-expanded="false"
                                                       aria-controls="collapseLocation">
                                        <div className="font-bold">Location</div>
                                        <div className="caret"></div>

                                    </div>
                                    <div id="collapseLocation" className="panel-collapse collapse" role="tabpanel">
                                        <div className="search">
                                            <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({filter_location : e.target.value})}} />
                                            <i className="material-icons search_icon">search</i>
                                        </div>
                                        <div className="htxt">Manage Locations</div>
                                    </div>
                                </div>
                            */}
                            <div id="assignedto" className="block">
                                <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseAssignedto" aria-expanded="false"
                                                   aria-controls="collapseAssignedto">
                                    <div className="font-bold">Assigned to</div>
                                    <div className="caret"></div>

                                </div>
                                <div id="collapseAssignedto" className="panel-collapse collapse" role="tabpanel">
                                    <div className="search">
                                        <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({search_key : e.target.value})}} />
                                        <i className="material-icons search_icon">search</i>
                                    </div>
                                    <ul className="list-group">
                                        <li className="list-group-item" >
                                            <input type="checkbox" id="check5" className="filled-in"/>
                                            <label htmlFor="check5" ></label>
                                            <span className="check_circle">John Paul</span>
                                        </li>
                                        <li className="list-group-item" >
                                            <input type="checkbox" id="check6" className="filled-in"/>
                                            <label htmlFor="check6" ></label>
                                            <span className="check_circle">Geroge Tapul</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div id="connectedto" className="block">
                                    <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseConnectedto" aria-expanded="false"
                                                       aria-controls="collapseConnectedto">
                                        <div className="font-bold">Connected to</div>
                                        <div className="caret"></div>

                                    </div>
                                    <div id="collapseConnectedto" className="panel-collapse collapse" role="tabpanel">
                                        <div className="search">
                                            <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({search_key : e.target.value})}} />
                                            <i className="material-icons search_icon">search</i>
                                        </div>
                                        <ul className="list-group">
                                            <li className="list-group-item" >
                                                <input type="checkbox" id="check7" className="filled-in"/>
                                                <label htmlFor="check7" ></label>
                                                <span className="check_circle">John Paul</span>
                                            </li>
                                            <li className="list-group-item" >
                                                <input type="checkbox" id="check8" className="filled-in"/>
                                                <label htmlFor="check8" ></label>
                                                <span className="check_circle">Geroge Tapul</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            */}
                            {/* <div id="frequency" className="block">
                                    <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseFrequency" aria-expanded="false"
                                                       aria-controls="collapseFrequency">
                                        <div className="font-bold">Frequency</div>
                                        <div className="caret"></div>

                                    </div>
                                    <div id="collapseFrequency" className="panel-collapse collapse" role="tabpanel">
                                        <div className="search">
                                            <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({search_key : e.target.value})}} />
                                            <i className="material-icons search_icon">search</i>
                                        </div>
                                        <div>
                                            Last Contacted:
                                            <div className="row" style={{ display : 'inline-flex'}}>
                                                <InputBox type="text" id="101" placeholder="After" className="col-lg-5"/>
                                                <InputBox type="text" id="102" placeholder="Before" className="col-lg-5"/>
                                            </div>
                                        </div>
                                        <div>
                                            Added:
                                            <div className="row" style={{ display : 'inline-flex'}}>
                                                <InputBox type="text" id="103" placeholder="After" className="col-lg-5"/>
                                                <InputBox type="text" id="104" placeholder="Before" className="col-lg-5"/>
                                            </div>
                                        </div>
                                        <div>
                                            Times Contacted:
                                            <div className="row" style={{ display : 'inline-flex'}}>
                                                <InputBox type="text" id="105" placeholder="After" className="col-lg-5"/>
                                                <InputBox type="text" id="106" placeholder="Before" className="col-lg-5"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            */}
                            {/* 
                                <div id="accounts" className="block">
                                    <div className="header collapsed" role="button" data-toggle="collapse" href="#collapseAccounts" aria-expanded="false"
                                                       aria-controls="collapseAccounts">
                                        <div className="font-bold">Accounts</div>
                                        <div className="caret"></div>

                                    </div>
                                    <div id="collapseAccounts" className="panel-collapse collapse" role="tabpanel">
                                        <div className="search">
                                            <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({filter_account : e.target.value})}} />
                                            <i className="material-icons search_icon">search</i>
                                        </div>
                                    </div>
                                </div>
                            */}
                        </div>
                    </div>
                </div>
            </div>  
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
