import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Coordinate } from 'src/app/models/coord';
import { SocketWebService } from 'src/app/services/socketWeb/socket-web.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas:ElementRef;
   width:number;
   height:number;
   isAvailable:boolean;
   private cx:CanvasRenderingContext2D;
   private points: Array<any>;

   @HostListener('document:mousemove',['$event'])
   onMouseMove(event:MouseEvent){
    if((event.target as HTMLElement).id === 'canvasId' && this.isAvailable){
      this.write(event);
    }
   }

   @HostListener('mousedown',['$event'])
   onMouseDown(event:MouseEvent){
    if((event.target as HTMLElement).id === 'canvasId'){
      this.isAvailable=true;
    }
   }

   @HostListener('mouseup',['$event'])
   onMouseLeave(event:MouseEvent){
    if((event.target as HTMLElement).id === 'canvasId'){
      this.isAvailable=false;
      this.points=[];
      // RESETEO LAS COORDENADAS
      this.socketWebService.emitEvent();
    }
   }

  constructor(private socketWebService:SocketWebService) {
    this.width=800;
    this.height=800;
    this.isAvailable=false;
    this.points=[];
    this.socketWebService.outEvent.subscribe((coord:Coordinate)=>{
      if(!coord){
        this.points=[];
        return;
      }
      if(coord.x === -1){
        this.clear(false);
        return;
      }
      this.writeSingle(coord,false);
    });
  }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.render();
  }


  write(event:MouseEvent){
    const canvasElement= this.canvas.nativeElement;
    // LA UBICACION DEL ELEMENTO EN LA PANTALLA.
    const rect= canvasElement.getBoundingClientRect();
    // A LA POSICION DEL ELEMENTO LE RESTAMOS LOS MARGENES QUE EXISTEN CON SU PADRE
    // DE ESTA MANERA CONSEGIMOS COORDENADAS EXACTAS.
    const pos={
      x:event.clientX - rect.left,
      y:event.clientY - rect.top
    }
    this.writeSingle(pos);
  }

  writeSingle(pos:Coordinate, emit:boolean=true): void{
    this.points.push(pos);
    // ESPERO LA CAPTURA DE MAS DE 2 PUNTOS
    if(this.points.length > 2){
      // ME QUEDO CON EL ULTIMO Y EL ANTERIOR
      const lastPos= this.points[this.points.length -1];
      const prevPos= this.points[this.points.length -2];
      this.drawOnCanvas(lastPos,prevPos);
      
      // ENVIO LAS COORDENADAS POR WEBSOCKET
      // SOLO VA A EMITIR POR WEB SOCKET CUANDO EL USUARIO DIBUJE
      // AL ESCUCHAR UN EVENTO, SOLO DEBE TRAZAR EL GRAFICO. NO DEBE EMITIR NADA
      // CASO CONTRARIO SE PRODUCE UN LOOP INFINITO
      if(emit){
        this.socketWebService.emitEvent(lastPos);
      }
    }
  }

  drawOnCanvas(lastPos:Coordinate,prevPos:Coordinate):void{
    if(!this.cx){
      return;
    }
    this.cx.beginPath();
    if(lastPos){
      this.cx.moveTo(lastPos.x,lastPos.y);
      this.cx.lineTo(prevPos.x, prevPos.y);
      this.cx.stroke();
    }
  }

  private render():void{
    const canvasElement= this.canvas.nativeElement;
    this.cx=canvasElement.getContext('2d');
    canvasElement.width=this.width;
    canvasElement.height=this.height;
    this.cx.lineWidth=3;
    this.cx.lineCap= 'round';
    this.cx.strokeStyle='#000';
  }

  clear(emit:boolean=true){
    this.points=[];
    this.cx.clearRect(0,0,this.width,this.height);
    if(emit){
      this.socketWebService.emitEvent({x:-1,y:100});
    }
  }

}
