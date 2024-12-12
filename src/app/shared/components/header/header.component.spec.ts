import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

// Mock TranslateService
class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {
    return of(); // Mock `use` method that returns an observable
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],  // Declare the component being tested
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterModule], // Add HttpClientTestingModule here
      providers: [
        AuthService,  // Provide the real AuthService
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } }, // Mock ActivatedRoute
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
