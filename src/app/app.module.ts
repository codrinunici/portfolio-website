import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AppComponent} from './app.component';
import {HomeCarouselComponent} from './components/home-carousel/home-carousel.component';
import {HomeAliasComponent} from './components/home-alias/home-alias.component';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';
import {BioComponent} from './pages/bio/bio.component';
import {ContactComponent} from './pages/contact/contact.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TragedyComponent} from './pages/portfolio-pages/tragedy/tragedy.component';
import {PortraitsComponent} from './pages/portfolio-pages/portraits/portraits.component';
import {SeriesComponent} from './pages/series/series.component';
import {LoadSpinnerComponent} from './components/load-spinner/load-spinner.component';
import {PortfolioPageTemplateComponent} from './pages/templates/portfolio-page-template/portfolio-page-template.component';
import {HomageComponent} from './pages/portfolio-pages/homage/homage.component';
import {EventsPortraitsTemplateComponent} from './pages/templates/events-portraits-template/events-portraits-template.component';
import {CollectionSelectionTemplateComponent} from './pages/templates/collection-selection-template/collection-selection-template.component';
import {PeopleComponent} from './pages/people/people.component';
import {EventsComponent} from './pages/portfolio-pages/events/events.component';
import {FestivalsComponent} from './pages/portfolio-pages/festivals/festivals.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DisableRightClickDirective } from './disable-right-click.directive';
import {HttpClientModule} from '@angular/common/http';
import {GoogleAnalyticsService} from './api/google-analytics.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeCarouselComponent,
    HomeAliasComponent,
    HomepageComponent,
    BioComponent,
    ContactComponent,
    NavbarComponent,
    TragedyComponent,
    PortraitsComponent,
    SeriesComponent,
    LoadSpinnerComponent,
    PortfolioPageTemplateComponent,
    HomageComponent,
    EventsPortraitsTemplateComponent,
    CollectionSelectionTemplateComponent,
    PeopleComponent,
    EventsComponent,
    FestivalsComponent,
    DisableRightClickDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


/** todo:
 *        unsubscribe observables at end of life **
 *        initial deploy/analytics
 *        centralize templates
 *        spinner and parallax on app.component only
 *        */


