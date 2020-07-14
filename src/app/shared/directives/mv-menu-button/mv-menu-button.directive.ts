import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges
} from '@angular/core';

@Directive({
    selector: '[mvMenuButton]'
})
export class MvMenuButtonDirective implements OnInit, OnChanges {
    @Input() public toggle: boolean;
    @HostBinding('class.mv-menu-button') menuButton = true;
    @HostBinding('class.mv-button-small') buttonSmall = true;
    @HostBinding('class.nav--open') navOpen: boolean;
    constructor(private element: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    // Toggle button class on click
    @HostListener('click') public onClick() {
        this.toggle = !this.toggle;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const key = 'toggle';
        if (changes[key] && !changes[key].isFirstChange()) {
            this.navOpen = changes[key].currentValue;
        }
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
        this.navOpen = this.toggle;
    }
}
