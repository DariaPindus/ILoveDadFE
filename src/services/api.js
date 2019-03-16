import axios from 'axios';

import * as API from './api_constants'

//todo : temp until I find something smarter
let cache = {
  categories : []
}

const itemsURL = process.env.PUBLIC_URL + '/mock/items.json';// 'C:\\Users\\Asus\\Documents\\react-tutorial\\my-app\\src\\mock_data.json';
const categoriesURL = process.env.PUBLIC_URL + '/mock/categs.json';
// export const itemsAPI = "http://localhost:8001/api/items";
/*export const fetchItems = (filters, sortBy, callback) => dispatch => {
  return axios
    .get(itemsURL)
    .then(res => {
      let { items } = res.data;

      if (!!filters && filters.length > 0) {
        items = items.filter(p =>
          filters.find(f => p.availableSizes.find(size => size === f))
        );
      }

      if (!!sortBy) {
        items = items.sort(compare[sortBy]);
      }

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_items,
        payload: items
      });
    })
    .catch(err => {
      console.log('Could not fetch items. Try again later.');
    });
};*/

export function fetchItems() {
  return axios
      .get(API.GET_ITEMS)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

export function fetchCategories() {
  if (cache.categories)
    return cache.categories;

  return axios
    .get(categoriesURL)
    .then(function (response)) {
      cache.categories = response.data;
      return response.data;
    }
    .catch(function (error) {
        console.log(error);
    });
}