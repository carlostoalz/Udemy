import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean = false;

  constructor(private _spotifyService: SpotifyService) {
  }

  buscar(termino: string) {
    this.loading = true;
    if (termino != null &&termino.trim() != "") {
      this._spotifyService.getAristas(termino)
      .subscribe((res: any) => {
        this.artistas = res;
        this.loading = false;
      },
      (exception) => {
        console.log(exception);
      }); 
    }else{
      this.artistas = [];
      this.loading = false;
    }
  }

}
