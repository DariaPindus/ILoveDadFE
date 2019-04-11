import React, { Component } from 'react';
import ContactForm from './contact-form';

const CONTACT_BANNER_URL = "/img/architectural-design_cut.jpg";

const backgroundStyle = {
  		background: 'url(' + CONTACT_BANNER_URL + ')', 
  		backgroundSize: 'cover'
  	};

class ContactPageBanner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formOpen : false
		};
	}

	render() {

		return (
			<div id="belise_ribbon-widget-4">
				<div className="ribbon">
					<div className="container">
						<div className="row">
							<div class="text-center ribbon-content">
							<h5 className="ribbon-content">Свяжитесь с нами</h5>
							<h3 >Если у вас возникли вопросы, и вы хотели бы с нами связаться - воспользуйтесь формой.</h3>
							<a className="btn" onClick={() => this.setState({formOpen : !this.state.formOpen})}>Связаться</a>
							</div>
						</div>
					</div>
					<div className="ribbon-image" style={backgroundStyle}></div>
				</div>
				<ContactForm open={this.state.formOpen}
							handleClose={() => this.setState({formOpen : false})}/>
			</div>
			);
	}
}

export default ContactPageBanner;