import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Input() isAddButton: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
