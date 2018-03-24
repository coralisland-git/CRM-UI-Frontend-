import React from 'react';

import './style.scss';

class FourthStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			to_email: '',
			title: '', 
			content: ''
		}

		this.sendEmail = () => {
	        let to_email = this.state.to_email,
	            subject = this.state.title,
	            content = this.state.content;


	        if(content.length == 0)
		        content = $("#ckeditor").val();

	        let email = '',
	            headers_obj = {
	                'To': to_email,
	                'Subject': subject,
	                "Content-Type": "text/html; charset='UTF-8'\r\n"                
	            }

	        for(var header in headers_obj)
	            email += header += ": "+headers_obj[header]+"\r\n";

	        email += "\r\n" + content;
	        gapi.client.gmail.users.messages.send({
	            'userId': 'me',
	            'resource': {
	              'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
	            }
	        }).then((result) => {
	            if (result.status == 200) {
	            	console.log("MAIL Sent!")
	            	this.props.dismiss();
	            	setTimeout(() => {
	            		this.props.stepUpdate(2, 34);
	            	}, 500)
	            }
	        })
		}

		this.sendEmail = this.sendEmail.bind(this);
	}

	componentDidMount() {
        setTimeout(() => {

            CKEDITOR.replace('ckeditor', {
	            removePlugins: 'about',
	            allowedContent: true
            });
            CKEDITOR.config.height = 300;
            //TinyMCE

	        CKEDITOR.instances.ckeditor.on('change', function () {
	          let data = CKEDITOR.instances.ckeditor.getData();
	          this.setState({
	          	content: data
	          })
	        }.bind(this));
        }, 500);
        this.props.complete();
	}

	render() {
		return (
			<div className="fourthstep"> 
				<div className="form-group">
					<label> To: </label>
					<input type="email" className="form-control" onChange={ev => { this.setState({ to_email: ev.target.value }) }} />
				</div>
				<div className="form-group">
					<label> Title: </label>
					<input type="text" className="form-control" onChange={ev => { this.setState({ title: ev.target.value }) }} />
				</div>
				<textarea id="ckeditor" onChange={ev => { this.setState({ content: ev.target.value }) }} > </textarea>
				<div className="pull-right">
					<button className="btn btn-warning btn-raised waves-effect m-r-15" onClick={this.sendEmail}>
						Send
					</button>
				</div>
				<div className="clearfix"> </div>
				<hr />
				<div className="footerbuttons">
					<a href="#third" data-toggle="tab" onClick={() => {this.props.newStep(2);}} > 
						<i className="material-icons"> navigate_before </i>
						Previous 
					</a>
					<a  onClick={this.props.dismiss}  > Skip </a>
					<a  onClick={this.props.dismiss}  > 
						Complete
						<i className="material-icons"> navigate_next </i>
					</a>
				</div>
			</div>
		);
	}
}

export default FourthStep
