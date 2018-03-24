import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from 'react-autocomplete';
import * as mail from '../../actions/inbox';
import { getLeads, createLeads } from '../../services/actions/leads';
import { Base64 } from 'js-base64';
import { toast } from 'react-toastify';
import avatar from '../../styles/assets/images/avatar.jpg';

import './index.scss';
import { debug } from 'util';
import parseMessage from 'gmail-api-parse-message';
import { confirmAlert } from '../../components/confirmdialog';

import { get_g_key } from '../../services/env';

import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css';
import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js';



let PAGE_COUNT = 9;
declare var gapi;

class Inbox extends React.Component {
    constructor() {
        super();

        this.curPage = 1;
        this.isSearch = false;
        this.searchResult = [];
        this.userEmail = 'david@square1grp.com';
        this.composeData = [];
        this.messagesData = [];

        this.state = {
            data: [],
            inboxData: [],
            sentData: [],
            draftData: [],
            trashData: [],
            emailType: 0,
            curPage: 1,
            isSearch: false,
            editorVal: '<h1>hello</h1>',
            isCompose: false,
            tmp: false,
            content: '',
            selectedIds: [],
            composeData: [],
            bcc: false,
            cc: false,
            forceUpdate: false,
            searchKey: '',
            status: [[], [], [], []],
            mailTo: '',
            mailCc: '',
            mailBcc: '',
            selectedUserEmail: '',
            selectedEmailTitle: '',

            firstShown: false
        }
        

        this.newLeadMail = null;

        this.changeEmailType = this.changeEmailType.bind(this);
        this.addList = this.addList.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.isMore = this.isMore.bind(this);
        this.getDataBySearch = this.getDataBySearch.bind(this);
        this.changeEditorVal = this.changeEditorVal.bind(this);
        this.goToDetail = this.goToDetail.bind(this);
        this.returnValidDataByType = this.returnValidDataByType.bind(this);
        this.showComposeData = this.showComposeData.bind(this);
        // this.deleteMessage = this.deleteMessage.bind(this);
        this.loadJqueryAction = this.loadJqueryAction.bind(this);
        this.onTrashEmailById = this.onTrashEmailById.bind(this);
        this.onTrashComposeById = this.onTrashComposeById.bind(this);
        this.generateAvatar = this.generateAvatar.bind(this);
        this.onSave = this.onSave.bind(this);
        this.addToLead = this.addToLead.bind(this);
        this.onTrashEmail = this.onTrashEmail.bind(this);
        this.buildItemTR = this.buildItemTR.bind(this);
        this.toReply = this.toReply.bind(this);
        this.forwardMail = this.forwardMail.bind(this)

    }

