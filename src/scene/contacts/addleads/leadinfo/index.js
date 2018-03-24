import React from 'react';
import InputBox from '../../../../components/inputbox';
import avatar from '../../../../styles/assets/images/avatar0.png';
// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';
import './index.scss';
import { NavLink } from 'react-router-dom';

class LeadInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id : this.props.lead.id || '',
            first_name : this.props.lead.first_name || '',
            last_name : this.props.lead.last_name || '',
            company : this.props.lead.company || '',
            title : this.props.lead.title || '',
            office : this.props.lead.office || '',
            phone_home : this.props.lead.phone_home || '',
            phone_mobile : this.props.lead.phone_mobile || '',
            phone_office : this.props.lead.phone_office || '',
            fax : this.props.lead.fax || '',
            website : this.props.lead.website ||'',
            email : this.props.lead.email || '',
            email2: this.props.lead.email2 || '',
            email3: this.props.lead.email3 || '',
            address : this.props.lead.address || '',
            city : this.props.lead.city || '',
            state : this.props.lead.state || '',
            zipcode : this.props.lead.zipcode || '',
            household_contact : this.props.lead.household_contact || '',
            is_lead : this.props.lead.is_lead || false,
            created_by : this.props.lead.created_by,
            title1: this.props.lead.title || '',
            company1: this.props.lead.company || '',
            first_name1 : this.props.lead.first_name || '',
            last_name1: this.props.lead.last_name || '',
            status : this.props.lead.status || 'status',
            source : this.props.lead.source || 'source',
            facebook : this.props.lead.facebook || '',
            twitter : this.props.lead.twitter || '',
            google_plus : this.props.lead.google_plus || '',
            linkedin : this.props.lead.linkedin || '',
            instagram : this.props.lead.instagram || ''
        }

        this.cutString = this.cutString.bind(this);
    }

    componentDidMount() {
            if (this.state.title1.length > 20) {this.setState({title1: this.state.title1.slice(0,20)+'...'})}
            if (this.state.company1.length > 20) {this.setState({company1: this.state.company1.slice(0,20)+'...'})} 
            if (this.state.first_name1.length > 20) {this.setState({first_name1: this.state.first_name1.slice(0,20)+'...'})}
            if (this.state.last_name1.length > 20) {this.setState({last_name1: this.state.last_name1.slice(0,20)+'...'})}
    }

    cutString(ty,param) {
        if(param.length > 20){
            
            if (ty == 'ti'){this.setState({title1 : param.slice(0,20) + '...'});}
            if (ty == 'co'){this.setState({company1 : param.slice(0,20) + '...'});}
            if (ty == 'fn'){ this.setState({first_name1 : param.slice(0,10) + '...'});}
            if (ty == 'ln'){this.setState({last_name1 : param.slice(0,10) + '...'});}
        }
        else{ 
            if (ty == 'ti'){this.setState({title1 : param});}
            if (ty == 'co'){this.setState({company1 : param});}
            if (ty == 'fn'){this.setState({first_name1 : param});}
            if (ty == 'ln'){this.setState({last_name1 : param});}
        }
        if (ty == 'ti'){this.setState({title : param});}
        if (ty == 'co'){this.setState({company : param});}
        if (ty == 'fn'){this.setState({first_name : param});}
        if (ty == 'ln'){this.setState({last_name : param});}
    }

    onChange() {

    }

    render() {

        let curState = "Contact";
            if (this.state.is_lead) { curState = "Lead";}
            else {
                curState = "Contact";
        }

        return (
            <div id="contactinfo">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                    <div className="">
                            <div className="header">
                                <img className="avatar" src={avatar} />
                                <div id="title">
                                    <span className="font-bold h3">{this.state.first_name1 + ' ' + this.state.last_name1}</span>
                                    <div className="testing h4">
                                        <span className="mail">{ this.state.company1 + ' / ' + this.state.title1  } &nbsp;&nbsp;</span>
                                        <div id="social">
                                            { this.state.facebook? <i className="zmdi zmdi-facebook social_active"></i> : <i className="zmdi zmdi-facebook"></i>}
                                            { this.state.twitter? <i className="zmdi zmdi-twitter social_active"></i> : <i className="zmdi zmdi-twitter"></i>}
                                            { this.state.google_plus? <i className="zmdi zmdi-google-plus social_active"></i> : <i className="zmdi zmdi-google-plus"></i>}
                                            { this.state.linkedin? <i className="zmdi zmdi-linkedin social_active"></i> : <i className="zmdi zmdi-linkedin"></i>}
                                            { this.state.instagram? <i className="zmdi zmdi-instagram social_active"></i> : <i className="zmdi zmdi-instagram"></i>}
                                            <div className="dropdown"><span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="material-icons" id="edit">edit</i></span>
                                                <ul className="dropdown-menu pull-right" id="editlist">
                                                    <li>
                                                    <span className="editor"><InputBox key="14" type="email" value={ this.state.facebook } onChange={ (e) => { this.setState({facebook : e.target.value}); } }/></span>
                                                    <span className="icon"><i className="zmdi zmdi-facebook"></i></span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="15" type="email" value={ this.state.twitter } onChange={ (e) => { this.setState({twitter : e.target.value}); } }/></span>
                                                    <span className="icon"><i className="zmdi zmdi-twitter"></i></span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="16" type="email" value={ this.state.google_plus } onChange={ (e) => { this.setState({google_plus : e.target.value}); } }/></span>
                                                    <span className="icon"><i className="zmdi zmdi-google-plus"></i></span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="17" type="email" value={ this.state.linkedin } onChange={ (e) => { this.setState({linkedin : e.target.value}); } }/></span>
                                                    <span className="icon"><i className="zmdi zmdi-linkedin"></i></span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="18" type="email" value={ this.state.instagram } onChange={ (e) => { this.setState({instagram : e.target.value}); } }/></span>
                                                    <span className="icon"><i className="zmdi zmdi-instagram"></i></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="sel-box" className="flex-box">
                                        <div className="btn-group custom-group mr-10 sel1">
                                            <button type="button" className="btn btn-default btn-xs waves-effect">{this.state.status}</button>
                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "New"}); }}>New</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "Assigned"}); }}>Assigned</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "Recycled"}); }}>Recycled</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "Dead"}); }} >Dead</a></li>
                                            </ul>
                                        </div>
                                        <div className="btn-group custom-group mr-10 sel1">
                                            <button type="button" className="btn btn-default btn-xs waves-effect">{ this.state.source}</button>
                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Cold Call"}); }} >Cold Call</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Existing Customer"}); }}>Existing Customer</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Self Generated"}); }}>Self Generated</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Employee"}); }}>Employee</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Partner"}); }} >Partner</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Public Relation"}); }}>Public Relation</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Direct Mail"}); }}>Direct Mail</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Conference"}); }}>Conference</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Trade Show"}); }}>Trade Show</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Web Site"}); }}>Web Site</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "World of mouth"}); }}>World of mouth</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Email"}); }}>Email</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Campaign"}); }}>Campaign</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({source : "Other"}); }}>Other</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="ctrls">
                                    <div className="btn-group custom-group mr-10 sel1 bt-con">
                                        <button type="button" className="btn btn-default btn-md waves-effect"> {curState } </button>
                                        <button type="button" className="btn btn-default btn-md dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:void(0);" onClick={(e) => { this.setState({is_lead : true}); }}>Lead</a></li>
                                            <li><a href="javascript:void(0);" onClick={(e) => { this.setState({is_lead : false}); }} >Contact</a></li>
                                        </ul>
                                    </div>
                                    <button className="btn btn-default btn-md btn-raised waves-effect bt-con">FOLLOW UP</button>
                                    <button className="btn btn-md btn-raised waves-effect save_bt bt-con" onClick={(e) => {this.props.create(this.state)} } >{  this.state.id ? "EDIT" : "SAVE" }</button>
                                </div>
                            </div>
                            { this.props.alert !="" ?
                            <div className="alert alert-danger">
                            <strong>Oh snap!</strong> {this.props.alert}
                            </div>
                            : ''
                            }
                            <div className="body">
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">First Name <span style={{ color : 'red'}}>*</span></span>
                                    <div  className="h4 frm"><InputBox key="1" className="form-group-lg" placeholder="" value = {this.state.first_name} onChange={(e) => this.cutString('fn',e.target.value)} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Last Name <span style={{ color : 'red'}}>*</span></span>
                                    <div  className="h4 frm"><InputBox key="2" className="form-group-lg" placeholder="" value = {this.state.last_name} onChange={(e) => this.cutString('ln',e.target.value)} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Company</span>
                                    <div  className="h4 frm"><InputBox key="3" className="form-group-lg" placeholder="" value = {this.state.company}  onChange={(e) => this.cutString('co',e.target.value) } /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Title</span>
                                    <div  className="h4 frm"><InputBox key="4" className="form-group-lg" placeholder="" value = {this.state.title} onChange={(e) => this.cutString('ti', e.target.value)} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Office Name</span>
                                    <div  className="h4 frm"><InputBox key="34" className="form-group-lg" placeholder="" value = {this.state.office} onChange={(e) => this.setState({'office': e.target.value})} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Mobile Phone</span>
                                    <div  className="h4 frm"><InputBox key="35" className="form-group-lg" placeholder="" value = {this.state.phone_mobile} onChange={(e) => this.setState({'phone_mobile': e.target.value})} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Office Phone</span>
                                    <div  className="h4 frm"><InputBox key="21" className="form-group-lg" placeholder="" value = {this.state.phone_office} onChange={(e) => this.setState({'phone_office': e.target.value})} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Home Phone</span>
                                    <div  className="h4 frm"><InputBox key="22" className="form-group-lg" placeholder="" value = {this.state.phone_home} onChange={(e) => this.setState({'phone_home': e.target.value})} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Fax</span>
                                    <div  className="h4 frm"><InputBox key="6" className="form-group-lg" placeholder="" value = {this.state.fax} onChange={(e) => this.setState({'fax': e.target.value})} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Web Site</span>
                                    <div  className="h4 frm"><InputBox key="7" className="form-group-lg" placeholder="" value = {this.state.website} onChange={(e) => this.setState({'website': e.target.value})} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Email <span style={{ color : 'red'}}>*</span></span>
                                    <div  className="h4 frm"><InputBox key="50" className="form-group-lg" placeholder="" type="email" value = {this.state.email} onChange={(e) => this.setState({'email': e.target.value})} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Email2</span>
                                    <div  className="h4 frm"><InputBox key="51" className="form-group-lg" placeholder="" type="email" value = {this.state.email2} onChange={(e) => this.setState({'email2': e.target.value})} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Email3</span>
                                    <div  className="h4 frm"><InputBox key="8" className="form-group-lg" placeholder="" type="email" value = {this.state.email3} onChange={(e) => this.setState({'email3': e.target.value})} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">Address</span>
                                    <div  className="h4 frm"><InputBox key="9" className="form-group-lg" placeholder="" value = {this.state.address} onChange={(e) => this.setState({'address': e.target.value})} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">City</span>
                                    <div  className="h4 frm"><InputBox key="10" className="form-group-lg" placeholder="" value = {this.state.city} onChange={(e) => this.setState({'city': e.target.value})} /></div>
                                    </div>
                                    <div className="control">
                                    <span className="h4 lab">State</span>
                                    <div  className="h4 frm"><InputBox key="11" className="form-group-lg" placeholder="" value = {this.state.state} onChange={(e) => this.setState({'state': e.target.value})} /></div>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                    <span className="h4 lab">Zip</span>
                                    <div  className="h4 frm"><InputBox key="12" className="form-group-lg" placeholder="" value = {this.state.zipcode} onChange={(e) => this.setState({'zipcode': e.target.value})} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }

}

export default LeadInfo;


// <div className="control">
// <span className="h4 lab">Household Contacts</span>
// <span  className="h4 frm"><InputBox key="13" placeholder="" value = {this.state.household_contact} onChange={(e) => this.setState({'household_contact': e.target.value})}/></span>
// </div>