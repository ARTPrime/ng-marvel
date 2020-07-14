import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { setCharacater } from 'src/app/core/store/actions/characters.actions';
import { appendComicCharacters, setComic, setComicCharacters } from 'src/app/core/store/actions/comics.actions';
import { setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
    selectComic,
    selectComicCharacters,
    selectLoadingComicharacters
} from 'src/app/core/store/selectors/comics.selectors';

@Component({
    selector: 'mv-comics-characters',
    templateUrl: './comics-characters.component.html',
    styleUrls: ['./comics-characters.component.scss']
})
export class ComicsCharactersComponent implements OnInit, OnDestroy, AfterViewInit {
    public comicsCharacters$: Observable<Array<MarvelCharacter>>;
    public selectedComicCharacters: MarvelCollection;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalComicCharacters: number;
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
    private selectedComic: MarvelComic;

    constructor(private store: Store, private router: Router) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingComicharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.comicCharactersLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.comicsCharacters$ = this.store.select(selectComicCharacters).pipe(
            map(v => v.data.results.map(r => r as MarvelCharacter)),
            tap(c => (this.loadedComicCharacters = c.length))
        );
        this.store
            .select(selectComicCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => {
                this.totalComicCharacters = collection.data.total;
                this.selectedComicCharacters = collection;
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
                filter(() => !this.comicCharactersLoading),
                filter(() => this.totalComicCharacters !== this.loadedComicCharacters)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendComicCharacters({
                        offset: this.loadedComicCharacters,
                        id: this.selectedComic.id
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.store.dispatch(
            setComicCharacters({
                comicCharacters: null
            })
        );
        this.store.dispatch(
            setComic({
                comic: null
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
    }

    public onItemClick(character: MarvelCharacter) {
        this.store.dispatch(
            setCharacater({
                character
            })
        );
        this.router.navigate(['characters', 'view', character.id]);
    }
}
