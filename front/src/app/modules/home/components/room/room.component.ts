import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socketWeb/socket-web.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room:string;

  constructor(private route:ActivatedRoute, private cookieService:CookieService) { 
    this.room=this.route.snapshot.params['room'];
    this.cookieService.set('room',this.room);
  }
  
  ngOnInit(): void {
  }

}
