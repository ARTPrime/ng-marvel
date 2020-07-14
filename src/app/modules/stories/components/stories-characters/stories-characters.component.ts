import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { appendStoryCharacters, setStory, setStoryCharacters } from 'src/app/core/store/actions/stories.actions';
import { setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
  selectLoadingStoryharacters,
  selectStory,
  selectStoryCharacters
} from 'src/app/core/store/selectors/stories.selectors';

@Component({
    selector: 'mv-stories-characters',
    templateUrl: './stories-characters.component.html',
    styleUrls: ['./stories-characters.component.scss']
})
export class StoriesCharactersComponent implements OnInit, OnDestroy, AfterViewInit {
    public storiesCharacters$: Observable<Array<MarvelCharacter>>;
    public selectedComicCharacters: MarvelCollection;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalStoryCharacters: number;
    public loadedComicCharacters: number;
    private comicCharactersLoading: boolean;
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

    constructor(private store: Store) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingStoryharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.comicCharactersLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.storiesCharacters$ = this.store.select(selectStoryCharacters).pipe(
            map(v => v.data.results.map(r => r as MarvelCharacter)),
            tap(c => (this.loadedComicCharacters = c.length))
        );
        this.store
            .select(selectStoryCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => {
                this.totalStoryCharacters = collection.data.total;
                this.selectedComicCharacters = collection;
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
                filter(() => !this.comicCharactersLoading),
                filter(() => this.totalStoryCharacters !== this.loadedComicCharacters)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendStoryCharacters({
                        offset: this.loadedComicCharacters,
                        id: this.selectedStory.id
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.store.dispatch(
            setStoryCharacters({
                storyCharacters: null
            })
        );
        this.store.dispatch(
            setStory({
                story: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }

    public onItemClick(character: MarvelCharacter) {
        // this.store.dispatch(
        //     setCharacater({
        //         character
        //     })
        // );
        console.log(character);
    }
}
