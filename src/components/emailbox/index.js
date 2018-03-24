import React from 'react';
import '../../styles/assets/plugins/jquery-inputmask/jquery.inputmask.bundle.js';

class EmailBox extends React.Component {

	/*
	 * Props > Events :   
	 *		onChange(changedemail):text 	: change value
	 *		onSubmit(email):text			: Enter key event
	 * Props < Params :
	 * 		showIcon: boolean(=false)		: show mail icon on left
	 */

	componentDidMount() {

		// Initialize inputmask plugin
		$(".emailbox").inputmask({ alias: "email" });

		// Controls change event with jQuery since native event is blocked by inputmask plugin
		if(this.props.onChange){
			$(".emailbox").on('change', (event) => {
				this.props.onChange(event.target.value);
			})
		}
		// Bind 'Enter' key event 
		if(this.props.onSubmit) {
			$(".emailbox").on('keypress', (event) => {
				if(event.which == 13)
					this.props.onSubmit(event.target.value);
			})
		}
	}

	render() {
		let icon = null;
    	if(this.props.showIcon)
    		icon = ( <span className="input-group-addon"> 
	            		<i className="material-icons">email</i> 
	            	</span>);
		return (
            <div className="input-group"> 
            	{ icon }
                <div className="form-line">
                    <input type="text" className="emailbox form-control" placeholder="Ex: example@example.com" />
                </div>
            </div>
		);
	}
}

export default EmailBox;