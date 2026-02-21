// Helper function to format product data
const mapProduct = (item) => ({
  id: item.id,
  title: item.title,
  price: Math.round(item.price * 40), // Convert to INR with a simple multiplier
  description: item.description,
  category: item.category,
  image: item.thumbnail || item.images[0], 
  rating: {
    rate: item.rating,
    count: item.reviews ? item.reviews.length * 15 : Math.floor(Math.random() * 200) + 50 
  }
});

// 1. GET ALL 100 PRODUCTS
export const getProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=100', {
    next: { revalidate: 60 } 
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
 
  
  return data.products.map(mapProduct);
};

// 2. GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  const data = await res.json();
  return mapProduct(data);
};

// 3. --- UPDATED: GET MASTER CATEGORIES WITH IMAGES ---
export const getCategories = async () => {
  // A. Fetch the base list of names
  const res = await fetch('https://dummyjson.com/products/categories', {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const categoriesList = await res.json();

  // B. For each category, fetch 1 product to get a thumbnail image
  // We use Promise.all to fetch them all concurrently for speed.
  const categoriesWithImages = await Promise.all(
    categoriesList.map(async (cat) => {
      try {
        // Fetch just 1 items from this category
        const productRes = await fetch(`https://dummyjson.com/products/category/${cat.slug}?limit=1`, { next: { revalidate: 3600 } });
        const productData = await productRes.json();
        // Grab the thumbnail of the first item
        const thumbnail = productData.products[0]?.thumbnail || null;

        // Return the original category data plus the new thumbnail
        return { ...cat, thumbnail };
      } catch (error) {
        console.error(`Failed to fetch image for category ${cat.slug}`, error);
        // Fallback if image fetch fails
        return { ...cat, thumbnail: null }; 
      }
    })
  );

  return categoriesWithImages;
};

// 4. GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (categorySlug) => {
  const res = await fetch(`https://dummyjson.com/products/category/${categorySlug}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error(`Failed to fetch category: ${categorySlug}`);
  const data = await res.json();
  return data.products.map(mapProduct);
};