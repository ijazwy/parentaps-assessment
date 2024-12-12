import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss'],
})
export class NoDataFoundComponent {
  @Input('notFoundImage') notFoundImage:string = './assets/images/no-results.png';
  @Input('notFoundMsg') notFoundMsg:string = 'NO_DATA_FOUND';
  @Input('showResetBtn') showResetBtn:boolean = false;

  resetData() {
    window.location.reload();
  }
}
