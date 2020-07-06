import { Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[mvOverlay]'
})
export class MvOverlayDirective implements OnInit, OnDestroy {
    @Input() show$: Observable<boolean>;
    @Input() color: UiColor;

    private destroy$: Subject<boolean> = new Subject<boolean>();
    @HostBinding('class') classList: string;

    @HostBinding('class.mv-overlay--show') show: boolean;

    constructor() {}
    ngOnInit() {
        this.classList = ['mv-overlay', this.color].join(' ');
        if (this.show$) {
            this.show$.pipe(takeUntil(this.destroy$)).subscribe(v => (this.show = v));
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }
}
