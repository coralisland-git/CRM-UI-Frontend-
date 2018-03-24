import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLeads, createLeads } from './../../../../services/actions/leads';
import { updateTemplates } from './../../../../services/actions/templates';
import { withRouter } from 'react-router';

import '../../index.scss';


class Contacts extends React.Component {
    constructor() {
        super();

        this.state = {
            template: {},
            contacts: [],
            searchResult: [],
            selectedIds: [],
            isSearch: false,
            status: []
        }

        this.doSearch = this.doSearch.bind(this);
        this.addList = this.addList.bind(this);
        this.saveContacts = this.saveContacts.bind(this);
        this.cancelContract = this.cancelContract.bind(this);
        this.gotoDetail = this.gotoDetail.bind(this);
    }

    componentWillMount() {
        if (this.props.leads.length == 0) {
            this.props.getLeads();
        }
    }

    componentDidMount() {
        let contacts = [];

        $('.content').click(function(e) {
            let a = e.target;
            let parentClassName = e.target.parentElement.className;

            if (parentClassName) {
                parentClassName = parentClassName.split(' ').join('.')
            }
            parentClassName = '.' + parentClassName;

            if ($('.btn-group.custom-group').find(parentClassName).length || parentClassName == '.btn-group.custom-group') {
                $('.select-dropmenu').addClass('open')
            } else {
                $('.select-dropmenu').removeClass('open')
            }
        })

        this.props.leads.map((element) => {
            if (element.first_name != '' || element.last_name != '') {
                contacts.push(element)    
            }
            
        })
        
        this.setState({ template: this.props.template, contacts: contacts })

    }

    generateAvatar(lead, size=42) {

        let image = lead.image;

        if(image) 
            return <img src={image} className="avatar" style={{height: size+"px"}} />

        let leadname = (lead.first_name + ' ' + lead.last_name).trim()
        if(leadname.length == 0)
            leadname = lead.email;

        if(!leadname)
            leadname="Not Assigned";
        let short_name = leadname.trim()[0] + leadname.trim()[leadname.trim().search(' ')+1];
        let hash =0;
        for (let i = 0; i < leadname.length; i++) {
           hash = leadname.charCodeAt(i) + ((hash << 5) - hash);
        }
        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        c = "00000".substring(0, 6 - c.length) + c;

        return (
            <div className="avatar" style={{ backgroundColor: "#"+c, height: size+"px", width: size+"px" }} >
                <span>
                    {short_name.toUpperCase()}
                </span>
            </div>
        )
    }

    saveContacts(temp) {
        let template = Object.assign({}, temp);
        let leads = template.leads;

        let a = leads.filter(elem => this.state.selectedIds.indexOf(elem) > -1).length;
        if (leads.filter(elem => this.state.selectedIds.indexOf(elem) > -1).length == 0) {
            leads = leads.concat(this.state.selectedIds);
            template.leads = leads;
            this.props.updateTemplates(template);
            this.setState({template: template});
            this.props.changeViewMode(2, template);
            $('.select-dropmenu').removeClass('open')
        } else {
            alert('contains same elements')
        }

            
    }

    cancelContract() {
        $('.select-dropmenu').removeClass('open')
    }

    doSearch(e) {
        let contacts = Object.assign([], this.state.contacts);
        let output = [];
        let key = e.target.value;
        let isSearch = true;

        if (key == '') {
            isSearch = false;
        }

        contacts.forEach((contact) => {
            if ( contact.first_name.indexOf(key) != -1 ||
                contact.last_name.indexOf(key) != -1 ||
                contact.email.indexOf(key) != -1 ) {
                output.push(contact)        
            }
            
        })

        this.setState({ searchText: key, searchResult: output, isSearch: isSearch })
    }

    addList(e, id, key) {
        let stateStatus = this.state.status;

        if (!this.state.selectedIds.includes(id) && e.target.checked) {
            stateStatus[key] = true;
            this.setState({selectedIds: [...this.state.selectedIds, id], status: stateStatus})
        } else if (this.state.selectedIds.includes(id) && (e.target.checked == false)) { 
            stateStatus[key] = false;
            let ids = this.state.selectedIds;
            ids = ids.filter(item => item !== id);
            this.setState({selectedIds: ids, state: stateStatus});
        }

    }

