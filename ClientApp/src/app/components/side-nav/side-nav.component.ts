import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styles: [
  ]
})
export class SideNavComponent implements OnInit {

  selectedListItemIndex : number = -1;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.loadforumComponent();
  }

  // load the forum component on click
  loadforumComponent()
  {
    document.getElementById('forumItem')?.click();
    this.router.navigateByUrl("/forum");
  }

}
