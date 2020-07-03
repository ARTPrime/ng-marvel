import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS } from '../api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class CharactersService {
    constructor(private http: HttpClient) {}

    public getCharacters(): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.characters);
    }
    public getCharacter(id: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.character(id));
    }
    public getCharacterComics(id: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.characterComics(id));
    }
    public getCharacterStories(id: number): Observable<MarvelCollection> {
        return this.http.get<MarvelCollection>(ENDPOINTS.characterStories(id));
    }
}
