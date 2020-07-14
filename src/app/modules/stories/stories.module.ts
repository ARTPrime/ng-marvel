import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MvSharedModule } from '@shared/mv-shared.module';
import { StoriesEffects } from 'src/app/core/store/effects/stories.effects';

import { NoStoryComponent } from './components/no-story/no-story.component';
import { StoriesCharactersComponent } from './components/stories-characters/stories-characters.component';
import { StoriesComicsComponent } from './components/stories-comics/stories-comics.component';
import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';

@NgModule({
    declarations: [StoriesComponent, StoriesCharactersComponent, StoriesComicsComponent, NoStoryComponent],
    imports: [CommonModule, EffectsModule.forFeature([StoriesEffects]), StoriesRoutingModule, MvSharedModule]
})
export class StoriesModule {}
