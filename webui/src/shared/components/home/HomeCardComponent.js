import React, { Component } from "react"; 
class HomeCardComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};


		this.toggleShow = this.toggleShow.bind(this);
	} 

	componentWillMount(){
		this.setState({show: this.props.show})
	}

	toggleShow(){
		this.setState({
			show: !this.state.show
		})
	}

	render() {
		return (
	        <div className="col-lg-6 game_result">
	        	<div className="accordion md-accordion accordion-3 z-depth-1-half" role="tablist" aria-multiselectable="true">
					<div className="card">
						<div className="lottery-results-header accordion md-accordion accordion-3 z-depth-1-half" id="accordionEx1" role="tablist" aria-multiselectable="true" onClick={this.toggleShow}>
						    <a data-toggle="collapse" data-parent="#accordionEx1" href={"#card"+this.props.name} aria-expanded="true" aria-controls="collapse1">
	                        	<div className="game-result-header">
	                        		<div className="container">
										<div className="row game-row">
										    <div className="game-logo">
										    	<img className={"img-fluid "+this.props.game.variant+"-logo-lotto game-"+this.props.game.slug} src={"/img/variants/"+this.props.game.variant+"/"+((this.props.game.slug.includes("postcode"))?'postcode':this.props.game.slug)+".png"} />
										    </div>
										    <div className="prize-date">
										    	<p className="prize text-right">&#163;6,300,000</p>
												<p className="date text-right">Saturday 21 July 2018</p>
										    </div>
										    <div className="arrow-icon">
										    	<i className={"fa fa-angle-"+(this.state.show==true?'up':'down')+" rotate-icon fa-2x align-middle"}></i>
										    </div>
										</div>
									</div>
	                        	</div>
	                        </a>
						</div>
						
						<div id={"card"+this.props.name} className={"collapse "+(this.props.show==true?'show':'')} role="tabpanel" aria-labelledby="heading4" data-parent="#accordionEx1">
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
			                                <button className="btn btn-primary float-right">View Prizes</button>
		                                </dl>
		                            </div>
	                            </div>
	                        </div>

	                        <div className="gameResults-actionLink">
	                        	<div className="actionLink">
	                            	<div className="supplementary_numbers col-lg-12 col-md-12">
	                            		<div className="supp-link-icons">
	                            			<a className="icons"><img className="img-fluid icon-printresult" src="../../img/icons/print-results.svg" /></a>
			                            	<a className="icons"><img className="img-fluid icon-download" src="../../img/icons/download.svg" /></a>
			                            	<a className="icons icon-pastresult"><img className="img-fluid icon-pastresult" src="../../img/icons/past-results.svg" />Past Results</a>
			                            </div>
	                            	</div>
	                            </div>
	                        </div>

				            <div className="card-footer container">
								<div className="row footerNextDraw">
									<h3 className="nextDraw">Next Draw: &#163;7,000,000</h3>
									<button className="btn btn-light ml-auto">Buy Now</button>
								</div>
							</div>

	                    </div>
						
					</div>

	        	</div>
	        </div>
		); 
	}
}


export default HomeCardComponent;