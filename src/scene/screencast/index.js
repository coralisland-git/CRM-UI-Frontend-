import React from 'react';
import './index.scss';
import background from '../../styles/assets/images/screencast.png';


class Screencast extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <section id="screencast" className="container-fluid">
                <div className="">
                    <img src={background} />
                        <div className="desc">
                            <div className="comming font-bold">
                                Screencast Coming soon!
                            </div>
                            <div className="contact">
                                Questions? Contact us at <a href="mailto:info@agentcloud.com?" >info@agentcloud.com</a>
                            </div>
                        </div>
                </div>
            </section>    
        )
    }

}

export default Screencast;