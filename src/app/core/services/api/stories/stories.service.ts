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
    public getStoryCharcaters(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.storyCharacters(id));
    }
    public getStoryComics(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.storyComics(id));
    }
}
