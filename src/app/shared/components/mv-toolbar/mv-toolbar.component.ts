import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MvMenuButtonDirective } from '@shared/directives/mv-menu-button/mv-menu-button.directive';

import { MvFilterSearchboxComponent } from '../mv-filter-searchbox/mv-filter-searchbox.component';

@Component({
    selector: 'mv-toolbar',
    templateUrl: './mv-toolbar.component.html',
    styleUrls: ['./mv-toolbar.component.scss']
})
export class MvToolbarComponent implements OnInit {
    @Input() public navButtonTemplate: TemplateRef<MvMenuButtonDirective>;
    @Input() public filtersTemplate: TemplateRef<MvFilterSearchboxComponent>;
    public loaderSize: UiLoaderTiny = 'mv-loader--xs';
    @Input() public currentParentLocation: string;
    @Input() public loading: boolean;
    @Input() public itemLocation: string;
    @Input() public searchBox: TemplateRef<any>;
    constructor() {}

    ngOnInit(): void {}
}
