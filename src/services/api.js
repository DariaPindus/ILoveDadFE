import axios from 'axios';


const itemsURL =
  'C:\\Users\\Asus\\Documents\\react-tutorial\\my-app\\src\\mock_data.js\\mock_data.js';
// export const itemsAPI = "http://localhost:8001/api/items";
export const fetchItems = (filters, sortBy, callback) => dispatch => {
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
};
