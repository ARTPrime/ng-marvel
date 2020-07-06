import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MvDropdownMenuComponent } from '@shared/components/mv-dropdown-menu/mv-dropdown-menu.component';
import { MvDropdownIconDirective } from '@shared/directives//mv-dropdown-icon/mv-dropdown-icon.directive';
import { MvButtonDirective } from '@shared/directives/mv-button/mv-button.directive';
import { MvIconDirective } from '@shared/directives/mv-icon/mv-icon.directive';
import { MvMenuButtonDirective } from '@shared/directives/mv-menu-button/mv-menu-button.directive';

import { MvGalleryComponent } from './components/mv-gallery/mv-gallery.component';
import { MvLoaderComponent } from './components/mv-loader/mv-loader.component';
import { MvDropdownItemDirective } from './directives/mv-dropdown-item/mv-dropdown-item.directive';
import { MvDropdownSubmenuDirective } from './directives/mv-dropdown-submenu/mv-dropdown-submenu.directive';
import { MvGalleryItemDirective } from './directives/mv-gallery-item/mv-gallery-item.directive';
import { MvNavigationOverlayDirective } from './directives/mv-navigation-overlay/mv-navigation-overlay.directive';
import { MvOverlayDirective } from './directives/mv-overlay/mv-overlay.directive';

@NgModule({
    declarations: [
        MvButtonDirective,
        MvMenuButtonDirective,
        MvIconDirective,
        MvDropdownIconDirective,
        MvDropdownMenuComponent,
        MvDropdownIconDirective,
        MvGalleryComponent,
        MvDropdownItemDirective,
        MvDropdownSubmenuDirective,
        MvOverlayDirective,
        MvNavigationOverlayDirective,
        MvLoaderComponent,
        MvGalleryItemDirective
    ],
    imports: [CommonModule, ScrollingModule],
    exports: [
        MvButtonDirective,
        MvMenuButtonDirective,
        MvIconDirective,
        MvDropdownIconDirective,
        MvDropdownMenuComponent,
        MvDropdownItemDirective,
        MvDropdownSubmenuDirective,
        MvOverlayDirective,
        MvNavigationOverlayDirective,
        MvLoaderComponent,
        MvGalleryComponent,
        MvGalleryItemDirective
    ]
})
export class MvSharedModule {}
