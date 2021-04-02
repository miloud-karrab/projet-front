
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductImage } from 'src/app/Entity/ProductImage';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  addImage(form: FormData): Observable<ProductImage> {
    return this.http.post<ProductImage>('http://127.0.0.1:8000/api/product_images', form);
  }


}
