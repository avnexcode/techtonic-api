export class CreateProductRequest {
  name: string;
  price: string;
  image: string;
  discount?: number;
  description?: string;
  tokopedia_link?: string;
  shopee_link?: string;
  tiktok_link?: string;
  category_id?: string;
}

export class UpdateProductRequest {
  name?: string;
  price?: string;
  image?: string;
  discount?: number;
  description?: string;
  tokopedia_link?: string;
  shopee_link?: string;
  tiktok_link?: string;
  category_id?: string;
}
