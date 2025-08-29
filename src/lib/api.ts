import { Product } from '@/types/product';

const API_BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';

export async function fetchProducts(limit?: number): Promise<Product[]> {
  try {
    const url = limit ? `${API_BASE_URL}/products?limit=${limit}` : `${API_BASE_URL}/products`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProduct(id: string): Promise<Product> {

  try {
    const url = `${API_BASE_URL}/products/${id}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await fetchProducts();
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}