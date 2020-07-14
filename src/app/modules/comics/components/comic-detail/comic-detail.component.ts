import { Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ImageUrlService } from 'src/app/core/services/image-url/image-url.service';
import { setComic } from 'src/app/core/store/actions/comics.actions';
import { setSelectedItem } from 'src/app/core/store/actions/toolbar.actions';
import { selectComic } from 'src/app/core/store/selectors/comics.selectors';

@Component({
    selector: 'mv-comic-detail',
    templateUrl: './comic-detail.component.html',
    styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit, OnChanges, OnDestroy {
    public destroy$: Subject<boolean> = new Subject<boolean>();
    public selectedComic: MarvelComic;
    public imageClass: SafeStyle;
    public size: ImageSizePortraitUncanny = {
        name: 'portrait_uncanny',
        height: 450,
        width: 300
    };
    @HostBinding('class.mv-item--detail-panel') detailPanel = true;
    public imageUrl = (size: ImageSize, image: MarvelImage) => this.imageUrlService.getImageUrl(size, image);

    constructor(private store: Store, private imageUrlService: ImageUrlService, private sanitizer: DomSanitizer) {}

    ngOnChanges(changes: SimpleChanges): void {
        const key = 'selectedCharacter';
        if (changes[key]) {
            this.store.dispatch(
                setSelectedItem({
                    item: changes[key].currentValue as MarvelComic
                })
            );
        }
    }

    ngOnInit(): void {
        this.store
            .select(selectComic)
            .pipe(
                takeUntil(this.destroy$),
                tap(
                    c =>
                        (this.imageClass = this.sanitizer.bypassSecurityTrustStyle(
                            this.getImageBackground(this.size, c.thumbnail)
                        ))
                )
            )
            .subscribe(c => {
                this.selectedComic = c;
                this.store.dispatch(
                    setSelectedItem({
                        item: c
                    })
                );
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.store.dispatch(
            setComic({
                comic: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }

    private getImageBackground(itemSize: ImageSize, image: MarvelImage) {
        return `radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${this.imageUrl(itemSize, image)})`;
    }
}
