import { AfterViewInit, Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';

import { MvDropdownItemComponent } from '../mv-dropdown-item/mv-dropdown-item.component';

@Component({
    selector: 'mv-dropdown-menu',
    templateUrl: './mv-dropdown-menu.component.html',
    styleUrls: ['./mv-dropdown-menu.component.scss']
})
export class MvDropdownMenuComponent implements OnInit, AfterViewInit {
    @Input() public items: any;
    @Input() public display: 'row' | 'column';
    @Input() public itemTemplate: TemplateRef<MvDropdownItemComponent>;

    @HostBinding('class.mv-dropdown-menu--row') get displayRow() {
        return this.display === 'row';
    }
    @HostBinding('class.mv-dropdown-menu--column') get displayColumn() {
        return this.display === 'column';
    }
    @HostBinding('class.mv-dropdown-menu') className = true;

    constructor() {}

    public ngOnInit(): void {}
    public ngAfterViewInit(): void {}
}
