import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters.component';
import { CharacterComicsComponent } from './components/character-comics/character-comics.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';

const routes: Routes = [
    {
        path: 'list',
        component: CharacterListComponent
    },
    {
        path: 'comics',
        component: CharacterComicsComponent
    },
    {
        path: 'stories',
        component: CharacterStoriesComponent
    },
    {
        path: '',
        component: CharactersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharactersRoutingModule {}
