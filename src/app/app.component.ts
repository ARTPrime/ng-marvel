import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { selectIsOpen, selectNavItems } from 'src/app/core/store/selectors/navigation.selectors';

import { AppReadyService } from './core/services/app-ready/app-ready.service';
import { navigationToggle } from './core/store/actions/navigation.actions';

@Component({
    selector: 'mv-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navItems$: Observable<Array<UiDropdownItem | UiButton>>;
    public navToggle$: Observable<UiMenuButton>;
    public navToggle: UiMenuButton;

    constructor(private router: Router, private appReadyService: AppReadyService, private store: Store) {}

    public ngOnInit() {
        // Hide initial loader
        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => this.appReadyService.trigger());
        this.navToggle$ = this.store.select(selectIsOpen).pipe(
            map(v => ({
                fill: 'mv-solid',
                color: 'mv-danger',
                toggle: v
            }))
        );
        this.navItems$ = this.store.select(selectNavItems);
    }

    public onMenuButtonClick() {
        this.store.dispatch(navigationToggle());
    }
}
