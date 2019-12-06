import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProductService from '../services/productService';
import OrderService from '../services/orderService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class DetailPanier extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            products: [
            ]
        }
    }
	
    async componentDidMount(){
        if(typeof localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null)
        {
            let myCart = JSON.parse(localStorage.getItem('cart'));
            console.log(myCart);
            myCart.map(async (item) => {
                item['product'] = await this.getMyProduct(item[0]);
                let data = this.state.products;
                data.push(item);
                this.setState({products: data});
            })
        }
        console.log(this.state);
    }
	
    handleChange(e, index)
    {
        let data = this.state.products;
        data[index][2] = e.target.value;
        this.setState({products: data});
        console.log(this.state);
    }	
    
    async getMyProduct(id)
    {
        let response = await ProductService.details(id);
        if(response.ok)
        {
            let data = await response.json();
            return data.myProduct;
        }
    }
    
    getTotal()
    {
        let total = 0;
        JSON.parse(localStorage.getItem('cart')).map((item) => {
            total += item[3]*item[2];
        })
        return total;
    }
    
    async commander()
    {
        let commande = {
            content: [],
            price: this.getTotal(),
            owner: localStorage.getItem('userId')
        }
        this.state.products.map((item) => commande.content.push({product: item[0], quantity: item[2]}));
        let response = await OrderService.create(commande);
        if(response.ok)
        {
            this.props.history.push('/');
        }
    }
    
    async deleteFromCart(index)
    {
        let myCart = JSON.parse(localStorage.getItem('cart')).splice(index,1);
        localStorage.setItem('cart', JSON.stringify(myCart));
        myCart.map(async (item) => {
            item['product'] = await this.getMyProduct(item[0]);
            let data = this.state.products;
            data.push(item);
            this.setState({products: data});
        })
    }
    
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Détail utilisateur", path: "/user/myAccount"},{name: "Panier", path: "/user/cart"}]}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <span className="float-right">&nbsp;(<strong>{this.state.products.length}</strong>) produits</span>
                                    <h5>Produit dans le panier :</h5>
                                </div>
                                {this.state.products.length > 0 ?
                                this.state.products.map((item, index) => {
                                    return (
                                    <test>
                                    <div className="ibox-content">
                                        <div className="table-responsive">
                                            <table className="table shoping-cart-table">

                                                <tbody>
                                                <tr>
                                                    <td width="90">
                                                        <div className="cart-product-imitation">
                                                        </div>
                                                    </td>
                                                    <td className="desc">
                                                        <h3>
                                                            <Link to={`/product/detail/${item[0]}`} className="text-navy">
                                                                {item['product'].name}
                                                            </Link>
                                                        </h3>
                                                        <dl className="small m-b-none">
                                                            <dt>Description</dt>
                                                            <dd>{item['product'].description}</dd>
                                                        </dl><br />
                                                        <p className="">
                                                            Vendu par : {item['product'].owner.name + ' ' + item['product'].owner.surname}
                                                        </p>
                                                        
                                                        <div className="m-t-sm">
                                                            <button className="text-muted"><i className="fa fa-gift"></i> Add gift package</button>
                                                            &nbsp;|&nbsp;
                                                            <button className="btn btn-white" onClick={() => this.deleteFromCart(index)} className="text-muted"><i className="fa fa-trash"></i> Remove item</button>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {item[3]}€ / {item['product'].sellingType}
                                                    </td>
                                                    <td width="65">
                                                        <input type="number" onChange={(e) => this.handleChange(e, index)} className="form-control" value={item[2]}/>
                                                    </td>
                                                    <td>
                                                        <h4>
                                                            {item[2]*item[3]}€
                                                        </h4>
                                                    </td>

                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </test>
                                    )}) :
                                    <span>Pas d'article dans le panier </span>
                                    }
                                    <div className="ibox-content">
                                        <button onClick={() => this.commander()} className="btn btn-primary float-right"><i className="fa fa fa-shopping-cart"></i> Payer</button>
                                        <Link to="/" className="btn btn-white"><i className="fa fa-arrow-left"></i> Continue shopping</Link>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <h5>Résumé du panier</h5>
                                </div>
                                <div className="ibox-content">
                                    <span>
                                        Total
                                    </span>
                                    <h2 className="font-bold">
                                        {typeof localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null ? this.getTotal(): 0}€ &nbsp;&nbsp;                                    
                                    </h2>

                                    <hr/>
                                    <div className="m-t-sm">
                                        <div className="btn-group">
                                            <button onClick={() => this.commander()} className="btn btn-primary btn-sm"><i className="fa fa-shopping-cart"></i> Payer</button>
                                            <Link to="/" className="btn btn-white btn-sm"> Cancel</Link>
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

export default DetailPanier;