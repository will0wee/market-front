import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/userService';

class Register extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            mail: null,
            pwd: null,
            confirmPwd: null,
            name: null,
            surname: null,
            adress: null,
            termsAndPolicy: null
        }
    }
	
    componentWillMount(){
            console.log("Component will mount");
    }
	
    async register(e)
    {
        e.preventDefault();
        this.state.registerError = null;
        if(this.state.pwd === this.state.confirmPwd)
        {
            if(this.state.termsAndPolicy)
            {
                delete this.state.termsAndPolicy;
                delete this.state.confirmPwd;
                this.setState({type: "user"});
                let myUser = await UserService.create(this.state);
                if(myUser.ok)
                {
                    //JSON WEB TOKEN
                    //Connection automatique
                    console.log("Connected");
                    localStorage.setItem('myUserId', myUser._id);
                    localStorage.setItem('myUserMail', myUser.mail);
                    localStorage.setItem('myUserName', myUser.name);
                    localStorage.setItem('myUserSurname', myUser.surname);
                    localStorage.setItem('myUserType', myUser.type);
                    this.props.history.push('/');
                }
            }
            else
            {
                this.state.registerError = "Please accept the terms and policy";
            }
        }
        else
        {
            this.state.registerError = "Passwords don't match";
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    handleChangeCheckBox(e)
    {
        this.setState({[e.target.id] : e.target.checked});
        console.log(this.state);
    }
    
    render(){
        return (
            <div class="middle-box text-center loginscreen   animated fadeInDown">
                <div>
                    <div>
                        <h1 class="logo-name">M+</h1>
                    </div>
                    <h3>S'enregistrer sur le Market</h3>
                    <form class="m-t">
                        <div class="form-group">
                            <input type="email" class="form-control" id="mail" placeholder="Email" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="pwd" placeholder="Password" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="confirmPwd" placeholder="Confirm password" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="name" placeholder="Name" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="surname" placeholder="Surname" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="adress" placeholder="Adress" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <div class="checkbox i-checks"><label><input id="termsAndPolicy" type="checkbox" onChange={(e) => this.handleChangeCheckBox(e)} /><i></i> Agree the terms and policy </label></div>
                        </div>
                        <button onClick={(e) => this.register(e)} class="btn btn-primary block full-width m-b">Register</button>

                        <p class="text-muted text-center"><small>Already have an account?</small></p>
                        <Link class="btn btn-sm btn-white btn-block" to="/connect">Login</Link>
                    </form>
                </div>
            </div>
        )
    }
	
}

export default Register;