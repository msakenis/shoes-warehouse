export function showUpdateBtn(enteredQntyValues, enteredPriceValues, data) {
  const qntyValueArr = Object.values(enteredQntyValues).map(Number);
  const priceValueArr = Object.values(enteredPriceValues).map(Number);
  const defaultPriceArr = Object.values(setDefaultPrices(data)).map(Number);

  return (
    data &&
    !(data.length === 0) && // if no data do not show update button
    (!qntyValueArr.length === 0 || //check if no values were changed do not show the button update
      !qntyValueArr.every((item) => item === 0) || //check if all values 0 then no need to show button either
      !(JSON.stringify(priceValueArr) === JSON.stringify(defaultPriceArr))) && // check if any changes were made to prices and show button if yes
    !priceValueArr.some((item) => item < 0) // if any of prices are negative hides the update button
  );
}
export function setDefaultPrices(data) {
  if (data) {
    const dataObj = {};
    data.map((item) => Object.assign(dataObj, { [item.id]: item.price }));
    return dataObj;
  } else {
    return {};
  }
}

export function handleDeleteHistory(action) {
  const productsHistory = JSON.parse(localStorage.getItem('productsHistory'));
  const updatedProductHistory = productsHistory.filter(
    (product) => product.productId !== action.payload.id
  );
  localStorage.setItem(
    'productsHistory',
    JSON.stringify(updatedProductHistory)
  );
}

export function handleNewHistory(productHistory, product, type) {
  let historyArr = [];
  let historyValue;
  return productHistory.map((item) => {
    if (item.productId === product.id) {
      if (type === 'price') {
        historyValue = +product.price;
        historyArr = item.priceHistory;
      } else if (type === 'quantity') {
        historyArr = item.quantityHistory;
        historyValue = +product.currentQnty;
      }

      historyArr.push([Date.now(), historyValue]);
    }
    return item;
  });
}
