export function sortByNameAndPrice(arr, filterValue) {
  const name = "Име";
  const price = "Цена";

  if (filterValue === name) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filterValue === price) {
    arr.sort((a, b) => a.prices.price - b.prices.price);
  }
  return arr;
}
