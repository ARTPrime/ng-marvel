import {
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { UrlTree } from '@angular/router';

import { MvDropdownIconDirective } from '../mv-dropdown-icon/mv-dropdown-icon.directive';

@Directive({
    selector: '[mvButton]'
})
export class MvButtonDirective implements OnInit, OnChanges {
    @Input() public fill: UiFill;
    @Input() public color: UiColor;
    @Input() public size: UiButtonSmall;
    @Input() public routerLink: UrlTree | string[];
    @Output() public buttonClick: EventEmitter<any> = new EventEmitter();
    @ContentChild(MvDropdownIconDirective) public icon: MvDropdownIconDirective;

    @HostListener('click') buttonClicked() {
        this.buttonClick.emit(true);
        if (this.icon) {
            this.icon.toggle();
        }
    }

    constructor(public element: ElementRef<HTMLElement>) {}

    public ngOnChanges(changes: SimpleChanges): void {
        const key = 'color';
        if (changes[key] && !changes[key].isFirstChange()) {
            this.element.nativeElement.classList.remove(changes[key].previousValue);
            this.element.nativeElement.classList.add(changes[key].currentValue);
        }
    }

    public ngOnInit() {
        const nativeElement = this.element.nativeElement;
        this.createButton(nativeElement);
    }

    private createButton(nativeElement: HTMLElement) {
        // Create and add button classes
        const classes = ['mv-button', this.fill, this.color ? this.color : null, this.size ? this.size : null];
        // Add classes to button
        classes
            .filter(c => !!c)
            .forEach(c => {
                nativeElement.classList.add(c);
            });
    }
}
