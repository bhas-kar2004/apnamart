export const getProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 60 } // Enables ISR (Recommended)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
};
