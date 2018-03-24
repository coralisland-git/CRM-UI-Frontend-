import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";
import "./style.scss";
import back_img from '../../../styles/assets/images/puppy-1.jpg';
import map_img from '../../../styles/assets/images/profile-bg.jpg';


const mapDispatchToProps = (dispatch) => {
    return ({
        
    });
}

const mapStateToProps = (state) => {

    return ({ 
        property: state.property.property
    });
}


class PropertyDetail extends React.Component {

	constructor (props) {
		super(props);

		this.updateMap = this.updateMap.bind(this);
	}

	updateMap() {
		let props = this.props;
		console.log("Did Update", this.props);
		if(props && props.property) {
			var uluru = {lat: props.property.geo.lat, lng: props.property.geo.lng};
			var map = new window.google.maps.Map(document.getElementById('google_map'), {
				zoom: 14,
				center: uluru
			});
		}
	}

	componentDidMount() {
		this.updateMap();
	}

	render() {

		let property = this.props.property;

		if(!property) return <div> Loading ... </div>

		let images = [];
		property.photos.map(item => {
			images.push({
				original: item,
				thumbnail: item
			})
		})

		return (
			<div id="property_detail_page" className="container-fluid" style={{ paddingTop: "15px" }}>
				<div className="col-sm-12  card card-me border-me no-padding padding-top">

					<div className="col-sm-12 padding-bottom">
						<div className="col-sm-4 no-padding">
							<h2 className="heading-me">{property.address.full}</h2>
							<label>{property.address.streetName+' '+property.address.city+' '+property.address.state}</label>
						</div>
						<div className="col-sm-1 no-padding text-center bar-right">
							<h2 className="heading-me">{property.property.bedrooms}</h2>
							<label>Beds</label>
						</div>
						<div className="col-sm-1 no-padding text-center bar-right">
							<h2 className="heading-me">{property.property.bathrooms}</h2>
							<label>Baths</label>
						</div>
						<div className="col-sm-1 no-padding text-center">
							<h2 className="heading-me">${(''+property.listPrice).replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ',')}</h2>
							<label>Property Price</label>
						</div>
						<div className="col-sm-5 no-padding">
							<button type="button" className="btn btn-default btn-raised waves-effect btn-md right margin-me">MAIL</button>
							<button type="button" className="btn btn-default btn-raised waves-effect btn-md right margin-me">SAVE AS PDF</button>
							<button type="button" className="btn btn-success btn-raised waves-effect btn-md right margin-me">PRINT</button>
						</div>
					</div>

					<div id="gallery" className="col-sm-12 no-padding">
						<ImageGallery items={images} />
					</div>

					<div id="google_map" className="col-sm-12 no-padding" style={{ height: "400px" }}>
					</div>

				</div>

				<div className="col-sm-12  card card-me border-me no-padding padding-top">
					<div className="col-sm-12 padding-bottom">
						<div className="col-sm-2 no-padding bar-right">
							<h2 className="heading-me">Contact Agent</h2>
							<label>{ property.coAgent && (property.coAgent.firstName + ' ' + property.coAgent.lastName) || "N/A" }</label>
						</div>
						<div className="col-sm-2 no-padding text-center bar-right">
							<h2 className="heading-me">{property.area || "N/A"}</h2>
							<label>Building/Living Area (Sq.Ft)</label>
						</div>
						<div className="col-sm-2 no-padding text-center bar-right">
							<h2 className="heading-me">{property.logSize || "N/A"}</h2>
							<label>Lot Size (Sq.Ft)</label>
						</div>
						<div className="col-sm-2 no-padding text-center">
							<h2 className="heading-me">{"N/A"}</h2>
							<label>Price per Sq.Ft</label>
						</div>
					</div>
				</div>

				<div className="col-sm-12 card card-me border-me no-padding padding-top">
					<div className="col-sm-12 padding-bottom">
						<h2 className="heading-me">Remark</h2>
						<label>{property.remarks || "N/A"}</label>
					</div>
				</div>

				<div className="col-sm-12 card card-me border-me no-padding padding-top">
					<div className="col-sm-12 padding-bottom">
						<h2 className="heading-me">Private Remark</h2>
						<label>{}</label>
					</div>
				</div>


				<div className="col-sm-12 no-padding">
					<div className="col-sm-12 no-padding padding-bottom table-responsive">
						<table className="table table-bordered m-b-0">
							<tbody>
								<tr>
									<th className="col-sm-3">Structure Info</th>
									<th className="col-sm-2">Land/Parking/Community</th>
									<th className="col-sm-3">Contact Info</th>
									<th className="col-sm-2">Interior Features</th>
									<th className="col-sm-2">Exterior Feature</th>
								</tr>
								<tr>
									<td>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Year Built</label>
											<label className="right strong">{property.property.yearBuilt || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Building # Stories</label>
											<label className="right strong">{property.stroies || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Style</label>
											<label className="right strong">{property.property.style || "N/A"}</label>
										</div>
									</td>
									<td>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Horse Property</label>
											<label className="right strong">No</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Total Parking Spaces</label>
											<label className="right strong">{property.property.parking.space || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">School District</label>
											<label className="right strong">{property.school.district || "N/A"}</label>
										</div>
									</td>
									<td>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Listing Date</label>
											<label className="right strong">{moment(property.listDate).format("MMMM, D, YYYY") || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Listing Price</label>
											<label className="right strong">Contact Agent</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Original Listing Price</label>
											<label className="right strong">Contact Agent</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Change Date/Type</label>
											<label className="right strong">{moment(property.modified).format("MMMM, D, YYYY") || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">CSO</label>
											<label className="right strong">{"N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Listing Type</label>
											<label className="right strong">{property.property.subType || "N/A"}</label>
										</div>
									</td>
									<td>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Equipment/Appliances</label>
											<label className="right strong">N/A</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">AC/Cooling</label>
											<label className="right strong">{property.property.cooling || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Heating</label>
											<label className="right strong">{property.property.heating || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Fireplaces</label>
											<label className="right strong">{property.property.fireplaces || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Room</label>
											<label className="right strong">{(property.property.bathsFull+property.property.bedrooms) || 0}</label>
										</div>
									</td>
									<td>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Spa</label>
											<label className="right strong">N/A</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Pool</label>
											<label className="right strong">{property.property.pool || "N/A"}</label>
										</div>
										<div className="col-sm-12 no-padding padding-bottom">
											<label className="left">Laundry</label>
											<label className="right strong">{property.property.laundryFeatures || "N/A"}</label>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="col-sm-12 no-padding">
					<div className="col-sm-12 no-padding padding-bottom">
						<ul className="list-group">
							<li className="list-group-item clearfix">
								<h2 className="heading-me">PROPERTY HISTORY</h2>
							</li>
							<li className="list-group-item clearfix">
								<div className="row">
									<div className="col-sm-12 padding-bottom">
										<h2 className="heading-me">Property Price</h2>
									</div>
									<div className="col-sm-6 table-responsive bar-right">
										<table id="custom_table" className="table m-b-0 text-center">
											<tbody>
												<tr>
													<th>Date</th>
													<th>Event</th>
													<th>Price</th>
													<th>Price/Sq Ft</th>
													<th>Source</th>
												</tr>
												<tr>
													<td className="no-border-bottom" colSpan="5"> No Historical Data </td>
												</tr>
												{/* <tr>
													<td className="no-border-bottom"><label>11/27/2017</label></td>
													<td className="no-border-bottom"><label>Listed</label></td>
													<td className="no-border-bottom"><label>$6,200,000</label></td>
													<td className="no-border-bottom"><label>$961</label></td>
													<td className="no-border-bottom"><label>San Francisco</label></td>
												</tr>
												<tr>
													<td className="no-border-bottom"><label>11/27/2017</label></td>
													<td className="no-border-bottom"><label>Listed</label></td>
													<td className="no-border-bottom"><label>$6,200,000</label></td>
													<td className="no-border-bottom"><label>$961</label></td>
													<td className="no-border-bottom"><label>San Francisco</label></td>
												</tr> */}
											</tbody>
										</table>
									</div>
									<div className="col-sm-6 table-responsive">
										<table id="custom_table" className="table m-b-0 text-center">
											<tbody>
												<tr>
													<th className="text-center">Year</th>
													<th className="text-center">Taxes</th>
													<th className="text-center">Land</th>
													<th className="text-center"></th>
													<th className="text-center">Additions</th>
													<th className="text-center"></th>
													<th className="text-center">Total Assessment</th>
												</tr>
												<tr>
													<td className="no-border-bottom" colSpan="7"> No Historical Data </td>
												</tr>
												{/* <tr>
													<td className="no-border-bottom"><label>2017</label></td>
													<td className="no-border-bottom"><label>N/A</label></td>
													<td className="no-border-bottom"><label>$900,911</label></td>
													<td className="no-border-bottom"><label>+</label></td>
													<td className="no-border-bottom"><label>$543</label></td>
													<td className="no-border-bottom"><label>=</label></td>
													<td className="no-border-bottom"><label>$1,444,106</label></td>
												</tr>
												<tr>
													<td className="no-border-bottom"><label>2017</label></td>
													<td className="no-border-bottom"><label>N/A</label></td>
													<td className="no-border-bottom"><label>$900,911</label></td>
													<td className="no-border-bottom"><label>+</label></td>
													<td className="no-border-bottom"><label>$543</label></td>
													<td className="no-border-bottom"><label>=</label></td>
													<td className="no-border-bottom"><label>$1,444,106</label></td>
												</tr> */}
											</tbody>
										</table>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="col-sm-12 card card-me border-me no-padding padding-top">
					<div className="col-sm-12 padding-bottom">
						<h2 className="heading-me">About History & Taxes Data</h2>
						<label>Rare opportunity to own one of the most impressive homes in the geted Beverly Park Community.</label>
					</div>
				</div>

			</div>
		);

	}

}


export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);