import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS } from '../api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {
    constructor(private http: HttpClient) {}

    public getStories(offset: number): Observable<any> {
        return this.http.get(ENDPOINTS.stories, {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
    public getStoryCharcaters(id: number, offset?: number): Observable<any> {
        return this.http.get(ENDPOINTS.storyCharacters(id), {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
    public getStoryComics(id: number, offset?: number): Observable<any> {
        return this.http.get(ENDPOINTS.storyComics(id), {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
}
