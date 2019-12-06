import React, {Component} from 'react';
import ProductService from '../services/productService';
import UserService from '../services/userService';
import CategoryService from '../services/categoryService';
import CityService from '../services/cityService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class AddProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            categoryForm: [{
                _id: 1,
                name: "Category"
            }],
            cityForm: [{
                _id: 1,
                name: "City"
            }],
            user: [{
                _id: 1,
                name: "User"
            }],
            name: null,
            price: null,
            sellingType: "Au Kg",
            description: null,
            category: null,
            city: null,
            owner: null
        }
    }
	
    async createProduct()
    {
        delete this.state.user;
        delete this.state.categoryForm;
        delete this.state.cityForm;
        let response = await ProductService.create(this.state);
        if(response.ok)
        {
            this.props.history.push('/');
        }
    }
	
    async componentDidMount(){
        if(localStorage.getItem('myUserType') === "admin")
        {
            let responseUser = await UserService.getProducers();
            if(responseUser.ok)
            {
                let data = await responseUser.json();
                this.setState({user: data.myUser});
            }
        }
        let responseCategory = await CategoryService.list();
        if(responseCategory.ok)
        {
            let data = await responseCategory.json();
            this.setState({categoryForm: data.myCategories});
            this.setState({category: data.myCategories.find(x=>x!==undefined)._id});
        }
        if(localStorage.getItem('myUserType') === "admin")
        {
            let responseCity = await CityService.list();
            if(responseCity.ok)
            {
                let data = await responseCity.json();
                this.setState({cityForm: data.myCities});
            }
        }
        else
        {
            let responseCity = await UserService.details(localStorage.getItem('myUserId'));
            if(responseCity.ok)
            {
                let data = await responseCity.json();
                this.setState({cityForm: data.myUser.city});
            }
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    async refreshCity(e)
    {
        this.setState({owner: e.target.value});
        if(e.target.value === null)
        {
            e.preventDefault();
        }
        else
        {
            let responseCity = await UserService.details(e.target.value);
            if(responseCity.ok)
            {
                let data = await responseCity.json();
                this.setState({cityForm: data.myUser.city});
                this.setState({city: data.myUser.city.find(x=>x!==undefined)._id});
            }
        }
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
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Name :</label>
                                                <div class="col-sm-10"><input type="text" id="name" class="form-control" placeholder="Product name" onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Price :</label>
                                                <div class="col-sm-10"><input type="number" id="price" class="form-control" placeholder="price" onChange={(e) => this.handleChange(e)} /></div>
                                            </div>                                            
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Type of pricing :</label>
                                                <div class="col-sm-10">
                                                    <div class="i-checks"><label> <input type="radio" checked value="Au Kg" name="sellingType" onChange={(e) => this.setState({typeForm: "Au Kg"})}/> <i></i>Au Kg</label></div>
                                                    <div class="i-checks"><label> <input type="radio" value="A l'unite" name="sellingType" onChange={(e) => this.setState({typeForm: "A l'unite"})}/> <i></i>A l'unite</label></div>
                                                </div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Description :</label>
                                                <div class="col-sm-10"><textarea class="form-control" id="description" placeholder="Description" onChange={(e) => this.handleChange(e)} ></textarea></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Category :</label>
                                                <div class="col-sm-10">
                                                    <select id="category" className="form-control" onChange={(e) => this.handleChange(e)} >
                                                    {
                                                        this.state.categoryForm.map((item) => {
                                                        return (
                                                                <option value={item._id}>{item.name}</option>     
                                                        )})
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">City :</label>
                                                <div class="col-sm-10">
                                                    <select id="city" className="form-control" onChange={(e) => this.handleChange(e)} >
                                                    {
                                                        this.state.cityForm.map((item) => {
                                                        return (
                                                            <option value={item._id}>{item.name}</option>     
                                                        )})
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                            {
                                                localStorage.getItem('myUserType') === "admin" ? 
                                                <div class="form-group row"><label class="col-sm-2 col-form-label">Seller :</label>
                                                <div class="col-sm-10">
                                                    <select className="form-control" onChange={(e) => this.refreshCity(e)}>
                                                        <option value="null">Choose a seller</option>
                                                    {
                                                        this.state.user.map((item) => {
                                                        return (
                                                                <option value={item._id}>{item.name}</option>     
                                                        )})
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                            : null
                                            }
                                        </form>
                                        <button className="btn btn-primary col-sm-1 col-md-offset-6" onClick={() => this.createProduct()}>Add</button>
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

export default AddProduct;