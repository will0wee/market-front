import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProductService from '../services/productService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class ManageProduct extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            products: [
                {
                    name: null,
                    category: {
                        name: null
                    },
                    price: null,
                    sellingType: null,
                    city: {
                        name: null
                    },
                    owner: {
                        name: null,
                        surname: null
                    },
                    description: null
                }
            ]
        }
    }
    	
    async deleteUser(id)
    {
        let response = await ProductService.delete(id);
        if(response.ok)
        {
            let response = await ProductService.list();
            if(response.ok)
            {
                let data = await response.json();
                console.log(data);
                this.setState(
                {
                    user: data.myProducts
                });
            }
        }
    }
	
    async componentDidMount(){
        let response = await ProductService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                products: data.myProducts
            });
        }
    }
		
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Manage product", path: "/product/manage"}]}/>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-content">
                                <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                                    <thead>
                                        <tr>
                                            <td width="15%">
                                                <strong>Nom</strong>
                                            </td>
                                            <td width="15%">
                                                <strong>Catégorie</strong>
                                            </td>
                                            <td width="5%">
                                                <strong>Prix</strong>
                                            </td>
                                            <td width="6%">
                                                <strong>Type de prix</strong>
                                            </td>
                                            <td width="11%">
                                                <strong>Ville</strong>
                                            </td>
                                            <td width="13%">
                                                <strong>Vendeur</strong>
                                            </td>
                                            <td width="20%">
                                                <strong>Description</strong>
                                            </td>
                                            <td colSpan="2">
                                                <strong width="15%">Actions</strong>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.products.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td>
                                                            {item.category.name}
                                                        </td>
                                                        <td>
                                                            {item.price}
                                                        </td>
                                                        <td>
                                                            {item.sellingType}
                                                        </td>
                                                        <td>
                                                            {item.city.name}
                                                        </td>
                                                        <td>
                                                            {`${item.owner.name} ${item.owner.surname}`}
                                                        </td>
                                                        <td>
                                                            {item.description}
                                                        </td>
                                                        <td>
                                                            <Link className="btn btn-primary" to={`/product/edit/${item._id}`}>Modifier</Link>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => this.deleteUser(item._id)} >Supprimer</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ManageProduct;