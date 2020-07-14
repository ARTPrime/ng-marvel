import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryCharactersGuard } from 'src/app/core/guards/stories/story-characters/story-characters.guard';
import { StoryComicsGuard } from 'src/app/core/guards/stories/story-comics/story-comics.guard';

import { NoStoryComponent } from './components/no-story/no-story.component';
import { StoriesCharactersComponent } from './components/stories-characters/stories-characters.component';
import { StoriesComicsComponent } from './components/stories-comics/stories-comics.component';
import { StoriesComponent } from './stories.component';

const routes: Routes = [
    {
        path: 'characters',
        component: StoriesComponent,
        children: [
            {
                path: 'view/:id',
                component: StoriesCharactersComponent,
                resolve: [StoryCharactersGuard]
            },
            {
                path: '',
                component: NoStoryComponent
            }
        ]
    },
    {
        path: 'comics',
        component: StoriesComponent,
        children: [
            {
                path: 'view/:id',
                component: StoriesComicsComponent,
                resolve: [StoryComicsGuard]
            },
            {
                path: '',
                component: NoStoryComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'characters'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoriesRoutingModule {}
