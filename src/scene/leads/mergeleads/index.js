import React from 'react';
import InputBox from '../../../components/inputbox';
import DropdownBox from '../../../components/dropdownbox';
import {connect} from 'react-redux';
import CustomConfirmAlert, { confirmAlert } from '../../../components/confirmdialog';
import './index.scss';
import {getLeads, deleteLeads, updateLeads, getCurrentLead, deleteLeadsBuck} from '../../../services/actions/leads';

const mapDispatchToProps = (dispatch) => {
    return ({
        getLeads: (params) => {getLeads(dispatch);},
        updateLeads: (params) => {updateLeads(params, dispatch);},
        deleteLeads: (params) => {deleteLeads(params, dispatch);},
        deleteLeadsBuck: (params) => {deleteLeadsBuck(params, dispatch);},
        getCurrentLead: (params) => { return getCurrentLead(params, dispatch);},
    });
}

const mapStateToProps = (state) => {
    return ({ 
        leads: state.leads.leads,
        user : state.auth.user,
        current_lead : state.leads.current_lead,
    });
}

class MergeLeads extends React.Component {

  constructor(props){
        super()
        this.state = {
          id : '',
          image : '',
          first_name : '',
          last_name : '',
          company : '',
          title : '',
          phone_mobile : '',
          phone_mobile2 :'',
          phone_mobile3 : '',
          phone_office : '',
          phone_office2:'',
          phone_office3 : '',
          fax : '',
          website : '',
          email : '',
          email2 : '',
          email3 : '',
          address : '',
          address2 :'',
          city : '',
          state : '',
          zipcode : '',
          is_lead : '',
          created_by : '',
          status : '',
          source : '',
          items : [],
          address_2 : '',
          address2_2 : '',
          city_2 : '',
          state_2 : '',
          zipcode_2 : '',
          address_3 : '',
          address2_3 : '',
          city_3 : '',
          state_3 : '',
          zipcode_3 : '',
          address_4 : '',
          address2_4 : '',
          city_4 : '',
          state_4 : '',
          zipcode_4 : '',
          address_5 : '',
          address2_5 : '',
          city_5 : '',
          state_5 : '',
          zipcode_5 : '',
          more_address : true
        }
        // this.setDefault = this.setDefault.bind(this);
      }

  componentDidMount() {
      this.props.getLeads();
      if (this.props.match.params.ids) {
        let params = this.props.match.params.ids.split('+');
        let items = params.slice(1, params.length);
        this.props.getCurrentLead(params[0]).then(lead=>{
            this.setState({
              id : lead.id || '',
              image : lead.image || '',
              first_name : lead.first_name || '',
              last_name : lead.last_name || '',
              company : lead.company || '',
              title : lead.title || '',
              office : lead.ofice || '',
              phone_mobile : lead.phone_mobile || '',
              phone_mobile2 : lead.phone_mobile2 || '',
              phone_mobile3 : lead.phone_mobile3 || '',
              phone_office : lead.phone_office || '',
              phone_office2: lead.phone_office2 || '',
              phone_office3 : lead.phone_office3 || '',
              fax : lead.fax || '',
              website : lead.website || '',
              email : lead.email || '',
              email2 : lead.email2 || '',
              email3 : lead.email3 || '',
              address : lead.address || '',
              address2 : lead.address2 || '',
              city : lead.city || '',
              state : lead.state || '',
              zipcode : lead.zipcode || '',
              is_lead : lead.is_lead,
              created_by : lead.created_by || '',
              status : lead.created_by || '',
              source : lead.source || '',
              items : items,
              address_2 : lead.address_2 || '',
              address2_2 : lead.address2_2 || '',
              city_2 : lead.city_2 || '',
              state_2 : lead.state_2 || '',
              zipcode_2 : lead.zipcode_2 || '',
              address_3 : lead.address_3 || '',
              address2_3 : lead.address2_3 || '',
              city_3 : lead.city_3 || '',
              state_3 : lead.state_3 || '',
              zipcode_3 : lead.zipcode_3 || '',
              address_4 : lead.address_4 || '',
              address2_4 : lead.address2_4 || '',
              city_4 : lead.city_4 || '',
              state_4 : lead.state_4 || '',
              zipcode_4 : lead.zipcode_4 || '',
              address_5 : lead.address_5 || '',
              address2_5 : lead.address2_5 || '',
              city_5 : lead.city_5 || '',
              state_5 : lead.state_5 || '',
              zipcode_5 : lead.zipcode_5 || '',
              more_address : false
            })
        });
      }
    }

