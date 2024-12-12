import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommingsoonComponent } from '../../authentication/commingsoon/commingsoon.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [SharedModule, CommingsoonComponent],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {

}
