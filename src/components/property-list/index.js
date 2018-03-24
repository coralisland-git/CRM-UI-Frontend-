import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import * as propertyAction from '../../services/actions/properties';
import House from '../../styles/assets/images/house.jpg';


class PropertyListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data || [],
            pageNum : 1,
            countPerPage : 8,
            startIndex : 0,
            endIndex : 8,
            isSearch: false
        }

        this.getDataBySearch = this.getDataBySearch.bind(this);
        this.sortData = this.sortData.bind(this);
        this.getDataByPageNum = this.getDataByPageNum.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
      setTimeout(() => {
        $("select").selectpicker();
      }, 100);
    }

    componentDidUpdate() {
        setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
            if($('.selectpicker').length == 0)
                $("select").selectpicker();
        }, 100);
    }

    buildQuery() {
        let query = '';
        let q = '';
        
        if ($("#type").val()) {
            query += 'type=' + $("#type").val() + '&';
        }

        if ($("#subType").val()) {
            query += 'subtype=' + $("#subType").val() + '&';
        }

        if ($("#city").val()) {
            q += $("#city").val() + ' '
        }

        if ($("#state").val()) {
            q += $("#state").val() + '&'
        }
        
        if ($("#bedroom").val()) {
            query += 'minbeds=' + $("#bedroom").val() + '&';
        }
        if ($("#bathroom").val()) {
            query += 'minbaths=' + $("#bathroom").val() + '&';
        }
        if ($("#arearange").val()) {
            query += 'minarea=' + (parseInt($("#arearange").val()) - 1000);
            query += 'maxarea=' + (parseInt($("#arearange").val()) + 1000) + '&';
        }

        if ($("#pricerange").val()) {
            query += 'minprice=' + (parseInt($("#pricerange").val()) - 100000);
            query += 'maxprice=' + (parseInt($("#pricerange").val()) + 100000) + '&';
        }

        let mls = $("#mlsid").val()
        if(mls && mls.length == 0)
            mls = null;

        const params = '&' + q + query.slice(0, query.length-1) + '&limit=' + this.state.countPerPage;;

        return [params, mls];
    }

    getDataBySearch() {
        let self = this;
        let output = [];
        let data = this.props.state.property.properties;

        const [params, mls] = this.buildQuery();
        this.params = params;
        this.setState({
            isLoading: true, 
            params: params, 
            isSearch: true,
            mls: mls
        });
        this.props.propertyAction.getProperties(params, 'aW5mb18zOTFhMjU4cjo5OTExNDA0ODNxZDYyNTI2', mls).then((res) => {
            self.setState({
                isLoading: false,
                pageNum: 1
            });
        })
        
    }

    sortData(param, data) {

        switch(param) {
            case 1:
                data.sort();
                break;
            case 2:
                data.sort((a ,b) => {return b.listPrice - a.listPrice});
                break;
            case 3:
                data.sort((a ,b) => {return a.listDate - b.listDate});
                break;
            case 4:
                data.sort((a ,b) => {return b.listDate - a.listDate})
                break;
            default:
                data = this.props.data;
        }

        this.setState({data: data});
    }

    showData(data, startIndex, endIndex) {
        let output = [];
        
        if (data) {
            data.forEach((element, key) => {
                const imageUrl = "url('" + (element.photos[0] || House) + "') center center / cover no-repeat";
                let a = element.photos;
                let price = '$' + element['listPrice'].toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,');
                let classVal = 'property-label label ';
                
                if (element['sales']) {
                    if (element['sales']['closePrice'])
                    {
                        price += '$' + element['sales']['closePrice'].toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,');
                    }
                }

                output.push(
                    <div className="property-card custom-card m-b-15 m-l-25" 
                        key={key} 
                        onClick={() => this.gotoDetail(element)}>
                        <a href="#/property/detail">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="property-image" style={{ background: imageUrl}}>
                                    <span className={ element.property.type == 'RNT' ? classVal + 'for-rent' : classVal + 'for-sales' }>
                                        {element.property.type == 'RNT' ? 'for rent' : 'for sales'}
                                    </span>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="property-content">
                                        <div className="listingInfo">
                                            <div className="">
                                                <h4 className="text-success m-t-0">{price}</h4>
                                                <h4 className="m-t-0 blue-grey">
                                                    {element.address.full}
                                                </h4>
                                            </div>
                                            <div className="detail">
                                                <p className="text-muted summary-info">
                                                    <i className="zmdi zmdi-pin m-r-5"></i>
                                                    {element.address.streetName + ', ' + element.address.city + ', ' + element.address.state + ' ' + element.address.postalCode}
                                                </p>
                                                <p className="text-muted m-b-0 list-summary-info">
                                                    {element.remarks}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="property-action custom-action m-t-15">
                                            <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard"></i><span>280</span></a>
                                            <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel"></i><span>{element.property.bedrooms}</span></a>
                                            <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi"></i><span>2</span></a>
                                            <a href="#" title="Garages"><i className="zmdi zmdi-home"></i><span> 24H</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                )
                
            });
        }

        return output;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: false });
    }

    componentDidMount() {
        const [params, mls] = this.buildQuery();
        this.setState({
            params: params,
            mls: mls
        })
    }

    getDataByPageNum(pageNum) {
        let properties;
        if (this.props.state) {
            properties = this.props.state.property.properties;
        } else {
            properties = this.props.data.properties;
        }

        const _tmp = Math.floor(pageNum / 10);
        // if (pageNum <= this.state.max && pageNum >= this.state.min) {
        //     let start;
        //     if (_tmp == 0) {
        //         start = ((pageNum - 1) % 10) * this.state.countPerPage;
        //     } else {
        //         start = ((pageNum - 1) % (10 * _tmp))  * this.state.countPerPage;
        //     }
        //     const end = start + this.state.countPerPage;
        //     if (end < properties.length) {
        //         this.setState({startIndex : start, endIndex : end, pageNum: pageNum});
        //     }
        // } else {
            // const min = Math.floor(pageNum / 10) * 10;
            // const max = min + 10;
            const param = this.state.params + '&offset=' + (pageNum * this.state.countPerPage) + '&limit=' + this.state.countPerPage;
            // this.setState({ isLoading: true, min: min, max: max})
            this.setState({ isLoading: true, pageNum: pageNum })
                this.props.propertyAction.getProperties(param, 'aW5mb18zOTFhMjU4cjo5OTExNDA0ODNxZDYyNTI2').then((res) => {
            })
            
        // }
        
    }

    handlePageClick(i) {
        this.getDataByPageNum(i['selected']);
    }

    gotoDetail(property) {
        this.props.propertyAction.setActiveProperty(property, {
            'type': $("#type").val(),
            'subType': $("#subType").val(),
            'city': $("#city").val(),
            'state': $("#state").val(),
            'bedroom': $("#bedroom").val(),
            'bathroom': $("#bathroom").val(),
            'arearange': $("#arearange").val(),
            'pricerange': $("#pricerange").val(),
            'curPage': this.state.pageNum,
            'viewMode': 1
        });
    }

    render() {
        let data = this.props.data;
        let showData = [];
        let totalPage;
        const { searchResults ,totalSearchCount, properties, totalCount } = this.props.state.property            
        if (this.isSearch) {
            data = searchResults;
            showData = this.showData(searchResults, this.state.startIndex, this.state.endIndex);
            totalPage = totalSearchCount / 4;
        } else {
            data = properties;
            showData = this.showData(properties, this.state.startIndex, this.state.endIndex);
            totalPage = totalCount / 4;
        }

        if(this.state.isLoading) {
            $("#spinner").css('display', 'block');
        } else {
            $("#spinner").css('display', 'none');
        }

        this.paginator = <ReactPaginate previousLabel={"chevron_left"}
            nextLabel={"chevron_right"}
            previousClassName="material-icons"
            nextClassName="material-icons"
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={totalPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            forcePage={this.state.isSearch ? 0: this.props.state.property.pageState.curPage || 0} />

        return (
            <div className="container-fluid" id="property">
                <div className="block-header">
                    <h2 style={{ paddingTop: "8px" }}>Property List</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-3 col-md-3 col-xs-12">
                        <div className="card">
                            <div className="header m-t-25">
                                <h2>Search</h2>
                            </div>
                            <div className="body">
                                <div className="row clearfix">
                                <div className="col-xs-12">
                                        <div className="form-group drop-custum">
                                            <select className="form-control show-tick" id="type">
                                                <option value="">-- Select --</option>
                                                <option value="">Any Type</option>
                                                <option value="residential">Residential</option>
                                                <option value="rental">Rental</option>
                                                <option value="condominium">Condominium</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="land">Land</option>
                                                <option value="farm">Farm</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group drop-custum">
                                            <select className="form-control show-tick" id="subType">
                                                <option value="">Any Type</option>
                                                <option value="apartment">Apartment</option>
                                                <option value="boatslip">Boatslip</option>
                                                <option value="singlefamilyresidence">Singlefamilyresidence</option>
                                                <option value="townhouse">Townhouse</option>
                                                <option value="condominium">Condominium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group drop-custum">
                                            <select className="form-control show-tick" id="state">
                                                <option value="">-- All States --</option>
                                                <option value="Alaska">Alaska</option>
                                                <option value="California">California</option>
                                                <option value="Colorado">Colorado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group drop-custum">
                                            <select className="form-control show-tick" id="city">
                                                <option value="">-- All Cities --</option>
                                                <option value="New York">New York</option>
                                                <option value="Los Angele">Los Angeles</option>
                                                <option value="Chicago">Chicago</option>
                                                <option value="Houston">Houston</option>
                                                <option value="20">Phoenix</option>
                                                <option value="20">San Antonio</option>
                                                <option value="20">Queens</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" className="form-control" placeholder="MLS#" id="mlsid" defaultValue={this.props.state.property.pageState.mlsid || ''} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group drop-custum">
                                            <select className="form-control show-tick" id="bedroom">
                                                <option value="">-- Beds --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group drop-custum">
                                            <select className="form-control show-tick" id="bathroom">
                                                <option value="">-- Baths --</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" className="form-control" placeholder="Area Range" id="arearange" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" className="form-control" placeholder="Price Range" id="pricerange" />
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="col-sm-6">
                                        <button type="button" className="btn btn-raised search-button waves-effect" onClick={() => this.getDataBySearch()}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-xs-12">
                        <div className="card property">
                            <div className="header flex-box custom-list-header">
                                <h4>Search Results  &nbsp; ( {totalCount} ) </h4>
                                <div className="flex-blank"></div>
                                <div className="flex-box">
                                    <div className="btn-group custom-group mr-10">
                                        <button type="button" className="btn btn-default waves-effect">FILTER</button>
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:void(0);" onClick={() => this.sortData(1, data)}>Default Order</a></li>
                                            <li><a href="javascript:void(0);" onClick={() => this.sortData(2, data)}>Price High to Low</a></li>
                                            <li><a href="javascript:void(0);" onClick={() => this.sortData(3, data)}>Newest Properties</a></li>
                                            <li><a href="javascript:void(0);" onClick={() => this.sortData(4, data)}>Oldest Properties</a></li>
                                        </ul>
                                    </div>
                                    <div className="btn-group custom-group">
                                        <button type="button" className="btn btn-default waves-effect">VIEW</button>
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="caret"></span> <span className="sr-only">Toggle Dropdown</span> </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:void(0);" onClick={() =>this.props.changeView(1)}>List</a></li>
                                            <li><a href="javascript:void(0);" onClick={() => this.props.changeView(2)}>Columns</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.isLoading ? 
                                    <div className="overlayed"></div>
                                : ''
                            }
                            <div className="body">
                                {
                                    showData.length > 0 ? 
                                        showData
                                    :
                                        <h2>No Data</h2>
                                 }
                            </div>
                            <div className="folio-wrapper">
                                {this.paginator}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyListComponent.propTypes = {
    changeView: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return { propertyAction: bindActionCreators(propertyAction, dispatch) }
  }
  
  const mapStateToProps = (state) => {
    return ({ state: state });
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PropertyListComponent);