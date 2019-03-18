import React, { Component } from 'react';
import Item from './item';

class ItemsContainer extends Component {
	constructor(props) {
		super(props);
	}

  render() {

    return (
    	<div id="content" className="site-content">
			<div id="primary" className="content-area">
				<main id="main" className="site-main" role="main">	
					<div id="primary" className="content-area">
						<div className="container">
							<div className="row">
								<ul className="products columns-3">
									{this.props.items.map(function(item, idx){
										return (
											<Item key={idx} item={item}/>
										)
									})}
								</ul>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
    );
  }
}

export default ItemsContainer;