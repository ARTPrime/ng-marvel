import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { CharactersService } from '../../services/api/characters/characters.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
    appendCharacterComics,
    appendCharacters,
    appendCharacterStories,
    getCharacater,
    getCharacaters,
    getCharacterComics,
    getCharacterStories,
    setCharacater,
    setCharacaters,
    setCharacterComics,
    setCharacterStories
} from '../actions/characters.actions';
import { selectCharactersState } from '../selectors/characters.selectors';

@Injectable()
export class CharactersEffects {
    public persistSites$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(setCharacater, setCharacaters, setCharacterComics, setCharacterStories),
                withLatestFrom(this.store.select(selectCharactersState)),
                filter(([, characters]) => !!characters),
                tap(([, characters]) => this.localStorageService.setItem('Characters', characters))
            ),
        {
            dispatch: false
        }
    );

    public loadCharacter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacater),
            switchMap(({ id }) => this.charactersSercive.getCharacter(id)),
            map(character => setCharacater({ character: character.data.results.pop() as MarvelCharacter }))
        )
    );

    public loadCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacaters),
            switchMap(({ offset, filter }) => this.charactersSercive.getCharacters(offset, filter)),
            map(characters => setCharacaters({ characters }))
        )
    );

    public appendCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendCharacters),
            switchMap(({ offset, filter }) => this.charactersSercive.getCharacters(offset, filter)),
            map(characters => setCharacaters({ characters, append: true }))
        )
    );

    public loadCharacterComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacterComics),
            switchMap(({ id, offset }) => this.charactersSercive.getCharacterComics(id, offset)),
            map(characterComics => setCharacterComics({ characterComics }))
        )
    );

    public appendCharacterComics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendCharacterComics),
            switchMap(({ id, offset }) => this.charactersSercive.getCharacterComics(id, offset)),
            map(characterComics => setCharacterComics({ characterComics, append: true }))
        )
    );

    public loadCharacterStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCharacterStories),
            switchMap(({ id }) => this.charactersSercive.getCharacterStories(id)),
            map(characterStories => setCharacterStories({ characterStories }))
        )
    );

    public appendCharacterStories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appendCharacterStories),
            switchMap(({ id }) => this.charactersSercive.getCharacterStories(id)),
            map(characterStories => setCharacterStories({ characterStories, append: true }))
        )
    );

    constructor(
        private actions$: Actions,
        private charactersSercive: CharactersService,
        private store: Store,
        private localStorageService: LocalStorageService
    ) {}
}
