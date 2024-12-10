import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Floristeria, Productor, FlorCorte, Color } from './types';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private url: string = 'http://localhost:3000/sql';

  constructor(private http: HttpClient) {}

  private request(query: string) {
    return this.http.post(this.url, { query });
  }

  obtenerFloristerias(): Observable<Floristeria[]> {
    const query = 'SELECT * FROM floristerias;';
    return this.request(query).pipe(
      map((result: any) => result.rows as Floristeria[])
    );
  }

  obtenerProductores(): Observable<Productor[]> {
    const query = 'SELECT * FROM productores;';
    return this.request(query).pipe(
      map((result: any) => result.rows as Productor[])
    );
  }

  obtenerFloresDeCorte(): Observable<FlorCorte[]> {
    const query = 'SELECT * FROM flores_corte;';
    return this.request(query).pipe(
      map((result: any) => result.rows as FlorCorte[])
    );
  }

  obtenerColores(): Observable<Color[]> {
    const query = 'SELECT * FROM colores;';
    return this.request(query).pipe(
      map((result: any) => result.rows as Color[])
    );
  }

  agregarACatalogoFloristeria(
    idFloristeria: number,
    nombre: string,
    idFlorCorte: number,
    codigoColor: string
  ): Observable<any> {
    const query = `INSERT INTO catalogos_floristerias (id_floristeria, nombre, id_flor_corte, codigo_color) VALUES
      (${idFloristeria}, '${nombre}', ${idFlorCorte}, '${codigoColor}');`;
    return this.request(query).pipe(
      catchError((err, _) => {
        console.error(err);
        return [];
      })
    );
  }

  agregarACatalogoProductor(
    idProductor: number,
    vbn: number,
    nombrePropio: string,
    descripcion: string,
    idFlor: number,
    codigoColor: string
  ): Observable<any> {
    const query = `INSERT INTO catalogos_productores (id_productor, vbn, nombre_propio, descripcion, id_flor, codigo_color) VALUES
      (${idProductor}, ${vbn}, '${nombrePropio}', '${descripcion}', ${idFlor}, '${codigoColor}');`;
    return this.request(query).pipe(
      catchError((err, _) => {
        console.error(err);
        return [];
      })
    );
  }
}
