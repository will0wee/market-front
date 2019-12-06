import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Post extends Component
{
	// Construction de classe
	constructor(props)
	{
		super(props);
	}
	
	componentDidMount()
	{
		//console.log(this.props);
	}
	
	render()
	{
		return (
			<tr key={this.props.index}>
				<td>{this.props.data.id}</td>
				<td>{this.props.data.title}</td>
				<td>{this.props.data.body}</td>
				<td><Link className="btn btn-success" to={`/post/${this.props.data.id}`}>Details</Link></td>
				<td><button className="btn btn-danger" onClick={() => this.props.deletePost(this.props.data.id)}>Supprimer</button></td>
			</tr>
		)
	}
}

export default Post;