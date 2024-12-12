import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';
import { Maxlength, OperationMode } from '../../../../shared/enum/general.enum';
import { endPoints } from '../../../../shared/endPoints/end-points';
import { SharedModule } from '../../../../shared/shared.module';
import { OperationsService } from '../../../../shared/services/operations.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../../../shared/model/users.model';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss',
})
export class AddEditUserComponent {
  operationMode = OperationMode;
  @Input('itemData') itemData: any;
  @Input('sentOperationMode') sentOperationMode: string = OperationMode.ADD;
  @Output() onInnerActionEmmited = new EventEmitter<any>();
  currentLocale: string;
  addEditUserForm!: FormGroup;
  isLoading: boolean = false;
  endPoint: string = endPoints.operations.listUsers;
  selectedGender: string = '';
  imageSrc: string = '';
  singleUserData: any;
  isSubmiting: boolean = false;
  // -------------------------------------------------------------------------------------------------------------------------------------------------------
  constructor(
    private _fb: FormBuilder,
    private _sharedService: SharedService,
    private _operationsService: OperationsService,
    private _cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<AddEditUserComponent>
  ) {
    this.currentLocale = this._sharedService.getCurrentLocale();
    console.log('this.itemData', this.data);
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.initForm();
    if (this.data.modalMode === 'Edit') {
      this.getSingleUserDeatils(this.endPoint, this.data.itemId)
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  getSingleUserDeatils(endPoint: string, itemId: number) {
    this.isLoading = true;
    this._operationsService.getOperationItemById(endPoint, itemId).subscribe({
      next: (res: any) => {
        console.log('user data', res);
        this.isLoading = false;
        this.singleUserData = res.data;
        this.addEditUserForm.patchValue({
          ...res.data,
            name:res.data.first_name + ' ' +  res.data.last_name,
            job:res.data.email
        });
        this.imageSrc = res.data.avatar;
        this._cd.markForCheck();
      },
      error: (error: any) => {
        this.isLoading = true;
        if (error) {
          console.error('There was an error !', error);
        }
      },
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  get f() {
    return this.addEditUserForm.controls;
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  initForm() {
    this.addEditUserForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(Maxlength.NAME)]],
      job: ['', [Validators.required, Validators.maxLength(Maxlength.NAME)]]
    });
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.addEditUserForm.patchValue({
          fileSource: reader.result as string,
        });
      };
    }
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------
  submit() {
    if (this.data.modalMode === 'Add') {
      this.addNewUser();
    } else if (this.data.modalMode === 'Edit') {
      this.editUser();
    }
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------------------------
  addNewUser() {
    this.isSubmiting = true;
    let sentObject = {
      ...this.addEditUserForm.value,
    };
    // console.log('add item Form Before:', sentObject);
    if (this.addEditUserForm.valid) {
      this._operationsService
        .addNewOperationItem(this.endPoint, sentObject)
        .subscribe({
          next: (res: any) => {
            this._sharedService.showSweetAlert(
              'success',
              true,
              'SUCCESS_MESSAGE_TITLE',
              'SUCCESS_MESSAGE_DESC'
            );
            // console.log('add item Form After', sentObject);
            this.addEditUserForm.reset();
            this.onInnerActionEmmited.emit();
            this.isSubmiting = false;
            this._dialogRef.close({ success: true, data: res });
            this._cd.markForCheck();
          },
          error: (error: any) => {
            this.isSubmiting = false;
            console.error('thers is error:', error);
          },
        });
    } else {
      this.isSubmiting = false;
      this.addEditUserForm.markAllAsTouched();
      this._cd.markForCheck();
      this._sharedService.showSweetAlert(
        'error',
        true,
        'ERROR_MESSAGE_TITLE',
        'ERROR_MESSAGE_DESC'
      );
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------
  editUser() {
    this.isSubmiting = true;
    let sentObject = {
      id: this.data.itemId,
      ...this.addEditUserForm.value,
    };
    // console.log('edit Form Before:', sentObject);
    if (this.addEditUserForm.valid) {
      this._operationsService
        .updateOperationItem(this.endPoint, this.data.itemId, sentObject)
        .subscribe({
          next: (res: any) => {
            this._sharedService.showSweetAlert(
              'success',
              true,
              'SUCCESS_MESSAGE_TITLE',
              'SUCCESS_MESSAGE_DESC'
            );
            // console.log('edit Form after:', sentObject);
            this._dialogRef.close({ success: true, data: res });
            this.addEditUserForm.reset();
            this.onInnerActionEmmited.emit();
            this.isSubmiting = false;
            this._cd.markForCheck();
          },
          error: (error: any) => {
            this.isSubmiting = false;
            console.error('thers is error:', error);
          },
        });
    } else {
      this.isSubmiting = false;
      this.addEditUserForm.markAllAsTouched();
      this._sharedService.showSweetAlert(
        'error',
        true,
        'ERROR_MESSAGE_TITLE',
        'ERROR_MESSAGE_DESC'
      );
      this._cd.markForCheck();
    }
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------------------------
}
