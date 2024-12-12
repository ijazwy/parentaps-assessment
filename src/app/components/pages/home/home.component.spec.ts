import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        SharedService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
