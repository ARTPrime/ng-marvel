import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CharactersEffects } from 'src/app/core/store/effects/characters.effects';
import { charactersReducer } from 'src/app/core/store/reducers/characters.reducers';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterComicsComponent } from './components/character-comics/character-comics.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';

@NgModule({
    declarations: [CharactersComponent, CharacterListComponent, CharacterComicsComponent, CharacterStoriesComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('characters', charactersReducer),
        EffectsModule.forFeature([CharactersEffects]),
        CharactersRoutingModule
    ]
})
export class CharactersModule {}
