import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { appendStories, setStory } from 'src/app/core/store/actions/stories.actions';
import { setFilterOptions, setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import { selectRouterState } from 'src/app/core/store/selectors/router.selectors';
import { selectLoadingStories, selectStories, selectStory } from 'src/app/core/store/selectors/stories.selectors';

@Component({
    selector: 'mv-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterViewInit, OnDestroy {
    public stories$: Observable<Array<MarvelStory>>;
    public selectedStory: MarvelStory;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalStories: number;
    public loadedStories: number;
    public storiesLoading: boolean;
    public initialOffset = 56;
    public filterBy: {
        filter: string;
        value: string;
    };
    public alphabet = this.getAlphabet();
    public currentRoute: string;
    @HostBinding('class.second--gallery') public displaySecondGallery: boolean;

    @ViewChild(MvGalleryComponent) private gallery: MvGalleryComponent;
    public galleryItemSize: ImageSizeLandscapeAmazing = {
        name: 'landscape_amazing',
        width: 250,
        height: 156
    };

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.store
            .select(selectLoadingStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.storiesLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.stories$ = this.store.select(selectStories).pipe(
            map(v => v.data.results.map(r => r as MarvelStory)),
            tap(c => (this.loadedStories = c.length))
        );
        this.store
            .select(selectStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalStories = collection.data.total));
        this.store
            .select(selectStory)
            .pipe(takeUntil(this.destroy$))
            .subscribe(c => (this.selectedStory = c));

        this.store.dispatch(
            setFilterOptions({
                filterOptions: null
            })
        );
        this.store.dispatch(setSelectedItem(null));
        this.store
            .select(selectRouterState)
            .pipe(
                takeUntil(this.destroy$),
                map(s => s.state.url),
                tap(u => (this.currentRoute = u))
            )
            .subscribe(
                s =>
                    (this.displaySecondGallery =
                        s.includes('stories/characters') || s.includes('stories/stories') ? true : false)
            );
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.storiesLoading),
                filter(() => this.totalStories > this.loadedStories)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendStories({
                        offset: this.loadedStories,
                        filter: this.filterBy
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }

    public onItemClick(story: MarvelStory) {
        this.store.dispatch(
            setStory({
                story
            })
        );
        this.router.navigate(['view', story.id], { relativeTo: this.route });
    }

    public getAlphabet(): string[] {
        const letters = [];
        for (let i = 0; i < 26; i++) {
            letters.push((i + 10).toString(36));
        }
        return letters;
    }
}
