import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class SearchLead extends React.Component {
  constructor (props) {
    super(props);
  }

  gotoDetail = (lead) => {
    this.props.parent.history.push('/addleads/lead/' + lead.id);
  }

  render () {

    let leads = [];
    let temp_leads = this.props.parent.leads;
    let key = this.props.query;
    temp_leads.map((lead, i) => {
      let cnt = 0;
      if (lead.first_name && lead.first_name.indexOf(key) > -1) cnt += 1;
      if (lead.last_name && lead.last_name.indexOf(key) > -1) cnt += 1;
      if (lead.username && lead.username.indexOf(key) > -1) cnt += 1;
      if (lead.email && lead.email.indexOf(key) > -1) cnt += 1; 
      if (lead.email2 && lead.email2.indexOf(key) > -1) cnt += 1; 
      if (lead.email3 && lead.email3.indexOf(key) > -1) cnt += 1; 
      if (lead.fax && lead.fax.indexOf(key) > -1) cnt += 1; 
      if (lead.birth_date && lead.birth_date.indexOf(key) > -1) cnt += 1; 
      if (lead.title && lead.title.indexOf(key) > -1) cnt += 1;
      if (lead.company && lead.company.indexOf(key) > -1) cnt += 1;
      if (lead.office && lead.office.indexOf(key) > -1) cnt += 1;
      if (lead.social_profile && lead.social_profile.indexOf(key) > -1) cnt += 1;
      if (lead.phone_office && lead.phone_office.indexOf(key) > -1) cnt += 1;
      if (lead.phone_office2 && lead.phone_office2.indexOf(key) > -1) cnt += 1;
      if (lead.phone_office3 && lead.phone_office3.indexOf(key) > -1) cnt += 1;
      if (lead.phone_home && lead.phone_home.indexOf(key) > -1) cnt += 1;
      if (lead.phone_mobile && lead.phone_mobile.indexOf(key) > -1) cnt += 1;
      if (lead.phone_mobile2 && lead.phone_mobile2.indexOf(key) > -1) cnt += 1;
      if (lead.phone_mobile3 && lead.phone_mobile3.indexOf(key) > -1) cnt += 1;
      if (lead.account && lead.account.indexOf(key) > -1) cnt += 1;
      if (lead.source && lead.source.indexOf(key) > -1) cnt += 1;
      if (lead.website && lead.website.indexOf(key) > -1) cnt += 1;
      if (lead.current_transcation && lead.current_transcation.indexOf(key) > -1) cnt += 1;
      if (lead.merge_fromgoogle && lead.merge_fromgoogle.indexOf(key) > -1) cnt += 1;
      if (lead.aniversary_date && lead.aniversary_date.indexOf(key) > -1) cnt += 1;
      if (lead.address && lead.address.indexOf(key) > -1) cnt += 1;
      if (lead.address2 && lead.address2.indexOf(key) > -1) cnt += 1;
      if (lead.zipcode && lead.zipcode.indexOf(key) > -1) cnt += 1;
      if (lead.state && lead.state.indexOf(key) > -1) cnt += 1;
      if (lead.city && lead.city.indexOf(key) > -1) cnt += 1;
      if (lead.address_2 && lead.address_2.indexOf(key) > -1) cnt += 1;
      if (lead.address2_2 && lead.address2_2.indexOf(key) > -1) cnt += 1;
      if (lead.zipcode_2 && lead.zipcode_2.indexOf(key) > -1) cnt += 1;
      if (lead.state_2 && lead.state_2.indexOf(key) > -1) cnt += 1;
      if (lead.city_2 && lead.city_2.indexOf(key) > -1) cnt += 1;
      if (lead.address_3 && lead.address_3.indexOf(key) > -1) cnt += 1;
      if (lead.address2_3 && lead.address2_3.indexOf(key) > -1) cnt += 1;
      if (lead.zipcode_3 && lead.zipcode_3.indexOf(key) > -1) cnt += 1;
      if (lead.state_3 && lead.state_3.indexOf(key) > -1) cnt += 1;
      if (lead.city_3 && lead.city_3.indexOf(key) > -1) cnt += 1;
      if (lead.address_4 && lead.address_4.indexOf(key) > -1) cnt += 1;
      if (lead.address2_4 && lead.address2_4.indexOf(key) > -1) cnt += 1;
      if (lead.zipcode_4 && lead.zipcode_4.indexOf(key) > -1) cnt += 1;
      if (lead.state_4 && lead.state_4.indexOf(key) > -1) cnt += 1;
      if (lead.city_4 && lead.city_4.indexOf(key) > -1) cnt += 1;
      if (lead.address_5 && lead.address_5.indexOf(key) > -1) cnt += 1;
      if (lead.address2_5 && lead.address2_5.indexOf(key) > -1) cnt += 1;
      if (lead.zipcode_5 && lead.zipcode_5.indexOf(key) > -1) cnt += 1;
      if (lead.state_5 && lead.state_5.indexOf(key) > -1) cnt += 1;
      if (lead.city_5 && lead.city_5.indexOf(key) > -1) cnt += 1;
      if (lead.location && lead.location.indexOf(key) > -1) cnt += 1;
      if (lead.timezone && lead.timezone.indexOf(key) > -1) cnt += 1;
      if (lead.status && lead.status.indexOf(key) > -1) cnt += 1;
      if (lead.facebook && lead.facebook.indexOf(key) > -1) cnt += 1;
      if (lead.twitter && lead.twitter.indexOf(key) > -1) cnt += 1;
      if (lead.google_plus && lead.google_plus.indexOf(key) > -1) cnt += 1;
      if (lead.linkedin && lead.linkedin.indexOf(key) > -1) cnt += 1;
      if (lead.instagram && lead.instagram.indexOf(key) > -1) cnt += 1;
      if (lead.tags && lead.tags.indexOf(key) > -1) cnt += 1;

      if (cnt > 0 ) leads.push(lead);
    });

    if (leads.length > 9) {
      leads = leads.slice(0, 9);
    }

    return (
      <div className="col-sm-12 no-padding">
        <label className="heading-profile">PEOPLE</label><br/>
        {
          leads.length == 0 
            ? <div className="row padding-bottom"><div className="col-sm-12">No Leads</div></div>
            : <div className="row padding-bottom">
              {
                leads.map((lead, i) => {
                  let avatar = this.generateAvatar(lead)
                  return ( 
                    <div className="col-sm-4" key={i} onClick={()=> this.gotoDetail(lead)}>
                      <div className="card card-me pointer-cursor">
                        <div className="body clearfix flexing">
                          <div className="img-center">
                          {avatar}
                          </div>
                          <div className="col-sm-12 flex-table-center">
                            {
                              lead.first_name 
                                ? <label className="user_name pointer-cursor">{ lead.first_name + ' ' + lead.last_name } </label>
                                : lead.username 
                                   ? <label className="user_name pointer-cursor"> { lead.username } </label>
                                   : ''
                            }
                            <label className="pointer-cursor">{ lead.email }</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    );
  }

  generateAvatar = (lead, size=42) => {
    let image = lead.image;

    if(image) 
        return (
          <Link to={"/addleads/lead/" + lead.id} style={{cololr: 'white', textDecoration: 'none'}}>
            <img src={image} className="avatar" style={{height: size+"px"}} />
          </Link>
        )

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
                <Link to={"/addleads/lead/" + lead.id} style={{color: 'white', textDecoration: 'none'}}>{short_name.toUpperCase()}</Link>
            </span>
        </div>
    )
  }

}


export default SearchLead;