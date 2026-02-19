import { getProductById } from "@/lib/api";

export default async function ProductDetails({ params }) {
  const { id } = await params;   

  const product = await getProductById(id);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price}</p>
    </div>
  );
}
