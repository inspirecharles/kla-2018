import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class FooterContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<footer className="page-footer font-small blue pt-4">

			    <div className="container-fluid container footer-links text-center text-md-left">

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

			          	<p className="mb-1">Find Us On Social Media</p>

			            <ul className="list-unstyled list-inline text-center">
						      <li className="list-inline-item">
						      	<a href="#"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
						      </li>
						      <li className="list-inline-item">
						        <a href="#"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
						      </li>
						      <li className="list-inline-item">
						        <a href="#"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
						      </li>
						</ul>

			          </div>

			      </div>

			    </div>

			    <div className="footer-copyright text-center py-3">Copyright © 2018 
			      <a className="footer-list" href="www.lotteryresults.co.uk"> www.lotteryresults.co.uk</a>
			      <p className="mb-1">Powered by 
			      	<a className="footer-list" href="#"> Jumbo Interactive</a>
			      </p>
			    </div>

			  </footer>
	    );
	}
	
}

export default FooterContainer;
