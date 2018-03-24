    import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            className1 : "btn btn-default waves-effect",
            className2 : "btn btn-default dropdown-toggle"
        }
    }

	render() {
        let className1 = this.state.className1 + " " + this.props.className
        let className2 = this.state.className2 + " " + this.props.className
        
 		return (
            <div className="btn-group custom-group mydropdown">
                <button type="button" className={className1} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.props.disabled}>{this.props.status}</button>
                <button type="button" className={className2} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.props.disabled}> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                <ul className="dropdown-menu">
                    {this.props.content.map((item, i) => { return <li key={i}><a href="javascript:void(0);" onClick={ item.action }>{item.text}</a></li>
                    })}
                </ul>
            </div>
		);
	}
}

Dropdown.propTypes = {
    status : PropTypes.string,
    className: PropTypes.string
}


export default Dropdown;