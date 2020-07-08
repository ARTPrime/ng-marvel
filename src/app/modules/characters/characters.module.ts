import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MvSharedModule } from '@shared/mv-shared.module';
import { CharactersEffects } from 'src/app/core/store/effects/characters.effects';
import { charactersReducer } from 'src/app/core/store/reducers/characters.reducers';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterComicsComponent } from './components/character-comics/character-comics.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';
import { NoCharacterComponent } from './components/no-character/no-character.component';

@NgModule({
    declarations: [
        CharactersComponent,
        CharacterComicsComponent,
        CharacterStoriesComponent,
        NoCharacterComponent,
        CharacterDetailComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('characters', charactersReducer),
        EffectsModule.forFeature([CharactersEffects]),
        CharactersRoutingModule,
        MvSharedModule
    ]
})
export class CharactersModule {}
