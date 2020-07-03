import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS } from '../api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {
    constructor(private http: HttpClient) {}

    public getStories(): Observable<any> {
        return this.http.get(ENDPOINTS.stories);
    }
    public getStoryCharcaters(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.storyCharacters(id));
    }
    public getStoryComics(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.storyComics(id));
    }
}
