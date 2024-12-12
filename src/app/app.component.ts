import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Locale } from './shared/enum/general.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Parent Aps Assessment';

  constructor(public  _translateSrv: TranslateService, private _elementRef: ElementRef) {
    const htmlElement =  this._elementRef.nativeElement.ownerDocument.documentElement;
    const defaultLang:string | null = localStorage.getItem('language')? localStorage.getItem('language') : Locale.English;
    this._translateSrv.setDefaultLang(defaultLang!);
    this._translateSrv.use(defaultLang!);
  }
}
