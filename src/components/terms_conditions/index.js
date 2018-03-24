import React from 'react';

import './style.scss';

class TermsConditions extends React.Component {

	componentDidMount() {
		$("#terms_conditions").modal({
		});
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function() {
		    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	}

	render() {
		return(
			<div className="modal in fade" id="terms_conditions" role="dialog">
			    <div className="modal-dialog modal-lg" role="document">
		            <div className="modal-content">
		                <div className="modal-header">
		                  <h5 className="modal-title text-capitalize">Terms of Use</h5>
		                  <button aria-label="Close" className="close" data-dismiss="modal" type="button">
		                    <span aria-hidden="true">×</span>
		                  </button>
		                </div>
						<div className="modal-body flex-direction-column">
							<p className="font-weight-bold mb-4">Hello  </p>

							<p className="mb-4"></p>
							<p className="mb-4">We’re thrilled to have you partake in Agent Cloud’s exclusive Beta Test program. While we’re committed to making
							continuous improvements to the platform, we hope you understand that this technology is newly launched, and you
							will experience bugs.</p>

							<p className="mb-4"></p>
							<p className="mb-4">While the Agent Cloud platform operates like a fully-functioning home, our team is silently working in the background
							to make sure everything runs smoothly. Please expect to see updates to the site daily. If you notice anything out
							of order, report it directly to
							<a href="mailto:support@agentcloud.com">support@agentcloud.com</a> or message us via our in-app chat feature. We use this information to make necessary
							maintenance fixes and keep your experience enjoyable and consistent.</p>

							<p className="mb-4"></p>
							<p className="mb-4">As Beta Testers, you are given first-rights access to an evolving platform and understand that you will experience
							bugs in the system. All Agent Cloud property is copyrighted, and information learned and used on the Agent Cloud
							platform should be kept confidential.</p>

							<p className="mb-4"></p>
							<p className="mb-4">Thank you for your participation.</p>
						</div>

						<div className="modal-footer">
							<button className="text-uppercase btn btn-warning btn-raised btn-ok col-3 waves-effect" data-dismiss="modal">
								<span className="mat-button-wrapper">Accept Terms</span>
							</button>
							<button className="text-uppercase btn btn-warn btn-raised btn-cancel col-3 waves-effect" data-dismiss="modal">
								<span className="mat-button-wrapper">Decline</span>
							</button>
						</div>
			        </div>
			    </div>
			</div>
		);
	}
}

export default TermsConditions;
