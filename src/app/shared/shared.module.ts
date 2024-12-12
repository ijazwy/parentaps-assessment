import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentLayoutComponent,
    PageHeaderComponent,
    FooterComponent,
    AuthenticationLayoutComponent,
    NoDataFoundComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModuleModule
  ],
  exports: [
    HeaderComponent,
    ContentLayoutComponent,
    PageHeaderComponent,
    FooterComponent,
    AuthenticationLayoutComponent,
    TranslateModule,
    NoDataFoundComponent
  ],
  providers: [TranslateModule]
})
export class SharedModule {}
