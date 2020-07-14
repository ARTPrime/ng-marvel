import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[mvNavigationOverlay]'
})
export class MvNavigationOverlayDirective implements OnInit, OnDestroy {
    @HostBinding('class.mv-overlay--show') show: boolean;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe(e => {
            if (e instanceof NavigationStart) {
                this.show = true;
            } else if (e instanceof NavigationEnd) {
                this.show = false;
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }
}
