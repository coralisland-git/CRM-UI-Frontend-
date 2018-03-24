import React from 'react';
import InputBox from '../../../../components/inputbox';
import InputBox2 from '../../../../components/inputbox2';
import PhoneInput from '../../../../components/phoneinput';
import PhoneInput2 from '../../../../components/phoneinput2';
import avatar from '../../../../styles/assets/images/avatar0.png';
import add from '../../../../styles/assets/images/add.png';
import AvatarEdit from '../../avatareditor';
import LeadPill from '../../../../components/leadpill';
import axios, { post } from 'axios';
import './index.scss';
import { NavLink } from 'react-router-dom';

class LeadInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.lead.id || '',
            image : this.props.lead.image || '',
            first_name : this.props.lead.first_name || '',
            last_name : this.props.lead.last_name || '',
            company : this.props.lead.company || '',
            title : this.props.lead.title || '',
            office : this.props.lead.office || '',
            phone_home : this.props.lead.phone_home || '',
            phone_mobile : this.props.lead.phone_mobile || '',
            phone_mobile2 : this.props.lead.phone_mobile2 || '',
            phone_mobile3 : this.props.lead.phone_mobile3 || '',
            phone_office : this.props.lead.phone_office || '',
            phone_office2: this.props.lead.phone_office2 || '',
            phone_office3 : this.props.lead.phone_office3 || '',
            fax : this.props.lead.fax || '',
            website : this.props.lead.website ||'',
            email : this.props.lead.email || '',
            email2 : this.props.lead.email2 || '',
            email3 : this.props.lead.email3 || '',
            address : this.props.lead.address || '',
            address2 : this.props.lead.address2 || '',
            city : this.props.lead.city || '',
            state : this.props.lead.state || '',
            zipcode : this.props.lead.zipcode || '',
            is_lead : this.props.lead.is_lead || this.props.type,
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
            instagram : this.props.lead.instagram || '',
            household : this.props.lead.household,
            address_2 : this.props.lead.address_2 || '',
            address2_2 : this.props.lead.address2_2 || '',
            city_2 : this.props.lead.city_2 || '',
            state_2 : this.props.lead.state_2 || '',
            zipcode_2 : this.props.lead.zipcode_2 || '',
            address_3 : this.props.lead.address_3 || '',
            address2_3 : this.props.lead.address2_3 || '',
            city_3 : this.props.lead.city_3 || '',
            state_3 : this.props.lead.state_3 || '',
            zipcode_3 : this.props.lead.zipcode_3 || '',
            address_4 : this.props.lead.address_4 || '',
            address2_4 : this.props.lead.address2_4 || '',
            city_4 : this.props.lead.city_4 || '',
            state_4 : this.props.lead.state_4 || '',
            zipcode_4 : this.props.lead.zipcode_4 || '',
            address_5 : this.props.lead.address_5 || '',
            address2_5 : this.props.lead.address2_5 || '',
            city_5 : this.props.lead.city_5 || '',
            state_5 : this.props.lead.state_5 || '',
            zipcode_5 : this.props.lead.zipcode_5 || '',
            disabled : false,
            more_office_phone : false,
            more_mobile_phone : false,
            more_email : false,
            more_address : 0
        }

        this.cutString = this.cutString.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        if (this.state.title1.length > 20) {this.setState({title1: this.state.title1.slice(0,20)+'...'})}
        if (this.state.company1.length > 20) {this.setState({company1: this.state.company1.slice(0,20)+'...'})} 
        if (this.state.first_name1.length > 20) {this.setState({first_name1: this.state.first_name1.slice(0,20)+'...'})}
        if (this.state.last_name1.length > 20) {this.setState({last_name1: this.state.last_name1.slice(0,20)+'...'})}
    }

    componentWillReceiveProps(newProps) {
        if (this.props.lead !== newProps.lead ){
           this.setState({
                id : newProps.lead.id || '',
                image : newProps.lead.image || '',
                first_name : newProps.lead.first_name || '',
                last_name : newProps.lead.last_name || '',
                company :  newProps.lead.company || '',
                title : newProps.lead.title || '',
                office : newProps.lead.office || '',
                // phone_home : newProps.lead.phone_home || '',
                phone_mobile : newProps.lead.phone_mobile || '',
                phone_mobile2 : newProps.lead.phone_mobile2 || '',
                phone_mobile3 : newProps.lead.phone_mobile3 || '',
                phone_office : newProps.lead.phone_office || '',
                phone_office2 : newProps.lead.phone_office2 || '',
                phone_office3 : newProps.lead.phone_office3 || '',
                fax : newProps.lead.fax || '',
                website : newProps.lead.website ||'',
                email : newProps.lead.email || '',
                email2 : newProps.lead.email2 || '',
                email3 : newProps.lead.email3 || '',
                address : newProps.lead.address || '',
                address2 : newProps.lead.address2 || '',
                city :newProps.lead.city || '',
                state : newProps.lead.state || '',
                zipcode : newProps.lead.zipcode || '',
                is_lead : newProps.lead.is_lead || this.props.type,
                created_by : newProps.lead.created_by,
                title1: newProps.lead.title || '',
                company1: newProps.lead.company || '',
                first_name1 : newProps.lead.first_name || '',
                last_name1: newProps.lead.last_name || '',
                status : newProps.lead.status || 'status',
                source : newProps.lead.source || 'source',
                facebook : newProps.lead.facebook || '',
                twitter : newProps.lead.twitter || '',
                google_plus : newProps.lead.google_plus || '',
                linkedin : newProps.lead.linkedin || '',
                instagram : newProps.lead.instagram || '',
                household : newProps.lead.household,
                address_2 : newProps.lead.address_2 || '',
                address2_2 : newProps.lead.address2_2 || '',
                city_2 : newProps.lead.city_2 || '',
                state_2 : newProps.lead.state_2 || '',
                zipcode_2 : newProps.lead.zipcode_2 || '',
                address_3 : newProps.lead.address_3 || '',
                address2_3 : newProps.lead.address2_3 || '',
                city_3 : newProps.lead.city_3 || '',
                state_3 : newProps.lead.state_3 || '',
                zipcode_3 : newProps.lead.zipcode_3 || '',
                address_4 : newProps.lead.address_4 || '',
                address2_4 : newProps.lead.address2_4 || '',
                city_4 : newProps.lead.city_4 || '',
                state_4 : newProps.lead.state_4 || '',
                zipcode_4 : newProps.lead.zipcode_4 || '',
                address_5 : newProps.lead.address_5 || '',
                address2_5 : newProps.lead.address2_5 || '',
                city_5 : newProps.lead.city_5 || '',
                state_5 : newProps.lead.state_5 || '',
                zipcode_5 : newProps.lead.zipcode_5 || '',
            });

           if (this.state.phone_office2 !== '' || this.state.phone_office3 !== '') {
                this.setState({more_office_phone: true});
           }

           if (this.state.phone_mobile2 !== '' || this.state.phone_mobile3 !== '') {
                this.setState({more_mobile_phone: true});
           }
       }

       if (this.state.id) {
            this.setState({disabled : true});
       }


    }
    
    onChangeThumbImage = (e) => {
        let self = this;
        e.preventDefault();
        var resizedImage;
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
        var image = new Image();
        image.onload = function (imageEvent) {            
             let imgObj = image;
             let newWidth = 100;
             let newHeight = 100;
             let startX = 0;
             let startY = .0;
             let ratio = '';
             if (image.width < image.height){
                ratio = image.width/100;
             }
             else {
                ratio = image.height/100;
             }
             var tnCanvas = document.createElement('canvas');
             var tnCanvasContext = tnCanvas.getContext('2d');
             tnCanvas.width = newWidth; tnCanvas.height = newHeight;
             
             var bufferCanvas = document.createElement('canvas');
             var bufferContext = bufferCanvas.getContext('2d');
             bufferCanvas.width = imgObj.width;
             bufferCanvas.height = imgObj.height;
             bufferContext.drawImage(imgObj, 0, 0);
             
             tnCanvasContext.drawImage(bufferCanvas, startX,startY,newWidth * ratio, newHeight * ratio,0,0,newWidth,newHeight);
             let res = tnCanvas.toDataURL();
            self.setState({
               image: res
            });
        }
        image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);
   }

    saveForm(){
        this.props.setDisabled();
        if (!this.props.disabled) {
            this.props.create(this.state);
        }
    }

    cutString(ty,param) {
        if(param.length > 15){
            if (ty == 'ti'){this.setState({title1 : param.slice(0,13) + '...'});}
            if (ty == 'co'){this.setState({company1 : param.slice(0,13) + '...'});}
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

    create(e) {
        e.preventDefault();
        this.props.create(this.state);
    }

    remove(){
        this.props.remove(this.state.id);
    }

    onChange() {

    }

    render() { 

        let self = this;

        let household = '';
        if (this.state.household) {
            for (let i=0;i<this.state.household.length;i++){
                household += this.state.household[i].first_name + ' ' + this.state.household[i].last_name + ', ';
            }
        }

        let thumb_image = [];

        if (this.state.image == '' ) {
            if (this.state.id !== '') {
                thumb_image = (
                    <div className="profile">
                        <label id="image" htmlFor="file-upload">
                           <LeadPill className=""
                            lead={this.state}
                            size={100}
                            />
                        </label>
                        <input id="file-upload" type="file" onChange={this.onChangeThumbImage } />
                    </div>
                    )
            }
            else {
              thumb_image = (
                <div className="profile">
                    <label id="image" htmlFor="file-upload">
                        <img className="avatar" src={avatar}/>
                    </label>
                    <input id="file-upload" type="file" onChange={this.onChangeThumbImage } />
                </div>
                )
            }
        } else {
            thumb_image = (
                <div className="profile">
                    <label id="image" htmlFor="file-upload">
                        <img src={ this.state.image } className="avatar"/>
                    </label>
                    <input id="file-upload" type="file" onChange={this.onChangeThumbImage } />
                </div>
            )
        }

        let curState = "";
        if (this.state.is_lead) { curState = "Lead";}
        else {
            curState = "Contact";
        }

        // let more_address_func = function(cnt) {
        //     let param = cnt;
        //     let address_temp = (
        //         <div>
        //             <div className="crow">
        //                 <div className="control">
        //                     <InputBox2 key="11" text="Address" className="form-group-lg" placeholder="" value = {self.state.address} onChange={(e) => self.setState({'address': e.target.value})} disabled={ self.props.disabled }/>
        //                 </div>
        //                 <div className="control">
        //                     <InputBox2 key="12" text="Address 2" className="form-group-lg" placeholder="" value = {self.state.address2} onChange={(e) => self.setState({'address2': e.target.value})} disabled={ self.props.disabled }/>
        //                 </div>
        //             </div>
        //             <div className="crow">
        //                 <div className="control">
        //                     <InputBox2 key="13" text="City" className="form-group-lg" placeholder="" value = {self.state.city} onChange={(e) => self.setState({'city': e.target.value})} disabled={ self.props.disabled }/>
        //                 </div>
        //                 <div className="control">
        //                     <InputBox2 key="14" text="State" className="form-group-lg" placeholder="" value = {self.state.state} onChange={(e) => self.setState({'state': e.target.value})} disabled={ self.props.disabled }/>
        //                 </div>
        //             </div>
        //             <div className="crow">
        //                 <div className="control">
        //                     <InputBox2 key="15" text="Zip" className="form-group-lg" placeholder="" value = {self.state.zipcode} onChange={(e) => self.setState({'zipcode': e.target.value})} disabled={ self.props.disabled }/>
        //                 </div>
        //                 <div className="control">
                            
        //                 </div>
        //             </div>
        //         </div>
        //     );
        //     return address_temp;
        // }

        // let more_address_fields = [];
        // let limit = 4;
        // if (this.state.more_address > limit ) {
        //     this.setState({more_address : limit});
        // }
        // for (let a=0;a<this.state.more_address;a++){
        //     more_address_fields.push(more_address_func(a));
        // }

        return (
            <div id="leadinfo">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                    <div className="">
                         <div className="header">
                                  { thumb_image }
                                <div id="title">
                                    <span className="font-bold header_title">{this.state.first_name1 + ' ' + this.state.last_name1}</span>
                                    <div className="testing normal_txt">
                                        <div className="mail">{ this.state.company1 + ' / ' + this.state.title1  }</div>
                                        <div id="social">
                                            { this.state.facebook? <i className="zmdi zmdi-facebook social_active"></i> : <i className="zmdi zmdi-facebook"></i>}
                                            { this.state.twitter? <i className="zmdi zmdi-twitter social_active"></i> : <i className="zmdi zmdi-twitter"></i>}
                                            { this.state.google_plus? <i className="zmdi zmdi-google-plus social_active"></i> : <i className="zmdi zmdi-google-plus"></i>}
                                            { this.state.linkedin? <i className="zmdi zmdi-linkedin social_active"></i> : <i className="zmdi zmdi-linkedin"></i>}
                                            { this.state.instagram? <i className="zmdi zmdi-instagram social_active"></i> : <i className="zmdi zmdi-instagram"></i>}
                                            <div className="dropdown">
                                                <span className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-pencil" id="edit"></i></span>
                                                <ul className="dropdown-menu pull-right" id="editlist">
                                                    <li>
                                                    <span className="editor"><InputBox key="14" value={ this.state.facebook } onChange={ (e) => { this.setState({facebook : e.target.value}); } }/></span>
                                                    <span className="icon">{ this.state.facebook? <i className="zmdi zmdi-facebook social_active"></i> : <i className="zmdi zmdi-facebook"></i>}</span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="15" value={ this.state.twitter } onChange={ (e) => { this.setState({twitter : e.target.value}); } }/></span>
                                                    <span className="icon">{ this.state.twitter? <i className="zmdi zmdi-twitter social_active"></i> : <i className="zmdi zmdi-twitter"></i>}</span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="16" value={ this.state.google_plus } onChange={ (e) => { this.setState({google_plus : e.target.value}); } }/></span>
                                                    <span className="icon">{ this.state.google_plus? <i className="zmdi zmdi-google-plus social_active"></i> : <i className="zmdi zmdi-google-plus"></i>}</span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="17" value={ this.state.linkedin } onChange={ (e) => { this.setState({linkedin : e.target.value}); } }/></span>
                                                    <span className="icon">{ this.state.linkedin? <i className="zmdi zmdi-linkedin social_active"></i> : <i className="zmdi zmdi-linkedin"></i>}</span>
                                                    </li>
                                                    <li>
                                                    <span className="editor"><InputBox key="18" value={ this.state.instagram } onChange={ (e) => { this.setState({instagram : e.target.value}); } }/></span>
                                                    <span className="icon">{ this.state.instagram? <i className="zmdi zmdi-instagram social_active"></i> : <i className="zmdi zmdi-instagram"></i>}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="sel-box" className="flex-box">
                                        <div className="btn-group custom-group mr-10 sel1">
                                            <button type="button" className="btn btn-default btn-xs waves-effect dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.status}</button>
                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "New"}); }}>New</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "Assigned"}); }}>Assigned</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "Recycled"}); }}>Recycled</a></li>
                                                <li><a href="javascript:void(0);" onClick={() => { this.setState({status : "Dead"}); }} >Dead</a></li>
                                            </ul>
                                        </div>
                                        <div className="btn-group custom-group mr-10 sel1">
                                            <button type="button" className="btn btn-default btn-xs waves-effect dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ this.state.source}</button>
                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
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
                                    {/* 
                                        <div className="social_media">
                                            <img src={ social_facebook } className="social_icon" />
                                            <img src={ social_twitter } className="social_icon" />
                                            <img src={ social_google_plus } className="social_icon" />
                                            <img src={ social_linked_in } className="social_icon" />
                                            <img src={ social_instagram } className="social_icon" />
                                        </div>
                                    */}
                                </div>
                                <div id="ctrls" className="">
                                    <div className="btn-group custom-group mr-10 sel1">
                                        <button type="button" className="btn btn-default btn-sm waves-effect dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> {curState } </button>
                                        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:void(0);" onClick={(e) => { this.setState({is_lead : true}); }}>Lead</a></li>
                                            <li><a href="javascript:void(0);" onClick={(e) => { this.setState({is_lead : false}); }} >Contact</a></li>
                                        </ul>
                                    </div>
                                    <button className="btn btn-default btn-sm btn-raised waves-effect bt-con m-l-10" >FOLLOW UP</button>
                                    <button className="btn btn-sm btn-raised waves-effect save_bt bt-con m-l-10" onClick={(e) => { this.saveForm() } } >{  this.props.disabled ? "EDIT" : "SAVE" }</button>
                                    <button className="btn btn-default btn-sm btn-raised waves-effect bt-con m-l-10" onClick={ ()=> { this.remove() }}>Delete</button>
                                </div>
                            </div>
                        {/* this.props.alert !="" ?
                            <div className="alert alert-danger">
                            <strong>Oh snap!</strong> {this.props.alert}
                            </div>
                            : ''
                        */}
                        <div className="body">
                                <div className="crow">
                                    <div className="control">
                                        <InputBox2 key="1" text="First Name *" className="form-group-lg" placeholder="" value = {this.state.first_name} onChange={(e) => this.cutString('fn',e.target.value)} disabled={ this.props.disabled }/>
                                    </div>
                                    <div className="control">
                                        <InputBox2 key="2" text="Last Name *" className="form-group-lg" placeholder="" value = {this.state.last_name} onChange={(e) => this.cutString('ln',e.target.value)} disabled={ this.props.disabled }/>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                        <InputBox2 key="3" text="Company" className="form-group-lg" placeholder="" value = {this.state.company}  onChange={(e) => this.cutString('co',e.target.value) } disabled={ this.props.disabled }/>
                                    </div>
                                    <div className="control">
                                        <InputBox2 key="4" text="Title" className="form-group-lg" placeholder="" value = {this.state.title}  onChange={(e) => this.cutString('ti',e.target.value) } disabled={ this.props.disabled }/>
                                    </div>
                                </div>
                                { this.state.more_office_phone?
                                    <div>
                                        <div className="crow">
                                            <div className="control">
                                                <PhoneInput2 key="1" text="Office Phone" className="form-group-lg" placeholder="" value = {this.state.phone_office} onChange={(e) => this.setState({'phone_office': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            {/* <img src={add} className="add_icon" onClick={ ()=> this.setState({more_office_phone : true})} /> */} 
                                            <i class="material-icons remove_icon" style={{ color : "#52e49a"}} onClick={ ()=> this.setState({more_office_phone : false})}>remove_circle_outline</i>
                                            <div className="control">
                                                <PhoneInput2 key="2" text="Office Phone 2" className="form-group-lg" placeholder="" value = {this.state.phone_office2} onChange={(e) => this.setState({'phone_office2': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                        </div>
                                        <div className="crow">
                                            <div className="control">
                                                <PhoneInput2 key="3" text="Office Phone 3" className="form-group-lg" placeholder="" value = {this.state.phone_office3} onChange={(e) => this.setState({'phone_office3': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            <div className="control">
                                                <PhoneInput2 key="4" text="Mobile" className="form-group-lg" value = {this.state.phone_mobile} onChange={(e) => this.setState({'phone_mobile': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            { this.state.more_mobile_phone? 
                                                <i class="material-icons remove_icon" style={{ color : "#52e49a"}} onClick={ ()=> this.setState({more_mobile_phone : false})}>remove_circle_outline</i>
                                                :
                                                <img src={add} className="add_icon" onClick={ ()=> this.setState({more_mobile_phone : true})} />
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="crow">
                                            <div className="control">
                                                <PhoneInput2 key="5" text="Office Phone" className="form-group-lg" placeholder="" value = {this.state.phone_office} onChange={(e) => this.setState({'phone_office': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            <img src={add} className="add_icon" onClick={ ()=> this.setState({more_office_phone : true})} />
                                            <div className="control">
                                                <PhoneInput2 key="6" text="Mobile" className="form-group-lg" value = {this.state.phone_mobile} onChange={(e) => this.setState({'phone_mobile': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            { this.state.more_mobile_phone? 
                                                <i class="material-icons remove_icon" style={{ color : "#52e49a"}} onClick={ ()=> this.setState({more_mobile_phone : false})}>remove_circle_outline</i>
                                                :
                                                <img src={add} className="add_icon" onClick={ ()=> this.setState({more_mobile_phone : true})} />
                                            }
                                        </div>
                                    </div>
                                 }
                               {this.state.more_mobile_phone?
                                    <div className="crow">
                                        <div className="control">
                                            <PhoneInput2 key="7" text="Mobile 2" className="form-group-lg" value = {this.state.phone_mobile2} onChange={(e) => this.setState({'phone_mobile2': e.target.value})} disabled={ this.props.disabled }/>
                                        </div>
                                        <div className="control">
                                            <PhoneInput2 key="8" text="Mobile 3" className="form-group-lg" value = {this.state.phone_mobile3} onChange={(e) => this.setState({'phone_mobile3': e.target.value})} disabled={ this.props.disabled }/>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }
                                <div className="crow">
                                    <div className="control">
                                        <PhoneInput2 key="9" text="Fax" className="form-group-lg" placeholder="" value = {this.state.fax} onChange={(e) => this.setState({'fax': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                    <div className="control">
                                        <InputBox2 key="5" text="Website" className="form-group-lg" placeholder="" value = {this.state.website} onChange={(e) => this.setState({'website': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                </div>
                                { this.state.more_email?
                                    <div>
                                        <div className="crow">
                                            <div className="control">
                                                <InputBox2 key="6" text="Email" className="form-group-lg" placeholder="" type="email" value = {this.state.email} onChange={(e) => this.setState({'email': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            {/* <img src={add} className="add_icon" onClick={ ()=> this.setState({more_email : true})}/> */}
                                            <i class="material-icons remove_icon" style={{ color : "#52e49a"}} onClick={ ()=> this.setState({more_email : false})}>remove_circle_outline</i>
                                            <div className="control">
                                                <InputBox2 key="7" text="Email 2" className="form-group-lg" placeholder="" type="email" value = {this.state.email2} onChange={(e) => this.setState({'email2': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                        </div>
                                        <div className="crow">
                                            <div className="control">
                                                <InputBox2 key="8" text="Email 3" className="form-group-lg" placeholder="" type="email" value = {this.state.email3} onChange={(e) => this.setState({'email3': e.target.value})} disabled={ this.props.disabled }/>
                                            </div>
                                            {/* <div className="control">
                                                <InputBox2 key="9" text="Address" className="form-group-lg" placeholder="" value = {this.state.address} onChange={(e) => this.setState({'address': e.target.value})} disabled={ this.props.disabled }/>
                                            </div> */}
                                        </div>
                                    </div>
                                    :
                                    <div className="crow">
                                        <div className="control">
                                            <InputBox2 key="10" text="Email" className="form-group-lg" placeholder="" type="email" value = {this.state.email} onChange={(e) => this.setState({'email': e.target.value})} disabled={ this.props.disabled }/>
                                        </div>
                                        <img src={add} className="add_icon" style={{ left: "-23px" }}onClick={ ()=> this.setState({more_email : true})}/>
                                    </div>
                                }
                                
                                <div className="crow">
                                    <div className="control">
                                        <InputBox2 key="11" text="Address" className="form-group-lg" placeholder="" value = {this.state.address} onChange={(e) => this.setState({'address': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                    <div className="control">
                                        <InputBox2 key="12" text="Address 2" className="form-group-lg" placeholder="" value = {this.state.address2} onChange={(e) => this.setState({'address2': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                        <InputBox2 key="13" text="City" className="form-group-lg" placeholder="" value = {this.state.city} onChange={(e) => this.setState({'city': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                    <div className="control">
                                        <InputBox2 key="14" text="State" className="form-group-lg" placeholder="" value = {this.state.state} onChange={(e) => this.setState({'state': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                </div>
                                <div className="crow">
                                    <div className="control">
                                        <InputBox2 key="15" text="Zip" className="form-group-lg" placeholder="" value = {this.state.zipcode} onChange={(e) => this.setState({'zipcode': e.target.value})} disabled={ this.props.disabled }/>
                                    </div>
                                   {/*  <div className="control">
                                        <img src={add} className="add_icon" onClick={ () => { this.setState({more_address: this.state.more_address+1}) }}/>
                                    </div> */}
                                </div>
                                {
                                    this.state.more_address >= 1? 
                                        <div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="21" text="Address_2" className="form-group-lg" placeholder="" value = {this.state.address_2} onChange={(e) => this.setState({'address_2': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="22" text="Address 2_2" className="form-group-lg" placeholder="" value = {this.state.address2_2} onChange={(e) => this.setState({'address2_2': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="23" text="City_2" className="form-group-lg" placeholder="" value = {this.state.city_2} onChange={(e) => this.setState({'city_2': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="24" text="State_2" className="form-group-lg" placeholder="" value = {this.state.state_2} onChange={(e) => this.setState({'state_2': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="25" text="Zip_2" className="form-group-lg" placeholder="" value = {this.state.zipcode_2} onChange={(e) => this.setState({'zipcode_2': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                               {/*  <div className="control">
                                                    <img src={add} className="add_icon" onClick={ () => { this.setState({more_address: this.state.more_address+1}) }}/>
                                                </div> */}
                                            </div>
                                        </div>
                                        : ''
                                }
                                {
                                    this.state.more_address >= 2? 
                                        <div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="26" text="Address_3" className="form-group-lg" placeholder="" value = {this.state.address_3} onChange={(e) => this.setState({'address_3': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="27" text="Address 2_3" className="form-group-lg" placeholder="" value = {this.state.address2_3} onChange={(e) => this.setState({'address2_3': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="28" text="City_3" className="form-group-lg" placeholder="" value = {this.state.city_3} onChange={(e) => this.setState({'city_3': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="29" text="State_3" className="form-group-lg" placeholder="" value = {this.state.state_3} onChange={(e) => this.setState({'state_3': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="30" text="Zip_3" className="form-group-lg" placeholder="" value = {this.state.zipcode_3} onChange={(e) => this.setState({'zipcode_3': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                               {/*  <div className="control">
                                                    <img src={add} className="add_icon" onClick={ () => { this.setState({more_address: this.state.more_address+1}) }}/>
                                                </div> */}
                                            </div>
                                        </div>
                                        : ''
                                }
                                {
                                    this.state.more_address >= 3? 
                                        <div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="31" text="Address_4" className="form-group-lg" placeholder="" value = {this.state.address_4} onChange={(e) => this.setState({'address_4': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="32" text="Address 2_4" className="form-group-lg" placeholder="" value = {this.state.address2_4} onChange={(e) => this.setState({'address2_4': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="33" text="City_4" className="form-group-lg" placeholder="" value = {this.state.city_4} onChange={(e) => this.setState({'city_4': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="34" text="State_4" className="form-group-lg" placeholder="" value = {this.state.state_4} onChange={(e) => this.setState({'state_4': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="35" text="Zip_4" className="form-group-lg" placeholder="" value = {this.state.zipcode_4} onChange={(e) => this.setState({'zipcode_4': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                               {/*  <div className="control">
                                                    <img src={add} className="add_icon" onClick={ () => { this.setState({more_address: this.state.more_address+1}) }}/>
                                                </div> */}
                                            </div>
                                        </div>
                                        : ''
                                }
                                {
                                    this.state.more_address >= 4? 
                                        <div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="36" text="Address_5" className="form-group-lg" placeholder="" value = {this.state.address_5} onChange={(e) => this.setState({'address_5': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="37" text="Address 2_5" className="form-group-lg" placeholder="" value = {this.state.address2_5} onChange={(e) => this.setState({'address2_5': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="38" text="City_5" className="form-group-lg" placeholder="" value = {this.state.city_5} onChange={(e) => this.setState({'city_5': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                                <div className="control">
                                                    <InputBox2 key="39" text="State_5" className="form-group-lg" placeholder="" value = {this.state.state_5} onChange={(e) => this.setState({'state_5': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                            </div>
                                            <div className="crow">
                                                <div className="control">
                                                    <InputBox2 key="40" text="Zip_5" className="form-group-lg" placeholder="" value = {this.state.zipcode_5} onChange={(e) => this.setState({'zipcode_5': e.target.value})} disabled={ this.props.disabled }/>
                                                </div>
                                               {/*  <div className="control">
                                                    <img src={add} className="add_icon" onClick={ () => { this.setState({more_address: this.state.more_address+1}) }}/>
                                                </div> */}
                                            </div>
                                        </div>
                                        : ''
                                }
                                <i class="material-icons" style={{ color : "#52e49a", top : "-49px", left : "-68px", float: "right", position : "relative"}} onClick={ () => { this.setState({more_address: this.state.more_address-1}); this.state.more_address<1? this.setState({more_address: 0}): '' }} >remove_circle_outline</i>
                                <img src={add} className="add_icon" style={{ float: "right", top: "-48px"}} onClick={ () => { this.setState({more_address: this.state.more_address+1}) }}/>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }

}

export default LeadInfo;

