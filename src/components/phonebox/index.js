import React from 'react';
import '../../styles/assets/plugins/jquery-inputmask/jquery.inputmask.bundle.js';

class PhoneBox extends React.Component {

	/*
	 * Props > Events :   
	 *		onChange(changedemail):text 	: change value
	 *		onSubmit(email):text			: Enter key event
	 * Props < Params :
	 * 		showIcon: boolean(=false)		: show mail icon on left
	 */

	componentDidMount() {

		// Initialize inputmask plugin
		$(".phonebox").inputmask('+99 (999) 999-99-99', { placeholder: '+__ (___) ___-__-__' });

		// Controls change event with jQuery since native event is blocked by inputmask plugin
		if(this.props.onChange){
			$(".phonebox").on('change', (event) => {
				this.props.onChange(event.target.value);
			})
		}
		// Bind 'Enter' key event 
		if(this.props.onSubmit) {
			$(".phonebox").on('keypress', (event) => {
				if(event.which == 13)
					this.props.onSubmit(event.target.value);
			})
		}
	}

	render() {
		let icon = null;
    	if(this.props.showIcon)
    		icon = ( <span className="input-group-addon"> 
	            		<i className="material-icons">phone_iphone</i> 
	            	</span>);
		return (
            <div className="input-group"> 
            	{ icon }
                <div className="form-line">
                    <input type="text" className="phonebox form-control mobile-phone-number" placeholder="Ex: +00 (000) 000-00-00" />
                </div>
            </div>
		);
	}
}

export default PhoneBox;