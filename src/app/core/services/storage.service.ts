import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private product: Product = { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' };
  private store = new BehaviorSubject<Product>({id: '', name: '', description: '', logo: '', date_release: '', date_revision: ''});
  store$ = this.store.asObservable();


  addProduct(product: Product) {
    this.product = product;
    this.store.next(this.product);
  }
}
