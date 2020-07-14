import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS } from '../api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class CharactersService {
    constructor(private http: HttpClient) {}

    public getCharacters(offset: number, filter: { filter: string; value: string }): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.characters, {
            params: !filter
                ? new HttpParams().set('offset', offset ? offset.toString() : '0')
                : new HttpParams()
                      .set('offset', offset ? offset.toString() : '0')
                      .set(
                          filter.filter === 'character'
                              ? 'nameStartsWith'
                              : filter.filter === 'comic'
                              ? 'comics'
                              : filter.filter === 'story'
                              ? 'stories'
                              : '',
                          filter.value
                      )
        });
    }
    public getCharacter(id: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.character(id));
    }
    public getCharacterComics(id: number, offset: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.characterComics(id), {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
    public getCharacterStories(id: number, offset?: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.characterStories(id), {
            params: new HttpParams().set('offset', offset ? offset.toString() : '0')
        });
    }
}
