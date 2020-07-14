import { Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ImageUrlService } from 'src/app/core/services/image-url/image-url.service';
import { setCharacater } from 'src/app/core/store/actions/characters.actions';
import { setSelectedItem } from 'src/app/core/store/actions/toolbar.actions';
import { selectCharacter } from 'src/app/core/store/selectors/characters.selectors';

@Component({
    selector: 'mv-character-detail',
    templateUrl: './character-detail.component.html',
    styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit, OnDestroy, OnChanges {
    public destroy$: Subject<boolean> = new Subject<boolean>();
    public selectedCharacter: MarvelCharacter;
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
                    item: changes[key].currentValue as MarvelCharacter
                })
            );
        }
    }

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
                )
            )
            .subscribe(c => {
                this.selectedCharacter = c;
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
            setCharacater({
                character: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }

    private getImageBackground(itemSize: ImageSize, image: MarvelImage) {
        return `radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${this.imageUrl(itemSize, image)})`;
    }
}
