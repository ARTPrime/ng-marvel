import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getCharacaters } from 'src/app/core/store/actions/characters.actions';
import { selectCharacters, selectLoadingCharacters } from 'src/app/core/store/selectors/characters.selectors';

@Component({
    selector: 'mv-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit, OnDestroy {
    public characters$: Observable<Array<MarvelCharacter>>;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalCharacters: number;
    public loadedCharacters: number;
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
            .select(selectLoadingCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => (this.charectersLoading = v));
        this.characters$ = this.store.select(selectCharacters).pipe(
            map(v => v.data.results.map(r => r as MarvelCharacter)),
            tap(c => (this.loadedCharacters = c.length))
        );
        this.store
            .select(selectCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalCharacters = collection.data.total));
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.charectersLoading),
                filter(() => this.totalCharacters !== this.loadedCharacters)
            )
            .subscribe(() => {
                this.store.dispatch(
                    getCharacaters({
                        offset: this.loadedCharacters
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }
}
