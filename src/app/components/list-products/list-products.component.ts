import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { filterProducts } from '../../core/utils/validations';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  listProduct: Product[] = [];
  filteredProducts: Product[] = [];
  formFilter: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.formFilter = this.fb.group({ search: [''] })
    this.formFilter.get('search')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(value => this.filteredProducts = filterProducts(this.listProduct, value))
  }

  ngOnInit(): void {
    this.getProducts()
  }

  goToAdd(): void {
    this.storageService.addProduct({ id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' });
    this.router.navigate(['agregar'])
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(resp => {
      this.listProduct = this.filteredProducts = resp
    });
  }

}

