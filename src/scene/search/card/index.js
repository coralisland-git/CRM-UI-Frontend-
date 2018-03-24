import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import image from '../../../styles/assets/images/card.PNG';

class SearchTemplate extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		
		let cards = [];
		let temp_cards = this.props.parent.templates || [];
		let key = this.props.query;

		temp_cards.forEach((card, i) => {
			let cnt = 0;
			if (card.name) {
				if (card.name.indexOf(key) > -1)
					cnt += 1;
			}
			if (cnt > 0) cards.push(card);
		});

		if (cards.length > 3) {
			cards = cards.slice(0, 3);
		}

		return (
			<div className="col-sm-12 no-padding">
				<label className="heading-profile">OTHERS</label><br/>
				
				{
					cards.length == 0
					? <div className="row padding-bottom"><div className="col-sm-12">No Templates</div></div>
					: <div className="row padding-bottom">
							{
								cards.map((card, i) => {
									return (
										<div className="col-sm-4" key={ i }>
											<div className="card card-me pointer-cursor">
												<div className="body clearfix">
													<div className="row">
														<div className="col-sm-12">
															<label>{ card.name }</label>
														</div>
														<div className="col-sm-12 no-padding">
															<img src={ image } className="col-sm-12" />
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
				}

			</div>
		);
	}

}


export default SearchTemplate;