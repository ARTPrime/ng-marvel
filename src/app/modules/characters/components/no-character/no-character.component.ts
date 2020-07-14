import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mv-no-character',
    template: `<h1>Select a character to see details</h1>`,
    styleUrls: ['./no-character.component.scss']
})
export class NoCharacterComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
