import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MvSharedModule } from '@shared/mv-shared.module';
import { StoriesEffects } from 'src/app/core/store/effects/stories.effects';
import { storiesReducer } from 'src/app/core/store/reducers/stories.reducers';

import { StoriesCharactersComponent } from './stories-characters/stories-characters.component';
import { StoriesComicsComponent } from './stories-comics/stories-comics.component';
import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';

@NgModule({
    declarations: [StoriesComponent, StoriesCharactersComponent, StoriesComicsComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('stories', storiesReducer),
        EffectsModule.forFeature([StoriesEffects]),
        StoriesRoutingModule,
        MvSharedModule
    ]
})
export class StoriesModule {}
