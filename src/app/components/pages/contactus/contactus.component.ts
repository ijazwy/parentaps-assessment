import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommingsoonComponent } from '../../authentication/commingsoon/commingsoon.component';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [SharedModule, CommingsoonComponent],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

}
