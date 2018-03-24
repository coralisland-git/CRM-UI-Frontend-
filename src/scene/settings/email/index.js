import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputBox from '../../../components/inputbox';
import RightNav from '../components/rightnav';

import './index.scss';
import mail_img from '../../../styles/assets/images/gmail.png';
import { googleLogin } from '../../../services/actions/gapi';

import { confirmAlert } from '../../../components/confirmdialog';
import * as userActions from '../../../services/actions/profile';
const mapDispatchToProps = (dispatch) => {
    return ({
        googleLogin: googleLogin(dispatch),
        actions: bindActionCreators({...userActions}, dispatch)
    });
}   

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        users: state.users,
        gapi_status: state.gapi.status
    });
}

class EmailSetting extends React.Component {
    constructor() {
        super();

        this.state = {
            template: '',
            subject: '',
            bcc: '',
            bccValidate: '',
            gmail: '',
            connected: false,
            user: {}
        }


        console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------", googleLogin)

        this.onChangeContent = this.onChangeContent.bind(this);
    }

    componentWillMount() {
        if (this.props.user != undefined){
            this.setState({user: this.props.user, template: this.props.user.template || '', subject: this.props.user.subject || '', bcc: this.props.user.bcc || ''});
            setTimeout(()=>{
                this.setContentToKeditor(this.props.user.template);
            }, 500);
        }
        if (this.props.gapi_status == true) {
            setTimeout(() => {
                if (gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    let gmail = gapi.auth2.getAuthInstance().currentUser.get().w3.U3;
                    if (gmail != undefined) {
                        this.setState({gmail: gmail, connected: true});
                    }    
                }                
            }, 1000);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps != this.props && newProps.user !== undefined) {
            this.setState({user: newProps.user, template: newProps.user.template || '', subject: newProps.user.subject || '', bcc: newProps.user.bcc || ''});
            setTimeout(()=>{
                this.setContentToKeditor(newProps.user.template);
            }, 500);

        }

        if (newProps.gapi_status == true) {
            setTimeout(() => {
                if (gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    let gmail = gapi.auth2.getAuthInstance().currentUser.get().w3.U3;
                    if (gmail != undefined) {
                        this.setState({gmail: gmail, connected: true});
                    }    
                }                
            }, 1000);
        }
    }

    componentDidMount() {
        $(".myselectbox").selectpicker();
        let configuration = {
          toolbar: "Basic"
        };
        CKEDITOR.replace("ckeditorme", configuration);
        CKEDITOR.instances.ckeditorme.on('change', () => {
          let data = CKEDITOR.instances.ckeditorme.getData();
          this.onChangeContent(data);
        });        
    }

    componentDidUpdate() {
        $(".myselectbox").selectpicker("refresh");
    }

    onChangeValue(e, type) {
        this.setState({[type]: e.target.value, bccValidate: ''});
    }

    onChangeContent(data) {
        this.setState({template: data});
    }

    setContentToKeditor(content) {
        if (CKEDITOR.instances.ckeditorme) {
            CKEDITOR.instances.ckeditorme.setData(content);            
        }
    }

    onSaveTemplate() {
        if (this.state.bcc == '' && this.state.template == '' && this.state.subject == '') return;

        if (this.state.bcc !== '') {
            let bcc = this.state.bcc.split(',');
            for (let b of bcc) {
                let reg_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (!reg_email.test(String(b.trim()).toLowerCase())){
                    this.setState({'bccValidate': 'Bcc address is not valid'});
                    return;
                }                
            }
        }

        let emailTemplate = {
            subject: this.state.subject,
            bcc: this.state.bcc, 
            template: this.state.template
        };

        this.props.actions.saveEmailTemplate(this.state.user, emailTemplate)
        .then(res => {
            confirmAlert({
                template: "success",
                message: "Save Default Template has been successfully",
                outerClick: true
            });
        })
    }

    onConnectEmail() {
        this.props.googleLogin();
    }

    render() {
        return (
            <div className="container-fluid" id="email-page">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="block-header email clearfix">
                          <h2 className="padding-top heading-me">Email Accounts</h2>
                        </div>
                        <div className="card card-me border-me">
                            <div className="body">
                                <div className="col-sm-12">
                                    <div className="col-sm-12">
                                        <h2 className="heading-me-first">CONNECT YOUR EMAIL ACCOUNT</h2>
                                        <label>Agent Cloud organizes your emails and meetings automatically, eliminating manual entry of data forever.</label>
                                    </div>
                                    <div className="col-sm-12 padding-top-60">
                                        <div className="col-sm-12 no-padding padding-bottom-30 border-bottom">
                                            <div className="card card-me border-me padding-bottom">
                                                <div className="body">
                                                {this.state.connected ?
                                                    <div className="col-sm-12">
                                                        <img className="mail_icon" src={mail_img} />
                                                        <label className="label_mail">Connected your Gmail Address : {this.state.gmail}</label>
                                                        <button type="button" disabled={true} className="btn-me btn btn-success btn-raised waves-effect btn-md right btn-padding">DISCONNECT</button>
                                                    </div>
                                                :
                                                    <div className="col-sm-12">
                                                        <img className="mail_icon" src={mail_img} />
                                                        <label className="label_mail">Connect your Gmail Account</label>
                                                        <button type="button" className="btn-me btn btn-success btn-raised waves-effect btn-md right btn-padding" onClick={this.onConnectEmail.bind(this)} >CONNECT</button>
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="col-sm-12 no-padding padding-bottom-30 border-bottom">
                                            <h2 className="heading-me-first margin-top-30">DEFAULT SIGNATURE & BCC</h2>                                            
                                            <div className="form-group">
                                                <label className="black">DEFAULT BCC ADDRESS</label><br/>
                                                <label>All follows-up you send through Agent Cloud will be BCC'ed to this email address. You can disable it before sending a Follow-up when composing message.</label>
                                                <div className="form-line">
                                                    <input type="email" className="form-control" placeholder="Just following up" value={this.state.bcc} onChange={(e) => this.onChangeValue(e, 'bcc')} />
                                                </div>
                                                <p className="col-red">{this.state.bccValidate}</p>
                                            </div>
                                            <div className="form-group">
                                                <label className="black">DEFAULT MAIL TEMPLATE</label><br/>
                                                <label>Your email signature will be put at the bottom of every email.</label>
                                                <div className="col-sm-12 no-padding padding-top-30">
                                                    <textarea id="ckeditorme" name="ckeditorme" className="ckeditorme"></textarea>
                                                </div>
                                                <div className="col-sm-12 padding-top-30">
                                                    <button type="button" className="btn-me btn btn-success btn-raised waves-effect btn-md" onClick={this.onSaveTemplate.bind(this)} >SAVE SETTINGS</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-3 no-left-padding">
                        <RightNav />
                    </div>
                </div>
                
            </div>
        );
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailSetting);
