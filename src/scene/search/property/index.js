import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import image from '../../../styles/assets/images/puppy-1.jpg';

class SearchProperty extends React.Component {
	constructor(props) {
		super(props);
	}

	gotoDetail = (property) => {
		this.props.parent.history.push('/property/' + property.mlsId);
	}

	render () {

		let properties = [];
		let temp_properties = this.props.parent.properties.searchResults || [];
		let key = this.props.query;

		if (temp_properties.length > 3) {
			properties = temp_properties.slice(0, 3);
		} else {
			properties = temp_properties;
		}

		return (
			<div className="col-sm-12 no-padding">
				<label className="heading-profile">PROPERTIES</label><br/>
				{
					properties.length == 0
					? <div className="row padding-bottom"><div className="col-sm-12">No Properties</div></div>
					: <div className="row padding-bottom">
							{
								properties.map((property, i) => {
									return (
										<div className="col-sm-4" key={i} onClick={()=> this.gotoDetail(property)}>
											<div className="card card-me pointer-cursor">
												<div className="body clearfix">
													<div>
														<img src={ property.photos[0] } className="property_img" />
													</div>
													<div className="col-sm-12">
														<table className="table">
																<tr>
																	<th className="half-content"></th>
																	<th className="half-content"></th>
																</tr>
																<tr>
																	<td>MLS</td>
																	<td className="font-bold">{ property.mlsId || "No available" }</td>
																</tr>
																<tr>
																	<td>Status</td>
																	<td className="font-bold">{ property.mls.status || "No available" }</td>
																</tr>
																<tr>
																	<td>Address</td>
																	<td className="font-bold">{ property.address.full || "No available" }</td>
																</tr>
																<tr>
																	<td>City</td>
																	<td className="font-bold">{ property.address.city || "No available" }</td>
																</tr>
																<tr>
																	<td>Price</td>
																	<td className="font-bold">$ { property.listPrice || "No available" }</td>
																</tr>
																<tr>
																	<td>Bedrooms</td>
																	<td className="font-bold">{ property.property.bedrooms || "No available" }</td>
																</tr>
																<tr>
																	<td>Bathrooms</td>
																	<td className="font-bold">{ property.property.bathrooms || "No available" }</td>
																</tr>
																<tr>
																	<td>Sq Ft</td>
																	<td className="font-bold">{ property.property.area || "No available" }</td>
																</tr>
																<tr>
																	<td>Role</td>
																	<td className="font-bold">Seller</td>
																</tr>
														</table>
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


export default SearchProperty;