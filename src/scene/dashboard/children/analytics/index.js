import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../services/actions/analytics';

import './style.scss';

import '../../../../styles/assets/plugins/chartjs/Chart.bundle.min.js';


class Analytics extends React.Component {

    constructor(props) {
        super(props);

        let to_date = moment().format('YYYY-MM-DD');
        let from_date = moment().subtract(6, 'days').format('YYYY-MM-DD')
        props.actions.getData(from_date, to_date);
        this.chart = null;
    }

    componentWillReceiveProps(nextProps) {

        if(!this.chart) return;

        let data_array_1 = nextProps['lead'];
        let data_array_2 = nextProps['contact'];
        let labels = [];
        let from_date = moment(nextProps.from_date);
        for(let i = 0; i < nextProps['lead'].length; i ++) {
            labels.push(from_date.format('MM-DD-YYYY'));
            from_date.add(1, 'days');
        }
        let data = {
            labels: labels,
            datasets: [{
                label: "Lead Create",
                data: data_array_1,
                borderColor: 'rgba(108, 188, 212, 0.75)',
                backgroundColor: 'rgba(0, 188, 212, 0.3)',
                pointBorderColor: 'rgba(0, 188, 255, 0)',
                pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                pointBorderWidth: 1
            }, {
                label: "Contact Create",
                data: data_array_2,
                borderColor: 'rgba(108, 213, 188, 0.75)',
                backgroundColor: 'rgba(89, 213, 188, 0.3)',
                pointBorderColor: 'rgba(89, 255, 188, 0)',
                pointBackgroundColor: 'rgba(89, 213, 170, 0.9)',
                pointBorderWidth: 1
            }]
        };

        this.chart.data.labels = data.labels;
        this.chart.data.datasets = data.datasets;

        this.chart.update();
    }

    componentDidMount() {
        let data_array_1 = [0,0,0,0,0,0,0];
        let data_array_2 = [0,0,0,0,0,0,0];
        let config = {
            type: 'line',
            data: {
                labels: ["2015", "", "2016", "", "2017", "", "2018"],
                datasets: [{
                    label: "My First dataset",
                    data: data_array_1,
                }, {
                    label: "My Second dataset",
                    data: data_array_2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "#ccc",
                            beginAtZero:true
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "#ccc"
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                }
            }
        };
        this.chart = new Chart(document.getElementById("analyticschart"), config);
    }

    render() {
        return (
            <div className="analytics text-center">
                <h4> Daily Leads & Contacts</h4>
                <canvas id="analyticschart"> </canvas>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return ({
        actions: bindActionCreators(actions, dispatch)
    });
}

const mapStateToProps = (state) => {
    return ({ 
        lead: state.analytics.lead,
        contact: state.analytics.contact
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);

// export default Analytics;