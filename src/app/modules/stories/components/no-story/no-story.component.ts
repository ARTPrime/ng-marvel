import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mv-no-story',
    template: `<h1>Select a character to see details</h1>`,
    styleUrls: ['./no-story.component.scss']
})
export class NoStoryComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
