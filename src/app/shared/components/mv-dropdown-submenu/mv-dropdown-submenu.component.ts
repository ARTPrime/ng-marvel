import { Component, ContentChildren, HostBinding, OnInit, QueryList } from '@angular/core';
import { MvButtonDirective } from '@shared/directives/mv-button/mv-button.directive';

@Component({
    selector: 'mv-dropdown-submenu',
    templateUrl: './mv-dropdown-submenu.component.html',
    styleUrls: ['./mv-dropdown-submenu.component.scss']
})
export class MvDropdownSubmenuComponent implements OnInit {
    @ContentChildren(MvButtonDirective) public items: QueryList<MvButtonDirective>;
    @HostBinding('style.max-height') public height: string;
    public open: boolean;

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
