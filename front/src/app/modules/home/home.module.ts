import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { DrawComponent } from './components/draw/draw.component';
import { SocketWebService } from 'src/app/services/socketWeb/socket-web.service';

@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    DrawComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[]
})
export class HomeModule { }
