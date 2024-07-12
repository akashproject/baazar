import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SessionsComponent } from './pages/sessions/sessions.component';
import { TrainersComponent } from './pages/trainers/trainers.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderComponent } from './pages/order/order.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LiveSessionsComponent } from './components/live-sessions/live-sessions.component';
import { ComingSessionsComponent } from './components/coming-sessions/coming-sessions.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { FeaturedVideoComponent } from './components/featured-video/featured-video.component';
import { BeforeFooterComponent } from './components/before-footer/before-footer.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { OnlineCourseComponent } from './components/online-course/online-course.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TodaysUpcomingSessionComponent } from './components/todays-upcoming-session/todays-upcoming-session.component';
import { TomorrowUpcomingSessionComponent } from './components/tomorrow-upcoming-session/tomorrow-upcoming-session.component';
import { MoreUpcomingSessionComponent } from './components/more-upcoming-session/more-upcoming-session.component';
import { TrainerBioComponent } from './pages/trainer-bio/trainer-bio.component';
import { TrainerListComponent } from './pages/trainer-list/trainer-list.component';
import { InnerHeaderComponent } from './components/inner-header/inner-header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { StartSessionComponent } from './pages/start-session/start-session.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatBadgeModule } from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,LoginComponent,SignupComponent,SessionsComponent,TrainersComponent,TrainerComponent,CartComponent,CheckoutComponent,ThankYouComponent,OrdersComponent,OrderComponent,ResetPasswordComponent,HeaderComponent,FooterComponent,LiveSessionsComponent,ComingSessionsComponent,FeaturedVideoComponent,BeforeFooterComponent,SearchComponent,OnlineCourseComponent,NotificationComponent,TodaysUpcomingSessionComponent,TomorrowUpcomingSessionComponent,MoreUpcomingSessionComponent,TrainerBioComponent,TrainerListComponent,InnerHeaderComponent,DashboardComponent,PaymentSuccessComponent,StartSessionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatBadgeModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [HttpClientModule, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
