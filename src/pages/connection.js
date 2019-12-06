import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/userService';

class Connection extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            mail: null,
            pwd: null,
            connectionError: null
        }
    }
	
    componentWillMount(){
            console.log("Component will mount");
    }
	
    async connection(e)
    {
        e.preventDefault();
        this.state.connectionError = null;
        let response = await UserService.connection(this.state);
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            if(data.myUser !== null)
            {
                //JSON WEB TOKEN
                console.log("Connected");
                localStorage.setItem('myUserId', data.myUser._id);
                localStorage.setItem('myUserMail', data.myUser.mail);
                localStorage.setItem('myUserName', data.myUser.name);
                localStorage.setItem('myUserSurname', data.myUser.surname);
                localStorage.setItem('myUserType', data.myUser.type);
                this.props.history.push('/');
            }
            else
            {
                console.log("Wrong credentials");
                this.state.connectionError = data.message;
            }
        }	
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
    
    render(){
        return (
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h2 className="logo-name">M+</h2>
                    </div>
                    {this.state.connectionError}
                    <h3>Bienvenue sur le Market</h3>
                    <form className="m-t">
                        <div className="form-group">
                            <input type="email" className="form-control" id="mail" placeholder="Username" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="pwd" placeholder="Password" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <button onClick={(e) => this.connection(e)} className="btn btn-primary block full-width m-b">Login</button>
                        <p className="text-muted text-center"><small>Do not have an account?</small></p>
                        <Link className="btn btn-sm btn-white btn-block" to="/register">Create an account</Link>
                    </form>
                </div>
            </div>
        )
    }
	
}
//<i className="fas fa-shopping-cart"></i>
export default Connection;