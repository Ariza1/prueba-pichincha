import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ProductService } from './product.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../intercetors/token.interceptor';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        {
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        }
      ]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getAllProducts', () => {

    it('should be a function', () => {
      expect(typeof service.getAllProducts).toBe('function')
    });

    it('should be a observable of products', (doneFn) => {
      const mockData: Product[] = [
        {
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: '2023-02-01',
          date_revision: '2024-02-01'
        }
      ];
      service.getAllProducts().subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should contain a header Authorid', (doneFn) => {
      const mockData: Product[] = [
        {
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: '2023-02-01',
          date_revision: '2024-02-01'
        }
      ];
      service.getAllProducts().subscribe((data) => {
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      expect(req.request.headers.get('Authorid')).toEqual('123456')
      req.flush(mockData);
    });

    it('should be a method GET', (doneFn) => {
      const mockData: Product[] = [
        {
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: '2023-02-01',
          date_revision: '2024-02-01'
        }
      ];
      service.getAllProducts().subscribe((data) => {
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET')
      req.flush(mockData);
    });
  })

  describe('test for addProduct', () => {

    it('should be a function', () => {
      expect(typeof service.addProduct).toBe('function')
    });

    it('should be a observable of product', (doneFn) => {
      const mockData: Product = {
        id: 'trj-crdjj',
        name: 'Tarjetas de Créditoooo',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01',
        date_revision: '2024-02-01'
      };
      service.addProduct(mockData).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should contain a header Authorid', (doneFn) => {
      const mockData: Product = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01',
        date_revision: '2024-02-01'
      };
      service.addProduct(mockData).subscribe((data) => {
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      expect(req.request.headers.get('Authorid')).toEqual('123456')
      req.flush(mockData);
    });

    it('should be a method POST', (doneFn) => {
      const mockData: Product = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01',
        date_revision: '2024-02-01'
      };
      service.addProduct(mockData).subscribe((data) => {
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST')
      req.flush(mockData);
    });
  })

  describe('test for updateProduct', () => {

    it('should be a function', () => {
      expect(typeof service.updateProduct).toBe('function')
    });

    it('should be a observable of product', (doneFn) => {
      const mockData: Product = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01',
        date_revision: '2024-02-01'
      };
      service.updateProduct(mockData).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should contain a header Authorid', (doneFn) => {
      const mockData: Product = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01',
        date_revision: '2024-02-01'
      };
      service.updateProduct(mockData).subscribe((data) => {
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      expect(req.request.headers.get('Authorid')).toEqual('123456')
      req.flush(mockData);
    });

    it('should be a method PUT', (doneFn) => {
      const mockData: Product = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2023-02-01',
        date_revision: '2024-02-01'
      };
      service.updateProduct(mockData).subscribe((data) => {
        doneFn()
      })
      const url = `${environment.url}/bp/products`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT')
      req.flush(mockData);
    });
  })

  describe('test for deleteProduct', () => {

    it('should be a function', () => {
      expect(typeof service.deleteProduct).toBe('function')
    });

    it('should be a observable of string', (doneFn) => {
      service.deleteProduct('trj-crm').subscribe((data) => {
        expect(data).toEqual('Product successfully removed');
        doneFn()
      })
      const url = `${environment.url}/bp/products?id=trj-crm`;
      const req = httpController.expectOne(url);
      req.flush('Product successfully removed');
    });

    it('should contain a header Authorid', (doneFn) => {
      service.deleteProduct('trj-crm').subscribe(() => {
        doneFn()
      })
      const url = `${environment.url}/bp/products?id=trj-crm`;
      const req = httpController.expectOne(url);
      expect(req.request.headers.get('Authorid')).toEqual('123456')
      req.flush('Product successfully removed');
    });

    it('should be a method DELETE', (doneFn) => {
      service.deleteProduct('trj-crm').subscribe(() => {
        doneFn()
      })
      const url = `${environment.url}/bp/products?id=trj-crm`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE')
      req.flush('Product successfully removed');
    });
  })

  describe('test for validId', () => {

    it('should be a function', () => {
      expect(typeof service.validateId).toBe('function')
    });

    it('should be a observable of boolean', (doneFn) => {
      let id = 'trj-crd';
      service.validateId(id).subscribe((data) => {
        expect(data).toEqual(true);
        doneFn()
      })
      const url = `${environment.url}/bp/products/verification?id=${id}`;
      const req = httpController.expectOne(url);
      req.flush(true);
    });

    it('should contain a header Authorid', (doneFn) => {
      let id = 'trj-crd';
      service.validateId(id).subscribe(() => {
        doneFn()
      })
      const url = `${environment.url}/bp/products/verification?id=${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.headers.get('Authorid')).toEqual('123456')
      req.flush(true)
    });

    it('should be a method GET', (doneFn) => {
      let id = 'trj-crd';
      service.validateId(id).subscribe(() => {
        doneFn()
      })
      const url = `${environment.url}/bp/products/verification?id=${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET')
      req.flush(true)
    });
  })

});
