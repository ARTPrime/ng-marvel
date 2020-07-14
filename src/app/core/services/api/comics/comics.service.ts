import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS } from '../api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class ComicsService {
    constructor(private http: HttpClient) {}

    public getComics(offset?: number, filter?: { filter: string; value: string }): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.comics, {
            params: !filter
                ? new HttpParams().set('offset', offset ? offset.toString() : '0')
                : new HttpParams()
                      .set('offset', offset ? offset.toString() : '0')
                      .set(
                          filter.filter === 'comic'
                              ? 'titleStartsWith'
                              : filter.filter === 'character'
                              ? 'characters'
                              : filter.filter === 'story'
                              ? 'stories'
                              : '',
                          filter.value
                      )
        });
    }
    public getComic(id: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.comic(id));
    }
    public getComicCharcaters(id: number, offset?: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.comicCharacters(id), {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
    public getComicStories(id: number, offset?: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.comicStories(id), {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
}
