import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.loadUserCardsComponent();
  }

  loadUserCardsComponent()
  {
    this.router.navigateByUrl("forum/users/cards");
  }
}
