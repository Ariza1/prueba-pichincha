import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.url}`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/bp/products`)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/bp/products`, product)
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/bp/products`, product)
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiUrl}/bp/products?id=${productId}`)
  }

  validateId(product: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/bp/products/verification?id=${product}`)
  }
}
