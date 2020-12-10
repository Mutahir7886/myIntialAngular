import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import {FormsModule} from '@angular/forms';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ADMINGUARD, DashboardGuard, HOMEPAGEGUARD, MYCUSTOMGUARD} from './shared/services/Guard';
import { CoursesGuard } from './shared/services/Guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { MyelementtableComponent } from './myelementtable/myelementtable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FinalformComponent } from './finalform/finalform.component';
import {addPipe, expoPipe, MypipesComponent} from './pipes/mypipes/mypipes.component';
import { ApifetchComponent } from './components/apifetch/apifetch.component';
import {ToastrModule} from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import { EmailComponent } from './components/email/email.component';
import { TabledataComponent } from './components/tabledata/tabledata.component';
import { ConfigComponent } from './components/config/config.component';
import {NgxMaskModule} from 'ngx-mask';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { EmailselectComponent } from './components/emailselect/emailselect.component';
import { EmailselectmethodComponent } from './components/emailselectmethod/emailselectmethod.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { RecordMusicComponent } from './components/record-music/record-music.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { GooglemapsComponent } from './components/googlemaps/googlemaps.component';
import { AgmCoreModule } from '@agm/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SelectbyuserComponent } from './components/selectbyuser/selectbyuser.component';
import { LoginsignupComponent } from './components/loginsignup/loginsignup.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule, FirebaseApp} from "@angular/fire";
import {environment} from "../environments/environment";
import {Authservice} from "./shared/services/authservice";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/database";
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { HomecartComponent } from './components/homecart/homecart.component';
import { CartselectedComponent } from './components/cartselected/cartselected.component';
import { AdmindashbordComponent } from './components/admindashbord/admindashbord.component';
import { UserhisComponent } from './components/userhis/userhis.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import {MatIconModule} from "@angular/material/icon";
import {LightboxModule} from "ngx-lightbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import { ZaitoonComponent } from './zaitoon/zaitoon.component';
import {HttpService} from "../services/http.service";
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    DashboardComponent,
    ShopComponent,
    MyelementtableComponent,
    FinalformComponent,
    MypipesComponent,
    addPipe,
    expoPipe,
    ApifetchComponent,
    EmailComponent,
    TabledataComponent,
    ConfigComponent,
    EmailselectComponent,
    EmailselectmethodComponent,
    RecordMusicComponent,
    StopwatchComponent,
    GooglemapsComponent,
    SidebarComponent,
    SelectbyuserComponent,
    LoginsignupComponent,
    LoginformComponent,
    HomePageComponent,
    AdminProductsComponent,
    HomecartComponent,
    CartselectedComponent,
    AdmindashbordComponent,
    UserhisComponent,
    UserprofileComponent,
    ZaitoonComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule, ToastrModule.forRoot({
      timeOut: 5000, positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatTableModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3sm4cDszTQmSPBAWm65Y4XyQ4EJhZkps'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    MatIconModule,
    LightboxModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,

  ],
  providers: [DashboardGuard, CoursesGuard, Authservice, MYCUSTOMGUARD, HOMEPAGEGUARD, ADMINGUARD],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
