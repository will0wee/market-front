import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProductService from '../services/productService';
import UserService from '../services/userService';
import CategoryService from '../services/categoryService';
import CityService from '../services/cityService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class EditProduct extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            cityForm: [],
            categoryForm: [],
            user: [],
            name: "",
            price: 0,
            sellingType: null,
            description: "",
            category: null,
            city: null,
            owner: null
        }
    }
    	
    async componentWillMount(){
        let response = await ProductService.details(this.props.match.params.id);
        if(response.ok)
        {
            let data = await response.json();
            this.setState({
                name: data.myProduct.name,
                price: data.myProduct.price,
                sellingType: data.myProduct.sellingType,
                description: data.myProduct.description,
                category: data.myProduct.category._id,
                city: data.myProduct.city._id,
                owner: data.myProduct.owner._id
            });
        }
        
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
            let responseCity = await UserService.details(this.state.owner);
            if(responseCity.ok)
            {
                let data = await responseCity.json();
                this.setState({cityForm: data.myUser.city});
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
    
    async editProduct()
    {
        delete this.state.user;
        delete this.state.categoryForm;
        delete this.state.cityForm;
        let response = await ProductService.update(this.props.match.params.id, this.state);
        console.log(this.state);
        if(response.ok)
        {
            //this.props.history.push('/product/manage');
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Manage product", path: "/user/manage"},{name: "Edit user", path: `/product/edit/${this.props.match.params.id}`}]}/>
                <div class="wrapper wrapper-content animated fadeInRight ecommerce">
                    <div class="row">
                        <div class="col-lg-8 col-md-offset-2">
                            <div class="ibox product-detail">
                                <div class="ibox-content">
                                    <div class="row wrapper wrapper-content">
                                        <form className="from-control" >
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Name :</label>
                                                <div class="col-sm-10"><input type="text" id="name" class="form-control" value={this.state.name} onChange={(e) => this.handleChange(e)} required/></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Price :</label>
                                                <div class="col-sm-10"><input type="number" id="price" class="form-control" value={this.state.price} onChange={(e) => this.handleChange(e)} /></div>
                                            </div>                                            
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Type of pricing :</label>
                                                <div class="col-sm-10">
                                                    <div class="i-checks">
                                                    {
                                                        this.state.sellingType === "Au Kg" ?
                                                        <label><input type="radio" checked value="Au Kg" name="sellingType" onChange={(e) => this.setState({typeForm: "Au Kg"})}/> <i></i>Au Kg</label>
                                                        :
                                                        <label><input type="radio" value="Au Kg" name="sellingType" onChange={(e) => this.setState({typeForm: "Au Kg"})}/> <i></i>Au Kg</label>
                                                    }
                                                    </div>
                                                    <div class="i-checks">
                                                    {
                                                        this.state.sellingType === "A l'unite" ?
                                                        <label> <input type="radio" checked value="A l'unite" name="sellingType" onChange={(e) => this.setState({typeForm: "A l'unite"})}/> <i></i>A l'unite</label>
                                                        :
                                                        <label> <input type="radio" value="A l'unite" name="sellingType" onChange={(e) => this.setState({typeForm: "A l'unite"})}/> <i></i>A l'unite</label>
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Description :</label>
                                                <div class="col-sm-10"><textarea class="form-control" id="description" value={this.state.description} onChange={(e) => this.handleChange(e)} ></textarea></div>
                                            </div>
                                            <div class="form-group row"><label class="col-sm-2 col-form-label">Category :</label>
                                                <div class="col-sm-10">
                                                    <select id="category" className="form-control" onChange={(e) => this.handleChange(e)} >
                                                    {
                                                        this.state.categoryForm.map((item) => {
                                                            return (
                                                                item._id === this.state.category ?
                                                                <option value={item._id} selected >{item.name}</option>
                                                                :
                                                                <option value={item._id}>{item.name}</option>
                                                            )
                                                        })
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
                                                                item._id === this.state.city ?
                                                                <option value={item._id} selected >{item.name}</option>
                                                                :
                                                                <option value={item._id}>{item.name}</option>
                                                            )
                                                        })
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
                                                                item._id === this.state.owner ?
                                                                <option value={item._id} selected >{item.name}</option>
                                                                :
                                                                <option value={item._id}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                            : null
                                            }
                                        </form>
                                        <button className="btn btn-primary col-sm-1 col-md-offset-6" onClick={() => this.editProduct()}>Modifier</button>
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

export default EditProduct;