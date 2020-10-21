import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarOptions = [
    {name: 'Home', path: ''},
    {name: 'Projects', path: 'series'},
    {name: 'People', path: 'people'},
    {name: 'Contact', path: 'contact'}
  ];
  destroy$: Subject<boolean>;

  navbarRespond() {
    const nav = document.getElementById('bottomNav');
    if (nav.className === 'bottom-nav') {
      nav.className += ' responsive';
    } else {
      nav.className = 'bottom-nav';
    }
  }

  constructor() {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnInit(): void {
    // resize navbar based on scroll
    // const navObjects = document.getElementsByClassName('nav-object');
    // console.log(actualWindowWidthScale)
    // const icon = document.getElementsByClassName('nav-icon').item(0) as HTMLElement;
    // icon.style.fontSize = '40px';
    // icon.style.marginBottom = '15px';
    // fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$)).subscribe(data => {
    //     if (document.scrollingElement.scrollTop + document.documentElement.clientHeight > document.documentElement.offsetHeight - 50) {
    //       for (let i = 0; i < navObjects.length; ++i) {
    //         const check = navObjects.item(i) as HTMLElement;
    //         check.style.fontSize = String(actualWindowWidthScale + 40) + 'px';
    //       }
    //       icon.style.fontSize = '40px';
    //       icon.style.marginBottom = '15px';
    //     } else {
    //       for (let i = 0; i < navObjects.length; ++i) {
    //         const check = navObjects.item(i) as HTMLElement;
    //         check.style.fontSize = String(actualWindowWidthScale) + 'px';
    //       }
    //       icon.style.fontSize = '25px';
    //       icon.style.marginBottom = '0px';
    //     }
    //   }
    // );
    const icon = document.getElementsByClassName('nav-icon').item(0) as HTMLElement;
    icon.style.fontSize = '25px';
    icon.style.marginBottom = '15px';
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$)).subscribe(data => {
        if (document.scrollingElement.scrollTop + document.documentElement.clientHeight > document.documentElement.offsetHeight - 50) {
          icon.style.fontSize = '40px';
          icon.style.marginBottom = '15px';
        } else {
          icon.style.fontSize = '25px';
          icon.style.marginBottom = '0px';
        }
      }
    );
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
