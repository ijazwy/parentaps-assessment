import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsRoutingModule } from '../../components/operations/operations.routes';
import { pagesRoutingModule } from '../../components/pages/pages.routes';

export const content: Routes = [
  {
    path: '',
    children: [
      ...OperationsRoutingModule.routes
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(content)],
  exports: [RouterModule],
})
export class SaredRoutingModule {}
