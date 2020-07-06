import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[mvDropdownIcon]'
})
export class MvDropdownIconDirective implements OnInit {
    @Input() public name: UiIconChevronDown;
    @HostBinding('class.mv-flip') private flip: boolean;

    constructor() {}

    public ngOnInit(): void {
        this.flip = false;
    }

    public toggle() {
        this.flip = !this.flip;
    }
}
