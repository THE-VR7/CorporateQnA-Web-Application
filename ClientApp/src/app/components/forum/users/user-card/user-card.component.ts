import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsView } from 'src/app/Models/userDetailsView';
import { UserProfile } from 'src/app/Models/userProfile';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [
  ]
})
export class UserCardComponent implements OnInit {

  users : UserDetailsView[] = [];
  filterUsers : UserDetailsView[] = [];
  searchText: string="";
  constructor(private httpservice : HttpService,private router : Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers()
  {
    this.httpservice.getUsersDetails().subscribe(
			res => {
        this.users = res;
        this.filterUsers = [...this.users];
        console.log("Users are : ",this.users);
			}
		)
  }

  filterUsersBySearch() {
		this.filterUsers = [...this.users];
		
    if(this.searchText.length > 0)
    {
      // console.log(this.searchText);
      this.filterUsers = this.filterUsers.filter(user => {
        return user.name.toLocaleLowerCase().startsWith(this.searchText);
      });
      // console.log("searched questions - ",this.filteredQuestionList);
    }
  }

  routeToUserDetails(id : string)
  {
    this.router.navigateByUrl("forum/users/details/"+id);
  }

}
