import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { BookaddandupdateComponent } from './bookaddandupdate/bookaddandupdate.component';
import { CartComponent } from './cart/cart.component';
// import { BookopComponent } from './bookop/bookop.component';
import { CategoryComponent } from './category/category.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'adminpage', component: AdminpageComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'adminpage/bookaddandupdate', component: BookaddandupdateComponent },
  {path:'cart',component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
