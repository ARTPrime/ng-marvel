import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, filter, map, take, tap } from 'rxjs/operators';
import { selectIsOpen, selectNavItems } from 'src/app/core/store/selectors/navigation.selectors';

import { AppReadyService } from './core/services/app-ready/app-ready.service';
import { navigationToggle } from './core/store/actions/navigation.actions';
import { setSelectedFilter } from './core/store/actions/toolbar.actions';
import { selectRouterState } from './core/store/selectors/router.selectors';
import { selectFilterOptions, selectItem, selectToolbarState } from './core/store/selectors/toolbar.selectors';

@Component({
    selector: 'mv-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navItems$: Observable<Array<UiDropdownItem | UiButton>>;
    public navToggle$: Observable<UiMenuButton>;
    public toolbarLocationUrl$: Observable<string>;
    public routerUrl: string;
    public itemRoute$: Observable<string>;
    public toolbarLoader$: Observable<boolean>;
    public filterOptions$: Observable<UiDropdownItem>;

    constructor(private router: Router, private appReadyService: AppReadyService, private store: Store) {}

    public ngOnInit() {
        // Hide initial app loader
        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => this.appReadyService.trigger());
        // Side navigation component state
        this.navToggle$ = this.store.select(selectIsOpen).pipe(
            map(v => ({
                fill: 'mv-solid',
                color: v ? 'mv-danger' : 'mv-success',
                toggle: v
            }))
        );
        // Side navigation items
        this.navItems$ = this.store.select(selectNavItems);
        // Toolbar state
        // Route for toolbar location
        this.toolbarLocationUrl$ = this.store.select(selectRouterState).pipe(
            filter(r => !!r),
            tap(r => (this.routerUrl = this.getCurrentUrl(r.state.url))),
            map(r =>
                r.state.url
                    .split('/')
                    .filter(s => !!s && isNaN(s as any))
                    .map(s => `${s.substr(0, 1).toUpperCase()}${s.substr(1, s.length - 1)}`)
                    .join(' / ')
                    .replace(' View', '')
            )
        );
        // Name of the detail route for toolbar location (instead of id from url)
        this.itemRoute$ = this.store.select(selectItem).pipe(
            delay(0),
            map((i: any) => {
                if (i) {
                    return (i as MarvelCharacter).name ? i.name : i.title;
                } else {
                    return null;
                }
            })
        );
        // Toolbar loader state for small loading actions
        this.toolbarLoader$ = this.store.select(selectToolbarState).pipe(
            delay(0),
            map(s => s.loading)
        );
        this.filterOptions$ = this.store.select(selectFilterOptions);
    }

    public onMenuButtonClick() {
        this.store.dispatch(navigationToggle());
    }

    public getCurrentUrl(url: string) {
        const newUrl = url
            .split('/')
            .filter(v => isNaN(v as any))
            .filter(v => v !== 'view')
            .join('/');
        return newUrl;
    }

    public onFilterSelected(filter: { filter: string; value: string }) {
        this.store.dispatch(
            setSelectedFilter({
                filter
            })
        );
    }
}
