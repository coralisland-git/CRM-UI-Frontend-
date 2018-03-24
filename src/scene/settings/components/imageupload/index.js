import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import AvatarEditor from 'react-avatar-editor'


import profile_img from '../../../../styles/assets/images/avatar0.png';
import '../../../../styles/assets/plugins/cropper/croppie.css';
import '../../../../styles/assets/plugins/cropper/croppie.js';
import './style.scss';


const mapDispatchToProps = (dispatch) => {
	return ({
			
	});
}

const mapStateToProps = (state) => {
	return ({ 
		user: state.auth.user,
	});
}


class ProfileImage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user || {},
			classValue: this.props.classValue || "rounded",
			imagePreviewUrl: "",
			cropped_img: undefined,
			onGetCrop: this.props.onGetCrop,
		}
	}

	componentDidMount() {
	}

	componentWillReceiveProps(newProps) {
		if (newProps.user != undefined && newProps.user != this.state.user) {
	      this.setState({user: newProps.user});
	    }
	}

	onChangeImage = (e) => {
		e.preventDefault();
		$('#cropper').empty();
		var $uploadCrop;
		$uploadCrop = $('#cropper').croppie({
			viewport: {
				width: 300,
				height: 342,
				type: 'square'
			},
			enableExif: true
		});

		let self = this;

		$("#btn_save").on("click", function(){
			$uploadCrop.croppie('result', 'base64').then(function (resp) {
				self.setState({cropped_img: resp});
				self.state.onGetCrop(resp);
				$("#profile_modal").modal("hide");
			});
		});

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
    	$('#cropper').removeClass('padding-top-100');
    	$('#cropper').addClass('ready');
    	$uploadCrop.croppie('bind', {
    		url: reader.result
    	}).then(function(){
    		console.log('jQuery bind complete');
    	});
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);

    $("#btn_group_browser").css("display", "none");
    $("#btn_group_save").css("display", "block");
	}

	onclick = (e) => {
		e.preventDefault();
		$("#profile_modal").modal("show");
	}

	render () {

		let pro_img = this.state.cropped_img || this.state.user.profile_image || profile_img;

		return (

			<div id="profile_image">
				<div>
					<img src={ pro_img } className={ this.state.classValue } onClick={this.onclick} />
				</div>
					<i className="material-icons camera">camera_alt</i>

				<div className="modal fade" id="profile_modal" tabIndex="-1" role="dialog">
				    <div className="modal-dialog" role="document">
				        <div className="modal-content">
				            <div className="modal-header">
				            	<div className="col-sm-6 no-padding">
				                <h4 className="modal-title" id="defaultModalLabel">UPLOAD PHOTO</h4>
				              </div>
				              <div className="col-sm-6 no-padding">
				              	<h4 className="modal-title right point" id="defaultModalLabel" data-dismiss="modal">X</h4>
				              </div>
				            </div>
				            <div id="body" className="modal-body">
				            	<div id="cropper" className="padding-top-100">
				            		<div id="init_back" className="crop_image">
				            		</div>
				            	</div>
				            </div>
				            <div className="modal-footer">
				            	<div id="btn_group_browser">
				                <label id="btn_browser" htmlFor="file-upload" className="custom-file-upload btn btn-success btn-raised waves-effect btn-md btn-padding">
                            BROWSER
                        </label>
                        <input id="file-upload" type="file" onChange={this.onChangeImage } />
                      </div>
                      <div id="btn_group_save" style={{ display: "none" }}>
                      	<button id="btn_save" className="custom-file-upload btn btn-success btn-raised waves-effect btn-md btn-padding">
                            SAVE
                        </button>
                      </div>
				            </div>
				        </div>
				    </div>
				</div>

			</div>

		);

	}

}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);