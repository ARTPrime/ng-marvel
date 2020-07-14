import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { MvGalleryItemDirective } from '@shared/directives/mv-gallery-item/mv-gallery-item.directive';

@Component({
    selector: 'mv-gallery',
    templateUrl: './mv-gallery.component.html',
    styleUrls: ['./mv-gallery.component.scss']
})
export class MvGalleryComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() public items: Array<MarvelStory | MarvelCharacter | MarvelComic>;
    @Input() public itemTemplate: TemplateRef<MvGalleryItemDirective>;
    @Input() public itemSize: ImageSize;
    @Input() public selectedItem: MarvelStory | MarvelCharacter | MarvelComic;
    @Input() private offset: number;
    @HostBinding('class.mv-gallery') public class = true;
    @HostBinding('class.fit--height') public shoudlFitHeight: boolean;

    @Output() public scrollReachedEnd: EventEmitter<true> = new EventEmitter<true>();
    public lastPosition = 0;
    public renderedItems: Array<MarvelStory | MarvelCharacter | MarvelComic>;
    @HostListener('scroll') onScroll() {
        const nativeElement = this.element.nativeElement;
        const scrollHeight = nativeElement.scrollHeight;
        const scrollY = nativeElement.scrollTop + nativeElement.offsetHeight + this.itemSize.height * 2;
        // const newOffset = this.renderedItems.length + this.offset;
        // Of we reached the end of contaienr
        if (scrollY >= scrollHeight) {
            // Check if all elements have been rendered.
            if (!this.allItemsRendered(this.items, this.renderedItems)) {
                // False, render more.
                this.renderedItems = this.items.slice(0, this.renderedItems.length + this.offset);
            } else {
                // True, request more.
                this.scrollReachedEnd.emit(true);
            }
        }
    }

    constructor(private element: ElementRef<HTMLElement>) {}
    ngOnChanges(changes: SimpleChanges): void {
        const key = 'items';
        if (changes[key] && !changes[key].isFirstChange()) {
            this.renderedItems = changes[key].currentValue.slice(0, this.renderedItems.length + this.offset);
            this.shoudlFitHeight = this.renderedItems.length <= 30 ? true : false;
        }
    }
    ngOnInit(): void {
        if (this.selectedItem) {
            this.moveSelectedShift(this.items, this.selectedItem);
        }
        this.renderedItems = this.items.slice(0, this.offset);
        this.shoudlFitHeight = this.renderedItems.length <= 30 ? true : false;
    }
    ngAfterViewInit(): void {}
    public trackById(_: number, value: any) {
        return value.id;
    }

    public allItemsRendered(
        items: Array<MarvelStory | MarvelCharacter | MarvelComic>,
        renderedItems: Array<MarvelStory | MarvelCharacter | MarvelComic>
    ) {
        return items.length >= this.offset + renderedItems.length ? false : true;
    }

    /**
     * Moves a selected item to begining of the list to avoid extra loading and auto scrolling
     * @param items collection of elements to search and replace in
     * @param selectedItem the item to be moved
     */
    public moveSelectedShift(
        items: Array<MarvelStory | MarvelCharacter | MarvelComic>,
        selectedItem: MarvelStory | MarvelCharacter | MarvelComic
    ) {
        const item = items.find(i => i.id === selectedItem.id);
        const itemIndex = items.findIndex(i => i.id === selectedItem.id, 1);

        items.unshift(item);
        items.splice(itemIndex + 1, 1);
    }
}
