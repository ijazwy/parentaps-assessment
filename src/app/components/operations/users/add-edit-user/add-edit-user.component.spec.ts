import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserComponent } from './add-edit-user.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

class MockTranslateService {
  setDefaultLang(lang: string) {}
  use(lang: string) {}
}

describe('AddEditUserComponent', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddEditUserComponent,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({}) } },
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
