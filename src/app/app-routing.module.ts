import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersLoadGuard } from './core/guards/characters-load/characters-load.guard';
import { ComicsLoadGuard } from './core/guards/comics-load/comics-load.guard';
import { StoriesLoadGuard } from './core/guards/stories-load/stories-load.guard';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'characters',
        loadChildren: () => import('./modules/characters/characters.module').then(m => m.CharactersModule),
        resolve: [CharactersLoadGuard]
    },
    {
        path: 'comics',
        loadChildren: () => import('./modules/comics/comics.module').then(m => m.ComicsModule),
        resolve: [ComicsLoadGuard]
    },
    {
        path: 'stories',
        loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule),
        resolve: [StoriesLoadGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
