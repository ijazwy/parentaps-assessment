import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusComponent } from './aboutus.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('AboutusComponent', () => {
  let component: AboutusComponent;
  let fixture: ComponentFixture<AboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutusComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
