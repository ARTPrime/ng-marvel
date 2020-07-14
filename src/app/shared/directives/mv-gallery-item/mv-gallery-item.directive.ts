import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageUrlService } from 'src/app/core/services/image-url/image-url.service';

@Directive({
    selector: '[mvGalleryItem]'
})
export class MvGalleryItemDirective implements OnInit, OnChanges {
    @Input() item: MarvelComic | MarvelCharacter | MarvelStory;
    @Input() itemSize: ImageSize;
    @Input() selected: boolean;
    @HostBinding('class.item--selected') public isSelected: boolean;
    @HostBinding('class.mv-gallery--item') public class = true;
    @HostBinding('style.height') public size: string;
    @HostBinding('style.background-image') public backgroundImage: string | SafeStyle;
    @HostBinding('style.background-color') public backgroundColor: string;
    private noImageColors = [
        '--mv-color-primary',
        '--mv-color-secondary',
        '--mv-color-warning',
        '--mv-color-success',
        '--mv-color-dark-tint'
    ];

    public random = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
    public imageUrl = (size: ImageSize, image: MarvelImage) => this.imageUrlService.getImageUrl(size, image);

    constructor(
        private imageUrlService: ImageUrlService,
        private sanitizer: DomSanitizer,
        public element: ElementRef<HTMLElement>
    ) {}
    ngOnChanges(changes: SimpleChanges) {
        const field = 'selected';
        if (changes[field]) {
            this.isSelected = changes[field].currentValue;
        }
    }
    ngOnInit() {
        this.size = `${this.itemSize.height}px`;
        if (this.item.thumbnail) {
            this.backgroundImage = this.item.thumbnail.path.includes('image_not_available')
                ? 'none'
                : this.sanitizer.bypassSecurityTrustStyle(this.getImageBackground(this.itemSize, this.item.thumbnail));
        }
        this.backgroundColor = `var(${this.noImageColors[this.random(0, this.noImageColors.length - 1)]})`;
        this.isSelected = this.selected;
    }

    private getImageBackground(itemSize: ImageSize, image: MarvelImage) {
        return `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${this.imageUrl(itemSize, image)})`;
    }
}
