import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDetailsComponent } from './view-user-details.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('ViewUserDetailsComponent', () => {
  let component: ViewUserDetailsComponent;
  let fixture: ComponentFixture<ViewUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserDetailsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
