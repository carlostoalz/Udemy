import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  transform(pelicula: any, poster: boolean = false): string {

    let url: string = "https://image.tmdb.org/t/p/w300";

    if (pelicula !== undefined && pelicula !== null) {
      
      if ( poster ) {
        return `${ url }${ (<string>pelicula.poster_path) }`;
      }      

      if (pelicula.backdrop_path !== undefined && 
          pelicula.backdrop_path !== null && 
          (<string>pelicula.backdrop_path).length > 0) {

        return `${ url }${ (<string>pelicula.backdrop_path) }`;

      } else if(pelicula.poster_path !== undefined && 
                pelicula.poster_path !== null && 
                (<string>pelicula.poster_path).length > 0) {

        return `${ url }${ (<string>pelicula.poster_path) }`;
        
      } else {

        return "assets/img/no-image.jpg";

      }
    } else {

      return "assets/img/no-image.jpg";

    }

  }

}
