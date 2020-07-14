import { AfterViewInit, ContentChild, Directive, HostBinding, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { MvButtonDirective } from '../mv-button/mv-button.directive';
import { MvDropdownSubmenuDirective } from '../mv-dropdown-submenu/mv-dropdown-submenu.directive';

@Directive({
    selector: '[mvDropdownItem]'
})
export class MvDropdownItemDirective implements OnInit, AfterViewInit {
    @ContentChild(MvButtonDirective) public button: MvButtonDirective;
    @ContentChild(MvDropdownSubmenuDirective) public submenu: MvDropdownSubmenuDirective;
    @HostBinding('class.mv-dropdown--item') class = true;
    @Input() item: UiButton | UiDropdownItem;

    constructor() {}

    public ngOnInit(): void {}
    public ngAfterViewInit(): void {
        this.button.buttonClick.pipe(filter(() => !!this.submenu)).subscribe(() => this.submenu.toggle());
    }
}
