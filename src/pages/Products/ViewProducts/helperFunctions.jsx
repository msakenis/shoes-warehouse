export function showUpdateBtn(enteredQntyValues, enteredPriceValues, data) {
  const qntyValueArr = Object.values(enteredQntyValues);
  const priceValueArr = Object.values(enteredPriceValues);
  const defaultPriceArr = Object.values(setDefaultPrices(data));

  return (
    !(data.length === 0) && // if no data do not show update button
    (!qntyValueArr.length === 0 || //check if no values were changed do not show the button update
      !qntyValueArr.every((item) => item === 0) || //check if all values 0 then no need to show button either
      !(JSON.stringify(priceValueArr) === JSON.stringify(defaultPriceArr))) && // check if any changes were made to prices and show button if yes
    !priceValueArr.some((item) => item < 0) // if any of prices are negative hides the update button
  );
}
export function setDefaultPrices(data) {
  const dataObj = {};
  data.map((item) => Object.assign(dataObj, { [item.id]: item.price }));
  return dataObj;
}
