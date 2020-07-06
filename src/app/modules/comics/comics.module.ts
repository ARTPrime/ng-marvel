import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MvSharedModule } from '@shared/mv-shared.module';
import { ComicsEffects } from 'src/app/core/store/effects/comics.effects';
import { comicsReducer } from 'src/app/core/store/reducers/comics.reducers';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ComicsCharactersComponent } from './components/comics-characters/comics-characters.component';
import { ComicsStoriesComponent } from './components/comics-stories/comics-stories.component';

@NgModule({
    declarations: [ComicsComponent, ComicsCharactersComponent, ComicsStoriesComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('comics', comicsReducer),
        EffectsModule.forFeature([ComicsEffects]),
        ComicsRoutingModule,
        MvSharedModule
    ]
})
export class ComicsModule {}
