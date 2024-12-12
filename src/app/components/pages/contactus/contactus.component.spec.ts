import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusComponent } from './contactus.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
