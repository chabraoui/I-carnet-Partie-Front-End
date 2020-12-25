import { ListUsersComponent } from './components/list-users/list-users.component';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { ListAddressComponent } from './components/list-address/list-address.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterAuthGuard } from './guard/after-auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "/addresses", pathMatch: "full",canActivate:[AuthGuard] },
  { path: "addresses", children: [
     { path:"", component: ListAddressComponent },
     { path:"create", component: AddAddressComponent },
     { path:"edit/:addressId", component: EditAddressComponent }
    ],canActivate:[AuthGuard]
  },
  { path: "login", component: LoginComponent,canActivate:[AfterAuthGuard]  },
  { path: "register", component: RegisterAccountComponent },
  { path: "users/all" ,component:ListUsersComponent},
  { path: "**", component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
