export const getProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
};
