import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css';
import '../../styles/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js';


class Tag extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            items: this.props.items || "",
            firstParentClass: this.props.firstParentClass || "col-sm-12",
            secondParentClass: this.props.secondParentClass || "form-group demo-tagsinput-area",
            thirdParentClass: this.props.thirdParentClass || "form-line",
            selfClass: this.props.selfClass || "form-control",
            onChanged: this.props.onChanged,

        }
    }


    componentDidMount() {
        setTimeout(() => {
            $("#tag_text").tagsinput();            
        }, 500);
    }

	render() {

        if (!this.state) {
            return (<div>loading...</div>);
        }

		return (
            <div className={ this.state.firstParentClass }>
                <div className={ this.state.secondParentClass }>
                    <div className={ this.state.thirdParentClass }>
                        <input type="text" id="tag_text" className={ this.state.selfClass } data-role="tagsinput" value={this.state.items} onChange={this.state.onChanged} />
                    </div>
                </div>
            </div>
		);
	}

}

Tag.propTypes = {
  items: PropTypes.string,
  firstParentClass: PropTypes.string,
  secondParentClass: PropTypes.string,
  thirdParentClass: PropTypes.string,
  selfClass: PropTypes.string,
  onChanged: PropTypes.func.isRequired,
};

export default Tag;