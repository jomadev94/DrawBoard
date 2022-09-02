import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { RoomComponent } from './modules/home/components/room/room.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:':room', data:{room:"default"},
    component:RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
