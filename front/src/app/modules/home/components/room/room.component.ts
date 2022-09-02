import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  room: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private builder: FormBuilder
  ) {
    this.route.paramMap.subscribe((param)=>{
      this.room=param.get('room')!;
      this.cookieService.set('room', this.room);
    });
    this.form = builder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  goTo() {
    const room=this.form.get('name')?.value;
    this.router.navigate(['/',room]);
  }
}
