import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './src/app/pages/homepage/homepage.component';
import {ContactComponent} from './src/app/pages/contact/contact.component';
import {PortraitsComponent} from './src/app/pages/portfolio-pages/portraits/portraits.component';
import {SeriesComponent} from './src/app/pages/series/series.component';
import {HomageComponent} from './src/app/pages/portfolio-pages/homage/homage.component';
import {PeopleComponent} from './src/app/pages/people/people.component';
import {FestivalsComponent} from './src/app/pages/portfolio-pages/festivals/festivals.component';
import {LastNightComponent} from './src/app/pages/portfolio-pages/last-night/last-night.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'series', component: SeriesComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'portraits', component: PortraitsComponent},
  {path: 'festivals', component: FestivalsComponent},
  {path: 'homage', component: HomageComponent},
  {path: 'last-night', component: LastNightComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
