import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  bioImage: any;
  bioBackground = '../../../assets/background-homage.jpg';
  constructor() {
  }

  ngOnInit(): void {
  }

}
