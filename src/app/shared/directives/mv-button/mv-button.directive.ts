import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { MvDropdownIconDirective } from '../mv-dropdown-icon/mv-dropdown-icon.directive';

@Directive({
    selector: '[mvButton]'
})
export class MvButtonDirective implements OnInit {
    @Input() public fill: UiFill;
    @Input() public color: UiColor;
    @Input() public size: UiButtonSmall;
    @Output() public buttonClick: EventEmitter<any> = new EventEmitter();
    @ContentChild(MvDropdownIconDirective) public icon: MvDropdownIconDirective;

    @HostListener('click') buttonClicked() {
        this.buttonClick.emit(true);
        if (this.icon) {
            this.icon.toggle();
        }
    }

    constructor(public element: ElementRef<HTMLElement>) {}

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
