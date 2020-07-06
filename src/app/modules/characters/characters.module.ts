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
import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';

@NgModule({
    declarations: [CharactersComponent, CharacterComicsComponent, CharacterStoriesComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('characters', charactersReducer),
        EffectsModule.forFeature([CharactersEffects]),
        CharactersRoutingModule,
        MvSharedModule
    ]
})
export class CharactersModule {}
