import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { ProductService } from 'src/app/core/services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productservice: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['updateProduct', 'addProduct'])
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [
        { provide: ProductService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    productservice = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
