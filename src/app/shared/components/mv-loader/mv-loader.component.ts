import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'mv-loader',
    template: `<div></div>
        <div></div>`,
    styleUrls: ['./mv-loader.component.scss']
})
export class MvLoaderComponent implements OnInit {
    @Input() color: UiColor;
    @Input() size: 'mv-loader--small' | 'mv-loader--big' | 'mv-loader--xs';
    @HostBinding('class') class: string;

    constructor() {}

    ngOnInit(): void {
        this.class = [this.size, this.color].join(' ');
    }
}
