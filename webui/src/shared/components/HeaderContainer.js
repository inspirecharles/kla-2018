import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
	    	<nav className="navbar navbar-expand-lg navbar-dark fixed-top mx-auto" id="mainNav">
		      	<div className="container">
			        <section className="left" id="html">
	                    <img className="uk-logo" src="../../img/uk-logo.svg" />
	                </section>
			        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			        	<span className="navbar-toggler-icon"></span>
			        </button>
			        <div className="collapse navbar-collapse" id="navbarResponsive">
			        	<ul className="navbar-nav ml-auto">
			            	<li className="nav-item active">
			              		<a className="nav-link" href="#">Home
			                		<span className="sr-only">(current)</span>
			              		</a>
			            	</li>
			            	<li className="nav-item">
			              		<a className="nav-link" href="#">Lottery Results</a>
			            	</li>
			            	<li className="nav-item">
			              		<a className="nav-link" href="#">Check Your Ticket</a>
			            	</li>
			            	<li className="nav-item">
			              		<a className="nav-link" href="#">Lottery News</a>
			            	</li>
			          	</ul>
			        </div>
		      	</div>
		    </nav>
	    );
	}
	
}

export default HeaderContainer;
