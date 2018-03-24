import React from 'react';
import InputBox from '../../../components/inputbox';
import './index.scss';



class NewLeads extends React.Component {

	render() {

        let data = [
            {
                name: "James Smith",
                circles: "New Leads",
                assigned: "None",
                last: "Jan | Kate Anderson",
                tags: "Mone",
                location: "None",
                phone: "None"
            },
            {
                name: "James Smith",
                circles: "New Leads",
                assigned: "None",
                last: "Jan | Kate Anderson",
                tags: "Mone",
                location: "None",
                phone: "None"
            },    
            {
                name: "James Smith",
                circles: "New Leads",
                assigned: "None",
                last: "Jan | Kate Anderson",
                tags: "Mone",
                location: "None",
                phone: "None"
            }       
        ]

		return (
			<div className="" id="newleads">
                <span className="font-bold h4 pull-left">New Leads</span>
                <button className="btn btn-default btn-md btn-raised waves-effect pull-right">DELETE BUCKER</button>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                    <div className="">
                        <div className="top row">
                            <div className="pull-left">
                                <span className="font-bold h4">Name of circle goes here!</span>
                                <br />
                                <span>Lorem Ipsum Dolor</span>
                            </div>
                            <ul className="list-group pull-right">
                                <li className="list-group-item" id="reminder_txt">
                                    <span id="reminder" className="h5">Reminder (Days)   </span>
                                </li>
                                <li className="list-group-item" id="reminder_num">
                                    <span id="count" className="h4">2</span>
                                </li>
                            </ul>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <div className="row control">
                                    <span className="font-bold h4 col-xs-1">Contact</span>
                                    <label className="font-bold mark col-xs-1"><h4>0</h4></label>

                                    <li className="dropdown"> 
                                        <span className="col-xs-4 search"><InputBox placeholder="Search" /></span>
                                        <a href="javascript:void(0);" className="dropdown-toggle" 
                                            data-toggle="dropdown" role="button" 
                                            aria-haspopup="true" aria-expanded="false"> 
                                            <i className="material-icons search_icon">search</i>
                                        </a>
                                        <ul className="dropdown-menu search-res">
                                            <li><a href="javascript:void(0);">Bulk Action</a></li>
                                            <li><a href="javascript:void(0);">Add to Circle</a></li>
                                            <li><a href="javascript:void(0);">Merge Contact</a></li>
                                            <li><a href="javascript:void(0);">Print to PDF</a></li>
                                            <li><a href="javascript:void(0);">Convert to Contact</a></li>
                                            <li><a href="javascript:void(0);" onClick={() => { this.delete(this.props.leads[this.state.selecteditem]) }} >Delete</a></li>
                                        </ul>
                                    </li>


                                    <span className="col-xs-2 pull-right">
                                        <select className="form-control show-tick btn">
                                            <option>Sort By</option>
                                            <option>Most Recent</option>
                                            <option>Least Recent</option>
                                            <option>Most Contacted</option>
                                            <option>Least Contacted</option>
                                            <option>First Name</option>
                                            <option>First Name(Z-A)</option>
                                            <option>Last Name</option>
                                            <option>Last Name(Z-A)</option>
                                        </select>
                                    </span>
                                    <span className="col-xs-2 pull-right">
                                        <select className="form-control show-tick btn">
                                            <option>Filter Contacts By</option>
                                        </select>
                                    </span>
                                    <button className="btn btn-success btn-md btn-raised waves-effect col-xs-2 pull-right" id="add_bt">Add Leads</button>&nbsp;&nbsp;
                                </div>
                                <div className="border">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            	<td><i className="material-icons">crop_square</i></td>
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
                                            {data.map((datus, i) =>
                                              <tr key={i}>
                                                <td><i className="material-icons">crop_square</i></td>
                                                <td><span className=""><label className="font-bold h5 name_mark col-xs-1"><h4>JS</h4></label>{datus.name}</span></td>
                                                <td>{datus.circles} <i className="material-icons">arrow_drop_down</i> </td>
                                                <td>{datus.assigned}</td>
                                                <td>{datus.last}</td>
                                                <td>{datus.tags}</td>
                                                <td>{datus.location}</td>
                                                <td>{datus.phone}</td>
                                              </tr>
                                            )}
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


export default NewLeads;
