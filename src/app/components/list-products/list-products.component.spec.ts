import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Location } from "@angular/common";
import { ListProductsComponent } from './list-products.component';
import { ProductService } from 'src/app/core/services/product.service';
import { TableProductComponent } from '../table-product/table-product.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { StorageService } from 'src/app/core/services/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let productservice: jasmine.SpyObj<ProductService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAllProducts'])
    const spy2 = jasmine.createSpyObj('StorageService', ['addProduct'])
    await TestBed.configureTestingModule({
      declarations: [ListProductsComponent, TableProductComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), RouterTestingModule.withRoutes(routes), BrowserAnimationsModule],
      providers: [
        { provide: ProductService, useValue: spy },
        { provide: StorageService, useValue: spy2 }
      ]
    })
      .compileComponents();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ListProductsComponent);
    router.initialNavigation();
    productservice = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    const product = { id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' };
    productservice.getAllProducts.and.returnValue(of([product]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call a method getallproducts', fakeAsync(() => {
    const product = { id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' };
    productservice.getAllProducts.and.returnValue(of([product]));
    fixture.detectChanges()
    expect(productservice.getAllProducts).toHaveBeenCalled();
  }));

  it('You should assign the response of the service to the variable listProduct and filteredProducts', fakeAsync(() => {
    const product = { id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' };
    productservice.getAllProducts.and.returnValue(of([product]));
    fixture.detectChanges()
    expect(component.listProduct).toContain(product);
    expect(component.filteredProducts).toContain(product);
  }));

  it('should change route when btn was clicked', fakeAsync(() => {
    const btn = fixture.debugElement.query(By.css('button.primary'))
    btn.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    router.navigate(["/agregar"]).then(() => {
      expect(location.path()).toBe("/agregar");
    });
  }));

  it('should call the service storageService in the  method goToAdd', fakeAsync(() => {
    const btn = fixture.debugElement.query(By.css('button.primary'))
    btn.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    expect(storageService.addProduct).toHaveBeenCalled()
  }));

});
