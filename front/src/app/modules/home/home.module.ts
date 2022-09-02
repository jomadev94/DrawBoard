import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { DrawComponent } from './components/draw/draw.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    DrawComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class HomeModule { }
