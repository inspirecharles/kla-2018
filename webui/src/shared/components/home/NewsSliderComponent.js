import React, { Component } from "react"; 
import Slider from "react-slick";

class NewsSliderComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const settings = {
			className: "news-slider",
			arrows: true,
			centerMode: false,
			dots: true,
			infinite: false,
	      	responsive: [
	      		{
		      		breakpoint: 6000,
				    settings: {
				        slidesToShow: 3,
				        slidesToScroll: 3,
				        dots: false,
				        arrows: false,
				    }
			    },
	      		{
		      		breakpoint: 992,
				    settings: {
				        slidesToShow: 2,
				        slidesToScroll: 2,
				    }
			    },
	      		{
		      		breakpoint: 768,
				    settings: {
				        slidesToShow: 1,
				        slidesToScroll: 1,
						centerMode: true,
				    }
			    },
	      		{
		      		breakpoint: 576,
				    settings: {
				        slidesToShow: 1,
				        slidesToScroll: 1,
						centerMode: true,
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
									<h3 className="card-title blog-title">
										<a href="#">Wow... What a Blog Title! {i}</a>
									</h3>
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