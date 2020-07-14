import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicCharactersGuard } from 'src/app/core/guards/comics/comic-characters/comic-characters.guard';
import { ComicSetGuard } from 'src/app/core/guards/comics/comic-set/comic-set.guard';
import { ComicStoriesGuard } from 'src/app/core/guards/comics/comic-stories/comic-stories.guard';

import { ComicsComponent } from './comics.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { ComicsCharactersComponent } from './components/comics-characters/comics-characters.component';
import { ComicsStoriesComponent } from './components/comics-stories/comics-stories.component';
import { NoComicComponent } from './components/no-comic/no-comic.component';

const routes: Routes = [
    {
        path: '',
        component: ComicsComponent,
        children: [
            {
                path: 'view/:id',
                component: ComicDetailComponent,
                resolve: [ComicSetGuard]
            },
            {
                path: '',
                component: NoComicComponent
            }
        ]
    },
    {
        path: 'characters',
        component: ComicsComponent,
        children: [
            {
                path: 'view/:id',
                component: ComicsCharactersComponent,
                resolve: [ComicCharactersGuard]
            },
            {
                path: '',
                component: NoComicComponent
            }
        ]
    },
    {
        path: 'stories',
        component: ComicsComponent,
        children: [
            {
                path: 'view/:id',
                component: ComicsStoriesComponent,
                resolve: [ComicStoriesGuard]
            },
            {
                path: '',
                component: NoComicComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComicsRoutingModule {}
