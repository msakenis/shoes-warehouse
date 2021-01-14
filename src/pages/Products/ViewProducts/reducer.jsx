import ACTIONS from '../../../actions';
import { setDefaultPrices } from './helperFunctions';

export function reducer(data, action) {
  switch (action.type) {
    case ACTIONS.HANDLE_CHECKBOX:
      let newData = data.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, active: !product.active };
        } else {
          return product;
        }
      });

      localStorage.setItem('products', JSON.stringify(newData)); // emulate db
      return newData;

    case ACTIONS.DELETE_PRODUCT:
      let productData = data.filter(
        (product) => product.id !== action.payload.id
      );
      action.payload.setEnteredPriceValues(setDefaultPrices(productData)); // reset entered prices array to not show update btn after delete of product.

      localStorage.setItem('products', JSON.stringify(productData)); // emulate db
      return productData;
    case ACTIONS.UPDATE_PRODUCTS:
      let updatedProducts = data.map((product) => {
        // most iteractions with data would do in back-end. In front end usually you fetch already filtered data
        if (action.payload.quantity[product.id]) {
          product = {
            ...product,
            currentQnty:
              (+product.currentQnty || 0) +
                +action.payload.quantity[product.id] <
              0
                ? 0
                : (+product.currentQnty || 0) +
                  +action.payload.quantity[product.id],
          };
        }
        if (action.payload.price[product.id] >= 0) {
          product = {
            ...product,
            price: +action.payload.price[product.id] || 0,
          };
        }
        return product;
      });
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      action.payload.toast({
        title: 'Updated successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });

      return updatedProducts;

    default:
      return data;
  }
}
