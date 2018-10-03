import React, { Component } from "react";
import { Link } from "react-router-dom";

class FooterContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<footer className="page-footer font-small blue">

			    <div className="container footer-links text-md-left">

			      <div className="row justify-content-md-center">

			        <div className="footerLinks col-md-3 mb-md-0 mb-3">

			            <ul className="list-unstyled">
			              <li>
			                <Link className="footer-list" to="/terms-and-conditions">Terms &amp; Conditions</Link>
			              </li>
			              <li>
			                <Link className="footer-list" to="/privacy">Privacy Policy</Link>
			              </li>
			            </ul>

			          </div>

			          <div className="social-media col-md-3 mb-md-0 mb-3">

			          	<p className="mb-1 sm-font">Find Us On Social Media</p>

			            <ul className="list-unstyled list-inline text-right">
					      	<li className="list-inline-item">
					      		<a href={"https://www.facebook.com/lotteryresults/"}><img className="sm-fb" src="/img/icons/iconmonstr-facebook-3.svg" /></a>
					      	</li>
						</ul>

			          </div>

			      </div>

			    </div>

			    <div className="footer-copyright text-center py-3">Copyright © 2018 
			    	<a className="footer-list" href={"https://www.lotteryresults.co.uk"}> www.lotteryresults.co.uk</a>
			    	<p className="mb-1 poweredby-text">Powered by
			      		<a className="footer-list jumbo-corp-link" href={"https://www.jumbointeractive.com/"}> Jumbo Interactive</a>
			    	</p>
			    </div>

			  </footer>
	    );
	}
	
}

export default FooterContainer;
