import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

class LeadPill extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			avatar: null
		}
		this.generateAvatar = this.generateAvatar.bind(this);
	}

	componentWillMount() {
		this.generateAvatar(this.props.lead, this.props.size);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.lead) {
			if(this.props.lead)
				if(this.props.lead.email == nextProps.lead.email)
					return; 
			this.generateAvatar(nextProps.lead, nextProps.size);
		}
	}

	generateAvatar(lead, size) {

		var self = this;

		if(!lead) return null;

		let image = lead.image;

		if(image) {
			self.setState({
				avatar: <img src={image} className="avatar" style={{height: size+"px"}} />
			})
			return;
		}

		fetch('https://picasaweb.google.com/data/entry/api/user/'+lead.email+'?alt=json')
			.then(res => {
				res.json().then(data => {
					this.setState({
						avatar: <img src={data.entry.gphoto$thumbnail.$t} className="avatar" style={{height: size+"px"}} />
					})
				})
			}).catch(() => {
		        console.log("No avatar from google for "+lead.email);
		    });


		let leadname = (lead.first_name? lead.first_name: '') + ' ' + (lead.last_name? lead.last_name: '');
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

	    self.setState({
	    	avatar: <div className="avatar" style={{ backgroundColor: "#"+c, height: size+"px", width: size+"px" }} >
		    		<span>
		    			{short_name.toUpperCase()}
		    		</span>
		    	</div>
	    });
	}

	render() {
		let lead = this.props.lead;
		if(!lead) return null;
		let leadname = (lead.first_name? lead.first_name: '') + ' \u00A0' + (lead.last_name? lead.last_name: '');
		if(!lead) return <div> No Lead Set! </div>
		let info = this.props.info?  ( <div className="info">
                <strong> {leadname} </strong>
                { this.props.company? <label> {lead.title} {lead.company? " / " + lead.company: ''} </label>: null }
            </div> ) : null;
		let component = this.props.link ? 
            (<div className="leadpill"> <NavLink to={this.props.link}  replace="false">
                { this.state.avatar }
                { info }
            </NavLink> </div>):
            (<div className={this.props.className+" leadpill"}> {this.state.avatar} {info} </div>)
		return component;

	}
}

export default LeadPill;
