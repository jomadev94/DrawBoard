import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { Coordinate } from 'src/app/models/coord';

@Injectable({
  providedIn: 'root',
})
export class SocketWebService extends Socket {
  
  outEvent: EventEmitter<Coordinate> = new EventEmitter();

  constructor(private cookieService: CookieService) {
    super({
      // LA URL DEL BACKEND
      url: 'http://localhost:5000',

      // PASAMOS COMO PARAMETRO EL NOMBRE
      // DE LA SALA (ALMACENADO PREVIAMENTE EN UNA COOKIE)
      options: {
        query: {
          nameRoom: cookieService.get('room'),
        },
      },
    });
    this.listenEvent();
  }

  // METODO PARA ESCUCHAR EVENTO
  listenEvent() {
    this.ioSocket.on('event', (res: Coordinate) => {
      this.outEvent.emit(res);
    });
  }

  // AL EVENTO LO TENEMOS QUE IDENTIFICAR CON UN NOMBRE (EN ESTE CASO 'EVENT')

  // METODO PARA EMITIR EVENTO
  emitEvent(coord?: Coordinate) {
    this.ioSocket.emit('event', coord);
  }

}
