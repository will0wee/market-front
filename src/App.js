import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/home';
import Connection from './pages/connection';
import Register from './pages/register';
import DetailProduct from './pages/detailProduct';
import AddProduct from './pages/addProduct';
import ManageProduct from './pages/manageProduct';
import EditProduct from './pages/editProduct';
import AddUser from './pages/addUser';
import ManageUser from './pages/manageUser';
import ManageCity from './pages/manageCity';
import ManageCategory from './pages/manageCategory';
import EditUser from './pages/editUser';
import DetailPanier from './pages/detailPanier';
import ManageMyAccount from './pages/manageMyAccount';
import ManageOrder from './pages/manageOrder';
import Footer from './components/footer';

class App extends Component {
    //contructeur de la classe
    constructor(props){
        super(props);
        console.log("Contructor");
    }

    render(){
        return (
            <BrowserRouter>
                <Route path="/connect" exact component={Connection} />
                <Route path="/register" exact component={Register} />
                <Route path="/product/detail/:id" exact component={DetailProduct} />
                <Route path="/product/add" exact component={AddProduct} />
                <Route path="/product/manage" exact component={ManageProduct} />
                <Route path="/product/edit/:id" exact component={EditProduct} />
                <Route path="/user/add" exact component={AddUser} />
                <Route path="/user/manage" exact component={ManageUser} />
                <Route path="/user/edit/:id" exact component={EditUser} />
                <Route path="/user/myAccount" exact component={ManageMyAccount} />
                <Route path="/user/cart" exact component={DetailPanier} />
                <Route path="/user/myOrders" exact component={ManageOrder} />
                <Route path="/city/manage" exact component={ManageCity} />
                <Route path="/category/manage" exact component={ManageCategory} />
                <Route path="/" exact component={Home} />
                <Footer />
            </BrowserRouter>
        );
    }
}
export default App;
