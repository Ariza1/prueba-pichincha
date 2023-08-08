import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ display: 'none' })),
      state('expanded', style({ display: 'block' })),
      transition('expanded <=> collapsed', animate('100ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableProductComponent {
  listProduct: Product[] = [];
  visibleElement: number |null = -1;

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  @Input() set products(products: Product[]) {
    this.listProduct = products;
  }

  goToEdit(producto: Product): void {
    this.storageService.addProduct(producto);
    this.router.navigate(['editar'])
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => this.toastr.success(`El producto se ha eliminado exitosamente`));
  }

}
