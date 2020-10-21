import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './src/app/pages/homepage/homepage.component';
import {ContactComponent} from './src/app/pages/contact/contact.component';
import {TragedyComponent} from './src/app/pages/portfolio-pages/tragedy/tragedy.component';
import {PortraitsComponent} from './src/app/pages/portfolio-pages/portraits/portraits.component';
import {SeriesComponent} from './src/app/pages/series/series.component';
import {HomageComponent} from './src/app/pages/portfolio-pages/homage/homage.component';
import {PeopleComponent} from './src/app/pages/people/people.component';
import {EventsComponent} from './src/app/pages/portfolio-pages/events/events.component';
import {FestivalsComponent} from './src/app/pages/portfolio-pages/festivals/festivals.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'series', component: SeriesComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'portraits', component: PortraitsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'festivals', component: FestivalsComponent},
  {path: 'tragedy', component: TragedyComponent},
  {path: 'homage', component: HomageComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
