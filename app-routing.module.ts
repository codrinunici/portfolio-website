import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './src/app/pages/homepage/homepage.component';
import {BioComponent} from './src/app/pages/bio/bio.component';
import {ContactComponent} from './src/app/pages/contact/contact.component';
import {TragedyComponent} from './src/app/pages/portfolio-pages/tragedy/tragedy.component';
import {PortraitsComponent} from './src/app/pages/portfolio-pages/portraits/portraits.component';
import {SeriesComponent} from './src/app/pages/series/series.component';
import {HomageComponent} from './src/app/pages/portfolio-pages/homage/homage.component';
import {EventsComponent} from './src/app/pages/events/events.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'bio', component: BioComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'series', component: SeriesComponent},
  {path: 'events', component: EventsComponent},
  {path: 'portraits', component: PortraitsComponent},
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
