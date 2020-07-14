import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MvDropdownSubmenuDirective } from '@shared/directives/mv-dropdown-submenu/mv-dropdown-submenu.directive';

@Component({
    selector: 'mv-filter-searchbox',
    templateUrl: './mv-filter-searchbox.component.html',
    styleUrls: ['./mv-filter-searchbox.component.scss']
})
export class MvFilterSearchboxComponent implements OnInit, AfterViewInit {
    @Input() public filterOptions: UiDropdownItem;
    public selectedFilterOption: string;
    public placeholder: string;
    @ViewChild(MvDropdownSubmenuDirective) dropdown: MvDropdownSubmenuDirective;
    @ViewChild('input') input: ElementRef<HTMLInputElement>;
    public inputValue: string;
    @Output() public filterChanged: EventEmitter<{
        filter: string;
        value: string;
    }> = new EventEmitter<{
        filter: string;
        value: string;
    }>();
    constructor() {}

    ngOnInit(): void {}
    ngAfterViewInit() {
        this.input.nativeElement.maxLength = 20;
    }
    public onFilterClick(value: { text: string; value: any }) {
        this.placeholder = `${value.text} ...`;
        this.dropdown.toggle();
        this.selectedFilterOption = value.value;
    }
    public onSearch(value: string) {
        if (value) {
            this.filterChanged.emit({
                filter: this.selectedFilterOption,
                value: this.inputValue
            });
        }
    }
    public onReset() {
        this.inputValue = '';
        this.filterChanged.emit(null);
    }
}