    componentWillMount() {
        this.props.getLeads();
        if (gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn.get() && this.props.status && this.props.user.gmail) {
            this.onRefreshEmail();
            this.props.mail.updateGMailApiStatus(false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.gapi_status && nextProps.status && nextProps.user.gmail) {
            this.onRefreshEmail();
            this.props.mail.updateGMailApiStatus(false);
        }
        if(this.newLeadMail && nextProps.leads.map(item => item.email).indexOf(this.newLeadMail) != -1) {
            this.newLeadMail = null;
            toast.success('You have successfully added this person as a lead!', {autoClose: 5000});
            // Show Toast
        }


        if(nextProps.match.params.id && !this.state.firstShown){
            console.log(nextProps.match.params.id, 'Index of mail');
            let self = this;
            console.log(typeof nextProps.inboxData);

            let index = -1;
            
            for (var i = 0; i < nextProps.inboxData.length; i++) {
                if(nextProps.inboxData[i] != undefined && (nextProps.inboxData[i].id == nextProps.match.params.id)){
                    index = i;
                    break;
                }
            }

            console.log(index, 'found index of inbox');

            if(index > -1){
                this.goToDetail(nextProps.inboxData[index])
                console.log(nextProps.inboxData[index], 'found index of inbox object');
                this.setState({firstShown: true});
                setTimeout(() => {
                    $("#sidebar-secondary").removeClass('slide-out').addClass('slide-in');
                    $("#inbox-overlay").show();
                    $("#sidebar-secondary").addClass('open');
                }, 0);
            }
        }

    }

    onChange(data) {
        this.setState({content: data})
    }

    componentDidMount() {
        console.log("Did mount");

        if(!this.props.user.gmail)
            return;

        let self = this;
        let output = [];
        let config = {
            removePlugins: 'link'
        };
        // let config = Object.assign({}, CKEDITOR.config);
        // config.removePlugins = "link";

        CKEDITOR.replace("editor", {
            removePlugins: 'about',
            allowedContent: true
        });
        
        CKEDITOR.instances.editor.setData('<br/>' + (this.props.user.template || ""));

        CKEDITOR.instances.editor.on('change', function () {
          let data = CKEDITOR.instances.editor.getData();
          this.onChange(data);
        }.bind(this));

    }

    componentDidUpdate() {
        this.loadJqueryAction();
    }

    loadJqueryAction() {
        let self = this;
        $(".compose-button").off('click');
        $(".compose-button").click(function() {
            $("#sidebar-secondary").removeClass('slide-out').addClass('slide-in');
            $("#inbox-overlay").show();
            $("#sidebar-secondary").addClass('open');
        })

        $(".detail-inbox-link").off('click');
        $(".detail-inbox-link").click(function() {
            $("#sidebar-secondary").removeClass('slide-out').addClass('slide-in');
            $("#inbox-overlay").show();
            $("#sidebar-secondary").addClass('open');
        });

        $("#inbox-overlay").off('click');
        $("#inbox-overlay").click(function() {
            $("#sidebar-secondary").removeClass('slide-in').addClass('slide-out').removeClass('open');;
            $(this).hide();
            self.setState({ 
                mailTo: '',
                mailCc: '',
                mailBcc: ''
            });
        });

        $(".add_to_lead_form").hide();

        // $("input[role='combobox']").tagsinput();
    }

    changeEmailType(e, type) {
        this.curPage = 1;
        
        let clsName = e.target.className;
        let curElements = document.getElementsByClassName(clsName);
        
        for (let k = 0; k < curElements.length; k++) {
            curElements[k].parentElement.className = '';
        }
        e.target.parentElement.className = 'active';
        this.setState({ emailType: type });
    }

    addList(e, id, key, type) {
        let stateStatus = this.state.status;
        if (!this.state.selectedIds.includes(id) && e.target.checked) {
            stateStatus[type][key] = true;
            this.setState({selectedIds: [...this.state.selectedIds, id], status: stateStatus})
        } else if (this.state.selectedIds.includes(id) && (e.target.checked == false)) { 
            stateStatus[type][key] = false;
            let ids = this.state.selectedIds;
            ids = ids.filter(item => item !== id);
            this.setState({selectedIds: ids, state: stateStatus});
        }
    }

    nextPage(e) {
        this.curPage = this.curPage + 1;
        this.forceUpdate();
    }

    isMore(len, emailType) {
        let output;
        let data = this.returnValidDataByType(emailType);
        
        if (len < data.length) {
            output = true;
        } else {
            output = false;
        }
        return output;
    }

    buildItemTR(key, emailType, element) {
        var self = this;
        return (
            <tr key={key + '_' + emailType}>
                <td>
                    <div className="checkbox-wrapper" >
                        <input type="checkbox" onChange={(e) => self.addList(e, element.id, key, emailType)} id={element.id} checked={this.state.status[emailType][key]} />
                        <label htmlFor={element.id} className="inbox-chk"></label>
                    </div>
                </td>
                {emailType == 1 ?
                    <td className="bold detail-inbox-link" 
                        onClick={() => this.goToDetail(element)}>
                            { element.to_email }
                    </td>
                :
                    <td className="bold detail-inbox-link" 
                        onClick={() => this.goToDetail(element)}>
                            { element.title || element.from_email }
                    </td>
                }

                <td className="detail-inbox-link" 
                    onClick={() => this.goToDetail(element)}>
                        { element.subject }
                </td>
                <td className="detail-inbox-link" 
                    onClick={() => this.goToDetail(element)}> </td>
                <td className="detail-inbox-link" 
                    onClick={() => this.goToDetail(element)}>
                        { moment(element.send_time).format("MM-DD-YYYY HH:mm") }
                </td>
            </tr>
        )
    }

    showMessages(emailType, curPage) {
        let self = this;
        let output = [];
        let data = this.returnValidDataByType(emailType)

        data.slice(0, (curPage - 1) * PAGE_COUNT + PAGE_COUNT).forEach((element, key) => {
            output.push(self.buildItemTR(key, emailType, element));
        })

        return output;
    }

    getDataBySearch(emailType, curPage) {
        let self = this;
        let output = [];
        var searchKey = this.state.searchKey.toLocaleLowerCase();
        let data = this.returnValidDataByType(this.state.emailType)
        let count = 0;

        data.forEach((element, key) => {
            let flag = false;
            if(element['title'].toLocaleLowerCase().includes(searchKey)) {
                flag = true;
            } else if (element['subject'].toLocaleLowerCase().includes(searchKey)) {
                flag = true;
            }

            if (flag == true && count < ((curPage - 1) * PAGE_COUNT + PAGE_COUNT)) {
                output.push(self.buildItemTR(key, emailType, element));
                count = count + 1;
            }
        })

        this.searchResult = output;

        return output;
    }

    changeEditorVal(e) {
        this.setState({ tmp: true });
    }

    goToDetail(element) {
        let data = this.returnValidDataByType(this.state.emailType);
        let output = [];

        output.push(element);

        this.setState({ 
            isCompose: false, 
            composeData: output, 
            selectedUserEmail: element.from_email,
            selectedEmailTitle: element.title
        })
        $("#subjectVal").val('');
        $("#toVal").val('');
        CKEDITOR.instances.editor.setData('<br/>'+ (this.props.user.template || ""));
    }

    onCompose() {
        $("#subjectVal").val('');
        $("#toVal").val('');
        CKEDITOR.instances.editor.setData('<br/>'+ (this.props.user.template || ""));
        this.setState({ isCompose: true })
    }

    returnValidDataByType(type) {
        let data = [];
        switch(type) {
            case 0: 
                data = this.props.inboxData;
                break;
            case 1: 
                data = this.props.sentData;
                break;
            case 2: 
                data = this.props.draftData;
                break;
            case 3: 
                data = this.props.trashData;
                break;
        }

        return data;
    }

    generateAvatar(username, email="kd19850511@gmail.com") {
        if (username) {
            let short_name = username.trim()[0] + username.trim()[username.trim().search(' ')+1];
            let hash =0;
            for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
            }
            let c = (hash & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();

            c = "00000".substring(0, 6 - c.length) + c;

            return (
                <div className="avatar" style={{ backgroundColor: "#"+c}} >
                    <span className="text-uppercase avatar-text">
                        {short_name}
                    </span>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    forwardMail(mail) {
        console.log("forward", mail);
        $("#subjectVal").val(mail.subject)
        CKEDITOR.instances.editor.setData(mail.message + '<br/>'+ (this.props.user.template || ""))
        $("#sidebar-secondary").animate({
            scrollTop: ($("#subjectVal").offset().top)
        }, 500);
        $("#toVal").focus();
    }

    toReply(from_email, title) {
        if(this.state.isCompose) return;
        $("#subjectVal").val('Re: '+ title)
        $("#sidebar-secondary").animate({
            scrollTop: ($("#subjectVal").offset().top+500)
        }, 500);
        this.setState({mailTo: from_email});
    }

    showComposeData(data) {
        let output = [];
        
        let user_image;
        if(this.props.user && this.props.user.profile_image)
            user_image = this.props.user.profile_image;
        if(!user_image)
            user_image = avatar;

        data.forEach((element,key) => {
            let avatar =  this.generateAvatar(element.title)
            output.push(
                <div className="message-item" key={key}>
                    <div className="message-item__each">
                        <div className="avatar avatar-circle">
                            <a href="javascript:void(0);" className="image-parent">
                                { avatar }
                            </a>
                        </div>
                        <div className="media-body">
                            <div className="col-sm-8 image-description">
                                <span className="font-bold">{element.title}</span>
                                <span>{element.to_email}</span>
                            </div>
                            <div className="col-sm-4">
                                <span className="compose-nav">
                                    <i className="material-icons" style={{color: "#cfcfcf"}} onClick={() => {this.toReply(element.from_email, element.title)}}>reply</i>
                                    <i className="zmdi zmdi-forward" onClick={() => this.forwardMail(element)}> </i>
                                    <i className="zmdi zmdi-delete" onClick={() => this.onTrashComposeById(element.id)}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="message-item__content">
                        <div className="message-content">
                            <div dangerouslySetInnerHTML={{ __html: element.message }} />
                        </div>
                    </div>
                </div>
            )
        })

        return output;
    }

    onSave() {
        let to_email = this.state.mailTo,
            subject = this.refs.subjectVal.value,
            content = this.state.content;

        let email = '',
            headers_obj = {
                'To': to_email,
                'Subject': subject,
                "Content-Type": "text/html; charset='UTF-8'\r\n"                
            }

        for(var header in headers_obj)
            email += header + ": "+headers_obj[header]+"\r\n";

        email += "\r\n <html><body>" + content + "<br/>" + "</body></html>";
        gapi.client.gmail.users.drafts.create({
            'userId': 'me',
            'message': {
              'raw': Base64.encodeURI(email)
            }
        }).then((result) => {
            if (result.status == 200) {
                this.props.mail.newDraftMessage(result.result.message.id);
                // this.getSentMessages()
                $("#inbox-overlay").click()
            }
        })
    }

    sendMessage() {
        let to_email = this.state.mailTo,
            cc_email = this.state.mailCc,
            bcc_email = this.state.mailBcc,
            subject = this.refs.subjectVal.value,
            content = this.state.content;


        let email = '',
            headers_obj = {
                'to': to_email,
                'cc': cc_email,
                'bcc': bcc_email,
                'subject': subject,
                "content-type": "text/html; charset='UTF-8'\r\n"
            }

        for(var header in headers_obj) {
            if(header == 'cc' && cc_email == '') continue;
            if(header == 'bcc' && bcc_email == '') continue;
            email += header += ": "+headers_obj[header]+"\r\n";
        }

        email += "\r\n <html><body>" + content + "<br/>" + "</body></html>";
        console.log("Sending email : ", email);
        gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
              'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
            }
        }).then((result) => {
            if (result.status == 200) {
                this.props.mail.newSentMessage(result.result.id);
                // this.getSentMessages()
                $("#inbox-overlay").click()
            }
        })
    }

    onRefreshEmail() {
        this.props.mail.getInboxMessages();
        this.props.mail.getSentMessages();
        this.props.mail.getDraftMessages();
        this.props.mail.getTrashMessages();
    }

    onTrashEmail() {
        if (this.state.selectedIds.length == 0) return;

        confirmAlert({
            title: 'Are you sure?',
            message: null,
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    Promise.all(this.state.selectedIds.map((id) => {
                        gapi.client.gmail.users.messages.trash({
                            'userId': 'me',
                            'id': id
                        }).then((result) => {
                            if (result.status == 200)
                                return result.status;
                            return null;
                        })
                    })).then(() => {
                        this.setTrashEmail(null);
                        confirmAlert({
                            template: "success",
                            message: "Email Successfully Trashed!"
                        });
                    })

                }, 100)
            }
        });
    }

    onTrashEmailById(id) {
        gapi.client.gmail.users.messages.trash({
            'userId': 'me',
            'id': id
        }).then((result) => {
            if (result.status == 200) {
                this.setTrashEmail(id);
            }
        });
    }

    onTrashComposeById(id) {
        let data = this.state.composeData.filter(e => { if (e.id != id) return e;});
        gapi.client.gmail.users.messages.trash({
            'userId': 'me',
            'id': id
        }).then((result) => {
            if (result.status == 200) {
                this.setState({composeData: data})
            }
        });
    }

    setTrashEmail(message_id) {
        let ids = [], inbox, sent, trash, draft;
        if (message_id !== null) {
            ids = [message_id]
        } else {
            ids = this.state.selectedIds;
        }

        if (ids.length == 0) return;

        this.props.mail.trashMessageByIds(ids);
        this.setState({
            selectedIds: [],
            status: [[],[],[],[]]
        });
        return; 

        [inbox, sent, trash, draft] = [this.props.inboxData, this.props.sentData, this.props.trashData, this.props.draftData];

        ids.map(id => {
            inbox = this.removeMessageById(inbox, id, 0);
            sent = this.removeMessageById(sent, id, 1);
            // trash = this.removeMessageById(trash, id);
            draft = this.removeMessageById(draft, id, 2);
        });

        this.getTrashMessages();
        this.setState({inboxData: inbox, sentData: sent, draftData: draft});
    }

    removeMessageById(messageData, id, type) {
        if (messageData == undefined) return [];
        if (messageData.length == 0) return [];
        let stateStatus = this.state.status, data = [], tempStatus = [];
        tempStatus = stateStatus[type];

        for (let i = 0; i < messageData.length; i++ ){
            if (messageData[i].id == id) {
                stateStatus[type].splice(i, 1);
                continue;
            }

            data.push(messageData[i]);
        }
        this.setState({status: stateStatus});

        return data;
    }

    addToLead(event) {
        let lead = {};
        let lastone = this.state.selectedUserEmail;
        lead['email'] = lastone;
        lead['first_name'] = $("#add_lead_fname").val();
        lead['last_name'] = $("#add_lead_lname").val();
        lead['phone_home'] = $("#add_lead_phone").val();
        this.newLeadMail = lastone;
        this.props.createLeads(lead);
        $(".add_to_lead_form").hide('fade');
        event.preventDefault();
    }

    render() {
        // Check Google Account Connectivity
        if(!this.props.user.gmail)
            return (
                <div className="row clearfix page-block" id="inbox">
                    ! To use this feature you need to connect your google account.<br/>
                    Please connect your google account from first process of Account Setup. <br/>
                    Thanks.
                </div>
            )

        let data;
        const self = this;

        if (this.state.isSearch) {
            data = this.getDataBySearch(this.state.emailType, this.curPage);
        } else {
            data = this.showMessages(this.state.emailType, this.curPage);
        }        

        let composeData = this.showComposeData(this.state.composeData);

        let unreads = 0;
        this.props.inboxData.map(msg => {
            if(msg.labels.indexOf('UNREAD') > -1)
                unreads = unreads + 1;
        });

        let show_add = false;
        if(this.state.selectedUserEmail && !this.state.isCompose) {
            show_add = this.props.leads.map(item => item.email).indexOf(this.state.selectedUserEmail) == -1? true: false;
        }

        let email_suggestions = [];
        this.props.leads.map(item => {
            if(item.email)
                email_suggestions.push(item)
        })

        return (
            <div className="row clearfix" id="inbox">
                <div id="inbox-overlay"></div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inbox-panel">
                    <aside id="sidebar" className="nano">
                        <div className="nano-content">
                            <div className="logo-container"><span className="fa fa-envelope"></span>Mail</div>
                            <a 
                                href="javascript:void(0);"
                                id="sidebar-secondary-trigger"
                                onClick={this.onCompose.bind(this)}
                                className="btn btn-raised compose-button waves-effect"
                                >Compose</a>
                            <menu className="menu-segment">
                                <ul>
                                    <li className="active">
                                        <a href="javascript:void(0);" onClick={(e) =>this.changeEmailType(e, 0)} className="email-type">Inbox<span> {/* '(' + (this.props.unread_count || 0) + ')' */}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={(e) =>this.changeEmailType(e, 1)} className="email-type">Sent<span></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={(e) =>this.changeEmailType(e, 2)} className="email-type">Saved Drafts<span></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={(e) =>this.changeEmailType(e, 3)} className="email-type">Trash<span></span>
                                        </a>
                                    </li>
                                </ul>
                            </menu>
                        </div>
                    </aside>
                    
                    <div id="inbox">
                        <div className="overlay"></div>
                        <div className="header">
                            <div className="search-box">
                                <input placeholder="Search" onChange={(e) => {
                                    if(e.target.value == "") {
                                        this.setState({isSearch: false})
                                    }
                                    else {
                                        this.setState({searchKey: e.target.value, isSearch: true })
                                    }
                                }} />
                                <span className="icon zmdi zmdi-search"></span>
                            </div>
                            <h4 className="page-title custom-title">
                                <a className="sidebar-toggle-btn trigger-toggle-sidebar">
                                    <span className="line"></span><span className="line"></span>
                                    <span className="line"></span><span className="line line-angle1"></span>
                                    <span className="line line-angle2"></span>
                                </a>
                                Inbox
                            </h4>
                        </div>
                        <div className="mail-body">
                            <div className="action-bar">
                                <ul>
                                    <li>
                                        <a className="btn btn-raised btn-smaller" onClick={this.onRefreshEmail.bind(this)}>
                                            <i className="font-sm fa fa-repeat"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn btn-raised btn-smaller">
                                            <i className="font-sm fa fa-share"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn btn-raised btn-smaller" onClick={this.onTrashEmail} >
                                            <i className="font-sm fa fa-trash"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div id="main-nano-wrapper" className="nano">
                                <div className="nano-content">
                                    <table className="table table-responsive table-hover dashboard-task-infos">
                                        <tbody>
                                            { data }
                                        </tbody>
                                    </table>
                                </div>
                                    {
                                        this.isMore(data.length, this.state.emailType) ?
                                            <a href="javascript:void(0);" onClick={(e) => { 
                                                this.nextPage(e); 
                                            }} className="load-more-link">Show more messages</a>
                                        :
                                            ''
                                    }
                                 </div>
                        </div>
                    </div>
                    {/* modal */}
                    <div id="sidebar-secondary" className="">
                        <div className="wrapper">
                            <nav id="debug">
                                <div className="modal__header">
                                    {
                                        show_add?
                                            <button className="btn btn-sm btn-default btn-raised add_to_lead waves-effect"
                                                onClick={() => {
                                                    $(".add_to_lead_form").show('fade');
                                                }} > 
                                                Add to Lead 
                                            </button>
                                        : null
                                    }
                                    {
                                        show_add?
                                            <form className="add_to_lead_form form-group" onSubmit={this.addToLead}>
                                                <h4> Add to Lead </h4>
                                                <div className="input-line">
                                                    <label> Email: </label>
                                                    <input id="add_lead_email" type="text" readOnly={true} value={this.state.selectedUserEmail} />
                                                </div>
                                                <div className="input-line">
                                                    <label> Firat Name: </label>
                                                    <input id="add_lead_fname" type="text" placeholder="" required />
                                                </div>
                                                <div className="input-line">
                                                    <label> Last Name: </label>
                                                    <input id="add_lead_lname" type="text" placeholder="" required />
                                                </div>
                                                <div className="input-line">
                                                    <label> Phone: </label>
                                                    <input id="add_lead_phone" type="text" placeholder="" />
                                                </div>
                                                <div className="button-group">
                                                    <button className="btn btn-sm waves-effect add_to_lead_confirm"
                                                        type="submit" > Add </button>
                                                    <label className="btn btn-sm waves-effect add_to_lead_cancel"
                                                        onClick={() => {
                                                            $(".add_to_lead_form").hide('fade');
                                                        }} > Cancel </label>
                                                </div>
                                            </form>
                                        : null
                                    }
                                    {
                                        this.state.isCompose ?
                                            <div className="message-item">
                                                <div className="logo-container"><span className="font-lg font-bold m-r-20"><i className="fa fa-envelope m-r-20"></i>Compose</span></div>
                                            </div>
                                        : 
                                            composeData
                                    }
                                </div>
                                <div className="modal__content">
                                    <div className="message-item address-box">
                                        <label htmlFor="to">TO:</label>
                                        <Autocomplete
                                            items={email_suggestions}
                                            shouldItemRender={(item, value) => {
                                                let v = value.split(',');
                                                v = v[v.length - 1];
                                                return item.email.toLowerCase().indexOf(v.toLowerCase()) > -1
                                            }}
                                            getItemValue={item => item.email}
                                            renderItem={(item, highlighted) =>
                                              <div
                                                key={item.id}
                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                              >
                                                {item.email}
                                              </div>
                                            }
                                            value={this.state.mailTo}
                                            onChange={e => this.setState({ mailTo: e.target.value })}
                                            onSelect={value => {
                                                let v = this.state.mailTo.split(',');
                                                v.splice(v.length - 1);
                                                let f = v.join(',');
                                                f = f + (f==""? '':',') + value;
                                                this.setState({ mailTo: f})
                                            }}
                                          />
                                        {
                                            !this.state.cc ?
                                                <a href="javascript:void(0);" className="m-r-25 cc-link" onClick={() => this.setState({cc: true })}>CC</a>
                                            :
                                                ''
                                        }
                                        {
                                            !this.state.bcc ?
                                                <a href="javascript:void(0);" className="m-r-25 cc-link" onClick={() => this.setState({bcc: true })}>BCC</a>
                                            :
                                                ''
                                        }
                                        
                                    </div>
                                    {
                                        this.state.cc ?
                                            <div className="message-item address-box">
                                                <label htmlFor="to">CC:</label>
                                                    <Autocomplete
                                                        items={email_suggestions}
                                                        shouldItemRender={(item, value) => {
                                                            let v = value.split(',');
                                                            v = v[v.length - 1];
                                                            return item.email.toLowerCase().indexOf(v.toLowerCase()) > -1
                                                        }}
                                                        getItemValue={item => item.email}
                                                        renderItem={(item, highlighted) =>
                                                          <div
                                                            key={item.id}
                                                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                                          >
                                                            {item.email}
                                                          </div>
                                                        }
                                                        value={this.state.mailCc}
                                                        onChange={e => this.setState({ mailCc: e.target.value })}
                                                        onSelect={value => {
                                                            let v = this.state.mailCc.split(',');
                                                            v.splice(v.length - 1);
                                                            let f = v.join(',');
                                                            f = f + (f==""? '':',') + value;
                                                            this.setState({ mailCc: f})
                                                        }}
                                                      />

                                                <i className="zmdi zmdi-close" onClick={() => this.setState({'cc': false})}></i>
                                            </div>
                                        :
                                            null
                                    }
                                    {
                                        this.state.bcc ?
                                            <div className="message-item address-box">
                                                <label htmlFor="to">BCC:</label>
                                                <Autocomplete
                                                    items={email_suggestions}
                                                    shouldItemRender={(item, value) => {
                                                        let v = value.split(',');
                                                        v = v[v.length - 1];
                                                        return item.email.toLowerCase().indexOf(v.toLowerCase()) > -1
                                                    }}
                                                    getItemValue={item => item.email}
                                                    renderItem={(item, highlighted) =>
                                                      <div
                                                        key={item.id}
                                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                                      >
                                                        {item.email}
                                                      </div>
                                                    }
                                                    value={this.state.mailBcc}
                                                    onChange={e => this.setState({ mailBcc: e.target.value })}
                                                    onSelect={value => {
                                                        let v = this.state.mailBcc.split(',');
                                                        v.splice(v.length - 1);
                                                        let f = v.join(',');
                                                        f = f + (f==""? '':',') + value;
                                                        this.setState({ mailBcc: f})
                                                    }}
                                                  />
                                                <i className="zmdi zmdi-close" onClick={() => this.setState({'bcc': false})}></i>
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="message-item address-box">
                                        <label htmlFor="to">SUBJECT:</label>
                                        <input type="text" id="subjectVal" ref="subjectVal" />
                                    </div>
                                   <textarea name="editor" ref="contentVal" />
                                </div>
                                <div className="modal__footer">
                                    <div className="save-panel">
                                        <span>
                                            <i className="material-icons" onClick={this.onSave}>save</i>
                                        </span>
                                        <span onClick={() => {this.toReply(this.state.selectedUserEmail, this.state.selectedEmailTitle)}}>
                                            <i className="material-icons">reply</i>
                                        </span>
                                        {/* <div className="checkbox-wrapper">
                                            <input type="checkbox" id="schedule_date" />
                                            <label htmlFor="schedule_date" className="inbox-chk">
                                                Schedule Date
                                            </label>
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" id="notify_open" />
                                            <label htmlFor="notify_open" className="inbox-chk">
                                                Notify me if opened
                                            </label>
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" id="nofity_no_reply" />
                                            <label htmlFor="nofity_no_reply" className="inbox-chk">
                                                Notify me if no reply<input type="number" className="notify_due_date" max="7" /> days.
                                            </label>
                                        </div> */}
                                        <span className="flex-blank"></span>
                                        <a href="javascript:void(0);" className="btn bnt-raised btn-default pull-right" onClick={this.sendMessage.bind(this)} >Send</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Inbox.propType = {
    mail: PropTypes.object,
    status: PropTypes.boolean,
    user: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => {
    return { 
        mail: bindActionCreators(mail, dispatch),
        getLeads: () => getLeads(dispatch),
        createLeads: (lead) => createLeads(lead, dispatch)
    }
}

const mapStateToProps = (state) => {
    return { 
        gapi_status: state.gapi.status,
        status: state.inbox.status,
        user: state.auth.user,
        leads: state.leads.leads,
        inboxData: state.inbox.inboxMessages,
        sentData: state.inbox.sentMessages,
        draftData: state.inbox.draftMessages,
        trashData: state.inbox.trashMessages,
        unread_count: state.inbox.unread_count
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
