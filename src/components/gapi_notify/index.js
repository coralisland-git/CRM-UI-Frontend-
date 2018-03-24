import React from 'react';
import { connect } from 'react-redux';

import { googleLogin } from '../../services/actions/gapi';
import './style.scss';

class GapiNotify extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="gapi_notify">
				<span> It appears that your browser's pop-up blocker is enabled. Please disable it and <span className="here_gnotify" onClick={this.props.googleLogin} >click here</span> to continue. </span>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    googleLogin: () => googleLogin(dispatch), 
  }

}

const mapStateToProps = (state) => {
  return ({ 
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GapiNotify);
