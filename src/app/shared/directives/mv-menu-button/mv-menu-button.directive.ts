import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[mvMenuButton]'
})
export class MvMenuButtonDirective implements OnInit {
    @Input() public toggle: boolean;
    @HostBinding('class.mv-menu-button') menuButton = true;
    @HostBinding('class.mv-button-small') buttonSmall = true;
    constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    // Toggle button class on click
    @HostListener('click') public onClick() {
        this.element.nativeElement.classList.toggle('nav--open');
    }

    public ngOnInit() {
        const nativeElement = this.element.nativeElement;
        // Add span and line elements in button to create icon
        const icon = this.renderer.createElement('span');
        for (let i = 0; i < 3; i++) {
            const hr = this.renderer.createElement('hr');
            icon.appendChild(hr);
        }
        nativeElement.appendChild(icon);
        // Add open class if toggle = true
        if (this.toggle) {
            nativeElement.classList.add('nav--open');
        }
    }
}
