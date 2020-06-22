import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
// import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Video } from './video';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  // all url end point
  private _getUrl: string = '/api/videos';
  private _postUrl: string = '/api/video';
  private _putUrl: string = '/api/video/';
  private _deleteUrl: string = '/api/video/';

  constructor(private _http: HttpClient) {}

  // getting video from Db
  getVideos(): Observable<Video[]> {
    return this._http.get<Video[]>(this._getUrl);
  }

  // adding video from Db
  addVideo(video: Video): Observable<Video> {
    return this._http.post<Video>(this._postUrl, video);
  }

  // update video in Db
  updateVideo(video: Video): Observable<any> {
    return this._http.put<Video>(this._putUrl + video._id, video, httpOptions);
  }

  // delete video in Db
  deleteVideo(video: Video): Observable<Video> {
    return this._http.delete<Video>(this._deleteUrl + video._id, httpOptions);
  }
}
