import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[mvIcon]'
})
export class MvIconDirective implements OnInit {
    @Input() public name: UiIcon;
    @Input() public size: UiIconBig;
    @HostBinding('class') public classList: string;

    constructor() {}

    public ngOnInit() {
        // Add classes to button
        this.classList = [this.name, this.size ? this.size : null, 'mv-icon'].filter(c => !!c).join(' ');
    }
}
