import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesCharactersComponent } from './stories-characters/stories-characters.component';
import { StoriesComicsComponent } from './stories-comics/stories-comics.component';
import { StoriesComponent } from './stories.component';

const routes: Routes = [
    {
        path: 'characters',
        component: StoriesCharactersComponent
    },
    {
        path: 'comics',
        component: StoriesComicsComponent
    },
    {
        path: '',
        component: StoriesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoriesRoutingModule {}
