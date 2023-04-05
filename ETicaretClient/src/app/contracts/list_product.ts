import { List_Product_Image } from "./list_product_images";

export class List_Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  createdDate: Date;
  updatedDate: Date;
  ProductImages?:List_Product_Image[];
  imagePath:string;
}


