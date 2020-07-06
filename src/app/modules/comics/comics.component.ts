import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getComics } from 'src/app/core/store/actions/comics.actions';
import { selectComics, selectLoadingComics } from 'src/app/core/store/selectors/comics.selectors';

@Component({
    selector: 'mv-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit, AfterViewInit, OnDestroy {
    public comics$: Observable<Array<MarvelComic>>;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalCharacters: number;
    public loadedComics: number;
    private comicsLoading: boolean;
    @ViewChild(MvGalleryComponent) private gallery: MvGalleryComponent;
    public galleryItemSize: ImageSizeLandscapeAmazing = {
        name: 'landscape_amazing',
        width: 250,
        height: 156
    };
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store
            .select(selectLoadingComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => (this.comicsLoading = v));
        this.comics$ = this.store.select(selectComics).pipe(
            map(v => v.data.results.map(r => r as MarvelComic)),
            tap(c => (this.loadedComics = c.length))
        );
        this.store
            .select(selectComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalCharacters = collection.data.total));
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.comicsLoading),
                filter(() => this.totalCharacters !== this.loadedComics)
            )
            .subscribe(() => {
                this.store.dispatch(
                    getComics({
                        offset: this.loadedComics
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }
}
