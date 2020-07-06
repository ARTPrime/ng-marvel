import { AfterViewInit, Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { MvDropdownItemDirective } from '@shared/directives/mv-dropdown-item/mv-dropdown-item.directive';

@Component({
    selector: 'mv-dropdown-menu',
    template: `<ng-container *ngFor="let item of items">
        <ng-container [ngTemplateOutlet]="itemTemplate" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container
    ></ng-container>`,
    styleUrls: ['./mv-dropdown-menu.component.scss']
})
export class MvDropdownMenuComponent implements OnInit, AfterViewInit {
    @Input() public items: Array<UiDropdownItem | UiButton>;
    @Input() public display: 'row' | 'column';
    @Input() public itemTemplate: TemplateRef<MvDropdownItemDirective>;

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
