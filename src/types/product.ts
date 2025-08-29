export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
/* knip-ignore */
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

