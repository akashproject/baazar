import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SessionsComponent } from './pages/sessions/sessions.component';
import { TrainersComponent } from './pages/trainers/trainers.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { TrainerBioComponent } from './pages/trainer-bio/trainer-bio.component';
import { TrainerListComponent } from './pages/trainer-list/trainer-list.component';
import { DashboardComponent  } from './pages/dashboard/dashboard.component';
import { StartSessionComponent } from './pages/start-session/start-session.component';
import { AuthGuard } from "./guard/auth.guard";
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'trainers', component: TrainerListComponent },
  { path: 'trainer-bio/:id', component: TrainerBioComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thank-you', component: ThankYouComponent,canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent,canActivate: [AuthGuard] },
  { path: 'payment-success', component: PaymentSuccessComponent,canActivate: [AuthGuard] },
  { path: 'dashboard',component : DashboardComponent,canActivate: [AuthGuard] },
  { path: 'start-session/:id',component : StartSessionComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
