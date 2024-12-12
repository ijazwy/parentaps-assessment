import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataFoundComponent } from './no-data-found.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('NoDataFoundComponent', () => {
  let component: NoDataFoundComponent;
  let fixture: ComponentFixture<NoDataFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDataFoundComponent ],       
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
