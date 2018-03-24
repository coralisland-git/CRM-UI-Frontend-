import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FirstJourney from '../../../../components/firstjourney';
import * as d_actions from '../../../../services/actions/dashboard';

import './style.scss';

class AccountStatus extends React.Component {
	
    constructor(props) {
        super(props);

        this.percents = [0,0,0];
        if(props.user && props.user.profile_completeness)
            this.percents = props.user.profile_completeness.split(',').map(one => parseInt(one))

        this.state = {
            steps: [
                "Connect Your email account",    // 70%
                "Add 25 contacts to circle",     // 15%
                "Send your first message"        // 10%
            ]
        }

        this.complete = () => {
            this.props.d_actions.completeJourney();
        }

        this.dismiss = () => { 
            this.journey = null; 
            this.forceUpdate();
        }

        this.recallStep = (step) => {
            this.journey_recall = true;
            this.journey = ( <FirstJourney 
                step={step} 
                update={this.percents[0] > 0} 
                complete={this.complete} 
                dismiss={this.dismiss}
                percents={this.props.user.profile_completeness}> </FirstJourney> )
            this.forceUpdate();
        }

        this.journey = null;
        if(props.user && props.user.is_first)
            this.journey = ( <FirstJourney 
                complete={this.complete} 
                dismiss={this.dismiss}
                percents={props.user.profile_completeness} > </FirstJourney>  );

        this.complete = this.complete.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.recallStep = this.recallStep.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.percents = [0,0,0];
        if(nextProps.user) {
            if(nextProps.user.profile_completeness)
                this.percents = nextProps.user.profile_completeness.split(',').map(one => parseInt(one))
        }
        if(nextProps.tasks.length != this.props.tasks.length)
            this.forceUpdate();
    }

	render() {
        let list = [], percent = 0;
        this.state.steps.map((item, idx) => {
            let done = "";
            if(this.percents[idx] > 0) {
                done = "done"
                list.push(
                    <div className={"item "+done} key={item} >
                        <div className="checker">
                            <i className="material-icons"> check </i>
                        </div>
                        <div className="itemtext">
                            { item }
                        </div>
                    </div>
                )
            } else {
                list.push(
                    <div className={"item "+done} key={item} onClick={() => {this.recallStep(idx+1)}}>
                        <div className="checker">
                            <i className="material-icons"> check </i>
                        </div>
                        <div className="itemtext">
                            { item }
                        </div>
                    </div>
                )
            }
            percent = percent + this.percents[idx];
        })

        // If First journey is complete
        if(percent == 100) {
            let YY = 0, XX = 0, dp;
            this.props.tasks.map(item => {
                if(item.due_date == moment().format('YYYY-MM-DD')) {
                    YY ++;
                    if(item.status == "completed")
                        XX ++;
                }
            })
            if(YY == 0)
                dp = 0;
            else
                dp = (XX / YY) * 100;
            return (
                <div className="accountstatus">
                    <div className="statustitle">
                        <h4> Your daily progress </h4>
                    </div>
                    <div className="progress">
                        <div className="progress-bar" 
                            role="progressbar" 
                            aria-valuenow="32" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                            style={{ width: ""+dp+"%" }} >
                        </div>
                        <div className="progressindicator" style={{ left: "calc("+dp+"% - 30px)" }}>
                            <div className="progressindicatortext">
                                {dp.toFixed(2)}%
                            </div>
                            <div className="progressindicatorarrow"> </div>
                        </div>
                    </div>
                    <div className="item">
                        You have completed {XX} tasks out of {YY} tasks assigned to you today!
                    </div>
                </div>
            )
        }

        percent = ""+percent;
		return (
			<div className="accountstatus">
                {this.journey}
				<div className="statustitle">
					<h4> WELCOME </h4>
					<strong> COMPLETE YOUR ACCOUNT SETUP </strong>
				</div>
                <div className="progress">
                    <div className="progress-bar" 
                    	role="progressbar" 
                    	aria-valuenow="32" 
                    	aria-valuemin="0" 
                    	aria-valuemax="100"
                    	style={{ width: ""+percent+"%" }} >
                    </div>
                    <div className="progressindicator" style={{ left: "calc("+percent+"% - 20px)" }}>
                    	<div className="progressindicatortext">
                    		{percent}%
                    	</div>
                    	<div className="progressindicatorarrow"> </div>
                    </div>
                </div>
                { list }
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
    return ({
        d_actions: bindActionCreators(d_actions, dispatch)
    });
}

const mapStateToProps = (state) => {
    return ({ 
        user: state.auth.user, 
        tasks: state.tasks.tasks
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatus);
