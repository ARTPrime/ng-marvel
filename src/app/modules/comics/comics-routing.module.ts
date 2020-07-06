import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicsComponent } from './comics.component';
import { ComicsCharactersComponent } from './components/comics-characters/comics-characters.component';
import { ComicsStoriesComponent } from './components/comics-stories/comics-stories.component';

const routes: Routes = [
    { path: '', component: ComicsComponent },
    {
        path: 'characters',
        component: ComicsCharactersComponent
    },
    {
        path: 'stories',
        component: ComicsStoriesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComicsRoutingModule {}
