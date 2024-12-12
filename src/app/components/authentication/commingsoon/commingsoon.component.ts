import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-commingsoon',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './commingsoon.component.html',
  styleUrls: ['./commingsoon.component.scss'],
})
export class CommingsoonComponent {
}
