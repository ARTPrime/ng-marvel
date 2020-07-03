import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MvDropdownItemComponent } from '@shared/components/mv-dropdown-item/mv-dropdown-item.component';
import { MvDropdownMenuComponent } from '@shared/components/mv-dropdown-menu/mv-dropdown-menu.component';
import { MvDropdownSubmenuComponent } from '@shared/components/mv-dropdown-submenu/mv-dropdown-submenu.component';
import { MvDropdownIconDirective } from '@shared/directives//mv-dropdown-icon/mv-dropdown-icon.directive';
import { MvButtonDirective } from '@shared/directives/mv-button/mv-button.directive';
import { MvIconDirective } from '@shared/directives/mv-icon/mv-icon.directive';
import { MvMenuButtonDirective } from '@shared/directives/mv-menu-button/mv-menu-button.directive';

@NgModule({
    declarations: [
        MvButtonDirective,
        MvMenuButtonDirective,
        MvIconDirective,
        MvDropdownIconDirective,
        MvDropdownMenuComponent,
        MvDropdownItemComponent,
        MvDropdownSubmenuComponent,
        MvDropdownIconDirective
    ],
    imports: [CommonModule],
    exports: [
        MvButtonDirective,
        MvMenuButtonDirective,
        MvIconDirective,
        MvDropdownIconDirective,
        MvDropdownMenuComponent,
        MvDropdownItemComponent,
        MvDropdownSubmenuComponent
    ]
})
export class MvSharedModule {}
