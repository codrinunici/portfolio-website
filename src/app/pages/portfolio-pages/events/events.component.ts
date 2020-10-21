import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  //input
  imagesPath = 'events';
  backgroundImage = '../../../../assets/background-portraits.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
