import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Gravatar from 'react-gravatar';

import 'react-select/dist/react-select.css';
import './index.scss';

const GRAVATAR_SIZE = 15;

const stringOrNode = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.node,
]);

const generateAvatar = (lead, size=42) => {
    let image = lead.image;

    if(image) 
        return <img src={image} className="avatar" style={{height: size+"px"}} />

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
                {short_name.toUpperCase()}
            </span>
        </div>
    )
  }

const GravatarOption = createClass({
	propTypes: {
		children: PropTypes.node,
		className: PropTypes.string,
		isDisabled: PropTypes.bool,
		isFocused: PropTypes.bool,
		isSelected: PropTypes.bool,
		onFocus: PropTypes.func,
		onSelect: PropTypes.func,
		option: PropTypes.object.isRequired,
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	render () {
		let gravatarStyle = {
			display: 'flex',
			padding: '10px 15px'
		};

		var title = (this.props.option.first_name + ' ' + this.props.option.last_name).trim()
		if (title.length == 0)
			title = this.props.option.email
		var t_avatar = generateAvatar(this.props.option, 35)

		return (
			<div className={this.props.className +' image-select-item'}
				style={{display: 'flex', padding: '10px'}}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
				{t_avatar}
				<span className="m-l-15" style={{ lineHeight: '30px' }}>{title}</span>
			</div>
		);
	}
});

const GravatarValue = createClass({
	propTypes: {
		children: PropTypes.node,
		placeholder: stringOrNode,
		value: PropTypes.object
	},
	render () {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		var title = (this.props.value.first_name + ' ' + this.props.value.last_name).trim()
		if (title.length == 0)
			title = this.props.value.username
		var t_avatar = generateAvatar(this.props.value)

		return (
			<div className="Select-value" title={title}>
				<span className="Select-value-label">
					<span className="">{title}</span>
					{this.props.children}
				</span>
			</div>
		);
	}
});

const UsersField = createClass({
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string,
		users: PropTypes.array,
		keyVal: PropTypes.number,
		returnLead: PropTypes.func
	},
	getInitialState () {
		return {};
	},
	setValue (value) {
		this.props.returnLead(value, this.props.keyVal)
		this.setState({ value })
	},
	render () {
		var placeholder = <span>Select Lead</span>;
		return (
			<div className="section">
				<Select
					arrowRenderer={arrowRenderer}
					onChange={this.setValue}
					optionComponent={GravatarOption}
					options={this.props.users}
					placeholder={placeholder}
					value={this.state.value}
					valueComponent={GravatarValue}
					filterOptions={filterOptions}
					/>
			</div>
		);
	}
});

function filterOptions(options, filter, currentValues) {
	let result;
	result = options.filter((option) => {
		// if ((option.first_name && option.first_name.indexOf(filter) > -1) ||
		// 	option.last_name.indexOf(filter) > -1 || 
		// 	option.email.indexOf(filter) > -1
		// ) return option;

		if (option.first_name) {
			if (option.first_name.indexOf(filter) > -1) return option;
		}
		if (option.last_name) {
			if (option.last_name.indexOf(filter) > -1) return option;
		}
		if (option.email) {
			if (option.email.indexOf(filter) > -1) return option;
		}
	})
  
  return result;
}

function arrowRenderer () {
	return (
		<span><i className="fa fa-caret-down"></i></span>
	);
}

module.exports = UsersField;
