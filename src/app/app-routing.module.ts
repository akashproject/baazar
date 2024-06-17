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
import { TrainerBioComponent } from './pages/trainer-bio/trainer-bio.component';
import { TrainerListComponent } from './pages/trainer-list/trainer-list.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'trainers', component: TrainerListComponent },
  { path: 'trainer-bio', component: TrainerBioComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
