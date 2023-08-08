import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'agregar',
    component: AddProductComponent
  },
  {
    path: 'editar',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
