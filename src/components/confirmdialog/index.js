import React from 'react';
import PropTypes from 'prop-types';
import { render, unmountComponentAtNode } from 'react-dom';
import { toast } from 'react-toastify';

import './style.scss';

export default class CustomConfirmAlert extends React.Component {

	static defaultProps = {
		title: false,
		message: false,
		childrenElement: () => null,
		confirmLabel: false,
		confirmColor: "#fff",
		confirmBgColor: "#2d9e10",
		cancelLabel: false,
		cancelColor: "#000",
		cancelBgColor: "#fff",
		onConfirm: () => null,
		onCancel: () => null,
		outerClick: false, 
		template: null,
		toastContent: null
	};

	constructor(props) {
		super(props);
		this.onClickConfirm = this.onClickConfirm.bind(this);
		this.onClickCancel = this.onClickCancel.bind(this);
		this.outerClick = this.outerClick.bind(this);
	}

	close = () => {
		removeElementReconfirm();
	};

	onClickConfirm() {
		this.props.onConfirm();
		this.close();
	};

	onClickCancel() {
		this.props.onCancel();
		this.close();
	};

	outerClick() {
		if(this.props.outerClick)
			this.close();
	}

	render() {
		const { title, message, confirmLabel, cancelLabel, childrenElement, template, toastContent } = this.props;
		switch(toastContent) {
			case "success":
				toast.success(title||''+' '+message, {autoClose: 5000});
				return null;
			case "danger":
				toast.error(title||''+' '+message, {autoClose: 5000});
				return null;
			case "warning":
				toast.warn(title||''+' '+message, {autoClose: 5000});
				return null;
		}
		return (
			<div className="react-confirm-alert-overlay" onClick={this.outerClick}>
				<div className="react-confirm-alert">
					<div className="react-confirm-alert-close"  onClick={this.onClickCancel}>
						<i className="fa fa-times"> </i>
					</div>
					{ title &&<div className="react-confirm-alert-header">
						 <label>{title}</label>
					</div> }
					<div className="react-confirm-alert-body">
						{childrenElement && childrenElement()}
						{template && <div className={"template-"+template} > &nbsp; </div>}
						{message && <label>{message}</label>}
					</div>
					<div className="react-confirm-alert-button-group">
						{confirmLabel && <div>
							<button className="confirm-button waves-effect" 
								onClick={this.onClickConfirm}
								style={{
									backgroundColor: this.props.confirmBgColor,
									color: this.props.confirmColor
								}}>
								{confirmLabel}
							</button>
						</div>}
						{cancelLabel &&  <div>
							<button className="waves-effect" 
								onClick={this.onClickCancel}
								style={{
									backgroundColor: this.props.cancelBgColor,
									color: this.props.cancelColor
								}}>
								{cancelLabel}
							</button>
						</div>}
					</div>
				</div>
			</div>
		)
	}
}

function createElementReconfirm(properties) {
	document.body.children[0].classList.add('react-confirm-alert-blur');
	const divTarget = document.createElement('div');
	divTarget.id = 'react-confirm-alert';
	document.body.appendChild(divTarget);
	render(<CustomConfirmAlert {...properties} />, divTarget);
}

function removeElementReconfirm() {
	try {
		const target = document.getElementById('react-confirm-alert');
		unmountComponentAtNode(target);
		target.parentNode.removeChild(target);
		$("#react-confirm-alert").remove();
	} catch(E) {

	}
}

export function confirmAlert(properties) {
	createElementReconfirm(properties);
}
