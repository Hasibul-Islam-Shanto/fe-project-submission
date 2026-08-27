import { ProductListItem } from "./productList";

export interface GraphQLResponse {
  data?: {
    getProducts?: {
      message?: string;
      statusCode?: number;
      result?: {
        count: number;
        products: ProductListItem[];
      };
    };
  };
  errors?: { message: string }[];
}
