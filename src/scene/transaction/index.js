import React from 'react';
import './index.scss';
import background from '../../styles/assets/images/transactions.png';


class Transaction extends React.Component {

    constructor() {
        super();
    }

    render() {
        
        return (
            <div id="transaction" className="container-fluid">
                <div className="">
                    <img src={background} />
                        <div className="desc">
                            <div className="comming font-bold">
                                Transaction Coming soon!
                            </div>
                            <div className="contact">
                                Questions? Contact us at <a href="mailto:info@agentcloud.com?" >info@agentcloud.com</a>
                            </div>
                        </div>
                </div>
            </div>    
        )
    }

}

export default Transaction;