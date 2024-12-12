import {Component, inject, Injectable, NgModule} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  private translate = inject(TranslateService);

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  // firstPageLabel = $localize`First page`;
  // itemsPerPageLabel = $localize`Items per page:`;
  // lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  firstPageLabel = this.translate.instant('FIRST_PAGE');
  itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE');
  lastPageLabel = this.translate.instant('LAST_PAGE');
  nextPageLabel = this.translate.instant('NEXT_PAGE');
  previousPageLabel = this.translate.instant('PREVIOUS_PAGE');

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.updateLabels();
    });
    this.updateLabels(); // Initial labels setup
  }
  private updateLabels() {
    this.firstPageLabel = this.translate.instant('FIRST_PAGE');
    this.itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE');
    this.lastPageLabel = this.translate.instant('LAST_PAGE');
    this.nextPageLabel = this.translate.instant('NEXT_PAGE');
    this.previousPageLabel = this.translate.instant('PREVIOUS_PAGE');
    this.changes.next(); // Notify about the label changes
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translate.instant('PAGE1OF1');
    }
    const amountPages = Math.ceil(length / pageSize);
    return `${this.translate.instant('PAGE')} ${page + 1} ${this.translate.instant('OF')} ${amountPages}`;
  }
}