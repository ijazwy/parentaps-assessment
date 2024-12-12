import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterModule} from'@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SharedModule],
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss']
})
export class Error500Component {

}
