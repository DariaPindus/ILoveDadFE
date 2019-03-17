import React, { Component } from 'react';

class InlineCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory : 'all', 
      categories : []
    }
  }

  componentWillMount() {
    fetchCategories().then(response => {
      let categories = response;
      this.setState(categories : categories);
    });
  }

  handleCategorySelected(category) {
    this.props.onCategorySelected(category);
  }

  render() {
    let liClassName = "menu-item menu-item-type-custom menu-item-object-custom current-menu-item";

    return (
      <div class="categories">
        <div class="container">
          <div class="row">
            <nav id="categories-menu" class="categories-navigation site-navigation">
              <div class="menu-shop-menu-container">
                <ul id="categories-menu" class="menu nav-menu">
                  {this.state.categories.map(function(cat, idx){
                    return (
                      <li key={idx} className={liClassName}><a onClick={() => this.handleCategorySelected(cat.id)}>{cat.name}</a></li>
                      )
                  })}
                </ul>
              </div>         
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default InlineCategories;