  componentWillMount() {
    }

  save_merge() {
     confirmAlert({
      title: 'Are you sure?',
      message: null,
      template : 'warning',
      confirmLabel: 'YES',
      cancelLabel: 'CANCEL',
      onConfirm: () => {
          this.props.updateLeads(this.state);
          this.props.deleteLeadsBuck(this.state.items);
          setTimeout(() => {
              confirmAlert({
                  toastContent: "success",
                  message: "The contacts/leads are merged successfully.",
                  outerClick : true
              });
          }, 100)
      }
    });
  }

  remove(param) {
    let items = this.state.items;
    let newItems = [];
    for(let i=0;i<items.length;i++) {
        if(items[i] !== param.toString()){
            newItems.push(items[i]);
        }
    }
    this.setState({items: newItems});
  }

  setAsPrimary(lead) {
    let items = this.state.items;
    let index = items.indexOf(lead.id.toString());
    if (index !== -1) {
        items[index] = this.state.id.toString();
    }
    this.setState({
      id : lead.id || '',
      image : lead.image || '',
      first_name : lead.first_name || '',
      last_name : lead.last_name || '',
      company : lead.company || '',
      title : lead.title || '',
      office : lead.ofice || '',
      phone_mobile : lead.phone_mobile || '',
      phone_mobile2 : lead.phone_mobile2 || '',
      phone_mobile3 : lead.phone_mobile3 || '',
      phone_office : lead.phone_office || '',
      phone_office2: lead.phone_office2 || '',
      phone_office3 : lead.phone_office3 || '',
      fax : lead.fax || '',
      website : lead.website || '',
      email : lead.email || '',
      email2 : lead.email2 || '',
      email3 : lead.email3 || '',
      address : lead.address || '',
      address2 : lead.address2 || '',
      city : lead.city || '',
      state : lead.state || '',
      zipcode : lead.zipcode || '',
      is_lead : lead.is_lead,
      created_by : lead.created_by || '',
      status : lead.created_by || '',
      source : lead.source || '',
      items : items,
      address_2 : lead.address_2 || '',
      address2_2 : lead.address2_2 || '',
      city_2 : lead.city_2 || '',
      state_2 : lead.state_2 || '',
      zipcode_2 : lead.zipcode_2 || '',
      address_3 : lead.address_3 || '',
      address2_3 : lead.address2_3 || '',
      city_3 : lead.city_3 || '',
      state_3 : lead.state_3 || '',
      zipcode_3 : lead.zipcode_3 || '',
      address_4 : lead.address_4 || '',
      address2_4 : lead.address2_4 || '',
      city_4 : lead.city_4 || '',
      state_4 : lead.state_4 || '',
      zipcode_4 : lead.zipcode_4 || '',
      address_5 : lead.address_5 || '',
      address2_5 : lead.address2_5 || '',
      city_5 : lead.city_5 || '',
      state_5 : lead.state_5 || '',
      zipcode_5 : lead.zipcode_5 || '',
    });
  }

