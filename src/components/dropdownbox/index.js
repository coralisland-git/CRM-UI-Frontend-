import React from 'react';
import PropTypes from 'prop-types';

// import '../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import './index.css';


class DropdownBox extends React.Component {

    // @params: 
    // heading: first word on dropdown box
    // contentList: array [{ name: xxxxx }]
    // classVal: class

    constructor(props) {
        super(props);
        this.state = {
            labeltext: this.props.labeltext || '',
        }
    }

    content_view = (str) => {
        return (
            <label key={str}>{ str }</label>
        );
    }

	render() {
        let listContent = [];
        let labelContent = [];
        
        if (this.props.contentList) {
            this.props.contentList.forEach((content, key)=> {
                listContent.push(
                    <option key={key} value={content.value}>{ content.name }</option>
                )
            })
        }

        if (this.props.labeltext) {
            labelContent.push(this.content_view(this.props.labeltext));
        } else {
            labelContent.push("");
        }
        
		return (
            <div className="form-group">
                { labelContent }
                <div className="form-line">
                    <select className="form-control show-tick">
                        { listContent }
                    </select>
                </div>
            </div>
		);
	}

}

DropdownBox.propTypes = {
    labeltext: PropTypes.string,
    heading: PropTypes.string,
    contentList: PropTypes.array,
    classVal: PropTypes.string
}


export default DropdownBox;