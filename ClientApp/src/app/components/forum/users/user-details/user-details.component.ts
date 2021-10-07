import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/Models/userProfile';
import { HttpService } from 'src/app/services/http.service';
import { Icons } from 'src/app/shared/icons';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [
  ]
})
export class UserDetailsComponent implements OnInit {

  constructor(private httpservice : HttpService,private router : Router,private route: ActivatedRoute) { }
  userId! : string;
  user! : UserProfile;
  icons: Icons = new Icons;
  currentQuestionId : string = "-1";
  questionSelected: boolean = false;
  selectedTab = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']; 
      this.getUserProfile();
   });
  }

  getUserProfile()
  {
    this.httpservice.getUserProfileById(this.userId).subscribe(
			res => {
        this.user = res;
        console.log("Current User is : ",this.user);
			}
		);
  }

  loadUserCardsComponent()
  {
    this.router.navigateByUrl("forum/users/cards");
  }

  receiveQuestionId(event: any)
  {
    // console.log("Info send is home component is ",event);
    this.currentQuestionId = event;
    this.questionSelected = true;
  }

}
