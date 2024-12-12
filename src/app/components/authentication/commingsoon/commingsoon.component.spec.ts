import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingsoonComponent } from './commingsoon.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('CommingsoonComponent', () => {
  let component: CommingsoonComponent;
  let fixture: ComponentFixture<CommingsoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommingsoonComponent, RouterModule, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommingsoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
