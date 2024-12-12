import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../../enum/general.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input('appliedIn') appliedIn: string = 'content-layout';
  locale = Locale;
  selectedLang: string;

  constructor(
    public _navServices: NavService,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    public _translateSrv: TranslateService,
    public _authservice: AuthService
  ) {
    this.selectedLang = localStorage.getItem('language') as string;    
  }
  public menuItems!: Menu[];
  public items!: Menu[];
  //-----------------------------------------------------------------------------------------
  ngOnInit() {
    this._navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
    });
  }
  //-----------------------------------------------------------------------------------------
  public changeLanguage(language: string): void {
    const htmlElement =
      this._elementRef.nativeElement.ownerDocument.documentElement;
    if (language) {
      // console.log('language', language);
      this.selectedLang = language;
      this._translateSrv.use(language);
      localStorage.setItem('language', language);
      document.location.reload();
    }
  }
  //-----------------------------------------------------------------------------------------
  isLogged(){
    if (this._authservice.currentUserValue) {
      return true;
    }
    else{
      return false;
    }
  }
  //-----------------------------------------------------------------------------------------
  doLogOut() {
    this._authservice.logout();
  }
  //-----------------------------------------------------------------------------------------
}
