import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProductService from '../services/productService';
import OrderService from '../services/orderService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class ManageOrder extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            orders: [
            ]
        }
    }
	
    async componentDidMount(){
        let response = await OrderService.listFromBuyer();
        if(response.ok)
        {
            let data = await response.json();
            return data.myOrders;
        }
    }
    
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Détail utilisateur", path: "/user/myAccount"},{name: "Mes commandes", path: "/user/myOrders"}]}/>
                <div class="row">
                    <div class="col-lg-8 col-md-offset-2">
                        <div class="ibox">
                            <div class="ibox-content">
                                <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                                    <thead>
                                        <tr>
                                            <td width="35%">
                                                <strong>Date</strong>
                                            </td>
                                            <td width="35%">
                                                <strong>Prix</strong>
                                            </td>
                                            <td width="30%">
                                                <strong>Actions</strong>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.orders.lenght > 0 ?
                                            this.state.orders.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.date}
                                                        </td>
                                                        <td>
                                                            {item.price}
                                                        </td>
                                                        <td>
                                                            <Link to="/user/order/${item._id}" type="button" className="btn btn-primary">Voir</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : <tr><td colSpan={3}>pas de commandes</td></tr>
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

export default ManageOrder;