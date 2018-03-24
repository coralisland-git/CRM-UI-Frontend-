import React from 'react';
import InputBox from '../../components/inputbox';
import ConfirmBox from '../../components/confirmbox';
import { NavLink } from 'react-router-dom';
import './index.scss';
import {connect} from 'react-redux';
import CreateCircle from './createcircle';
import DeleteCircle from './deletecircle';
import CustomConfirmAlert, { confirmAlert } from '../../components/confirmdialog';
import {getCircles, createCircles, deleteCircles, updateCircles} from '../../services/actions/circles';

const mapDispatchToProps = (dispatch) => {
    return ({
        getCircles: () => {getCircles(dispatch); },
        createCircles: (params) => {createCircles(params, dispatch);},
        updateCircles: (params) => {updateCircles(params, dispatch);},
        deleteCircles: (params) => {deleteCircles(params, dispatch);},
    });
}

const mapStateToProps = (state) => {
    return ({ 
        circles: state.circles.circles,
        curState : state.circles.curState,
        user: state.auth.user
    });
}

class Circles extends React.Component {

    constructor() {
        super();
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.validIndex = this.validIndex.bind(this);
        this.state = {
            number : 0,
            circles: [],
            search_key : '',
            def_circle : {
                name : '',
                goal : '',
                color : '',
                reminder_day : 0,
                created_by : ''
            }
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.state.circles != newProps.circles) {
            this.setState({circles: newProps.circles});
        }
        if(newProps.user) {
            this.setState({
            name : '',
            goal : '',
            color : '',
            reminder_day : 0,
            created_by : newProps.user.id
        });
        }
    }

    componentWillMount(){
        this.props.getCircles()
    }

    create(circle) {
        this.props.createCircles(circle);
        confirmAlert({
            toastContent: "success",
            message: "The circle is created successfully.",
            outerClick : true
        });
    }

    delete(circle) {
        this.props.deleteCircles(circle);  
        confirmAlert({
            toastContent: "success",
            message: "The circle is deleted successfully.",
            outerClick : true
        });
    }

    update(circle) {
        this.props.updateCircles(circle);
        confirmAlert({
            toastContent: "success",
            message: "The circle is updated successfully.",
            outerClick : true
        });
    }

    validIndex(i) {
        if ( i %2 == 0) return true;
            return false;
    }

    

    render() {

        self = this;

        function showTitle(circle){
            if (circle.name) {
                let data = circle.name.split(' ')
                if (data.length >= 2)
                    { return circle.name.split(' ')[0].slice(0,1).toUpperCase() + circle.name.split(' ')[1].slice(0,1).toUpperCase();}
                    else {
                        return circle.name.split(' ')[0].slice(0,1).toUpperCase();
                    }
                }
            }

        let circle_list = [];
        for (let i=0;i<this.state.circles.length; i++) {
            if ( this.state.search_key && this.state.search_key !== "" ) {
                 if (this.state.circles[i].name.toLowerCase().indexOf(this.state.search_key.toLowerCase()) > -1){
                    circle_list.push(this.state.circles[i]);
                }
            }
            else {
                circle_list.push(this.state.circles[i]);   
            }
        }
        
        return (
            <div className="container-fluid" id="circles">
                <div id="header">
                    <span className="font-bold h4 pull-left">CIRCLE</span>
                    <CreateCircle type="Add" circle={this.state.def_circle} key="12" number="0" create={this.create}/>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 border">
                    <div className="">
                        <div className="row search-box">
                            <span className="col-xs-12 search">
                                <InputBox placeholder="Search" value={ this.search_key} onChange={ (e) => { this.setState({search_key : e.target.value})}} />
                                <i className="material-icons search_icon">search</i>
                            </span>
                        </div>
                        <div className="body row">
                            <ul className="list-group col-xs-6 col-md-6" >
                                {circle_list.map((circle, i) => 
                                   { return self.validIndex(i) ? <li className="list-group-item" key={i}>
                                        <div className="item row">
                                            <div className="left col-xs-7">
                                                <NavLink to={`/newleads/${circle.id}`}><label className="font-bold h5 mark col-xs-1" style={{backgroundColor: circle.color}}><h4>{ showTitle(circle)  }</h4></label></NavLink>
                                                 <span className="title">
                                                    <NavLink to={`/newleads/${circle.id}`}><h4>{circle.name}</h4>
                                                    <span className="testing" style={{ color : "#888"}}>{ circle.goal && circle.goal.length > 20? circle.goal.slice(0,20)+"..." : circle.goal}</span></NavLink>
                                                </span>
                                            </div>
                                            <div className="tools col-xs-5">
                                                <span className="h4 reminder">Reminder: {circle.reminder_day} days</span> 
                                                <CreateCircle number={circle.id} key={circle.id} circle={circle} type="Edit" update={this.update}/>
                                                <i className="fa fa-trash" style={{ marginLeft : "10px"}} data-toggle="modal" data-target="#Delete" onClick={() => { this.setState({ delc : circle})}} ></i>
                                            </div>
                                        </div>
                                    </li>
                                    : ""
                                    }
                                )}
                            </ul>
                            <ul className="list-group col-xs-6 col-md-6" >
                                {circle_list.map((circle, i) => 
                                   { return !self.validIndex(i) ? <li className="list-group-item" key={i}>
                                        <div className="item row">
                                            <div className="left col-xs-7">
                                                <NavLink to={`/newleads/${circle.id}`}><label className="font-bold h5 mark col-xs-1" style={{backgroundColor: circle.color}}><h4>{ showTitle(circle)  }</h4></label></NavLink>
                                                 <span className="title">
                                                    <NavLink to={`/newleads/${circle.id}`}><h4>{circle.name}</h4>
                                                    <span className="testing" style={{ color : "#888"}}>{ circle.goal && circle.goal.length > 20? circle.goal.slice(0,20)+"..." : circle.goal}</span></NavLink>
                                                </span>
                                            </div>
                                            <div className="tools col-xs-5">
                                                <span className="h4 reminder">Reminder: {circle.reminder_day} days</span> 
                                                <CreateCircle number={circle.id} key={circle.id} circle={circle} type="Edit" update={this.update}/>
                                                <i className="fa fa-trash" style={{ marginLeft : "10px"}} data-toggle="modal" data-target="#Delete" onClick={() => { this.setState({ delc : circle})}} ></i>
                                            </div>
                                        </div>
                                    </li>
                                    : ""
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
             <div className="modal fade" id="Delete" tabIndex="-1" role="dialog"  >
                      <div className="modal-dialog" role="document">
                          <div className="modal-content">
                              <div className="header">
                                  <i className="material-icons pull-right" data-dismiss="modal">close</i>
                                  <span className="modal-title  font-bold h4" id="defaultModalLabel">Delete Circle</span>
                              </div>
                              <div className="del-confirm"> 
                                  <span className="h5">Are you sure want to delete this Circle?</span>
                              </div>
                              <div className="footer">
                                  <div className="row">
                                      <span className="col-xs-5"></span>
                                      <button className="btn btn-md btn-raised waves-effect" data-dismiss="modal" style={{backgroundColor : "#FFC107", color: "white"}} onClick={() => { this.delete(this.state.delc) }}>Delete</button>
                                      <button className="btn btn-default btn-md btn-raised waves-effect m-l-10 " data-dismiss="modal">Cancel</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>  
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Circles);