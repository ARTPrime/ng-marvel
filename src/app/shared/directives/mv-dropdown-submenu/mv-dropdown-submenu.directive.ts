import { ContentChildren, Directive, HostBinding, Input, OnInit, QueryList } from '@angular/core';

import { MvButtonDirective } from '../mv-button/mv-button.directive';

@Directive({
    selector: '[mvDropdownSubmenu]'
})
export class MvDropdownSubmenuDirective implements OnInit {
    @ContentChildren(MvButtonDirective) public items: QueryList<MvButtonDirective>;
    @HostBinding('style.max-height') public height: string;
    @HostBinding('class.mv-dropdown--submenu') class = true;
    @Input() public open: boolean;

    public childrenCount = () => this.items.length;
    public getHeight = () => this.childrenCount() * 40;

    constructor() {}

    public ngOnInit(): void {
        this.open = false;
        this.height = '0px';
    }
    public toggle(): void {
        this.open = !this.open;
        this.height = this.open ? `${this.getHeight()}px` : '0px';
    }
}
