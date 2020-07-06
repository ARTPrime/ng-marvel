import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { CharactersService } from '../../services/api/characters/characters.service';
import {
    getCharacater,
    getCharacaters,
    getCharacterComics,
    getCharacterStories,
    setCharacater,
    setCharacaters,
    setCharacterComics,
    setCharacterStories
} from '../actions/characters.actions';

@Injectable()
export class CharactersEffects {
    public loadCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacaters),
            switchMap(({ offset }) => this.charactersSercive.getCharacters(offset)),
            map(characters => setCharacaters({ characters }))
        )
    );

    public loadCharacter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacater),
            switchMap(({ id }) => this.charactersSercive.getCharacter(id)),
            map(character => setCharacater({ character }))
        )
    );

    public loadCharacterComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacterComics),
            switchMap(({ id }) => this.charactersSercive.getCharacterComics(id)),
            map(characterComics => setCharacterComics({ characterComics }))
        )
    );

    public loadCharacterStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacterStories),
            switchMap(({ id }) => this.charactersSercive.getCharacterStories(id)),
            map(characterStories => setCharacterStories({ characterStories }))
        )
    );

    constructor(private actions$: Actions, private charactersSercive: CharactersService) {}
}
