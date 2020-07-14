import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSerializer } from '@models/custom-router-serializer.interface';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MvSharedModule } from '@shared/mv-shared.module';
import { storeLogger } from 'ngrx-store-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarvelInterceptor } from './core/interceptors/marvel-interceptor';
import { AppReadyService } from './core/services/app-ready/app-ready.service';
import { ToolbarEffects } from './core/store/effects/toolbar.effects';
import { charactersReducer } from './core/store/reducers/characters.reducers';
import { comicsReducer } from './core/store/reducers/comics.reducers';
import { initStateFromLocalStorage } from './core/store/reducers/init-state-from-local-storage.reducer';
import { navigationReducer } from './core/store/reducers/navigation.reducers';
import { storiesReducer } from './core/store/reducers/stories.reducers';
import { toolbarReducer } from './core/store/reducers/toolbar.reducers';
import { AppState } from './core/store/state/app.state';

export function logger(reducer: any): any {
    return storeLogger()(reducer);
}

export const rootReducers: ActionReducerMap<any> = {
    router: routerReducer
};

const metaReducers: MetaReducer<AppState, any>[] = [initStateFromLocalStorage, logger];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MvSharedModule,
        StoreModule.forRoot(
            {
                navigation: navigationReducer,
                router: routerReducer,
                toolbar: toolbarReducer,
                characters: charactersReducer,
                comics: comicsReducer,
                stories: storiesReducer
            },
            { metaReducers }
        ),
        StoreDevtoolsModule.instrument({
            maxAge: 80
        }),
        EffectsModule.forRoot([ToolbarEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router', serializer: CustomSerializer }),
        BrowserAnimationsModule
    ],
    providers: [AppReadyService, { provide: HTTP_INTERCEPTORS, useClass: MarvelInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
