import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderMaintainanceComponent } from './under-maintainance.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('UnderMaintainanceComponent', () => {
  let component: UnderMaintainanceComponent;
  let fixture: ComponentFixture<UnderMaintainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderMaintainanceComponent, RouterModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } },
        { 
          provide: TranslateService, 
          useValue: { 
            get: jasmine.createSpy().and.returnValue(of('mocked-translation')),
            use: jasmine.createSpy()
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderMaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
