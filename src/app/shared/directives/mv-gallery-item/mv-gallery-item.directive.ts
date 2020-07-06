import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageUrlService } from 'src/app/core/services/image-url/image-url.service';

@Directive({
    selector: '[mvGalleryItem]'
})
export class MvGalleryItemDirective implements OnInit {
    @Input() item: MarvelComic | MarvelCharacter | MarvelStory;
    @Input() itemSize: ImageSize;
    @HostBinding('class.mv-gallery--item') public class = true;
    @HostBinding('style.height') public size: string;
    @HostBinding('style.background-image') public backgroundImage: string | SafeStyle;
    @HostBinding('style.background-color') public backgroundColor: string;
    public noImageColors = [
        '--mv-color-primary',
        '--mv-color-secondary',
        '--mv-color-danger',
        '--mv-color-warning',
        '--mv-color-success',
        '--mv-color-dark-tint'
    ];
    public random = (min, max) => Math.round(Math.random() * (max - min) + min);
    public imageUrl = (size: ImageSize, image: MarvelImage) => this.imageUrlService.getImageUrl(size, image);

    constructor(private imageUrlService: ImageUrlService, private sanitizer: DomSanitizer) {}
    ngOnInit() {
        this.size = `${this.itemSize.height}px`;
        if (this.item.thumbnail) {
            this.backgroundImage = this.item.thumbnail.path.includes('image_not_available')
                ? 'none'
                : this.sanitizer.bypassSecurityTrustStyle(this.getImageBackgroung(this.itemSize, this.item.thumbnail));
        }
        this.backgroundColor = `var(${this.noImageColors[this.random(0, this.noImageColors.length)]})`;
    }

    private getImageBackgroung(itemSize: ImageSize, image: MarvelImage) {
        return `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${this.imageUrl(itemSize, image)})`;
    }
}
