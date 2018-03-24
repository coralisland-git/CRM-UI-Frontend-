import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.scss';
import LightBox from '../lightbox';

class SingleProperty extends React.Component {
    constructor(props) {
        super(props);

        this.images = [
            {
              original: 'http://lorempixel.com/1000/600/nature/1/',
              thumbnail: 'http://lorempixel.com/250/150/nature/1/',
            },
            {
              original: 'http://lorempixel.com/1000/600/nature/2/',
              thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
              original: 'http://lorempixel.com/1000/600/nature/3/',
              thumbnail: 'http://lorempixel.com/250/150/nature/3/'
            }
          ]
        this.data = ["http://media.crmls.org/medias/d0a1c7c1-f1b9-4738-9e27-28a626011f36.jpg", "http://media.crmls.org/medias/31dcfc7c-8c69-4cab-8575-414eaa7e03a1.jpg", "http://media.crmls.org/medias/cda213c7-c18e-47d5-917d-b17804e127ec.jpg", "http://media.crmls.org/medias/3f8f7cfd-6663-4fa6-a90d-ac2e84182ca6.jpg", "http://media.crmls.org/medias/d857bab9-9a06-44d7-b595-8b24a0b2f7a6.jpg", "http://media.crmls.org/medias/ddcc4185-5a6a-47e9-b765-e6df23abe31f.jpg", "http://media.crmls.org/medias/cc03ae63-207d-4c35-b018-afd092cf477f.jpg", "http://media.crmls.org/medias/ffe0ac0d-482e-49f5-a869-20992febf85a.jpg", "http://media.crmls.org/medias/2c42b6e8-a741-40d3-ac94-0f200d7c2084.jpg", "http://media.crmls.org/medias/3ee65654-18ed-4846-beb3-ef0858c5268f.jpg", "http://media.crmls.org/medias/d83df1a2-5b73-4e9c-8c9e-5978d852cda5.jpg", "http://media.crmls.org/medias/4dae9354-97d5-475a-a7b3-82c5334301f0.jpg", "http://media.crmls.org/medias/d0e3f8ac-b9d0-4181-886c-8b93b40c12a5.jpg", "http://media.crmls.org/medias/85467999-0ccc-4504-994b-5727f5b6f33b.jpg"]
    }

    render() {
        console.log('Single property: ', this.images)
        return (
            <div className="clearfix" id="singleProperty">
                <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="row item">
                        <div className="col-lg-6 col-md-6 col-xs-12 flex-box m-t-15 left-heading">
                            <div className="table-box m-r-15">
                                <div className="heading">75 BEVERLY PARK</div>
                                <div>Bevely Hills Post Office Los Angelas LA 102</div>
                            </div>
                            <div className="table-box m-r-15 right-border">
                                <div className="heading">8</div>
                                <div>Beds</div>
                            </div>
                            <div className="table-box m-r-15 right-border">
                                <div className="heading">10</div>
                                <div>Baths</div>
                            </div>
                            <div className="table-box m-r-15">
                                <div className="heading">$7,200,000</div>
                                <div>Property Price</div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12 text-right right-heading">
                            <Link to="#" className="btn btn-raised btn-success">Print</Link>
                            <Link to="#" className="btn btn-raised">Save as PDF</Link>
                            <Link to="#" className="btn btn-raised">MAIL</Link>
                        </div>
                    </div>
                    <div className="row item" id="lightBox">
                        <LightBox images={this.data} />
                    </div>
                    <div className="row item" id="googleBox"></div>
                    <div className="row item agent-heading">
                        <div className="agent-heading__item border-right">
                            <div className="heading">Contact Agent</div>
                            <div>Listing Agents Name</div>
                        </div>
                        <div className="agent-heading__item border-right">
                            <div className="heading">20,000</div>
                            <div>Building / Living area (Sq.Ft)</div>
                        </div>
                        <div className="agent-heading__item border-right">
                            <div className="heading">221, 191</div>
                            <div>Lot size (Sq.Ft)</div>
                        </div>
                        <div className="agent-heading__item">
                            <div className="heading">$2,500</div>
                            <div>Price per Sq.Ft</div>
                        </div>
                    </div>
                    <div className="row item">
                        <div>Remark</div>
                        <div>sdffffffffffffffffffsdfdsfffffffffffffffffffffsdfsd</div>
                    </div>
                    <div className="row item">
                        <div>Private Remark</div>
                        <div>sdffffffffffffffffffsdfdsfffffffffffffffffffffsdfsd</div>
                    </div>
                    <div className="row item">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Structure Info</th>
                                    <th>Landing/Parking Community</th>
                                    <th>Contact Info</th>
                                    <th>Interior Features</th>
                                    <th>Exterior Feature</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="flex-box">
                                            <span>Year Built</span>
                                            <span>September 8, 2000</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>Building # stories</span>
                                            <span>N / A</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-box">
                                            <span>House Property</span>
                                            <span>N / A</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>Total Parking Spaces </span>
                                            <span>1</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>School District</span>
                                            <span>N / A</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>School District</span>
                                            <span>N / A</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-box">
                                            <span>School District</span>
                                            <span>N / A</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>Building # stories</span>
                                            <span>N / A</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-box">
                                            <span>Year Built</span>
                                            <span>September 8, 2000</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>Building # stories</span>
                                            <span>N / A</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-box">
                                            <span>Year Built</span>
                                            <span>September 8, 2000</span>
                                        </div>
                                        <div className="flex-box">
                                            <span>Building # stories</span>
                                            <span>N / A</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row item">
                        <div className="">
                            <h4>PROPERTY HISTORY</h4>
                        </div>
                        <div className="row">
                            <div>Property Price</div>
                            <div className="col-md-6 col-xs-12 border-right">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Event</th>
                                            <th>Price</th>
                                            <th>Price/Sq.Ft</th>
                                            <th>Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1/01/2017</td>
                                            <td>Listed</td>
                                            <td>$64,000</td>
                                            <td>$931</td>
                                            <td>San Francisco</td>
                                        </tr>
                                        <tr>
                                            <td>1/01/2017</td>
                                            <td>Listed</td>
                                            <td>$64,000</td>
                                            <td>$931</td>
                                            <td>San Francisco</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6 col-xs-12">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Event</th>
                                            <th>Price</th>
                                            <th>Price/Sq.Ft</th>
                                            <th>Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1/01/2017</td>
                                            <td>Listed</td>
                                            <td>$64,000</td>
                                            <td>+</td>
                                            <td>$931</td>
                                            <td>=</td>
                                            <td>San Francisco</td>
                                        </tr>
                                        <tr>
                                            <td>1/01/2017</td>
                                            <td>Listed</td>
                                            <td>$64,000</td>
                                            <td>+</td>
                                            <td>$931</td>
                                            <td>=</td>
                                            <td>San Francisco</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row item">
                        <div className="heading">About History & Taxes Data</div>
                        <div>The priice is older than i expeceted</div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProperty;