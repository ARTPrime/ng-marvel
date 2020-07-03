import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[mvDropdownIcon]'
})
export class MvDropdownIconDirective implements OnInit {
    @Input() public name: UiIconChevronDown;
    @Input() public animation: UiFlip;

    constructor(private element: ElementRef<HTMLElement>) {}

    public ngOnInit(): void {}

    public toggle() {
        this.element.nativeElement.classList.toggle(this.animation);
    }
}
