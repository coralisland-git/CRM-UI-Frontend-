import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomConfirmAlert, { confirmAlert } from '../../../../components/confirmdialog';
import LeadPill from '../../../../components/leadpill';
import CreateTask from '../../../../components/createtask';
import ApplyTemplate from '../../../../components/applytemplate';
import '../../../../styles/assets/images/pin.svg';

import './style.scss';

class Contacts extends React.Component {

	state = {
		gmail_icon_href: null
	};

	constructor(props) {
		super(props);

        this.confirmDelete = this.confirmDelete.bind(this);
        this.pinLead = this.pinLead.bind(this);
	}

    pinLead(lead) {
        this.props.pinLead({
            "id": lead.id,
            "hot_lead": !lead.hot_lead
        })
    }

	confirmDelete(username, lead_id) {
		 // Todo change to user object later
        var self = this;
        confirmAlert({
            title: 'Are you sure?',
            message: 'You are now deleting '+username+'.',
            confirmLabel: 'YES',
            cancelLabel: 'CANCEL',
            onConfirm: () => {
                setTimeout(() => {
                    self.props.deleteLead(lead_id);
                    confirmAlert({
                        toastContent: "success",
                        message: "Success account  has been deleteLead",
                        outerClick: true
                    });
                }, 100)
            }
        });

	}

    compoenntDidUpdate() {
    }

	render() {

        var self = this;
        let recentLeads = [];
        let hotLeads = [];

        let def_task = {
           title : '',
           description : '',
           assign_to : ''
        };

        if(this.props.loading) {
            recentLeads.push(
                <li className="list-group-item" key="empty-recent">
                    <div className="text-center">
                        <i className="fa fa-ban"> </i> Loading ...
                    </div>
                </li>
            );
            hotLeads.push(
                <li className="list-group-item" key="empty-recent">
                    <div className="text-center">
                        <i className="fa fa-ban"> </i> Loading...
                    </div>
                </li>
            );
        } else {
            this.props.recentLeads.map(item => {
                if(!item) return;
                let pinned = item.hot_lead? "hotlead": "";
                recentLeads.push(
                    <li className="list-group-item" key={item.id}>
                        <LeadPill
                            link={"/addleads/lead/"+item.id}
                            lead={item}
                            size="50"
                            info={true}
                            company={true} />
                        <div className="rightpart">

                            <a href="javascript:void(0);">
                                <div className="task-dropdown btn btn-default btn-raised waves-effect"
                                    onClick={ev=> {
                                        let visible = $(ev.target).next().is(":visible");
                                        $(".task-dropdown-body").hide();
                                        if(!visible) $(ev.target).next().show();
                                    }}> 
                                    Task &nbsp;&nbsp;
                                    <i className="fa fa-caret-down"> </i>
                                </div>
                                <div className="task-dropdown-body">
                                    <CreateTask number={item.id} task={def_task} lead={item} type="Add Task" />
                                    <ApplyTemplate inputLeads={[item]} type="Template" />
                                </div>
                            </a>

                            <div className="operators">
                                <i className={"fa fa-thumb-tack rot-45 " + pinned}
                                    onClick={() => { this.pinLead(item); }}
                                    title={pinned? "Unpin from hot leads": "Pin to hot leads"} > &nbsp; </i>

                                <i className="fa fa-trash"
                                    onClick={() => { this.confirmDelete(item.first_name + ' ' + item.last_name, item.id) }} > </i>
                            </div>
                        </div>
                    </li>
                )
            });
            this.props.hotLeads.map(item => {
                if(!item) return;
                hotLeads.push(
                    <li className="list-group-item" key={item.id}>
                        <LeadPill
                            link={"/addleads/"+item.id}
                            lead={item}
                            size="50"
                            info={true}
                            company={true} />
                        <div className="rightpart">
                            <a href="javascript:void(0);">
                                <div className="task-dropdown btn btn-default btn-raised waves-effect"
                                    onClick={ev=> {
                                        $(".task-dropdown-body").hide();
                                        $(ev.target).next().show();
                                    }}> 
                                    Task &nbsp;&nbsp;
                                    <i className="fa fa-caret-down"> </i>
                                </div>
                                <div className="task-dropdown-body">
                                    <CreateTask number={item.id} task={def_task} lead={item} type="Add Task" />
                                    <ApplyTemplate inputLeads={[item]} type="Template" />
                                </div>
                            </a>
                            <div className="operators">
                                <i className="fa fa-thumb-tack hotlead rot-45"
                                    onClick={() => { this.pinLead(item); }} > &nbsp; </i>
                                <i className="fa fa-trash"
                                    onClick={() => { this.confirmDelete(item.first_name + ' ' + item.last_name, item.id) }}> </i>
                            </div>
                        </div>
                    </li>
                )
            })
            if(recentLeads.length == 0) {
                recentLeads.push(
                    <li className="list-group-item" key="empty-recent">
                        <div className="text-center">
                            <i className="fa fa-ban"> </i> No Leads Found!
                        </div>
                    </li>
                );
            }
            if(hotLeads.length == 0) {
                hotLeads.push(
                    <li className="list-group-item" key="empty-recent">
                        <div className="text-center">
                            <i className="fa fa-ban"> </i> No Hot Leads Found!
                        </div>
                    </li>
                );
            }
        }

		return (
			<div className="dashboardcontacts">
                <ul className="nav nav-tabs tab-nav-right" role="tablist">
                    <li role="presentation" className="active"><a href="#recentlyadded" data-toggle="tab">RECENTLY ADDED</a></li>
                    <li role="presentation"><a href="#hotleads" data-toggle="tab">HOT LEADS</a></li>
                </ul>
                <div className="tab-content contactcontents custom-scroll">
                	<div role="tabpanel" className="tab-pane fade in active" id="recentlyadded">
                        <ul className="list-group">
                            { recentLeads }
                        </ul>
                	</div>
                	<div role="tabpanel" className="tab-pane fade" id="hotleads">
                        <ul className="list-group">
                            { hotLeads }
                        </ul>
                	</div>
                </div>
			</div>
		);
	}

}

export default Contacts;