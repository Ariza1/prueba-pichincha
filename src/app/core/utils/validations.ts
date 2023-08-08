import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { isAfter, addYears, format, addDays } from "date-fns";
import { Product } from "../models/product.model";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ProductService } from "../services/product.service";
import { Observable } from "rxjs";

export function addYear(date: string, cantOfYear: number): string {
  return format(new Date(addYears(new Date(date), cantOfYear)), 'Y-MM-dd');
}

export function addDay(date: string, cantOfDays: number): string {
  return format(new Date(addDays(new Date(date), cantOfDays)), 'Y-MM-dd');
}

export function beforeToday(control: AbstractControl): { beforeToday: true } | null {
  const date = new Date(control.value);
  return !isAfter(date, new Date()) ? null : { beforeToday: true };
}

export function getCurrentRoute(): string {
  return window.location.pathname.split('/')[1]
}

export function filterProducts(listOfProducts: Product[], palabra: string): Product[] {
  return listOfProducts.filter(x => includeSearch(x,  palabra))
}

export function includeSearch(producto: Product, palabra: string): boolean {
  return Object.entries(producto).some(x => x[0] != 'logo' && x[1].includes(palabra));
}
 export function createValidator(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return productService.validateId(control.value).pipe(
      debounceTime(800),
      distinctUntilChanged(),
      map((result: boolean) => result ? null : { invalidId: true})
    );
  };
}
