import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { addYear, addDay, beforeToday, getCurrentRoute, createValidator } from 'src/app/core/utils/validations';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy {
  form: FormGroup;
  edit: boolean = false;
  storeSub: Subscription;
  product: Product = { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' };

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {
    this.edit = getCurrentRoute() != 'agregar';
    this.storeSub = this.storageService.store$.subscribe(product => this.product = product);
    this.form = this.fb.group({
      id: [this.product.id, [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [createValidator(this.productService)]],
      idD: [{ value: this.product.id, disabled: this.edit }],
      name: [this.product.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [this.product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [this.product.logo, Validators.required],
      date_release: [this.product.date_release != '' ? format(new Date(this.product.date_release), 'Y-MM-dd') : '', [Validators.required, beforeToday]],
      date_revision: [this.product.date_revision != '' ? format(new Date(this.product.date_revision), 'Y-MM-dd') : ''],
      date_revisionD: [{ value: this.product.date_revision != '' ? format(new Date(this.product.date_revision), 'Y-MM-dd') : '', disabled: true }],
    })
    this.form.get('date_release')?.valueChanges.subscribe(value => {
      this.form.get('date_revision')?.setValue(addDay(addYear(value, 1), 2))
      this.form.get('date_revisionD')?.setValue(addDay(addYear(value, 1), 2))
    })
  }
  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.edit) {
      this.productService.updateProduct(this.form.value).subscribe(() => {
        this.toastr.success(`Se ha guardado el producto exitosamente`)
        this.router.navigate([''])
      })
    } else {
      this.productService.addProduct(this.form.value).subscribe(() => {
        this.toastr.success(`Se ha guardado el producto exitosamente`)
        this.router.navigate([''])
      })
    }
  }
}

