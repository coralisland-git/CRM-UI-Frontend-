import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {getLeads, createLeadsBulk} from '../../../services/actions/leads';

import CsvParse from '@vtex/react-csv-parse';
import papaparse from 'papaparse';
import {CSVLink, CSVDownload} from 'react-csv';

import {toast} from 'react-toastify';
import * as csvutil from '../../../utils/csv';
const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: (params) => {getLeads(dispatch);},
        createLeadsBulk: (params) => createLeadsBulk(params, dispatch) 
    });
}

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads
    });
}


//Do not output in to csv; "id", "created_by", "updated_by", "assigned_user"
const keys = ["username", "first_name", "last_name", "email", "email2", "email3", "birth_date", "image", "title", "company", "office", "social_profile", "is_deleted", "phone_office", "phone_home", "phone_mobile", "fax", "account", "source", "website", "current_transcation", "merge_fromgoogle", "aniversary_date", "location", "address", "address2", "zipcode", "state", "city", "timezone", "lead_reference", "is_lead", "status", "household_contact", "hot_lead", "created_at", "updated_at", "client"];

class ImportLeads extends React.Component {
    state = {
        errmsg: null,   
        showErrorDownload: null,
        errorleads: []
    }

    constructor(props){
        super()
    }

    handleSubmit() {
        console.log(this.state.parsed);
        this.props.createLeadsBulk(this.state.parsed)
        .then((res)=>{

            if(this.state.parsed.length-res.length > 0){
                toast.success('Succeed uploading ' + (this.state.parsed.length-res.length) + ' ' + this.props.match.params.type + '(s)', {autoClose: 10000});
            }
            
            if(res.length > 0 ){
                toast.error(`${res.length} ${this.props.match.params.type}(s) has problems. Try download the failed ${this.props.match.params.type}(s)`, {autoClose: 10000});
                this.setState({showErrorDownload: true, errorleads: csvutil.makeCSVCompatiableJSONB(res)})
            } else {
                this.props.history.push(`/leads/${this.props.match.params.type}`)
                this.setState({showErrorDownload: false, errorleads: [] })
            }


        }).catch((err) => {
        });
    }

    handleData(data) {
        // this.setState({ data })
        // console.log(data);
    }

    handleChange(ev, onChange) {

        // var reader = new FileReader();
        // reader.onload = function(e) {
        //     var data = Papa.parse(reader.result);
        // }
        //Check file name extension
        if (ev.target.files[0].name.slice(ev.target.files[0].name.length - 3) !== 'csv') {
            this.setState({errmsg: 'The file should be CSV file.'});
        } else {
            let self = this;
            papaparse.parse(ev.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    console.log(results);
                    if(results.errors.length > 0){
                        self.setState({'errmsg': results.errors[0].message + ' at Row ' + results.errors[0].row + ": Index " + results.errors[0].index });
                    } else {
                        self.setState({'errmsg': null});

                        self.setState({'parsed': csvutil.makeBackendCompatiableJSON(results.data)});
                    }
                }
            });
            // reader.readAsText(ev.target.files[0]);
        }
        // onChange(ev);
        this.setState({filename: ev.target.files[0].name});

    }
    componentDidMount() {
        this.props.getLeads();
    }

	render() {

        let {leads} = this.props;
        let filename = this.state.filename ? this.state.filename : '';
        let errmsg = this.state.errmsg ? this.state.errmsg : '';
        let parsed = this.state.parsed;

        let csvdownload = csvutil.getSample();

		return (
			<div id="import-leads">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="">
                        <div className="top">
                            <span className="font-bold h4 pull-left" id="title">Import Lead</span>
                        </div>
                        <div className="card">
                            <div className="body">
                                <div className="row clearfix  m-t-60 m-b-60 m-r-100 m-l-100">

                                    <div className="col-md-12">
                                        <div className="font-bold h4 text-center">Import Lead</div>
                                        <div className="text-center m-t-30">
                                            <span>Choose the containing contracts you want to import. In the next step, you will be able to map each column to a field in  Agent Cloud.</span><br/>
                                            
                                            <span>Note: File must be CSV file with first row as column titles. </span>
                                            
                                            <CSVLink filename="sample.csv"  data={csvdownload}>
                                               Download Templates
                                            </CSVLink>
                                        </div>
                                    </div>
                                        

                                    <CsvParse
                                      keys={keys}
                                      separators={[',', ';']}
                                      onDataUploaded={this.handleData.bind(this)}
                                      render={onChange => {
                                            return (

                                                <div className="col-md-12 m-t-50">
                                                <div className="input-group-csv-upload">
                                                    <i className="fa fa-file"></i> 
                                                    <span style={{flex: 1}} className="p-l-10"> {filename} </span>
                                                    <input type="file" className="form-control"  onChange={(ev)=>{this.handleChange(ev, onChange)}}/>
                                                    <span style={{color: "#e9c215"}} > Browse </span>
                                                </div>
                                                <label className="error">{errmsg}</label>
                                                {this.state.showErrorDownload && 
                                                    <label className="error"><CSVLink filename={`agentcloud-failed-${this.props.match.params.type}s.csv`} style={{color: '#F44336', textDecoration: 'underline', fontWeight: 700 }} data={this.state.errorleads}>Here</CSVLink> is your list of contacts with errors.  Please download this list and fix your contacts. First name and last name are required fields.</label>
                                                }
                                                </div>
                                            );
                                        }} 
                                    />

                                    <div className="text-center">
                                        <button className="btn btn-default btn-md waves-effect m-r-10 bg-amber-custom " disabled={(errmsg!=''|| !parsed)? true : false} onClick={this.handleSubmit.bind(this)}>SUBMIT</button>
                                        <NavLink to={`/leads/${this.props.match.params.type}`}><button className="btn btn-default btn-md waves-effect">CANCEL</button></NavLink>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
		)
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(ImportLeads);
