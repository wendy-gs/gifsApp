import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '2jB3y8A9Ib0NW0HJvG8tOaSStCluDGxG';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial () {
    return [...this._historial] //pasams una copia del array original
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //si historial es vaci le asigna un arra vacio
  /* if(localStorage.getItem('historial')){
      this.resultados = JSON.parse(localStorage.getItem('historial')!);
    }*/
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  buscarGifs(query: string) {
    //Ponemos el query en minuscula para verificar asi este en mayuscula la misma palabra
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);//Cada que agrego corto solo ha 10 elemntos
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit', '10')
          .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe(( resp ) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })
    
  }
}
