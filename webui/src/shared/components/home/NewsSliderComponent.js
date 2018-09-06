import React, { Component } from "react"; 
import Slider from "react-slick";

class NewsSliderComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const settings = {
			className: "news-slider",
			arrows: false,
	        slidesToShow: 3,
	        slidesToScroll: 3,
			centerMode: false,
			centerPadding: '100px',
			dots: false,
	      	responsive: [
	      		{
		      		breakpoint: 992,
				    settings: {
						arrows: true,
				        slidesToShow: 1,
				        slidesToScroll: 1,
						centerMode: false,
						centerPadding: '100px',
						dots: true,
				    }
			    }
	      	]
	    };
		return (
			<Slider {...settings}>
		        {[...Array(6)].map((x, i)=>{
		        	return (
		        		<div key={i} className="col-lg-12 portfolio-item">
							<div className="card h-100">
								<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

								<div className="card-body">
									<a href="#">
										<h3 className="card-title blog-title">Wow... What a Blog Title! {i}</h3>
									</a>
									<p className="card-text blog-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
								</div>
							</div>
						</div>
		        	)
		        })}
		    </Slider>
		)
	}
}


export default NewsSliderComponent;