import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template:'',
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) {
    router.navigate(['/','default'])
  }

  ngOnInit(): void {
  }

}
