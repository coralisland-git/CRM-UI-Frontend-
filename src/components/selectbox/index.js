import React from 'react';
import PropTypes from 'prop-types';

// import '../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import './index.css';


class SelectBox extends React.Component {

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

	render() {
        let content = [];
        
        if (this.props.data) {
            this.props.data.forEach((element, key)=> {
                content.push(
                    <option key={key} value={element}>{ element[this.props.type] }</option>
                )
            })
        }
        
		return (
            <div class="form-group">
                <select className="">
                    {content}
                </select>
            </div>
		);
	}

}

SelectBox.propTypes = {
    labeltext: PropTypes.string,
    heading: PropTypes.string,
    data: PropTypes.array,
    classVal: PropTypes.string,
    type: PropTypes.string.isRequired
}


export default SelectBox;