import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MvSharedModule } from '@shared/mv-shared.module';
import { ComicsEffects } from 'src/app/core/store/effects/comics.effects';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ComicsCharactersComponent } from './components/comics-characters/comics-characters.component';
import { ComicsStoriesComponent } from './components/comics-stories/comics-stories.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { NoComicComponent } from './components/no-comic/no-comic.component';

@NgModule({
    declarations: [ComicsComponent, ComicsCharactersComponent, ComicsStoriesComponent, ComicDetailComponent, NoComicComponent],
    imports: [CommonModule, EffectsModule.forFeature([ComicsEffects]), ComicsRoutingModule, MvSharedModule]
})
export class ComicsModule {}
