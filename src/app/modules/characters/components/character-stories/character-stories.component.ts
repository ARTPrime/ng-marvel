import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import {
    appendCharacterStories,
    setCharacater,
    setCharacterStories
} from 'src/app/core/store/actions/characters.actions';
import { setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
    selectCharacter,
    selectCharacterStories,
    selectLoadingCharacterStories
} from 'src/app/core/store/selectors/characters.selectors';

@Component({
    selector: 'mv-character-stories',
    templateUrl: './character-stories.component.html',
    styleUrls: ['./character-stories.component.scss']
})
export class CharacterStoriesComponent implements OnInit, AfterViewInit, OnDestroy {
    public characterStories$: Observable<Array<MarvelComic>>;
    public selectedCharacterStories: MarvelCollection;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalCharactersStories: number;
    public loadedCharacterComics: number;
    private charecterComicsLoading: boolean;
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
    private selectedCharacter: MarvelCharacter;

    constructor(private store: Store) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingCharacterStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.charecterComicsLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.characterStories$ = this.store.select(selectCharacterStories).pipe(
            map(v => v.data.results.map(r => r as MarvelComic)),
            tap(c => (this.loadedCharacterComics = c.length))
        );
        this.store
            .select(selectCharacterStories)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => {
                this.totalCharactersStories = collection.data.total;
                this.selectedCharacterStories = collection;
            });
        this.store
            .select(selectCharacter)
            .pipe(takeUntil(this.destroy$))
            .subscribe(c => {
                this.selectedCharacter = c;
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
                filter(() => !this.charecterComicsLoading),
                filter(() => this.totalCharactersStories !== this.loadedCharacterComics)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendCharacterStories({
                        offset: this.loadedCharacterComics,
                        id: this.selectedCharacter.id
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.store.dispatch(
            setCharacterStories({
                characterStories: null
            })
        );
        this.store.dispatch(
            setCharacater({
                character: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }
}