    gotoDetail(e, contact) {
        e.preventDefault();
        this.props.history.push('/addleads/lead/' + contact.id)
    }

    render() {
        let self = this;
        let con = [];
        let contacts = [];
        let temp = this.state.template;


        if (this.state.isSearch) {
            contacts = this.state.searchResult;
        } else {
            contacts = this.state.contacts;
        }
        console.log("$$$", this.state.template.leads)
        contacts.map((contact, key) => {
            this.state.template.leads.map((lead) => {
                if (lead == contact.id && contact.is_lead == false) {
                    con.push(contact);
                }
            })
        })

    	return (
    		<div>
                <div className="item__row item__row--content">
                    <div className="flex-box p-l-15" style={{alignItems: 'center'}}>
                        <span className="heading avatar-heading m-r-15">Contacts</span>
                        <span className="avatar yellow">{con.length}</span>
                    </div>
                    <div className="flex-blank"></div>
                    <div className="btn-group custom-group">
                        <button 
                            type="button" 
                            className="btn btn-default btn-with-icon add-contact-button" 
                           >
                            <span className="p-r-10">Contacts</span>
                            <i className="fa fa-plus"></i>
                        </button>
                        <ul className="select-dropmenu contact-search-menu" id="select-popup">
                            <li className="border-btm select-li-header">Add Contract</li>
                            <li className="select-li-item search-box" >
                                    <input type="text" className="search-control" placeholder="Search" value={this.state.searchText} onChange={(e)=>this.doSearch(e)} />
                                    <i className="fa fa-search"></i>
                            </li>
                            <li className="select-li-item overflow-auto">
                                <ul className="content-menu">
                                {
                                    contacts.map((contact, key)=> {
                                        let t_avatar = this.generateAvatar(contact, 40);
                                        if (contact.is_lead == false) {
                                            return (
                                                <li className="content-list" key={key}>
                                                    {t_avatar}
                                                    <div className="checkbox-wrapper m-l-15">
                                                        <input type="checkbox"  id={contact.id} onChange={(e)=>this.addList(e, contact.id, key)} checked={this.state.status[key]}/>
                                                        <label htmlFor={contact.id} className="inbox-chk"></label>
                                                    </div>
                                                    <span className="m-l-10 name sub__heading">{contact.first_name + ' ' + contact.last_name}</span>
                                                </li>
                                            )
                                        }
                                    })
                                }
                                </ul>
                            </li>
                                                        
                            <li className="select-li-header text-center border-top">
                                <button 
                                    className="btn btn-raised yellow"
                                    onClick={() => self.saveContacts(temp)}>
                                    Save
                                </button>
                                <button 
                                    className="btn btn-raised btn-default"
                                    onClick={() => self.cancelContract()}>Cancel</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="item__row item__row--header ">
                    <div className="item__column item__column--trigger">Name</div>
                    <div className="item__column item__column--scheduleId">Added</div>
                    <div className="item__column item__column--blank"></div>
                </div>
                
                {
                    con.map((contact, key) => {
                        let avatar = this.generateAvatar(contact)
                        let time = new Date(contact.created_at);
                        let hour = time.getHours();
                        let minute = time.getMinutes();
                        let str = 'AM';
                        if (hour > 12) {
                            str = 'PM';
                            hour = hour - 12;
                        }

                        return (
                            <div className="item__row item__row--content" key={key}>
                                <div className="item__column item__column--trigger">
                                    <div className="userpill" onClick={(e) => {this.gotoDetail(e, contact)}}>
                                        {avatar}
                                        <div className="info custom-info">
                                            <strong className="">{contact.first_name + ' ' + contact.last_name}</strong>
                                            <label>{contact.email}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="item__column item__column--scheduleId">{hour + ':' +  minute + ' ' + str}</div>
                            </div>
                        )
                    })
                }
                
            </div>
    	)
    }
}

Contacts.propsType = {
    template: PropTypes.object,
    changeViewMode: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: () => { getLeads(dispatch); },
        updateTemplates: (template) => { updateTemplates(template, dispatch); }
    })
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        leads: state.leads.leads,
        templates: state.templates.templates
    });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));
