import React, {Component} from 'react';
import ProductService from '../services/productService';
import UserService from '../services/userService';
import CategoryService from '../services/categoryService';
import CityService from '../services/cityService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class AddUser extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            cityForm: [{
                _id: 1,
                name: "City"
            }],
            mail: null,
            pwd: null,
            name: null,
            surname: null,
            adress: null,
            type: null,
            city: null
        }
    }
	
    async createUser(e)
    {
        delete this.state.cityForm;
        console.log(this.state)
        let response = await UserService.create(this.state);
        if(response.ok)
        {
            this.props.history.push('/');
        }
    }
	
    async componentDidMount(){
        let responseCity = await CityService.list();
        if(responseCity.ok)
        {
            let data = await responseCity.json();
            this.setState({cityForm: data.myCities});
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
                <FilDArianne  data={[{name: "Home", path: "/"},{name: "Manage category", path: "/category/manage"}]}/>
                <div class="wrapper wrapper-content animated fadeInRight ecommerce">
                    <div class="row">
                        <div class="col-lg-8 col-md-offset-2">
                            <div class="ibox product-detail">
                                <div class="ibox-content">
                                    <div class="row wrapper wrapper-content">
                                        <form className="from-control" > 
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Email :</label>
                                                <div class="col-sm-10"><input type="email" class="form-control" id="mail" placeholder="Email" onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Password :</label>
                                                <div class="col-sm-10"><input type="password" class="form-control" id="pwd" placeholder="Password" onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Name :</label>
                                                <div class="col-sm-10"><input type="text" class="form-control" id="name" placeholder="Name" onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Surname :</label>
                                                <div class="col-sm-10"><input type="text" class="form-control" id="surname" placeholder="Surname" onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Adress :</label>
                                                <div class="col-sm-10"><input type="text" class="form-control" id="adress" placeholder="Adress" onChange={(e) => this.handleChange(e)} /></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Type :</label>
                                                <div class="col-sm-10">
                                                    <select id="type" className="form-control" onChange={(e) => this.handleChange(e)} >
                                                        <option value="user">User</option>
                                                        <option value="producer">Producer</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">City :</label>
                                                <div class="col-sm-10">
                                                    <select id="city" className="form-control custom-select" multiple onChange={(e) => this.handleChangeMultiple(e)} >
                                                    {
                                                        this.state.cityForm.map((item) => {
                                                        return (
                                                            <option value={item._id}>{item.name}</option>     
                                                        )})
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                        <button className="btn btn-primary col-sm-1 col-md-offset-6" onClick={(e) => this.createUser(e)}>Add</button>
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

export default AddUser;