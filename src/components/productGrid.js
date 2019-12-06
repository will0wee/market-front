import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProductGrid extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userId: null,
            userType: null,
            userName: null
        }
    }

    componentDidMount()
    {
        console.log(this.props.data);
    }

    async logout()
    {
        console.log('successfuly loged out');
    }

    render()
    {
        return(        
            <div className="col-md-3">
                <div className="ibox">
                    <div className="ibox-content product-box">
                        <div className="product-imitation">
                            [ INFO ]
                        </div>
                        <div className="product-desc">
                            <span className="product-price">
                                {this.props.data.price}
                            </span>
                            <small className="text-muted">{this.props.data.category.name}</small>
                            
                            <Link to={`/product/detail/${this.props.data._id}`} className="product-name">{this.props.data.name}</Link>
                            <small className="text-muted float-right">{this.props.data.sellingType}</small>
                            
                            <div className="small m-t-xs">
                                {this.props.data.description}
                            </div>
                            <div className="m-t text-righ">
                                <Link to={`/product/detail/${this.props.data._id}`} className="btn btn-xs btn-outline btn-primary">Info <i className="fa fa-long-arrow-right"></i> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductGrid;