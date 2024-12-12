import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { first, fromEvent } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Maxlength } from '../../../shared/enum/general.enum';
import { MatIconModule } from '@angular/material/icon';

const BODY_CLASSES = ['overflow-y-hidden'];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //angular
  public loginForm!: FormGroup;
  public error: any = '';
  isLoading: boolean = false;

  constructor(
    // @Inject(DOCUMENT) private document: Document,
    private sharedSrv: SharedService,
    public authservice: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    BODY_CLASSES.forEach((c) => document.body.classList.add(c));
    this.initForm();
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  initForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(Maxlength.USERNAME),
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(Maxlength.PASSWORD),
        ]
      ],
    });
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  get f() {
    return this.loginForm.controls;
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  Submit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authservice
        .login(this.f['username'].value, this.f['password'].value)
        .pipe(first())
        .subscribe({
          next: (res: any) => {
            this.router.navigate(['/operations/users']);
          },
          error: (error: any) => {
            this.isLoading = false;
            console.error('thers is error:', error);
          },
        });
    } else {
      this.isLoading = false;
      this.loginForm.markAllAsTouched();
      this.sharedSrv.showSweetAlert(
        'error',
        true,
        'ERROR_MESSAGE_TITLE',
        'ERROR_MESSAGE_DESC'
      );
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  showPassword = false;
  toggleClass = 'visibility_off';
  toggleVisibility() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === 'visibility_off') {
      this.toggleClass = 'visibility';
    } else {
      this.toggleClass = 'visibility_off';
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  ngOnDestroy(): void {
    BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------
}
