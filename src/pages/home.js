import React, {Component} from 'react';
import Post from '../components/Post';
import ProductService from '../services/productService';
import ProductGrid from '../components/productGrid';
import Header from '../components/header';
import FilDArianne from '../components/fildArianne';

class Home extends Component
{
    // Construction de classe
    constructor(props)
    {
        super(props);
        this.state = {
            product: [
            ]
        }
    }
    	
    async deletePost(id)
    {
        let response = await ProductService.delete(id);
        if(response.ok)
        {
            // suppression � la main dans la vue
            let posts = this.state.posts;
            let index = posts.findIndex(post => post.id === id);
            posts.splice(index, 1);
            ///////////////
            this.setState({posts: posts});
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
                product: data.myProducts
            });
        }
    }
		
    render(){
        return (
            <div>
                <Header />
                <FilDArianne data={[{name: "Home", path: "/"}]}/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    {
                        this.state.product.map((item, index) => {
                            return (
                                <ProductGrid data={item} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Home;