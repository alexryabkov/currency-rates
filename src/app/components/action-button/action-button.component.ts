import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Input() isAddButton: boolean = true;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.btnClick.emit();
  }
}
