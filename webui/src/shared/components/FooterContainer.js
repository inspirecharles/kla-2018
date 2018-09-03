import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class FooterContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<footer className="page-footer font-small blue pt-4">

			    <div className="container footer-links text-center text-md-left">

			      <div className="row justify-content-md-center">

			        <div className="col-md-3 mb-md-0 mb-3">

			            <ul className="list-unstyled">
			              <li>
			                <a className="footer-list" href="#!">Terms &amp; Conditions</a>
			              </li>
			              <li>
			                <a className="footer-list" href="#!">Privacy Policy</a>
			              </li>
			              <li>
			                <a className="footer-list" href="#!">Sitemap</a>
			              </li>
			            </ul>

			          </div>

			          <div className="social-media col-md-3 mb-md-0 mb-3">

			          	<p className="mb-1 sm-font">Find Us On Social Media</p>

			            <ul className="list-unstyled list-inline text-right">
						      <li className="list-inline-item">
						      	<a href="#"><img className="sm-fb" src="../../img/icons/iconmonstr-facebook-3.svg" /></a>
						      </li>
						      <li className="list-inline-item">
						        <a href="#"><img className="sm-twitter" src="../../img/icons/iconmonstr-twitter-3.svg" /></a>
						      </li>
						      <li className="list-inline-item">
						        <a href="#"><img className="uk-gplus" src="../../img/icons/iconmonstr-google-plus-3.svg" /></a>
						      </li>
						</ul>

			          </div>

			      </div>

			    </div>

			    <div className="footer-copyright text-center py-3">Copyright © 2018 
			    	<a className="footer-list" href="www.lotteryresults.co.uk"> www.lotteryresults.co.uk</a>
			    	<p className="mb-1 poweredby-text">Powered by 
			      		<a className="footer-list jumbo-corp-link" href="#"> Jumbo Interactive</a>
			    	</p>
			    </div>

			  </footer>
	    );
	}
	
}

export default FooterContainer;
