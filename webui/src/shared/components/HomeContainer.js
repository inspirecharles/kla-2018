import React, { Component } from "react"; 
class HomeContainer extends Component { constructor() { super(); } render() { return (
<div>
	<div className="business-header result-container">
	    <div className="container">
	    	<div className="row">
	    		<div className="col-lg-12">
	    			<h3 className="display-5 text-left text-white mt-4">Latest UK Lottery Results.</h3>
	    		</div>
	    	</div>
	        <div className="row">
	            <div className="col-lg-6 game_result">
                	<div className="accordion md-accordion accordion-3 z-depth-1-half" role="tablist" aria-multiselectable="true">

						<div className="card">
							<div className="lottery-results-header accordion md-accordion accordion-3 z-depth-1-half" id="accordionEx1" role="tablist" aria-multiselectable="true">
							    <a data-toggle="collapse" data-parent="#accordionEx1" href="#collapse1" aria-expanded="true" aria-controls="collapse1">
	                            	<div className="game-result-header">
	                            		<div className="container">
											<div className="row">
											    <div className="game-logo col">
											    	<img className="img-fluid uk-logo-lotto" src="../../img/icon-lotto.png" />
											    </div>
											    <div className="prize-date col-md-auto">
											    	<h6 className="prize text-right">&#163;6,300,000</h6>
													<p className="text-right date">Saturday 21 July 2018</p>
											    </div>
											    <div className="col col-lg-2 arrow-icon">
											    	<i className="fa fa-angle-down rotate-icon fa-2x align-middle"></i>
											    </div>
											</div>
										</div>
	                            	</div>
	                            </a>
							</div>
							
							<div id="collapse1" className="collapse show" role="tabpanel" aria-labelledby="heading4" data-parent="#accordionEx1">
	                            <div className="card-body pt-0" id="lotto">
		                            <div className="gameResults-main">
		                            	<div className="main_numbers col-lg-12 col-md-12">
			                                <dl>
			                                	<dt className="clr mainNumber_label">
			                                        <label htmlFor="">Main Numbers</label>
			                                    </dt>
				                                <dd className="numbers circle bc_lotto d-inline-block">9</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">13</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">16</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">25</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">40</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">46</dd>
			                                </dl>
			                            </div>
		                            </div>
		                        </div>

		                        <div className="card-body pt-0" id="lotto">
		                            <div className="gameResults-main">
		                            	<div className="supplementary_numbers col-lg-12 col-md-12">
			                                <dl>
			                                	<dt className="clr supplementary_label">
			                                        <label htmlFor="">Supplementary</label>
			                                    </dt>
				                                <dd className="numbers circle supplementary d-inline-block">52</dd>
			                                </dl>
			                            </div>
		                            </div>
		                        </div>

		                        <div className="card-body pt-0">
		                        	<div className="gameResults-main">
		                            	<div className="supplementary_numbers col-lg-12 col-md-12">
		                            		<div className="supp-link-icons">
				                            	<i className="fa fa-print" aria-hidden="true"></i>
				                            	<i className="fa fa-print" aria-hidden="true"></i>
				                            	<i className="fa fa-print" aria-hidden="true"></i>
				                            </div>
		                            	</div>
		                            </div>
		                        </div>

					            <div className="card-footer container-fluid">
									<div className="row footerNextDraw">
										<h3 className="nextDraw">Next Draw: &#163;7,000,000</h3>
										<button className="btn btn-light ml-auto">Buy Now</button>
									</div>
								</div>

	                        </div>
							
						</div>

                	</div>
                </div>

                <div className="col-lg-6 game_result">
                	<div className="card">
						<div className="lottery-results-header accordion md-accordion accordion-3 z-depth-1-half" id="accordionEx2" role="tablist" aria-multiselectable="true">
						    <a data-toggle="collapse" data-parent="#accordionEx2" href="#collapse2" aria-expanded="true" aria-controls="collapse2">
                            	<div className="game-result-header">
                            		<div className="container">
										<div className="row">
										    <div className="game-logo col">
										    	<img className="img-fluid uk-logo-lotto" src="../../img/icon-lotto.png" />
										    </div>
										    <div className="prize-date col-md-auto">
										    	<h6 className="prize text-right">&#163;6,300,000</h6>
												<p className="text-right date">Saturday 21 July 2018</p>
										    </div>
										    <div className="col col-lg-2 arrow-icon">
										    	<i className="fa fa-angle-down rotate-icon fa-2x align-middle"></i>
										    </div>
										</div>
									</div>
                            	</div>
                            </a>
						</div>
						<div id="collapse2" className="collapse show" role="tabpanel" aria-labelledby="heading4" data-parent="#accordionEx2">
                            <div className="card-body pt-0" id="lotto">
	                            <div className="gameResults-main">
	                            	<div className="main_numbers col-lg-12 col-md-12">
		                                <dl>
		                                	<dt className="clr mainNumber_label">
		                                        <label htmlFor="">Main Numbers</label>
		                                    </dt>
			                                <dd className="numbers circle bc_lotto d-inline-block">9</dd>
			                                <dd className="numbers circle bc_lotto d-inline-block">13</dd>
			                                <dd className="numbers circle bc_lotto d-inline-block">16</dd>
			                                <dd className="numbers circle bc_lotto d-inline-block">25</dd>
			                                <dd className="numbers circle bc_lotto d-inline-block">40</dd>
			                                <dd className="numbers circle bc_lotto d-inline-block">46</dd>
		                                </dl>
		                            </div>
	                            </div>
	                        </div>

	                        <div className="card-body pt-0" id="lotto">
	                            <div className="gameResults-main">
	                            	<div className="supplementary_numbers col-lg-12 col-md-12">
		                                <dl>
		                                	<dt className="clr supplementary_label">
		                                        <label htmlFor="">Supplementary</label>
		                                    </dt>
			                                <dd className="numbers circle supplementary d-inline-block">52</dd>
		                                </dl>
		                            </div>
	                            </div>
	                        </div>

				            <div className="card-footer container-fluid">
								<div className="row footerNextDraw">
									<h3 className="nextDraw">Next Draw: &#163;7,000,000</h3>
									<button className="btn btn-light ml-auto">Buy Now</button>
								</div>
							</div>

                        </div>
						
					</div>

                </div>

                <div className="col-lg-6 game_result">
                	<div className="card">
							<div className="lottery-results-header accordion md-accordion accordion-3 z-depth-1-half" id="accordionEx3" role="tablist" aria-multiselectable="true">
							    <a data-toggle="collapse" data-parent="#accordionEx3" href="#collapse3" aria-expanded="true" aria-controls="collapse3">
	                            	<div className="game-result-header">
	                            		<div className="container">
											<div className="row">
											    <div className="game-logo col">
											    	<img className="img-fluid uk-logo-lotto" src="../../img/icon-lotto.png" />
											    </div>
											    <div className="prize-date col-md-auto">
											    	<h6 className="prize text-right">&#163;6,300,000</h6>
													<p className="text-right date">Saturday 21 July 2018</p>
											    </div>
											    <div className="col col-lg-2 arrow-icon">
											    	<i className="fa fa-angle-down rotate-icon fa-2x align-middle"></i>
											    </div>
											</div>
										</div>
	                            	</div>
	                            </a>
							</div>
							<div id="collapse3" className="collapse" role="tabpanel" aria-labelledby="heading4" data-parent="#accordionEx3">
	                            <div className="card-body pt-0" id="lotto">
		                            <div className="gameResults-main">
		                            	<div className="main_numbers col-lg-12 col-md-12">
			                                <dl>
			                                	<dt className="clr mainNumber_label">
			                                        <label htmlFor="">Main Numbers</label>
			                                    </dt>
				                                <dd className="numbers circle bc_lotto d-inline-block">9</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">13</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">16</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">25</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">40</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">46</dd>
			                                </dl>
			                            </div>
		                            </div>
		                        </div>

		                        <div className="card-body pt-0" id="lotto">
		                            <div className="gameResults-main">
		                            	<div className="supplementary_numbers col-lg-12 col-md-12">
			                                <dl>
			                                	<dt className="clr supplementary_label">
			                                        <label htmlFor="">Supplementary</label>
			                                    </dt>
				                                <dd className="numbers circle supplementary d-inline-block">52</dd>
			                                </dl>
			                            </div>
		                            </div>
		                        </div>

					            <div className="card-footer container-fluid">
									<div className="row footerNextDraw">
										<h3 className="nextDraw">Next Draw: &#163;7,000,000</h3>
										<button className="btn btn-light ml-auto">Buy Now</button>
									</div>
								</div>

	                        </div>
							
						</div>
                </div>

                <div className="col-lg-6 game_result">
                	<div className="card">
							<div className="lottery-results-header accordion md-accordion accordion-3 z-depth-1-half" id="accordionEx4" role="tablist" aria-multiselectable="true">
							    <a data-toggle="collapse" data-parent="#accordionEx4" href="#collapse4" aria-expanded="true" aria-controls="collapse4">
	                            	<div className="game-result-header">
	                            		<div className="container">
											<div className="row">
											    <div className="game-logo col">
											    	<img className="img-fluid uk-logo-lotto" src="../../img/icon-lotto.png" />
											    </div>
											    <div className="prize-date col-md-auto">
											    	<h6 className="prize text-right">&#163;6,300,000</h6>
													<p className="text-right date">Saturday 21 July 2018</p>
											    </div>
											    <div className="col col-lg-2 arrow-icon">
											    	<i className="fa fa-angle-down rotate-icon fa-2x align-middle"></i>
											    </div>
											</div>
										</div>
	                            	</div>
	                            </a>
							</div>
							<div id="collapse4" className="collapse" role="tabpanel" aria-labelledby="heading4" data-parent="#accordionEx4">
	                            <div className="card-body pt-0" id="lotto">
		                            <div className="gameResults-main">
		                            	<div className="main_numbers col-lg-12 col-md-12">
			                                <dl>
			                                	<dt className="clr mainNumber_label">
			                                        <label htmlFor="">Main Numbers</label>
			                                    </dt>
				                                <dd className="numbers circle bc_lotto d-inline-block">9</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">13</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">16</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">25</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">40</dd>
				                                <dd className="numbers circle bc_lotto d-inline-block">46</dd>
			                                </dl>
			                            </div>
		                            </div>
		                        </div>

		                        <div className="card-body pt-0" id="lotto">
		                            <div className="gameResults-main">
		                            	<div className="supplementary_numbers col-lg-12 col-md-12">
			                                <dl>
			                                	<dt className="clr supplementary_label">
			                                        <label htmlFor="">Supplementary</label>
			                                    </dt>
				                                <dd className="numbers circle supplementary d-inline-block">52</dd>
			                                </dl>
			                            </div>
		                            </div>
		                        </div>

					            <div className="card-footer container-fluid">
									<div className="row footerNextDraw">
										<h3 className="nextDraw">Next Draw: &#163;7,000,000</h3>
										<button className="btn btn-light ml-auto">Buy Now</button>
									</div>
								</div>

	                        </div>
							
						</div>
                </div>

	        </div>
	    </div>
	</div>

	<div className="container">
		<div className="media">
			<div className="row">
		
				<div className="media-body col-lg-6">
					<h4 className="media-heading">The UK&#39;s Home of Lottery <br/>Results Online
					</h4>
					<p className="media-content">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia, tellus quis rutrum vulputate, est augue pellentesque sem, vitae tempus ipsum lacus at tortor. In efficitur eu eros sed semper. 

						<br /><br />

						Vivamus molestie metus ac tincidunt iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque et arcu vel felis consequat maximus non at purus.

						<br /><br />
						
						Vivamus molestie metus ac tincidunt iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque et arcu vel felis consequat maximus non at purus.
					</p>
				</div>
				<div className="media-right col-lg-6 hidden-md-down">
					<a href="#">
					  <img className="img-fluid media-img hidden-md" src="../../img/girl_laptop.jpg" />
					</a>
				</div>
			</div>
		</div>	
	</div>

	<div className="notification-wrapper">
		<div className="container">
			<div className="media getNotified-container">
				<div className="row">
				
					<div className="media-body col-lg-8">
						<h4 className="media-heading notif-heading text-white">Draw Results Direct to Your Phone.</h4>
						<p className="notif-content text-white">
							Never miss the winning numbers! Get push notification over time UK lotto results are available for all your favorite lotteries.
						</p>
					</div>
					<div className="media-right notif-button col-lg-4">
						<button type="button" className="btn btn-light">Get Notified</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="container">
		<div className="uk-lotto-news-wrapper">
			<h1 className="my-4 text-center">Latest UK Lotto News
		    </h1>

		    <div className="row">
				<div className="col-lg-4 col-sm-6 portfolio-item">
					<div className="card h-100">
						<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

						<div className="card-body">
							<h4 className="card-title">
								<a href="#">Project Six</a>
							</h4>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
						</div>
					</div>
				</div>

				<div className="col-lg-4 col-sm-6 portfolio-item">
					<div className="card h-100">
						<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

						<div className="card-body">
							<h4 className="card-title">
								<a href="#">Project Six</a>
							</h4>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
						</div>
					</div>
				</div>

				<div className="col-lg-4 col-sm-6 portfolio-item">
					<div className="card h-100">
						<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

						<div className="card-body">
							<h4 className="card-title">
								<a href="#">Project Six</a>
							</h4>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
						</div>
					</div>
				</div>

		    </div>

		    <div className="row view-more-news">
				<button className="btn btn-primary">View More...</button>
			</div>
		</div>
	</div>

	<div className="subscribe-wrapper">
		<div className="container">
			<div className="subscribe-container">
				<div className="row">
				
					<div className="media-body subscribe-body col-lg-6">
						<h4 className="media-heading subscribe-heading text-white">Lottery Results in Your Inbox</h4>
						<p className="subscribe-content text-white">
							Get the latest UK lottery results direct to your email and never miss your lucky numbers!
						</p>
					</div>
					<div className="media-body subscribe-body right col-lg-6 subscribe">
						<div className="single">
							<div className="input-group">
					         <input type="email" className="form-control" placeholder="youremail@email.com" />
						        <span className="input-group-btn">
						        	<button className="btn btn-theme" type="submit">Subscribe</button>
					         	</span>
					        </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>

); } } export default HomeContainer;