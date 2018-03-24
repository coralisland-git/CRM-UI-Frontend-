import React from 'react';
import InputBox from '../../../../components/inputbox';
import DatePicker from '../../../../components/datepicker';
import avatar from '../../../../styles/assets/images/avatar0.png';
import './index.scss';


class LeadInteraction extends React.Component {

    componentDidMount() {
        $(".datepicker").val(moment().format('YYYY/MM/DD'));
    }


    render() {

        let data = [
            {
                name: "James Smith",
                circles: "New Leads",
                icon : "phone"
            },
            {
                name: "James Smith",
                circles: "New Leads",
  
                icon: "email"
            },    
            {
                name: "James Smith",
                circles: "New Leads",
                icon: "launch"
            }       
            ,    
            {
                name: "James Smith",
                circles: "New Leads",
                icon: "launch"
            } ,    
            {
                name: "James Smith",
                circles: "New Leads",
                icon: "launch"
            }  ,    
            {
                name: "James Smith",
                circles: "New Leads",
                icon: "launch"
            } 
        ]

        return (
            <div id="contactinformation">
                <ul className="nav nav-tabs m-t-20 " role="tablist">
                        <li role="presentation" className="active col-xs-6" id="interaction"><a href="#interaction1" data-toggle="tab"><span className="">INTERACTION</span></a></li>
                        <li role="presentation" className="col-xs-6" id="property"><a href="#property1" data-toggle="tab"> <span className="">PROPERTY</span></a></li>
                    </ul>   
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane fade active in" id="interaction1">
                                <div className="header">
                                    <InputBox placeholder="Type here" />
                                    <span id="sel-box">
                                        <DatePicker value={moment().format('YYYY/MM/DD').toString()}/>
                                        <div className="btn-group custom-group mr-10 sel1">
                                            <button type="button" className="btn btn-default btn-xs waves-effect">SELECT INTERACTION</button>
                                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                            <ul className="dropdown-menu">
                                                <li><a href="javascript:void(0);" >Call</a></li>
                                                <li><a href="javascript:void(0);" >Email</a></li>
                                                <li><a href="javascript:void(0);" >Note</a></li>
                                                <li><a href="javascript:void(0);" >Text</a></li>
                                                <li><a href="javascript:void(0);" >In Person</a></li>
                                                <li><a href="javascript:void(0);" >Other</a></li>
                                            </ul>
                                        </div>
                                    </span>
                                    <button className="btn btn-xs btn-raised waves-effect pull-right add_bt">ADD INTERACTION</button>
                                </div>
                                <div className="body">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <div className="row datepicker_tool">
                                                <div>
                                                    <span className="h4">All</span>
                                                    <span className="h4">Calender</span>
                                                    <span className="h4">Call</span>
                                                    <span className="h4">Email</span>
                                                    <span className="h4">Note</span>
                                                    <span className="h4">Text</span>
                                                    <span className="h4">InPerson</span>
                                                    <span className="h4">Other</span>
                                                    <div className="date_box">
                                                        <DatePicker value={moment().format('YYYY/MM/DD').toString()} /> 
                                                        <span className="h4">To</span>
                                                        <DatePicker value={moment().format('YYYY/MM/DD').toString()} />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {data.map((datus, i) =>
                                            <li className="list-group-item" key={i}>
                                                 <div className="item">
                                                      <div className="left">
                                                        <i className="material-icons">{datus.icon}</i>
                                                        <img className="avatar" src={avatar} />
                                                        <span id="title">
                                                            <span className="h4 direction">Jessica Fox: > Darwin Felix</span>
                                                            <span className="h4">Re : Can you send the files to me immediately?</span>
                                                        </span>
                                                      </div>
                                                    <span className="h4 reminder pull-right">11/14/2017</span> 
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                        </div>
                       <div role="tabpanel" className="tab-pane fade" id="property1">
                            <span>Feature not available during beta test</span>
                       </div>
                    </div>  
            </div>  
        )
    }

}

export default LeadInteraction;
