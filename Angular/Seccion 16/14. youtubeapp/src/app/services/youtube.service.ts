import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = "https://www.googleapis.com/youtube/v3";
  private apiKey: string = "AIzaSyC115Ng2ORoI2pwMutXTlaSGDR-2RrMM4E";
  private playlist: string = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken: string = "";

  constructor(public http: HttpClient) { }

  getVideos(){
    let url: string = `${ this.youtubeUrl }/playlistItems?part=snippet&maxResults=10&playlistId=${ this.playlist }`;

    if (this.nextPageToken) {
      url = `${ url }&pageToken=${ this.nextPageToken }`;
    }

    url = `${ url }&key=${ this.apiKey }`;

    return this.http.get( url )
           .pipe( 
             map( res => {
              this.nextPageToken = res['nextPageToken'];
              let videos: any[] = [];
              for (const video of res['items']) {
                let snippet = video['snippet'];
                videos.push(snippet);
              }
              return videos;
             }));
  }
}
