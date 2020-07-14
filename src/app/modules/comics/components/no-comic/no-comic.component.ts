import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mv-no-comic',
    template: `<h1>Select a character to see details</h1>`,
    styleUrls: ['./no-comic.component.scss']
})
export class NoComicComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
