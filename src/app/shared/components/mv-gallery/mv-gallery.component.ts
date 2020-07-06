import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';

@Component({
    selector: 'mv-gallery',
    templateUrl: './mv-gallery.component.html',
    styleUrls: ['./mv-gallery.component.scss']
})
export class MvGalleryComponent implements OnInit, AfterViewInit {
    @Input() public items: Array<MarvelStory | MarvelCharacter | MarvelComic>;
    @Input() public itemTemplate: TemplateRef<any>;
    @Input() public itemSize: ImageSize;
    @HostBinding('class.mv-gallery') public class = true;

    @Output() public scrollReachedEnd: EventEmitter<true> = new EventEmitter<true>();
    public lastPosition = 0;
    @HostListener('scroll') onScroll() {
        const nativeElement = this.element.nativeElement;
        const scrollHeight = nativeElement.scrollHeight;
        const scrollY = nativeElement.scrollTop + nativeElement.offsetHeight + this.itemSize.height;
        if (scrollY >= scrollHeight) {
            this.scrollReachedEnd.emit(true);
        }
    }

    constructor(private element: ElementRef<HTMLElement>) {}
    ngOnInit(): void {}
    ngAfterViewInit() {}
    public trackById(_: number, value: any) {
        return value.id;
    }
}
