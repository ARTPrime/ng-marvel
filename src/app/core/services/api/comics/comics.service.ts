import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS } from '../api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class ComicsService {
    constructor(private http: HttpClient) {}

    public getComics(offset: number): Observable<any> {
        return this.http.get(ENDPOINTS.comics, {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
    public getComic(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.comic(id));
    }
    public getComicCharcaters(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.comicCharacters(id));
    }
    public getComicStories(id: number): Observable<any> {
        return this.http.get(ENDPOINTS.comicStories(id));
    }
}
