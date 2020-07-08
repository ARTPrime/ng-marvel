import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MvSharedModule } from '@shared/mv-shared.module';
import { storeLogger } from 'ngrx-store-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarvelInterceptor } from './core/interceptors/marvel-interceptor';
import { AppReadyService } from './core/services/app-ready/app-ready.service';
import { initStateFromLocalStorage } from './core/store/reducers/init-state-from-local-storage.reducer';
import { navigationReducer } from './core/store/reducers/navigation.reducers';
import { AppState } from './core/store/state/app.state';

export function logger(reducer: any): any {
    return storeLogger()(reducer);
}

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
                navigation: navigationReducer
            },
            { metaReducers }
        ),
        StoreDevtoolsModule.instrument({
            maxAge: 80
        }),
        EffectsModule.forRoot([]),
        BrowserAnimationsModule
    ],
    providers: [AppReadyService, { provide: HTTP_INTERCEPTORS, useClass: MarvelInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
