import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TableProductComponent } from './table-product.component';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { StorageService } from 'src/app/core/services/storage.service';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableProductComponent', () => {
  let component: TableProductComponent;
  let fixture: ComponentFixture<TableProductComponent>;
  let productservice: jasmine.SpyObj<ProductService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['deleteProduct'])
    const spy2 = jasmine.createSpyObj('StorageService', ['addProduct'])
    await TestBed.configureTestingModule({
      declarations: [ TableProductComponent ],
      imports: [ ToastrModule.forRoot(), RouterTestingModule.withRoutes(routes), BrowserAnimationsModule],
      providers: [
        { provide: ProductService, useValue: spy },
        { provide: StorageService, useValue: spy2 }
      ]
    })
    .compileComponents();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TableProductComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    productservice = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receibe the info', () => {
    component.products = [{ id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' }]
    fixture.detectChanges();
    expect(component.listProduct).toEqual([{ id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' }])
  });

  it('should change route when to editar btn was clicked', fakeAsync(() => {
    component.products = [{ id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' }]
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('a.lista'))
    btn.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    const btnEditar = fixture.debugElement.query(By.css('a#editar'))
    btnEditar.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    router.navigate(["/editar"]).then(() => {
      expect(location.path()).toBe("/editar");
    });
  }));

  it('should call the service storageService in the  method goToEdit', fakeAsync(() => {
    component.products = [{ id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' }]
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('a.lista'))
    btn.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    const btnEditar = fixture.debugElement.query(By.css('a#editar'))
    btnEditar.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    expect(storageService.addProduct).toHaveBeenCalled()
  }));


  it('should call the service productservice in the  method deleteProduct', fakeAsync(() => {
    component.products = [{ id: 'trj', name: 'tarjeta', description: 'desc', logo: 'logo', date_release: '2023-02-01', date_revision: '2024-02-01' }]
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('a.lista'))
    btn.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    const btnEliminar = fixture.debugElement.query(By.css('a#delete'))
    btnEliminar.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()
    expect(productservice.deleteProduct).toHaveBeenCalled()
  }));
});
