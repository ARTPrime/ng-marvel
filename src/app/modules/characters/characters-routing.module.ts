import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters.component';
import { CharacterComicsComponent } from './components/character-comics/character-comics.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';
import { NoCharacterComponent } from './components/no-character/no-character.component';

const routes: Routes = [
    {
        path: '',
        component: CharactersComponent,
        children: [
            {
                path: 'view/:id',
                component: CharacterDetailComponent
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
                component: NoCharacterComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharactersRoutingModule {}
