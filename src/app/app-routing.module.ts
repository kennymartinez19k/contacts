import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePage } from './home/home.page';
import { RegisterComponent } from './register/register.component';
import { VersionComponent } from './version/version.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ScannerComponent } from './scanner/scanner.component';
HomePage
LoginComponent
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'version',
    component: VersionComponent
  },
  {
    path: 'edit',
    component: EditProfileComponent
  },
  {
    path: 'scanner',
    component: ScannerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
