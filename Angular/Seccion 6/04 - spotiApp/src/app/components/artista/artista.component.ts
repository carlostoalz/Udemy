import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean = true;

  constructor(private _activatedRoute: ActivatedRoute,
    private _spotifyService: SpotifyService) {
    this._activatedRoute.params.subscribe(
      (params: any) => {
        this.getArtista(params['id']);
        this.getTopTracks(params['id']);
      },
      (exception) => {
        console.log(exception);
      });
  }

  getArtista(id: string) {
    this._spotifyService.getArtista(id).subscribe(
      (res: any) => {
        this.artista = res;
        this.loading = false;
      },
      (ex: any) => {
        console.log(ex);
        this.loading = false;
      }
    );
  }

  getTopTracks(id: string) {
    this._spotifyService.getTopTracks(id).subscribe(
      (res: any) => {
        this.topTracks = res;
        console.log(this.topTracks);
      },
      (ex :any) =>{
        console.log(ex);
      }
    );
  }

}
