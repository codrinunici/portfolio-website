import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOptions = [
    {name: 'Series', path: 'series'},
    {name: 'Portraits', path: 'portraits'},
    {name: 'Bio', path: 'bio'},
    {name: 'Contact', path: 'contact'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
