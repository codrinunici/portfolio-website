import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
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
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


/** todo: responsive navbar and pictures
 *        analytics
 *        router animations
 *        spinner on load and async load of data
 *        dynamic background
 *        change full images size (smaller)
 *        fix portfolio modal
 *        rest of pages
 * */