	render() {
    let other_leads = [];
    if (this.props.match.params.ids) {
        for(let i=0;i<this.props.leads.length;i++){
          for (let j=0; j<this.state.items.length;j++){
            if(this.props.leads[i].id.toString() == this.state.items[j]) {
              other_leads.push(this.props.leads[i]);
            }
          }
        }
    }

		return (
			<div className="container-fluid" id="mergeleads">
        <div className="bt_group">
          <div className="font-bold h4 pull-left" style={{ marginTop : "18px"}}>{this.state.first_name + ' ' + this.state.last_name}</div>
          <button className="btn btn-default btn-md btn-raised waves-effect pull-right" onClick={ () => { this.props.history.goBack(); }}>CANCEL</button>
          <button className="btn btn-default btn-md btn-raised waves-effect pull-right" onClick={ () => { this.save_merge() }}>SAVE MERGE</button>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
          <div className="">
            <div className="top row">
            </div>
            <div className="body">
              <div className="">
                <div id="left-side" className="">
                  <div className="primary_set">
                    <div className="primary" style={{ height : "80px", marginLeft : "12px"}}>
                      <div>Columns whose value is primary row differs from merging rows:</div>
                      <div className="req_mark">* Indicates required fields</div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >First Name</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.first_name} onChange={(e) => this.setState({'first_name': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Last Name</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.last_name} onChange={(e) => this.setState({'last_name': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Title</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.title} onChange={(e) => this.setState({'title': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Company</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.company} onChange={(e) => this.setState({'company': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Phone_office</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.phone_office} onChange={(e) => this.setState({'phone_office': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Phone_office2</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.phone_office2} onChange={(e) => this.setState({'phone_office2': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Phone_office3</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.phone_office3} onChange={(e) => this.setState({'phone_office3': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Phone_mobile</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.phone_mobile} onChange={(e) => this.setState({'phone_mobile': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Phone_mobile2</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.phone_mobile2} onChange={(e) => this.setState({'phone_mobile2': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Phone_mobile3</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.phone_mobile3} onChange={(e) => this.setState({'phone_mobile3': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Fax</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.fax} onChange={(e) => this.setState({'fax': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Website</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.website} onChange={(e) => this.setState({'website': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Email</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.email} onChange={(e) => this.setState({'email': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Email2</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.email2} onChange={(e) => this.setState({'email2': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Email3</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.email3} onChange={(e) => this.setState({'email3': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Address</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.address} onChange={(e) => this.setState({'address': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Address 2</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.address2} onChange={(e) => this.setState({'address2': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >State</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.state} onChange={(e) => this.setState({'state': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >City</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.city} onChange={(e) => this.setState({'city': e.target.value})}/></div>
                    </div>
                    <div className="primary">
                      <div className="col-xs-4" >Zipcode</div>
                      <div className="col-xs-8" ><InputBox value = {this.state.zipcode} onChange={(e) => this.setState({'zipcode': e.target.value})}/></div>
                    </div>
                    {
                        this.state.more_address?
                        <div>
                          <div className="primary">
                            <div className="col-xs-4" >Address_2</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address_2} onChange={(e) => this.setState({'address_2': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Address 2_2</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address2_2} onChange={(e) => this.setState({'address2_2': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >State_2</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.state_2} onChange={(e) => this.setState({'state_2': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >City_2</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.city_2} onChange={(e) => this.setState({'city_2': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Zipcode_2</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.zipcode_2} onChange={(e) => this.setState({'zipcode_2': e.target.value})}/></div>
                          </div>

                          <div className="primary">
                            <div className="col-xs-4" >Address_3</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address_3} onChange={(e) => this.setState({'address_3': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Address 2_3</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address2_3} onChange={(e) => this.setState({'address2_3': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >State_3</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.state_3} onChange={(e) => this.setState({'state_3': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >City_3</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.city_3} onChange={(e) => this.setState({'city_3': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Zipcode_3</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.zipcode_3} onChange={(e) => this.setState({'zipcode_3': e.target.value})}/></div>
                          </div>

                          <div className="primary">
                            <div className="col-xs-4" >Address_4</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address_4} onChange={(e) => this.setState({'address_4': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Address 2_4</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address2_4} onChange={(e) => this.setState({'address2_4': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >State_4</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.state_4} onChange={(e) => this.setState({'state_4': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >City_4</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.city_4} onChange={(e) => this.setState({'city_4': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Zipcode_4</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.zipcode_4} onChange={(e) => this.setState({'zipcode_4': e.target.value})}/></div>
                          </div>

                          <div className="primary">
                            <div className="col-xs-4" >Address_5</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address_5} onChange={(e) => this.setState({'address_5': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Address 2_5</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.address2_5} onChange={(e) => this.setState({'address2_5': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >State_5</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.state_5} onChange={(e) => this.setState({'state_5': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >City_5</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.city_5} onChange={(e) => this.setState({'city_5': e.target.value})}/></div>
                          </div>
                          <div className="primary">
                            <div className="col-xs-4" >Zipcode_5</div>
                            <div className="col-xs-8" ><InputBox value = {this.state.zipcode_5} onChange={(e) => this.setState({'zipcode_5': e.target.value})}/></div>
                          </div>
                          <div style={{ left: "15px", position: "relative", top: "10px", cursor: "pointer", color : "#ffe042"}} onClick={ ()=> { this.setState({more_address : false})}}>
                            Hide extra addresses
                          </div>
                        </div>
                        :
                        <div style={{ left: "15px", position: "relative", top: "10px", cursor: "pointer", color : "#ffe042"}} onClick={ ()=> { this.setState({more_address : true})}}>
                          View more addresses
                        </div>
                    }

                  </div>
                  { other_leads.map((lead,i) => 
                    <div className="merge" key={i}>
                      <div className="other" style={{ height : "80px"}} >
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ () => { this.setAsPrimary(lead)} } ><i className="material-icons">fast_rewind</i></button>
                        <span className="setasprimary" onClick={ () => { this.setAsPrimary(lead)} }>Set as primary</span> | <span className="remove" onClick={ () => { this.remove(lead.id) } }>Remove</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'first_name': lead.first_name})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.first_name}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'last_name': lead.last_name})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.last_name}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'title': lead.title})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.title}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'company': lead.company})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.company}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'phone_office': lead.phone_office})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.phone_office}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'phone_office2': lead.phone_office2})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.phone_office2}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'phone_office3': lead.phone_office3})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.phone_office3}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'phone_mobile': lead.phone_mobile})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.phone_mobile}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'phone_mobile2': lead.phone_mobile2})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.phone_mobile2}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'phone_mobile3': lead.phone_mobile3})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.phone_mobile3}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'fax': lead.fax})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.fax}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'website': lead.website})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.website}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'email': lead.email})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.email}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'email2': lead.email2})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.email2}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'email3': lead.email3})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.email3}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address': lead.address})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.address}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address2': lead.address2})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.address2}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'state': lead.state})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.state}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'city': lead.city})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.city}</span>
                      </div>
                      <div className="other">
                        <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'zipcode': lead.zipcode})}} ><i className="material-icons">fast_rewind</i></button>
                        <span>{lead.zipcode}</span>
                      </div>

                      {
                        this.state.more_address?
                        <div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address_2': lead.address_2})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address2_2': lead.address2_2})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address2}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'state_2': lead.state_2})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.state}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'city_2': lead.city_2})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.city}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'zipcode_2': lead.zipcode_2})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.zipcode}</span>
                          </div>

                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address_3': lead.address_3})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address2_3': lead.address2_3})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address2}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'state_3': lead.state_3})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.state}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'city_3': lead.city_3})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.city}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'zipcode_3': lead.zipcode_3})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.zipcode}</span>
                          </div>

                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address_4': lead.address_4})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address2_4': lead.address2_4})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address2}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'state_4': lead.state_4})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.state}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'city_4': lead.city_4})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.city}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'zipcode_4': lead.zipcode_4})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.zipcode}</span>
                          </div>

                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address_5': lead.address_5})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'address2_5': lead.address2_5})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.address2}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'state_5': lead.state_5})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.state}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'city_5': lead.city_5})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.city}</span>
                          </div>
                          <div className="other">
                            <button className="btn btn-default btn-xs btn-raised waves-effect" onClick={ ()=>{this.setState({'zipcode_5': lead.zipcode_5})}} ><i className="material-icons">fast_rewind</i></button>
                            <span>{lead.zipcode}</span>
                          </div>
                        </div>
                        :
                        <div>
                          
                        </div>
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="btn btn-default btn-md btn-raised waves-effect" onClick={ () => { this.save_merge() }} >SAVE MERGE</button>      
              <button className="btn btn-default btn-md btn-raised waves-effect" onClick={ () => { this.props.history.goBack(); }} >CANCEL</button>
            </div>
          </div>
        </div>
      </div>  
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MergeLeads);
