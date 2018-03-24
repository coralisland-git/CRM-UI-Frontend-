import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateTask from '../../../../components/createtask';

import '../../index.scss';


class Steps extends React.Component {
    constructor() {
        super();

        this.state = {
            template: {}
        }
    }

    render() {
    	let  { template } = this.props;
    	let action = [];
    	if (template.action) {
    		action = JSON.parse(template.action);	
    	}

    	return (
    		<div className="sngle-steps">
	    		<div className="item__row item__row--content">
	    			<div className="flex-box p-l-15 p-r-15">
	    				<span className="heading avatar-heading m-r-15">Steps</span>
	    				<span className="avatar yellow">{action.length}</span>
	    			</div>
	    		</div>
	    		<div className="item__row item__row--content item__row--header">
	    			<div className="item__column item__column--order">#</div>
	    			<div className="item__column item__column--trigger">Trigger</div>
					<div className="item__column item__column--action">Action</div>
                    <div className="item__column item__column--scheduleId">Scheduled</div>
                    <div className="item__column item__column--completed">Completed</div>
	    		</div>
	    		{
	    			action.map((element, key) => {
	    				let completed = 0;
	    				let scheduled = 0;
                        let tTask = {};

	    				template.tasks.map(task1 => {
                            console.log('$$$ task $$: ', task1)
    			            if (task1.title == element.action) {
    			                if (task1.status == "open") {
    			                    scheduled += 1;
                                    tTask = task1;
    			                } else {
    			                	completed += 1;
    			                }
    			            }
	    			    })
                        
                        
	    				return (
				    		<div className="item__row item__row--content" key={key}>
				    			<div className="item__column item__column--order">{key + 1}</div>
				    			<div className="item__column item__column--trigger">{element.delay}</div>
								<div className="item__column item__column--action heading">{element.action}</div>
			                    <div className="item__column item__column--scheduleId">{scheduled}</div>
			                    <div className="item__column item__column--completed">{completed}</div>
                                <div className="item__column item__column--completed">
                                    <CreateTask type="Edit" task={tTask} lead={this.props.leads} number={tTask.id} />
                                </div>
				    		</div>
	    				)
	    			})
	    		}
	    		
	    	</div>
    	)
    }
}

Steps.propsType = {
    template: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
    return ({
    })
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user,
        leads: state.leads.leads,
        templates: state.templates.templates,
        tasks: state.tasks.tasks
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Steps);