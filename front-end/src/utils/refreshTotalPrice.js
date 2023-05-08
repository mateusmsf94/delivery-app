export default function refreshTotalPrice(productData, qty) {
  const productList = productData.map((product) => {
    const price = (qty[product.id] * product.price);
    const priceFixed = price ? price.toFixed(2) : 0;
    return Number(priceFixed);
  });

  return productList.reduce((acc, cur) => acc + cur, 0);
}
