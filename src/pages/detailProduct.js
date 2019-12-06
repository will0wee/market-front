import React, {Component} from 'react';
import ProductService from '../services/productService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class DetailProduct extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: null,
            name: null,
            price: null,
            category: null,
            description: null,
            sellingType: null,
            city: null,
            seller: null,
            quantity: 0
        }
    }
	
    async deletePost(id)
    {
        let response = await ProductService.delete(id);
        if(response.ok)
        {
            this.props.history.push('/');
        }
    }
        
    addToCart(e)
    {
        if(typeof localStorage.getItem('cart') === undefined || localStorage.getItem('cart') === null)
        {
            let myArray = [];
            localStorage.setItem('cart', JSON.stringify(myArray));
        }
        let myCart = JSON.parse(localStorage.getItem('cart'));
        myCart.push([this.state.id, this.state.name, this.state.quantity, this.state.price]);
        localStorage.setItem('cart', JSON.stringify(myCart));
        this.props.history.push('/');
    }
	
    async componentWillMount(){
        let myPost = await ProductService.details(this.props.match.params.id);
        if(myPost.ok)
        {
            let data = await myPost.json();
            console.log(data);
            this.setState(
            {
                id: data.myProduct._id,
                name: data.myProduct.name,
                price: data.myProduct.price,
                category: data.myProduct.category.name,
                description: data.myProduct.description,
                sellingType: data.myProduct.sellingType,
                city: data.myProduct.city.name,
                seller: data.myProduct.owner.name
            });
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
                <FilDArianne  data={[{name: "Home", path: "/"},{name: "Product detail", path: `/product/detail/${this.props.match.params.id}`}]}/>
                <div class="wrapper wrapper-content animated fadeInRight">
                    <div class="row">
                        <div class="col-lg-8 col-md-offset-2">
                            <div class="ibox product-detail">
                                <div class="ibox-content">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="product-images">
                                                <div>
                                                    <div class="image-imitation">
                                                        [IMAGE 1]
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <h2 class="font-bold m-b-xs">
                                                {this.state.name}
                                            </h2>
                                            <hr/>
                                            <div className="col-lg-12">
                                                <h1 class="product-main-price col-lg-3">{this.state.price}€</h1>
                                                <div className="col-lg-6 col-md-offset-3">
                                                    <form>
                                                        <table>
                                                        <tbody>
                                                            <tr>
                                                                <td >
                                                                    <input className="col-lg-9" id="quantity" onChange={(e) => this.handleChange(e)} type="number"/>
                                                                </td>
                                                                <td>
                                                                    <button type="button" onClick={(e) => this.addToCart(e)} className="btn btn-primary">Add to cart &nbsp;<i class="fas fa-shopping-cart" aria-hidden="true"></i></button>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </form>
                                                </div>
                                                <h4 className="col-lg-12">Prix {this.state.sellingType}</h4>
                                            </div>
                                            <hr/>
                                            <hr/>
                                            <hr/>
                                            <hr/>
                                            <hr/>
                                            <h4>Product description</h4>

                                            <div class="small text-muted">
                                                {this.state.description}
                                            </div>
                                            <dl class="row m-t-md small">
                                                <dt class="col-md-4 text-right">Availible in : {this.state.city}</dt>
                                            </dl>
                                            {
                                                this.state.seller === localStorage.getItem('myUserId') ? 
                                                <button className="btn btn-primary col-lg-4 col-md-offset-8">Modifier</button>
                                                : null
                                            }
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

export default DetailProduct;