import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropertyColoumComponent from '../../components/property-coloum';
import PropertyListComponent from '../../components/property-list';
import * as propertyAction from '../../services/actions/properties';
import './index.scss';

class Property extends React.Component {
    constructor() {
        super();

        this.state = {
            viewMode: 2
        }

        this.internal_update = false;
        this.changeView = this.changeView.bind(this);
    }

    changeView(mode) {
        this.setState({ viewMode: mode });
        this.internal_update = true;
        this.props.propertyAction.setPropertyPageState({viewMode: mode});
    }

    componentDidMount() {
        setTimeout(() => {
            $("select").selectpicker();
        }, 500);
    }

    componentDidUpdate() {
        setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
        }, 500);
    }

    render() {
        let viewMode = this.internal_update? this.state.viewMode: this.props.state.property.pageState.viewMode || this.state.viewMode;
        let { properties, totalCount } = this.props.state.property;

        return (
            <div className="featured_overlay" id="property">
                {/* <div className="overlayed"></div>
                <div className="my-modal" id="">
                    <div className="modal__content">
                        <span> Feature coming soon! </span>
                    </div>
                </div> */}
            {
                viewMode == 1 ?
                    <PropertyListComponent changeView={this.changeView} data={properties} totalCount={totalCount} viewMode={this.state.viewMode} />
                :
                    <PropertyColoumComponent changeView={this.changeView} properties={properties} totalCount={totalCount} viewMode={this.state.viewMode} />
            }
            </div>
        );
    }
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
)(Property);