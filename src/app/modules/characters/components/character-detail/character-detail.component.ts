import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ImageUrlService } from 'src/app/core/services/image-url/image-url.service';
import { selectCharacter } from 'src/app/core/store/selectors/characters.selectors';

@Component({
    selector: 'mv-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
    public destroy$: Subject<boolean> = new Subject<boolean>();
    public selectedCharacter: MarvelCharacter;
    public imageClass: SafeStyle;
    public size: ImageSizePortraitUncanny = {
        name: 'portrait_uncanny',
        height: 450,
        width: 300
    };
    public imageUrl = (size: ImageSize, image: MarvelImage) => this.imageUrlService.getImageUrl(size, image);

    constructor(private store: Store, private imageUrlService: ImageUrlService, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.store
            .select(selectCharacter)
            .pipe(
                takeUntil(this.destroy$),
                tap(
                    c =>
                        (this.imageClass = this.sanitizer.bypassSecurityTrustStyle(
                            this.getImageBackground(this.size, c.thumbnail)
                        ))
                ),
                tap(() => console.log(this.imageClass))
            )
            .subscribe(c => (this.selectedCharacter = c));
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    private getImageBackground(itemSize: ImageSize, image: MarvelImage) {
        return `radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${this.imageUrl(itemSize, image)})`;
    }
}
