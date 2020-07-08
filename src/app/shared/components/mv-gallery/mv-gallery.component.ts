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
import { MvGalleryItemDirective } from '@shared/directives/mv-gallery-item/mv-gallery-item.directive';

@Component({
    selector: 'mv-gallery',
    templateUrl: './mv-gallery.component.html',
    styleUrls: ['./mv-gallery.component.scss']
})
export class MvGalleryComponent implements OnInit, AfterViewInit {
    @Input() public items: Array<MarvelStory | MarvelCharacter | MarvelComic>;
    @Input() public itemTemplate: TemplateRef<MvGalleryItemDirective>;
    @Input() public itemSize: ImageSize;
    @Input() public selectedItem: MarvelStory | MarvelCharacter | MarvelComic;
    @HostBinding('class.mv-gallery') public class = true;

    @Output() public scrollReachedEnd: EventEmitter<true> = new EventEmitter<true>();
    public lastPosition = 0;
    @HostListener('scroll') onScroll() {
        const nativeElement = this.element.nativeElement;
        const scrollHeight = nativeElement.scrollHeight;
        const scrollY = nativeElement.scrollTop + nativeElement.offsetHeight + this.itemSize.height * 2;
        if (scrollY >= scrollHeight) {
            this.scrollReachedEnd.emit(true);
        }
    }

    constructor(private element: ElementRef<HTMLElement>) {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {}
    public trackById(_: number, value: any) {
        return value.id;
    }
}
