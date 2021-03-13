import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //Inyectamos el servicio al constructor
  constructor(private gifsService: GifsService){

  }
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0) {
      return; //que salga de la funcion
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
