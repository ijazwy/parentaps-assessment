import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public _sharedService:SharedService){

  }

}
