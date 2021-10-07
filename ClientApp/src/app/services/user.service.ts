import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsView } from '../Models/userDetailsView';
import { UserProfile } from '../Models/userProfile';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser! : UserProfile;

  constructor(private httpservice : HttpService) { }

  getcurrentUser() : Observable<UserProfile>
  {
    return this.httpservice.getUserProfileById("1");
  }


}
