import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {GoogleAnalyticsService} from "../../api/google-analytics.service";


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

  constructor(private analytics: GoogleAnalyticsService) {
    this.destroy$ = new Subject<boolean>();
  }

  navbarRespond() {
    const nav = document.getElementById('bottomNav');
    if (nav.className === 'bottom-nav') {
      nav.className += ' responsive';
    } else {
      nav.className = 'bottom-nav';
    }
  }


  ngOnInit(): void {
    // kill responsive nav on window click
    let menuToggled = false;
    const icon = document.getElementsByClassName('nav-icon').item(0) as HTMLElement;
    fromEvent(icon, 'click').pipe(takeUntil(this.destroy$)).subscribe(data => {
      menuToggled = true;
    });

    const nav = document.getElementById('bottomNav');
    fromEvent(document, 'click').pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!menuToggled) {
        nav.className = 'bottom-nav';
      } else {
        menuToggled = false;
      }
    });

    // set icon bigger on phones
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

  // eventName: string,
  // eventCategory: string,
  // eventAction: string,
  // eventLabel: string = null,
  // eventValue: number = null
  logNavOption(option: string) {
    this.analytics.eventEmitter(option +
      '_nav_click', 'navigation', 'click');
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
