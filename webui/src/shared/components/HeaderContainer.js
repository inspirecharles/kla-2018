import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
	    	<nav className="navbar navbar-expand-lg navbar-dark fixed-top mx-auto nav-background" id="mainNav">
		      	<div className="container">
			        <section className="left" id="html">
	                    <NavLink to="/" className="logo" href="#"><img className="uk-logo" src="/img/uk-logo.svg" data-toggle="collapse" data-target=".navbar-collapse.show" /></NavLink>
	                </section>
			        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			        	<span className="navbar-toggler-icon"><img className="navbar-toggler" src="/img/icons/menu.svg" /></span>
			        </button>
			        <div className="collapse navbar-collapse" id="navbarResponsive">
			        	<ul className="navbar-nav ml-auto">
			            	<li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
			              		<NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
			            	</li>
			            	<li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
			              		<NavLink exact to="/results" className="nav-link" activeClassName="active">Lottery Results</NavLink>
			            	</li>
			            	<li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
			            		<NavLink exact to="/check-your-ticket" className="nav-link" activeClassName="active">Check Your Tickets</NavLink>
			            	</li>
			            	<li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
			              		<NavLink exact to="/news" className="nav-link" activeClassName="active">Lottery News</NavLink>
			            	</li>
			          	</ul>
			        </div>
		      	</div>
		    </nav>
	    );
	}
	
}

export default HeaderContainer;
