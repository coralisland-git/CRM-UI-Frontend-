import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

import '../../../../styles/assets/plugins/bootstrap-select/css/bootstrap-select.css';
import '../../../../styles/assets/plugins/bootstrap-select/js/bootstrap-select.js';
class RightNav extends React.Component {
	
	render() {
		return (
      <div id="setting-righnav">
        <div className="block-header clearfix">
          <h2 className="padding-top heading-me">Settings</h2>
        </div>
        <div className="card card-me border-me">
          <div className="body">

            <div className="row clearfix">
                <div className="col-sm-12">
                    <div className="panel-group full-body" id="accordion_19" role="tablist" aria-multiselectable="true">

                      <div className="panel">
                        <div className="panel-heading" role="tab" id="headingOne_19">
                          <h4 className="panel-title"><a role="button" data-toggle="collapse" href="#collapseOne_19" aria-expanded="true" aria-controls="collapseOne_19">
                            Connections
                            <span className="bs-caret right"><span className="caret"></span></span>
                          </a></h4>
                        </div>
                        <div id="collapseOne_19" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_19">
                            <div className="panel-body">
                              <div className="col-sm-12 no-padding">
                                <ul className="list-group">
                                    <li className="list-group-item clearfix no-border-bottom">
                                        <NavLink to="/settings/email">Email </NavLink>
                                    </li>
                                    <li className="list-group-item clearfix">
                                        <NavLink to="/settings/calendar">Calendar </NavLink>
                                    </li>
                                </ul>
                              </div>
                            </div>
                        </div>
                      </div>

                      <div className="panel">
                          <div className="panel-heading" role="tab" id="headingTwo_19">
                            <h4 className="panel-title"><a className="collapsed" role="button" data-toggle="collapse" href="#collapseTwo_19" aria-expanded="true" aria-controls="collapseTwo_19">
                              Team
                              <span className="bs-caret right"><span className="caret"></span></span>
                            </a></h4>
                          </div>
                          <div id="collapseTwo_19" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo_19">
                            <div className="panel-body">
                              <div className="col-sm-12 no-padding">
                                  <ul className="list-group">
                                      <li className="list-group-item clearfix">
                                          <NavLink to="/settings/team">User Permission </NavLink>
                                      </li>
                                  </ul>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" role="tab" id="headingThree_19">
                          <h4 className="panel-title"><a className="collapsed" role="button" data-toggle="collapse" href="#collapseThree_19" aria-expanded="true" aria-controls="collapseThree_19">
                            Account
                            <span className="bs-caret right"><span className="caret"></span></span>
                          </a></h4>
                        </div>
                        <div id="collapseThree_19" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree_19">
                          <div className="panel-body">
                            <div className="col-sm-12 no-padding">
                                <ul className="list-group">
                                    <li className="list-group-item clearfix">
                                        <NavLink to="/settings/profile_billing">Profile & Billing </NavLink>
                                    </li>
                                </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    );
	}
}

export default RightNav;