import React, {Component} from 'react';
import Connect from './connect';
import {Link} from 'react-router-dom';

class FilDArianne extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>E-commerce grid</h2>
                    <ol className="breadcrumb">
                        {
                        this.props.data.map((item, index) => {
                                if(index === (this.props.data.length-1))
                                {
                                    return (
                                        <li className="breadcrumb-item active">
                                            <strong>{item.name}</strong>
                                        </li>
                                    )
                                }
                                else
                                {
                                    return (
                                        <li className="breadcrumb-item">
                                            <Link to={item.path}>{item.name}</Link>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ol>
                </div>
                <div className="col-lg-2 dropdown">
                {typeof localStorage.getItem('myUserType') !== undefined && localStorage.getItem('myUserType') !== null && localStorage.getItem('myUserType') !== "user" ? 
                <li align="right" className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" to="#"><i class="fa fa-bars fa-2x"></i></Link>
                    <ul className="dropdown-menu">
                        <li><Link to="/product/add">Ajouter un produit</Link></li>
                        <li><Link to="/product/manage">Gérer mes produits</Link></li>
                        {localStorage.getItem('myUserType') === "admin" ? 
                        <li><Link to="/user/add">Ajouter un utilisateur</Link></li>
                        : null}
                        {localStorage.getItem('myUserType') === "admin" ? 
                        <li><Link to="/user/manage">Gérer mes utilisateurs</Link></li>
                        : null}
                        {localStorage.getItem('myUserType') === "admin" ? 
                        <li><Link to="/city/manage">Gérer mes villes</Link></li>
                        : null}
                        {localStorage.getItem('myUserType') === "admin" ? 
                        <li><Link to="/category/manage">Gérer mes catégories</Link></li>
                        : null}
                    </ul>
                </li>
                : null }
                </div>
            </div>
        )
    }
}

export default FilDArianne;