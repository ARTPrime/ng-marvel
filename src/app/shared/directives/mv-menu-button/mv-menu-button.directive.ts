import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mvMenuButton]'
})
export class MvMenuButtonDirective implements OnInit {
    @Input() public toggle: boolean;
    constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    // Toggle button class on click
    @HostListener('click') public onClick() {
        this.element.nativeElement.classList.toggle('nav--open');
    }

    public ngOnInit() {
        const nativeElement = this.element.nativeElement;
        // Add line elements in button to create icon
        for (let i = 0; i < 3; i++) {
            const hr = this.renderer.createElement('hr');
            nativeElement.appendChild(hr);
        }
        // Add button class
        nativeElement.classList.add('mv-menu-button');
        // Add size class
        nativeElement.classList.add('mv-button-small');
        // Add open class if toggle = true
        if (Boolean(this.toggle)) {
            nativeElement.classList.add('nav--open');
        }
    }
}
