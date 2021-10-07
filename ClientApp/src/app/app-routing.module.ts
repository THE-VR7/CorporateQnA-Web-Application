import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { HomeComponent } from './components/forum/home/home.component';
import { CategoriesComponent } from './components/forum/categories/categories.component';
import { UsersComponent } from './components/forum/users/users.component';
import { UserDetailsComponent } from './components/forum/users/user-details/user-details.component';
import { UserCardComponent } from './components/forum/users/user-card/user-card.component';


const routes: Routes = [
  {
    path:'forum',
    component:ForumComponent,
    children:
    [
      {path:'home',component:HomeComponent},
      {path:'categories',component:CategoriesComponent},
      { 
      path:'users', component:UsersComponent,
      children:
        [
          {path:'cards',component:UserCardComponent},
          {path:'details/:id',component: UserDetailsComponent  }
        ] 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
