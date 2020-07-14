import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { setComic } from 'src/app/core/store/actions/comics.actions';
import { appendStoryComics, setStory, setStoryComics } from 'src/app/core/store/actions/stories.actions';
import { setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
    selectLoadingStoryComics,
    selectStories,
    selectStory,
    selectStoryComics
} from 'src/app/core/store/selectors/stories.selectors';

@Component({
    selector: 'mv-stories-comics',
    templateUrl: './stories-comics.component.html',
    styleUrls: ['./stories-comics.component.scss']
})
export class StoriesComicsComponent implements OnInit, OnDestroy, AfterViewInit {
    public storyComics$: Observable<Array<MarvelComic>>;
    public selectedStoryComics: MarvelCollection;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalStoryComics: number;
    public loadedStoryComics: number;
    private storyComics: boolean;
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
    private selectedStory: MarvelStory;

    constructor(private store: Store, private router: Router) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingStoryComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.storyComics = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.storyComics$ = this.store.select(selectStories).pipe(
            map(v => v.data.results.map(r => r as MarvelComic)),
            tap(c => (this.loadedStoryComics = c.length))
        );
        this.store
            .select(selectStoryComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => {
                this.totalStoryComics = collection.data.total;
                this.selectedStoryComics = collection;
            });
        this.store
            .select(selectStory)
            .pipe(takeUntil(this.destroy$))
            .subscribe(c => {
                this.selectedStory = c;
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
                filter(() => !this.storyComics),
                filter(() => this.totalStoryComics !== this.loadedStoryComics)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendStoryComics({
                        offset: this.loadedStoryComics,
                        id: this.selectedStory.id
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.store.dispatch(
            setStoryComics({
                storyComics: null
            })
        );
        this.store.dispatch(
            setStory({
                story: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }

    public onItemClick(comic: MarvelComic) {
        this.store.dispatch(
            setComic({
                comic
            })
        );
        this.router.navigate(['comics', 'view', comic.id]);
    }
}
