import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ForumComponent } from './components/forum/forum.component';
import { SideNavComponent }  from './components/side-nav/side-nav.component';
import { HomeComponent } from './components/forum/home/home.component';
import { CategoriesComponent } from './components/forum/categories/categories.component';
import { UsersComponent } from './components/forum/users/users.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionWithAnswersComponent } from './components/question-with-answers/question-with-answers.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserCardComponent } from './components/forum/users/user-card/user-card.component';
import { UserDetailsComponent } from './components/forum/users/user-details/user-details.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForumComponent,
    SideNavComponent,
    HomeComponent,
    CategoriesComponent,
    UsersComponent,
    QuestionsComponent,
    QuestionWithAnswersComponent,
    UserCardComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


  
 }
