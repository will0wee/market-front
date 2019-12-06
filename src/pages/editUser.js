import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/userService';
import CityService from '../services/cityService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class EditUser extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            cityForm: [],
            mail: null,
            name: null,
            surname: null,
            adress: null,
            type: null,
            city: [],
            userCityIds: []
        }
    }
    	
    async componentWillMount(){
        let detailsUser = await UserService.details(this.props.match.params.id);
        if(detailsUser.ok)
        {
            let data = await detailsUser.json();
            console.log(data.myUser);
            this.setState({
                mail: data.myUser.mail,
                name: data.myUser.name,
                surname: data.myUser.surname,
                adress: data.myUser.adress,
                type: data.myUser.type,
                city: data.myUser.city
            });
            let myIds = [];
            data.myUser.city.map(item => myIds.push(item._id));
            this.setState({userCityIds: myIds});
        }
        let listCity = await CityService.list();
        if(listCity.ok)
        {
            let data = await listCity.json();
            this.setState({
                cityForm: data.myCities
            });
        }
    }
	
    async editUser()
    {
        delete this.state.cityForm;
        delete this.state.userCityIds;
        console.log(this.state);
        let response = await UserService.update(this.props.match.params.id, this.state);
        if(response.ok)
        {
            this.props.history.push('/product/manage');
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    handleChangeMultiple(e)
    {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({city : value});
    }
    
    render(){
        return (
            <div>
                <Header />
                <FilDArianne  data={[{name: "Home", path: "/"},{name: "Manage user", path: "/user/manage"},{name: "Edit user", path: `/user/edit/${this.props.match.params.id}`}]}/>
                <div class="wrapper wrapper-content animated fadeInRight ecommerce">
                    <div class="row">
                        <div class="col-lg-8 col-md-offset-2">
                            <div class="ibox product-detail">
                                <div class="ibox-content">
                                    <div class="row wrapper wrapper-content">
                                        <form className="from-control" > 
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Email :</label>
                                                <div class="col-sm-10"><input type="email" class="form-control" id="mail" value={this.state.mail} onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Name :</label>
                                                <div class="col-sm-10"><input type="text" class="form-control" id="name" value={this.state.name} onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Surname :</label>
                                                <div class="col-sm-10"><input type="text" class="form-control" id="surname" value={this.state.surname} onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Adress :</label>
                                                <div class="col-sm-10"><input type="text" class="form-control" id="adress" value={this.state.adress} onChange={(e) => this.handleChange(e)} /></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Type :</label>
                                                <div class="col-sm-10">
                                                    <select id="type" className="form-control" onChange={(e) => this.handleChange(e)} >
                                                        {this.state.type === 'user' ? <option value="user" selected >User</option> : <option value="user" >User</option>}
                                                        {this.state.type === 'producer' ? <option value="producer" selected >Producer</option> : <option value="producer" >Producer</option>}
                                                        {this.state.type === 'admin' ? <option value="admin" selected >Admin</option> : <option value="admin" >Admin</option>}
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">City :</label>
                                                <div class="col-sm-10">
                                                    <select id="city" className="form-control custom-select" multiple onChange={(e) => this.handleChangeMultiple(e)} >
                                                    {
                                                        this.state.cityForm.map((item) => {
                                                        return (
                                                            this.state.userCityIds.indexOf(item._id) !== -1 ? <option value={item._id} selected >{item.name}</option> : <option value={item._id} >{item.name}</option>
                                                        )})
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                        <button className="btn btn-primary col-sm-1 col-md-offset-6" onClick={(e) => this.editUser(e)}>Edit</button>
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

export default EditUser;