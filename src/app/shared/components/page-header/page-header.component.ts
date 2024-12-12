import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() title1!:string;
  @Input() activeTitle!:string;
  @Input() activeLink!:string;
  @Input() activeSubTitle!:string;
  @Input() activeSubLink!:string;
  @Input() actionLabel:string = 'ADD_NEW';
  @Input() actionIcon:string = '';
  @Input() showActionBtn:boolean = false;
  @Output() onInnerActionEmitted = new EventEmitter<any>();

  onAtionEmitted(){
    this.onInnerActionEmitted.emit();
  }
}
