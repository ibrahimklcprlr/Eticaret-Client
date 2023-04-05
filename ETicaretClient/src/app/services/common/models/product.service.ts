import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_images';
import { Create_Product } from '../../../contracts/create_product';
import { List_Product } from '../../../contracts/list_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"  
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?:
   (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = 
    this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "Products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }
  async readImages(id:string,successCallBack?: () => void):Promise<List_Product_Image[]>{
  const getproductImage:Observable<List_Product_Image[]> =this.httpClientService.get<List_Product_Image[]>({
      controller:"products",
      action:"GetProductImages",

    },id);
    const image:List_Product_Image[]=await firstValueFrom(getproductImage)
    successCallBack();
   return image;
  }
  async DeleteImage(productId:string,imageId:string,successCallBack?: () => void){
   const deleteProduct= this.httpClientService.delete({
      controller:"products",
      action:"DeleteProductImage",
      queryString:`imageId=${imageId}`
    },productId)
    await firstValueFrom(deleteProduct);
    successCallBack();
  }
  async changeShowcaseImage(imageId:string,productId:string,successCallBack?:()=>void):Promise<void>{
   const result= await this.httpClientService.put({
      controller:"products",
      action:"ChangeShowCaseImageFile",
      queryString:`imageId=${imageId}&productId=${productId}`
    },{})
    await firstValueFrom(result)
  }
}
