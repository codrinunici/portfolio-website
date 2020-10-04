import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {fader} from '../routing-animations';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader]
})

export class AppComponent implements OnDestroy {
  private destroy$: Subject<boolean>;

  constructor() {
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
