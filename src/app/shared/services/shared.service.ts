import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Locale } from '../enum/general.enum';
import { environment } from '../../environments/environment';

const POLISA_API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private photoSource = new BehaviorSubject<any>(null);
  currentPhoto = this.photoSource.asObservable();
  public storedLlanguage = signal<string | null>(localStorage.getItem('language'));
  currentLocale: any;
  // ---------------------------------------------------------------------------------------------------------------
  constructor(
    private _http: HttpClient,
    private _translate: TranslateService,
    private _clipboard: Clipboard,
    private _router: Router
  ) {}
  // ---------------------------------------------------------------------------------------------------------------
  changePhoto(photo: any) {
    this.photoSource.next(photo);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------
  public showSweetAlert(
    type: 'success' | 'error' | 'warning' | 'info' | 'question',
    isToast: boolean,
    title: string = 'TITLE',
    text: string = 'TEXT',
    position:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'center'
      | 'center-start'
      | 'center-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end' = 'top-end',
    timer: number = 3000,
    showConfirmButton: boolean = false,
    showCancelButton: boolean = false
  ) {
    Swal.fire({
      toast: isToast,
      position: position,
      title: this._translate.instant(title),
      text: this._translate.instant(text),
      showConfirmButton: showConfirmButton,
      showCancelButton: showCancelButton,
      icon: type,
      timer: timer,
    });
  }
  //-----------------------------------------------------------------------------------------------------------------------------------
  public async showSweetAlertWithConfirm(title: string, text:string, confirmedCallback: () => void): Promise<void> {
    const result = await Swal.fire({
      title: this._translate.instant(title),
      text: this._translate.instant(text),
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: this._translate.instant('YES'),
      cancelButtonText: this._translate.instant('NO'),
    });

    if (result.isConfirmed) {
      confirmedCallback();
      // this.showSweetAlert('success', true, 'SUCCESS_MESSAGE_TITLE', 'SUCCESS_MESSAGE_DESC' );
    }
  }
  // ---------------------------------------------------------------------------------------------------------------
  getCurrentLocale() {
    let currentLocale: string = Locale.English;
    localStorage.getItem('language') === Locale.Danish? (currentLocale = Locale.Danish) : (currentLocale = Locale.English);
    return currentLocale;
  }
  // ------------------------------------------------------------------------------------------------------------------------------
  formattedDate(sentDate: any, sentFormat: string) {
    const locale = 'en-US';
    return formatDate(sentDate, sentFormat, locale);
  }
  // --------------------------------------------------------------------------------------------------------------------------------
  setCulture(sentLocale: string) {
    let params = new HttpParams();
    params = params.append('languageCode', sentLocale);

    return this._http.post<any>(
      `${POLISA_API_URL}/account/set-culture`,
      {},
      { params: params }
    );
  }
  //-----------------------------------------------------------------------------------------
  scrollTo(section: string) {
    const ELEMENT = document.querySelector('#' + section);
    if (ELEMENT) {
      ELEMENT.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
  //-----------------------------------------------------------------------------------------------------------
  copyText(txt: any) {
    this._clipboard.copy(txt.innerText);
  }
  // ---------------------------------------------------------------------------------------------------------------
  getLookupItem(lookupName:string, params:any = ''): Observable<any> {
    return this._http.get<any>(`${POLISA_API_URL}/lookup/${lookupName}/${params}`);
  }
  //----------------------------------------------------------------------------------------------------------
  public async getLookupItemAsyncly(lookupName:string, params:any = ''): Promise<boolean> {
    const result = await lastValueFrom(this.getLookupItem(lookupName, params));
    return result;
  }
  //----------------------------------------------------------------------------------------------------------
  public returnFalse() {
    return false;
  }
  // -------------------------------------------------------------------------------------------------------------------------------
  navigateToLink(path:string){
    this._router.navigateByUrl(path);
  }
  // -------------------------------------------------------------------------------------------------------------------------------
  doPrint(params:any = ''){
    window.print();
  }
  /* --------------------------------------------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------------------------------------------------- */
}
