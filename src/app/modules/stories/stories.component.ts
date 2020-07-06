import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getStories } from 'src/app/core/store/actions/stories.actions';
import { selectLoadingStories, selectStories } from 'src/app/core/store/selectors/stories.selectors';

@Component({
    selector: 'mv-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterViewInit, OnDestroy {
    public stories$: Observable<Array<MarvelStory>>;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalStories: number;
    public loadedStories: number;
    private storiesLoading: boolean;
    @ViewChild(MvGalleryComponent) private gallery: MvGalleryComponent;
    public galleryItemSize: ImageSizeLandscapeAmazing = {
        name: 'landscape_amazing',
        width: 250,
        height: 156
    };
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store
            .select(selectLoadingStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => (this.storiesLoading = v));
        this.stories$ = this.store.select(selectStories).pipe(
            map(v => v.data.results.map(r => r as MarvelStory)),
            tap(c => (this.loadedStories = c.length))
        );
        this.store
            .select(selectStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalStories = collection.data.total));
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.storiesLoading),
                filter(() => this.totalStories !== this.loadedStories)
            )
            .subscribe(() => {
                this.store.dispatch(
                    getStories({
                        offset: this.loadedStories
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }
}
