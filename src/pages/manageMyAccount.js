import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/userService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class ManageMyAcount extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            type: null,
            mail: "",
            name: "",
            surname: "",
            city: [],
            adress: "",
            msg: null
        }
    }
	
    async componentDidMount(){
        let response = await UserService.details(localStorage.getItem('myUserId'));
        if(response.ok)
        {
            let data = await response.json();
            this.setState(data.myUser);
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    } 
    
    async editUser()
    {
        delete this.state.msg;
        let response = await UserService.update(localStorage.getItem('myUserId'), this.state);
        if(response.ok)
        {
            this.setState({msg: 'Update sucessfull'});
        }
        else
        {
            this.setState({msg: 'Update failed'});
        }
    }
		
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Detail utilisateur", path: "/user/myAccount"}]}/>
                <div class="wrapper wrapper-content animated fadeInRight ecommerce">

                    <div class="row">
                        <div class="col-lg-8 col-md-offset-2">
                            <div>
                                <ul class="nav navbar-top-links">
                                    <li><Link to="/user/myAccount" class="nav-link active" ><strong>Mon compte</strong></Link></li>
                                    <li><Link to="/user/myOrders" class="nav-link" >mes commandes</Link></li>
                                    <li><Link to="/user/cart" class="nav-link" >Mon panier</Link></li>
                                </ul>
                            </div>
                            <div class="">
                                <div class="col-lg-12">
                                    <div class="ibox product-detail">
                                        <div class="ibox-content">
                                            <div class="row wrapper wrapper-content">
                                                <form className="from-control" >
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Email :</label>
                                                        <div class="col-sm-10"><input type="text" id="mail" class="form-control" value={this.state.mail} onChange={(e) => this.handleChange(e)} required/></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Name :</label>
                                                        <div class="col-sm-10"><input type="text" id="name" class="form-control" value={this.state.name} onChange={(e) => this.handleChange(e)} /></div>
                                                    </div> 
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Surname :</label>
                                                        <div class="col-sm-10"><input type="text" id="surname" class="form-control" value={this.state.surname} onChange={(e) => this.handleChange(e)} /></div>
                                                    </div>
                                                    <div class="form-group row"><label class="col-sm-2 col-form-label">Adress :</label>
                                                        <div class="col-sm-10"><textarea class="form-control" id="adress" value={this.state.adress} onChange={(e) => this.handleChange(e)} ></textarea></div>
                                                    </div>
                                                    
                                                </form>
                                                <button className="btn btn-primary col-sm-1 col-md-offset-6" onClick={() => this.editUser()}>Modifier</button>
                                            </div>
                                            {this.state.msg ? <div className='col-lg-3 col-md-offset-5 text-center bg-primary'>{this.state.msg}</div> : null }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ManageMyAcount;