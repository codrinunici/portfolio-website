import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-home-alias',
  templateUrl: './home-alias.component.html',
  styleUrls: ['./home-alias.component.scss']
})
export class HomeAliasComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean>;

  constructor() {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }

}
