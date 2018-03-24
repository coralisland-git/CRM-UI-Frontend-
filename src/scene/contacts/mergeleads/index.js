import React from 'react';
import InputBox from '../../../components/inputbox';
import DropdownBox from '../../../components/dropdownbox';
import './index.scss';

class MergeLeads extends React.Component {

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

        let lead_list = [
                {
                    name:"Employee", 
                    value:"employee"
                }
            ]

        let status_list = [
                {
                    name: "New",
                    value: "new"
                }
            ]

		return (
			<div className="" id="mergeleads">
                <div className="bt_group">
                    <span className="font-bold h4 pull-left">Derick Valan</span>
                    <button className="btn btn-default btn-md btn-raised waves-effect pull-right">CANCEL</button>
                    <button className="btn btn-default btn-md btn-raised waves-effect pull-right">SAVE MERGE</button>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                    <div className="">
                        <div className="top row">
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <div id="left-side">
                                    <div id="top">
                                        <span className="h4 columns">Columns whose value is primary row differs from merging rows:</span><br />
                                        <span className="h4 req_mark">* Indicates required fields</span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">First Name</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Last Name</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Title</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Home Phone</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Mobile</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Office Phone</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Primary Address Street</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Primary Address City</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Primary Address Postalcode</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                        <span id="lab" className="h4">Lead Source</span>
                                        <span id="frm" className="h4"><DropdownBox contentList={lead_list} /></span>
                                    </div>
                                    <div className="control">
                                        <span id="lab" className="h4">Status</span>
                                        <span id="frm" className="h4"><DropdownBox contentList={status_list} /></span>
                                    </div>
                                    <div className="control">
                                        <span className="h4 columns">Columns whose value is similar across all rows</span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Description</span>
                                      <span id="frm" className="h4"><textarea className="form-control" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Fax</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Primary Address State</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Primary Address Street</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">All Address Street</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">All Address City</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">All Address State</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">All Address Postalcode</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">All Address Country</span>
                                      <span id="frm" className="h4"><InputBox placeholder="" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Lead Source Description</span>
                                      <span id="frm" className="h4"><textarea className="form-control" /></span>
                                    </div>
                                    <div className="control">
                                      <span id="lab" className="h4">Status Description</span>
                                      <span id="frm" className="h4"><textarea className="form-control" /></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="footer">
                            <button className="btn btn-default btn-md btn-raised waves-effect">SAVE MERGE</button>      
                            <button className="btn btn-default btn-md btn-raised waves-effect">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>  
		)
	}

}


export default MergeLeads;
