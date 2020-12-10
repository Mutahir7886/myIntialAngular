import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursesComponent} from './courses/courses.component'
import {CourseDetailComponent} from './course-detail/course-detail.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {ADMINGUARD, DashboardGuard, HOMEPAGEGUARD, MYCUSTOMGUARD} from './shared/services/Guard';

import { CoursesGuard } from './shared/services/Guard';
import {ShopComponent} from './shop/shop.component';
import {MyelementtableComponent} from './myelementtable/myelementtable.component';
import {FinalformComponent} from './finalform/finalform.component';
import {ApifetchComponent} from './components/apifetch/apifetch.component';
import {EmailComponent} from "./components/email/email.component";
import {TabledataComponent} from "./components/tabledata/tabledata.component";
import {ConfigComponent} from "./components/config/config.component";
// import {CheckselectComponent} from "./components/checkselect/checkselect.component";
import {EmailselectmethodComponent} from "./components/emailselectmethod/emailselectmethod.component";
import {StopwatchComponent} from "./components/stopwatch/stopwatch.component";
import {GooglemapsComponent} from "./components/googlemaps/googlemaps.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SelectbyuserComponent} from "./components/selectbyuser/selectbyuser.component";
import {LoginsignupComponent} from "./components/loginsignup/loginsignup.component";
import {LoginformComponent} from "./components/loginform/loginform.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AdminProductsComponent} from "./components/admin-products/admin-products.component";
import {HomecartComponent} from "./components/homecart/homecart.component";
import {CartselectedComponent} from "./components/cartselected/cartselected.component";
import {AdmindashbordComponent} from "./components/admindashbord/admindashbord.component";
import {UserhisComponent} from "./components/userhis/userhis.component";
import {UserprofileComponent} from "./components/userprofile/userprofile.component";
import {ZaitoonComponent} from "./zaitoon/zaitoon.component";
import {LoginComponent} from "./components/login/login.component";



const routes: Routes = [
  {path: 'shop', component: ShopComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tabble', component: MyelementtableComponent},
  {path: 'friday', component: FinalformComponent},
  {path: 'details/:id', component: CourseDetailComponent},
  // {path: 'courses', component: CoursesComponent, canActivate:[CoursesGuard]}];
  {path: 'courses', component: CoursesComponent},
  {path: 'covid', component: ApifetchComponent},
  {path: 'email', component: EmailComponent},
  {path: 'table', component: TabledataComponent},
  {path: 'config', component: ConfigComponent},
  // {path: 'ngmultiselect', component: CheckselectComponent},
  {path: 'ngselect', component: EmailselectmethodComponent},
  {path: 'audiorecord', component: StopwatchComponent},
  {path: 'googlemaps', component: GooglemapsComponent},
  {path: 'sidebar', component: SidebarComponent},
  {path: 'selectuser', component: SelectbyuserComponent},
  {path: 'signup', component: LoginsignupComponent, canActivate: [MYCUSTOMGUARD]},
  // {path: 'login', component: LoginformComponent, canActivate: [ MYCUSTOMGUARD]},
  {path: 'homepage', component: HomePageComponent, canActivate: [HOMEPAGEGUARD]},
  {path: 'AdminProducts', component: AdminProductsComponent , canActivate: [ADMINGUARD]},
  {path: 'homecart', component: HomecartComponent},
  {path: 'cartselected', component: CartselectedComponent},
  {path: 'admindashboard', component: AdmindashbordComponent , canActivate: [ADMINGUARD]},
  {path: 'userhis', component: UserhisComponent},
  {path: 'userprofile', component: UserprofileComponent},
  {path: 'zaitoon', component: ZaitoonComponent},
  {path: 'login', component: LoginComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
