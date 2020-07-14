import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { appendComicStories, setComic, setComicStories } from 'src/app/core/store/actions/comics.actions';
import { setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
  selectComic,
  selectComicsStories,
  selectLoadingComicStories
} from 'src/app/core/store/selectors/comics.selectors';

@Component({
    selector: 'mv-comics-stories',
    templateUrl: './comics-stories.component.html',
    styleUrls: ['./comics-stories.component.scss']
})
export class ComicsStoriesComponent implements OnInit, OnDestroy, AfterViewInit {
    public comicStories$: Observable<Array<MarvelStory>>;
    public selectedComicStories: MarvelCollection;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalComicStories: number;
    public loadedComicStories: number;
    private comicStoriesLoading: boolean;
    public initialOffset = 56;
    public filterBy: {
        filter: string;
        value: string;
    };
    @ViewChild(MvGalleryComponent) private gallery: MvGalleryComponent;
    public galleryItemSize: ImageSizeLandscapeAmazing = {
        name: 'landscape_amazing',
        width: 250,
        height: 156
    };
    private selectedComic: MarvelComic;

    constructor(private store: Store) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingComicStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.comicStoriesLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.comicStories$ = this.store.select(selectComicsStories).pipe(
            map(v => v.data.results.map(r => r as MarvelStory)),
            tap(c => (this.loadedComicStories = c.length))
        );
        this.store
            .select(selectComicsStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => {
                this.totalComicStories = collection.data.total;
                this.selectedComicStories = collection;
            });
        this.store
            .select(selectComic)
            .pipe(takeUntil(this.destroy$))
            .subscribe(c => {
                this.selectedComic = c;
                this.store.dispatch(
                    setSelectedItem({
                        item: c
                    })
                );
            });
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.comicStoriesLoading),
                filter(() => this.totalComicStories !== this.loadedComicStories)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendComicStories({
                        offset: this.loadedComicStories,
                        id: this.selectedComic.id
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.store.dispatch(
            setComicStories({
                comicStories: null
            })
        );
        this.store.dispatch(
            setComic({
                comic: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }
}
