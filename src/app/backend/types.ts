export interface Floristeria {
  id_floristeria: number;
  nombre_floristeria: string;
  pagweb_floristeria: string;
  telefono_floristeria: string;
  email_floristeria: string;
  id_pais: number;
}

export interface Productor {
  id_prod: number;
  nombre_prod: string;
  pagweb_prod: string;
  id_pais: number;
}

export interface FlorCorte {
  id_flor_corte: number;
  nombre_comun: string;
  genero_especie: string;
  etimologia: string;
  tem_conservacion: string;
  colores: string;
}

export interface Color {
  codigo_color: string;
  nombre: string;
  descripcion: string;
}
