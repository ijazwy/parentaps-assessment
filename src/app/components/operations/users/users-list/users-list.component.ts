import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared.service';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { MatTableDataSource } from '@angular/material/table';
import { endPoints } from '../../../../shared/endPoints/end-points';
import { OperationMode } from '../../../../shared/enum/general.enum';
import { UserModel } from '../../../../shared/model/users.model';
import { SharedModule } from '../../../../shared/shared.module';
import { OperationsService } from '../../../../shared/services/operations.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewUserDetailsComponent } from '../view-user-details/view-user-details.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

const BODY_CLASSES = ['users-page'];

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    MaterialModuleModule,
    ViewUserDetailsComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @ViewChild('closeModalBtn', { static: true }) closeModalBtn!: ElementRef;
  @ViewChild('openModalBtn', { static: true }) openModalBtn!: ElementRef;
  itemDataList: any[] = [];
  operationMode = OperationMode;
  modalMode: string = OperationMode.ADD;
  endPoint: string = endPoints.operations.listUsers;
  selectedItem: any;
  currentLocale: string;
  isLoading: boolean = false;
  itemDataCount: number = 0;
  pageMinItems: number = 6;
  displayedColumns: string[] = ['nameDk', 'nameEn'];
  dataSource = new MatTableDataSource<UserModel>([]);
  paginatorEvent: any;
  pageIndex: any;
  showDetailsPanel: any;
  selectedIndex: number | null = null;
  // -----------------------------------------------------------------------------------------------------------------------------------
  constructor(
    private _sharedService: SharedService,
    private _operationsService: OperationsService,
    private _translate: TranslateService,
    private _cd: ChangeDetectorRef,
    public _dialog: MatDialog
  ) {
    this.currentLocale = this._sharedService.getCurrentLocale();
  }
  //--------------------------------------------------------------------------------------------------------------------------------------
  async ngOnInit() {
    this.getUsers(this.endPoint, '?page=2');
    BODY_CLASSES.forEach((c) => document.body.classList.add(c));
  }
  //---------------------------------------------------------------------------------------------------------------------------------------
  getUsers(endPoint: string, params: any) {
    this.isLoading = true;
    this._operationsService.getOperationsItems(endPoint, params).subscribe({
      next: (res: any) => {
        // console.log('datalist res', res);
        this.isLoading = false;
        this.itemDataList = res.data;
        this.itemDataCount = res.total;
        this.dataSource = new MatTableDataSource<UserModel>(res.data);
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
  //----------------------------------------------------------------------------------------------------------------------------------------
  openDialog(sentModalMode:string, sentItemId:any) {
    const _dialog = this._dialog.open(AddEditUserComponent, {
      width: '400px',
      data: { 
        modalMode:sentModalMode,
        itemId:sentItemId
       }
    });
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  viewUserDetails(item: any, index:number) {
    this.selectedItem = item;
    this.showDetailsPanel = true;
    this.selectedIndex = index;
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  closeDetailsPanel(){
    this.showDetailsPanel = false;
    this.selectedIndex = -1;
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------
  onInnerActionEmmited(event: any) {
    // this.closeModalBtn.nativeElement.click();
    //  const index = this.itemDataList.findIndex((element: any) => element.id === item.id);
    //  this.itemDataList.splice(index,1);
    // this.getUsers(this.endPoint, '?page=2');
    this.itemDataList = this.itemDataList.filter((element: any) => element.id !== event.id);
    this.closeDetailsPanel();
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------
  onInnerEditEmitted(event: any){
    // console.log(event);
    this.openDialog(OperationMode.EDIT, event.id);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------
  onPageActionEmitted(event: any) {
    // console.log(event);
    this.openDialog(OperationMode.ADD, null);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
}
