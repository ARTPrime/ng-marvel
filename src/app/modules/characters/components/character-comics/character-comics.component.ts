import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getCharacaters, setCharacater } from 'src/app/core/store/actions/characters.actions';
import { selectCharacterComics, selectLoadingCharacterComics } from 'src/app/core/store/selectors/characters.selectors';

@Component({
    selector: 'mv-character-comics',
    templateUrl: './character-comics.component.html',
    styleUrls: ['./character-comics.component.scss']
})
export class CharacterComicsComponent implements OnInit, OnDestroy, AfterViewInit {
    public characterComics$: Observable<Array<MarvelComic>>;
    public selectedCharacterComics: MarvelCollection;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalCharacterComics: number;
    public loadedCharacterComics: number;
    private charectersLoading: boolean;
    @ViewChild(MvGalleryComponent) private gallery: MvGalleryComponent;
    public galleryItemSize: ImageSizeLandscapeAmazing = {
        name: 'landscape_amazing',
        width: 250,
        height: 156
    };

    constructor(private store: Store) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingCharacterComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => (this.charectersLoading = v));
        this.characterComics$ = this.store.select(selectCharacterComics).pipe(
            map(v => v.data.results.map(r => r as MarvelComic)),
            tap(c => (this.loadedCharacterComics = c.length))
        );
        this.store
            .select(selectCharacterComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalCharacterComics = collection.data.total));
        this.store
            .select(selectCharacterComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => (this.selectedCharacterComics = v));
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.charectersLoading),
                filter(() => this.totalCharacterComics !== this.loadedCharacterComics)
            )
            .subscribe(() => {
                this.store.dispatch(
                    getCharacaters({
                        offset: this.loadedCharacterComics
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }

    public onItemClick(character: MarvelCharacter) {
        this.store.dispatch(
            setCharacater({
                character
            })
        );
    }
}
