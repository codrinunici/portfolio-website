import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarOptions = [
    {name: 'Series', path: 'series'},
    {name: 'Portraits', path: 'portraits'},
    {name: 'Bio', path: 'bio'},
    {name: 'Contact', path: 'contact'}
  ];
  destroy$: Subject<boolean>;

  navbarRespond() {
    const x = document.getElementById('bottomNav');
    if (x.className === 'bottom-nav') {
      x.className += ' responsive';
    } else {
      x.className = 'bottom-nav';
    }
  }

  constructor() {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
