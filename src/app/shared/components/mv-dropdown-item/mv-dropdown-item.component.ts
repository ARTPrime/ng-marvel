import { AfterViewInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { MvButtonDirective } from '@shared/directives/mv-button/mv-button.directive';
import { filter } from 'rxjs/operators';

import { MvDropdownSubmenuComponent } from '../mv-dropdown-submenu/mv-dropdown-submenu.component';

@Component({
    selector: 'mv-dropdown-item',
    templateUrl: './mv-dropdown-item.component.html',
    styleUrls: ['./mv-dropdown-item.component.scss']
})
export class MvDropdownItemComponent implements OnInit, AfterViewInit {
    @ContentChild(MvButtonDirective) public button: MvButtonDirective;
    @ContentChild(MvDropdownSubmenuComponent) public submenu: MvDropdownSubmenuComponent;

    @Input() item: UiButton | UiDropdownItem;

    constructor() {}

    public ngOnInit(): void {}
    public ngAfterViewInit(): void {
        this.button.buttonClick.pipe(filter(() => !!this.submenu)).subscribe(() => this.submenu.toggle());
    }
}
