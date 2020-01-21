import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent{

  nuevasCanciones:any[] = [];
  loading:boolean;
  showError:boolean;
  error: any = {};

  constructor(private _spotifyService:SpotifyService) { 
    this.loading = true;
    this.showError = false;

    this._spotifyService.getNewReleases()
      .subscribe((res:any)=>{
        this.nuevasCanciones = res;
        this.loading = false;
      },
      (ex)=>{
        console.log(ex);
        this.loading = false;
        this.error = ex;
        this.showError = true;
      });
  }

}
