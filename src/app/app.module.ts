import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SessionsComponent,
    TrainersComponent,
    TrainerComponent,
    CartComponent,
    CheckoutComponent,
    ThankYouComponent,
    OrdersComponent,
    OrderComponent,
    ResetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    LiveSessionsComponent,
    ComingSessionsComponent,
    FeaturedVideoComponent,
    BeforeFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
