import {
    AfterViewInit,
    ContentChildren,
    Directive,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges
} from '@angular/core';

import { MvButtonDirective } from '../mv-button/mv-button.directive';

@Directive({
    selector: '[mvDropdownSubmenu]'
})
export class MvDropdownSubmenuDirective implements OnInit, AfterViewInit, OnChanges {
    @ContentChildren(MvButtonDirective) public items: QueryList<MvButtonDirective>;
    @HostBinding('style.max-height') public height: string;
    @HostBinding('class.mv-submenu--expand') public expanded: boolean;
    @HostBinding('class.mv-dropdown--submenu') class = true;
    @Input() public open: boolean;
    @Input() public routerUrl: string;

    public childrenCount = () => this.items.length;
    public getHeight = () => this.childrenCount() * 40;

    constructor() {}

    public ngOnChanges(changes: SimpleChanges): void {
        const key = 'routerUrl';
        if (changes[key] && !changes[key].isFirstChange()) {
            if (this.items.find(i => i.routerLink.toString() === `/${changes[key].currentValue}`) && !this.open) {
                this.toggle();
            }
        }
    }
    public ngOnInit(): void {
        this.open = false;
        this.expanded = false;
        this.height = '0px';
    }
    public ngAfterViewInit(): void {}
    public toggle(): void {
        this.open = !this.open;
        this.height = this.open ? `${this.getHeight()}px` : '0px';
        this.expanded = !this.expanded;
    }
}
