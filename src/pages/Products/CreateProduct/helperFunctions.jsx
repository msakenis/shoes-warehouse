export function createRandomEANNumber() {
  // randomly generates 13digit number
  return Math.floor(Math.random() * 1000000000000 + 1000000000000);
}
export function generateUniqueId(products) {
  if (products.length) {
    return products.sort((a, b) => a.id - b.id).slice(-1)[0].id + 1; //sorts by id to get highest id number and +1 to have unique id
  } else {
    return 1;
  }
}
