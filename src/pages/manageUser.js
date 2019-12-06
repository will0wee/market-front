import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../services/userService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class ManageUser extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            user: [
            ]
        }
    }
    	
    async deleteUser(id)
    {
        let response = await UserService.delete(id);
        if(response.ok)
        {
            let response = await UserService.list();
            if(response.ok)
            {
                let data = await response.json();
                console.log(data);
                this.setState(
                {
                    user: data.myUsers
                });
            }
        }
    }
	
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    async componentDidMount(){
        let response = await UserService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                user: data.myUsers
            });
        }
    }
		
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Manage user", path: "/user/manage"}]}/>
                <div class="row">
                    <div class="col-lg-10 col-md-offset-1">
                        <div class="ibox">
                            <div class="ibox-content">
                                <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                                    <thead>
                                        <tr>
                                            <td width="25%">
                                                <strong>Email</strong>
                                            </td>
                                            <td width="10%">
                                                <strong>Nom</strong>
                                            </td>
                                            <td width="10%">
                                                <strong>Prénom</strong>
                                            </td>
                                            <td width="30%">
                                                <strong>Adresse</strong>
                                            </td>
                                            <td colSpan="2" width="25%">
                                                <strong>Actions</strong>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.user.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.mail}
                                                        </td>
                                                        <td>
                                                            {item.surname}
                                                        </td>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td>
                                                            {item.adress}
                                                        </td>
                                                        <td>
                                                            <Link className="btn btn-primary" to={`/user/edit/${item._id}`}>Modifier</Link>
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

export default ManageUser;