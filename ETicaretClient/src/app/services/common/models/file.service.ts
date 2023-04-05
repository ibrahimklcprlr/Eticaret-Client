
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/baseurl';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl():Promise<BaseUrl>{
    const result:Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
        controller:"files",
        action:"GetBaseUrl"
    })
   return await firstValueFrom(result);
  }
}