import React from 'react';
import { NavLink } from 'react-router-dom';


import Pusher from 'react-pusher';
import './style.scss';
const events = {
    'task_overdue': { class:'zmdi zmdi-settings', type: '' },
    'task_completed': { class:'zmdi zmdi-account-add', type: '' }
}
class Alerts extends React.Component {

    componentWillReceiveProps(nextProps) {
    }
    
    handleUpdate(event) {
        this.props.actions.getNotifications();
    }

    handleUpdateToRead(item) {
        this.props.actions.updateNotification(item, {status: 'read'});
    }

    render() {
        let type = this.props.type;
        let results = this.props.notifications.filter((item) => (item.type == type && item.status == 'new'))
        let unreadCount = results.filter((item)=>(item.status=='new')).length

        let channel = 'ac_channel_' + (this.props.user != undefined ? this.props.user.id : '');

        return (
            <li className="dropdown" id="alert"> 
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button">
                    {type == 'notification' ? <i className="zmdi zmdi-notifications"></i>  : <i className="zmdi zmdi-email zmdi-hc-fw"></i>  }
                    {unreadCount ? <span className="label-count" 
                                        style={{background: '#39c3fc',
                                                borderRadius: '50%',
                                                }}>{unreadCount}</span> : null }
                </a>
                <ul className="dropdown-menu" style={{top: 60,right: 15}}>
                    <li className="header" style={{textAlign:'left', padding: '10px 10px', fontSize: 15, height: 40, margin: 0, color: '#616161'}}>{type == 'notification' ? 'NOTIFICATIONS' : 'MESSAGES'} </li>
                    <li className="body" style={results.length > 0 ? {maxHeight: 400, overflowY: 'scroll'} : {}}>
                        <ul className="menu">
                            {results.map(item => (
                                <li 
                                    key={item.id}
                                    style={{background: ((item.status == 'new') ? '#fff' : '#fff'), borderBottom: '1px solid #f4f4f3'}}
                                    onClick={this.handleUpdateToRead.bind(this, item)}> 
                                    <a href="javascript:void(0);" className=" waves-effect waves-block">

                                    <div className="avatar-container">
                                        {
                                        item.avatar.indexOf('//') != -1 ?
                                         <img className="avatar" src={item.avatar}  /> 
                                         : 
                                         <label className="font-bold mark" > {item.avatar.split(' ')[0].slice(0,1).toUpperCase() + (item.avatar.split(' ').length >= 2 ? item.avatar.split(' ')[1].slice(0,1).toUpperCase() : '')}</label>
                                        }
                                    </div>
                                    <div className="menu-info" style={{color: '#b8b8b8'}}   >
                                        <h4>{item ? item.message : '..'}</h4>
                                        <p> <i className="material-icons" style={{top: 0}}>access_time</i><span>{moment(item.created_at).fromNow()} </span></p>
                                    </div>
                                    </a> </li>
                            ))}
                            {results.length == 0 ?
                                <li className="footer" style={{background: '#fff' , borderBottom: '1px solid #f4f4f3'}}> <a href="javascript:void(0);">No {type == 'notification' ? 'NOTIFICATIONS' : 'MESSAGES'}</a> </li>
                                :
                                null
                            }
                        </ul>
                    </li>
                    {this.props.user != undefined ? 
                        <Pusher
                          channel={channel}
                          event={type}
                          onUpdate={this.handleUpdate.bind(this)}
                        />
                        :
                        null
                    }
                </ul>

            </li>
        );
    }

}

export default Alerts;
