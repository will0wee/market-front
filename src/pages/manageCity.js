import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CityService from '../services/cityService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class ManageCity extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            city: [
            ],
            updateCityid: null,
            updateCity: ""
        }
    }
    
    async deleteCity(id)
    {
        let response = await CityService.delete(id);
        if(response.ok)
        {
            let response = await CityService.list();
            if(response.ok)
            {
                let data = await response.json();
                console.log(data);
                this.setState(
                {
                    city: data.myCities
                });
            }
        }
    }
	
    async componentDidMount(){
        let response = await CityService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                city: data.myCities
            });
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    async updateCity(e)
    {
        CityService.update(this.state.updateCityid, {name: this.state.updateCity});
        
        let response = await CityService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                city: data.myCities
            });
        }
        this.setState(
        {
            updateCityid: null,
            updateCity: ""
        });
    } 
    
    async createCity(e)
    {
        await CityService.create({name: this.state.updateCity});
        
        let response = await CityService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                city: data.myCities
            });
        }
        this.setState(
        {
            updateCityid: null,
            updateCity: ""
        });
    }       
		
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Manage city", path: "/city/manage"}]}/>
                <div class="row">
                    <div class="col-lg-8 col-md-offset-2">
                        <div class="ibox">
                            <div class="ibox-content">
                                <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                                    <thead>
                                        <tr>
                                            <td width="70%">
                                                <strong>Nom</strong>
                                            </td>
                                            <td colSpan="2" width="30%">
                                                <strong>Actions</strong>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.city.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modifCity" onClick={() => this.setState({updateCityid: item._id, updateCity: item.name})} >Modifier</button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => this.deleteCity(item._id)} >Supprimer</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ajoutCity" >Ajouter</button>
                                                        
                                <div className="modal fade" id="modifCity" tabindex="-1" role="dialog" aria-labelledby="modifCityLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="modifCityLabel">Modifier ma ville</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form classNameName="from-control" >
                                                    <div className="form-group row"><label className="col-sm-2 col-form-label">Ville :</label>
                                                        <div className="col-sm-10"><input type="text" className="form-control" id="updateCity" value={this.state.updateCity} onChange={(e) => this.handleChange(e)} required/></div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.updateCity(e)}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="ajoutCity" tabindex="-1" role="dialog" aria-labelledby="ajoutCityLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="ajoutCityLabel">Ajouter une ville</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form classNameName="from-control" >
                                                    <div className="form-group row"><label className="col-sm-2 col-form-label">Ville :</label>
                                                        <div className="col-sm-10"><input type="text" className="form-control" id="updateCity" placeHolder="City name" onChange={(e) => this.handleChange(e)} required/></div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.createCity(e)}>Save changes</button>
                                            </div>
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

export default ManageCity;