import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComicsGuard } from 'src/app/core/guards/characters/character-comics/character-comics.guard';
import { CharacterSetGuard } from 'src/app/core/guards/characters/character-set/character-set.guard';
import { CharacterStoriesGuard } from 'src/app/core/guards/characters/character-stories/character-stories.guard';

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
                component: CharacterDetailComponent,
                resolve: [CharacterSetGuard]
            },
            {
                path: '',
                component: NoCharacterComponent
            }
        ]
    },
    {
        path: 'comics',
        component: CharactersComponent,
        children: [
            {
                path: 'view/:id',
                component: CharacterComicsComponent,
                resolve: [CharacterComicsGuard]
            },
            {
                path: '',
                component: NoCharacterComponent
            }
        ]
    },
    {
        path: 'stories',
        component: CharactersComponent,
        children: [
            {
                path: 'view/:id',
                component: CharacterStoriesComponent,
                resolve: [CharacterStoriesGuard]
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
