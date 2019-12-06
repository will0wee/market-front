import React, {Component} from 'react';
import Connect from './connect';
import {Link} from 'react-router-dom';

class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            cartTotal: 0
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
    
    render()
    {
        return (
            <div className="row border-bottom ">
                <nav className="navbar navbar-static-top marginBottom0" role="navigation">
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <span className="m-r-sm text-primary welcome-message">Bienvenue sur le Market</span>
                        </li>
                        <li>
                            <div className="dropdown ">
                                <Link className="dropdown-toggle" data-toggle="dropdown" to="#"><i className="fas fa-shopping-cart fa-2x"></i></Link>
                                <ul className="dropdown-menu">
                                    {typeof localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null ?
                                    <div><table className="table">
                                        <thead>
                                            <tr>
                                                <th>Produit</th>
                                                <th>Quantity</th>
                                                <th>Prix</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {   
                                            typeof localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null ?
                                            JSON.parse(localStorage.getItem('cart')).map((item) => {
                                                var total = item[3]*item[2];
                                                return (
                                                    <tr>
                                                        <td>{item[1]}</td>
                                                        <td>{item[2]}</td>
                                                        <td>{total}</td>
                                                    </tr>
                                                )}
                                            ) : null
                                        }
                                        </tbody>
                                    </table>
                                    <div align="right">Total : <span>{typeof localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null ? this.getTotal(): 0}€ &nbsp;&nbsp;</span>
                                    </div>
                                    <div className="col-lg-12">
                                        <Link className="btn btn-success " to="/user/cart">Panier</Link>
                                    </div>
                                    </div>
                                    :
                                    <div>Aucun article dans votre panier</div>
                                    }
                                </ul>
                            </div>
                        </li>
                        {
                        typeof localStorage.getItem('myUserId') !== undefined && localStorage.getItem('myUserId') !== null ?
                        <li>
                            <button className="btn btn-success monCompte"><Link className="text-white" to="/user/myAccount"> Mon compte</Link></button>
                        </li>
                        : null
                        }
                        <li>
                            <Connect />
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header;