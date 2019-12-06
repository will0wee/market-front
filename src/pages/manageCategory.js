import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CategoryService from '../services/categoryService';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class ManageCategory extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            category: [
            ],
            updateCategoryid: null,
            updateCategory: ""
        }
    }
    
    async deleteCategory(id)
    {
        let response = await CategoryService.delete(id);
        if(response.ok)
        {
            let response = await CategoryService.list();
            if(response.ok)
            {
                let data = await response.json();
                console.log(data);
                this.setState(
                {
                    category: data.myCategories
                });
            }
        }
    }
	
    async componentDidMount(){
        let response = await CategoryService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                category: data.myCategories
            });
        }
    }
    
    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
        console.log(this.state);
    }
    
    async updateCategory(e)
    {
        CategoryService.update(this.state.updateCategoryid, {name: this.state.updateCategory});
        
        let response = await CategoryService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                category: data.myCategories
            });

        }
    }    
    
    async createCategory(e)
    {
        await CategoryService.create({name: this.state.updateCategory});
        
        let response = await CategoryService.list();
        if(response.ok)
        {
            let data = await response.json();
            console.log(data);
            this.setState(
            {
                category: data.myCategories
            });
        }
    }    
		
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"},{name: "Manage category", path: "/category/manage"}]}/>
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
                                            this.state.category.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modifCategory" onClick={() => this.setState({updateCategoryid: item._id, updateCategory: item.name})} >Modifier</button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => this.deleteCategory(item._id)} >Supprimer</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ajoutCategory" >Ajouter</button>
                                <div className="modal fade" id="modifCategory" tabIndex="-1" role="dialog" aria-labelledby="modifCategoryLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="modifCategoryLabel">Modifier ma catégorie</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form classNameName="from-control" >
                                                    <div className="form-group row"><label className="col-sm-3 col-form-label">Catégorie :</label>
                                                        <div className="col-sm-9"><input type="text" className="form-control" id="updateCategory" value={this.state.updateCategory} onChange={(e) => this.handleChange(e)} required/></div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.updateCategory(e)}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="ajoutCategory" tabIndex="-1" role="dialog" aria-labelledby="ajoutCategoryLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="ajoutCategoryLabel">Ajouter une catégorie</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <form classNameName="from-control" >
                                                    <div className="form-group row"><label className="col-sm-3 col-form-label">Catégorie :</label>
                                                        <div className="col-sm-9"><input type="text" className="form-control" id="updateCategory" placeholder="Category name" onChange={(e) => this.handleChange(e)} required/></div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.createCategory(e)}>Save changes</button>
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

export default ManageCategory;