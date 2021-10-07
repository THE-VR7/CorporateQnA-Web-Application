import { Component, OnInit } from '@angular/core';
import { UserDetailsView } from 'src/app/Models/userDetailsView';
import { UserProfile } from 'src/app/Models/userProfile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private userService : UserService) { }
  user! : UserProfile;
  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser()
  {
     
    this.userService.getcurrentUser().subscribe(res => {
      this.user = res;
      this.userService.currentUser = res;
      console.log("current logged in User is ",this.user);
    });

  }

}
