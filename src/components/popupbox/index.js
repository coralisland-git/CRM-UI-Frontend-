import React from 'react';
import PropTypes from 'prop-types';
import './index.css';


class PopupBox extends React.Component {
    //
    // @params: 
    // heading: first word on popup box
    // contentList: array [{ name: xxxxx, value: xxxx }]
    // classVal: class

	render() {
        let listContent = [];
        
        if (this.props.contentList) {
            this.props.contentList.forEach((content, key)=> {
                listContent.push(
                    <li key={ key }><a href="javascript:void(0);">{ content }</a></li>
                )
            })
        }
        
		return (
			<ul className={ !this.props.classVal ? "header-dropdown" : "header-dropdown " + this.props.classVal }>
                <li className="dropdown"> 
                    <a 
                        href="javascript:void(0);" 
                        className="dropdown-toggle" 
                        data-toggle="dropdown" 
                        role="button" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                        { this.props.heading }
                    </a>
                    <ul className="dropdown-menu">
                        { listContent }
                    </ul>
                </li>
            </ul>
		);
	}

}

PopupBox.propTypes = {
    heading: PropTypes.string.isRequired,
    contentList: PropTypes.array,
    classVal: PropTypes.string
}


export default PopupBox;