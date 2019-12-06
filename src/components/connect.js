import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Connect extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userId: null,
            userType: null,
            mail: null
        }
    }

    componentDidMount()
    {
        if(typeof localStorage.getItem('myUserId') !== 'undefined')
        {
            this.setState({
                userId: localStorage.getItem('myUserId'),
                userType: localStorage.getItem('myUserType'),
                mail: localStorage.getItem('myUserMail')
            });
        }
    }

    async logout()
    {
        localStorage.clear();
        this.setState({
            userId: null,
            userType: null,
            mail: null
        });
    }

    render()
    {
        return(
            <div className="">
                {this.state.userId ? 
                    <Link title="Se déconnecter" onClick={() => this.logout()}><i className="logout fa fa-sign-out fa-2x"></i></Link>
                    : 
                    <Link to="/connect">
                        <i title="Se connecter" class="logout fa fa-sign-in fa-2x"></i>
                    </Link>
                }
            </div>
        )
    }
}

export default Connect;