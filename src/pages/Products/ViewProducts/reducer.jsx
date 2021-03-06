import ACTIONS from '../../../actions';
import {
  setDefaultPrices,
  handleDeleteHistory,
  handleNewHistory,
} from './helperFunctions';

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
      const productData = data.filter(
        (product) => product.id !== action.payload.id
      );
      action.payload.setEnteredPriceValues(setDefaultPrices(productData)); // reset entered prices array to not show update btn after delete of product.

      localStorage.setItem('products', JSON.stringify(productData)); // emulate db

      // takes products history data and deletes the product which was deleted from the list
      // this is back-end function
      handleDeleteHistory(action);

      return productData;

    case ACTIONS.UPDATE_PRODUCTS:
      let updatedProductHistory = action.payload.productsHistory;

      // most iteractions with data would do in back-end without data mutation. In front end usually you fetch already filtered data
      const updatedProducts = data.map((product) => {
        const enteredQuantity = action.payload.quantity[product.id];
        const enteredPrices = action.payload.price[product.id];

        //quantity management section
        if (enteredQuantity && +enteredQuantity !== 0) {
          product = {
            ...product,
            currentQnty:
              (+product.currentQnty || 0) + +enteredQuantity < 0
                ? 0
                : (+product.currentQnty || 0) + +enteredQuantity,
          };

          //quantity history management
          updatedProductHistory = handleNewHistory(
            updatedProductHistory,
            product,
            'quantityHistory',
            enteredQuantity
          );
        }

        //price management section
        if (+enteredPrices !== +product.price) {
          product = {
            ...product,
            price: +enteredPrices || 0,
          };

          //price history management
          updatedProductHistory = handleNewHistory(
            updatedProductHistory,
            product,
            'priceHistory'
          );
        }
        return product;
      });
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      localStorage.setItem(
        'productsHistory',
        JSON.stringify(updatedProductHistory)
      );
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
