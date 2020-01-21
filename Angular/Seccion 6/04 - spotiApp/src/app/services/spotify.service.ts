import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  accessToken: string = "BQDvzO4FvbU3zXszbJaS0p_NCghkBY8hg681v-u4N3Zz7JBDTOYRgCI_o73h6nAGpHtGTFlieL1waiz1_Xw";

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;

    const HEADERS: HttpHeaders = new HttpHeaders({
      "Authorization": `Bearer ${this.accessToken}`
    });

    return this.http.get(URL, { headers: HEADERS });
  }

  getToken() {
    this.http.post(
      "https://accounts.spotify.com/api/token",
      {
        "grant_type": 'client_credentials',
        "client_id": 'f26ca287910949b28f32f8efb0ee5cab',
        "client_secret": 'e85ac46e7bc145e0839d39a31c3b73a5'
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        observe: "body",
        responseType: "json"
      }
    )
      .subscribe((res: any) => {
        console.log(res);
      }, (error: any) => {
        console.log(error);
      });
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases")
      .pipe(map(data => data['albums'].items));
  }

  getAristas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }
}
