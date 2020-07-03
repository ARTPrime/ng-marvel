import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComicsEffects } from 'src/app/core/store/effects/comics.effects';
import { comicsReducer } from 'src/app/core/store/reducers/comics.reducers';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ComicsCharactersComponent } from './components/comics-characters/comics-characters.component';
import { ComicsListComponent } from './components/comics-list/comics-list.component';
import { ComicsStoriesComponent } from './components/comics-stories/comics-stories.component';

@NgModule({
    declarations: [ComicsComponent, ComicsListComponent, ComicsCharactersComponent, ComicsStoriesComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('comics', comicsReducer),
        EffectsModule.forFeature([ComicsEffects]),
        ComicsRoutingModule
    ]
})
export class ComicsModule {}
