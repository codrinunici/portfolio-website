import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import $ from 'jquery';

declare var $: $;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

}
