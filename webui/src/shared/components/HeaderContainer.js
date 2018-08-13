import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
	    	<div className="row">
	    		<div className="container">
		    	 	<nav id="topbar-container" className="navbar navbar-expand-lg">
		          		<h1>LotteryResults.UK</h1>
		          		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		            		<span className="navbar-toggler-icon"></span>
		          		</button>
		          		<div className="collapse navbar-collapse" id="navbarResponsive">
		              		<ul className="navbar-nav ml-auto">
			          			<li className="nav-item active">
			            			<NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
			          			</li>
			          			<li className="nav-item">
			            			<NavLink to="/results" className="nav-link" activeClassName="active">Lottery Results</NavLink>
			          			</li>
						        <li className="nav-item">
			            			<NavLink to="/tickets" className="nav-link" activeClassName="active">Check Your Tickets</NavLink>
						        </li>
						        <li className="nav-item">
			            			<NavLink to="/news" className="nav-link" activeClassName="active">Lottery News</NavLink>
						        </li>
					        </ul>
			          	</div>
		      		</nav>
	      		</div>
	      	</div>
	    );
	}
	
}

export default HeaderContainer;
