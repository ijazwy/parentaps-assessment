import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { SharedService } from '../../../../shared/services/shared.service';
import { OperationsService } from '../../../../shared/services/operations.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { endPoints } from '../../../../shared/endPoints/end-points';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-user-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, MaterialModuleModule, HttpClientModule, TranslateModule],
  templateUrl: './view-user-details.component.html',
  styleUrl: './view-user-details.component.scss'
})
export class ViewUserDetailsComponent {
  @Input('itemDate') itemDate: any;
  @Output() onInnerActionEmmited = new EventEmitter<any>();
  @Output() onInnerEditEmitted = new EventEmitter<any>();
  currentLocale: string;
  endPoint: string = endPoints.operations.listUsers;
  // -----------------------------------------------------------------------------------------------------------------------------------
  constructor(
    private _sharedService: SharedService,
    private _operationsService: OperationsService,
    private _translate: TranslateService,
    private _cd: ChangeDetectorRef
  ) {
    this.currentLocale = this._sharedService.getCurrentLocale();
  }  
  //----------------------------------------------------------------------------------------------------------------------------------------
  editItem(item:any){
    this.onInnerEditEmitted.emit(item);
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  deleteItem(item: any) {
    this._sharedService.showSweetAlertWithConfirm('DELETE_USER_TITLE', `${this._translate.instant('DELETE_ITEM_DESCRIPTION')}:  ${item.first_name} ${item.last_name}`, () => {
      this._operationsService.deleteOperationItem(this.endPoint, item.id).subscribe({
        next: (res: any) => {
           this._sharedService.showSweetAlert('success', true, 'SUCCESS_MESSAGE_TITLE', 'SUCCESS_MESSAGE_DESC' );
           this.onInnerActionEmmited.emit(item);      
        },
        error: (error: any) => {
          if(error){console.error('There was an error !', error)};
        }
      });
    });
  }

}
