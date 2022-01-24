import React from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import './Nav.css';


class Nav extends React.Component{
	render(){
		return(
	
				<div className="topnav">
					<NavLink activeClassName="active" to="/" exact>Home</NavLink>
					<NavLink activeClassName="active" to="/contract">Hợp đồng</NavLink>
					{/* <NavLink activeClassName="active" to="/user">User</NavLink>
					<NavLink activeClassName="active" to="/product">Product</NavLink>
					<NavLink activeClassName="active" to="/about">About</NavLink>
					<NavLink activeClassName="active" to="/hook">Hook</NavLink>
					<NavLink activeClassName="active" to="/logout">Logout</NavLink>	
					hi */}
					
				</div>




		)
	}
}


export default Nav;