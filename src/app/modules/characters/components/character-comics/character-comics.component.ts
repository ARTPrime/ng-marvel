import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import {
    appendCharacterComics,
    setCharacater,
    setCharacterComics
} from 'src/app/core/store/actions/characters.actions';
import { setComic } from 'src/app/core/store/actions/comics.actions';
import { setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
    selectCharacter,
    selectCharacterComics,
    selectLoadingCharacterComics
} from 'src/app/core/store/selectors/characters.selectors';

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

    constructor(private store: Store, private router: Router) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingCharacterComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.charecterComicsLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.characterComics$ = this.store.select(selectCharacterComics).pipe(
            map(v => v.data.results.map(r => r as MarvelComic)),
            tap(c => (this.loadedCharacterComics = c.length))
        );
        this.store
            .select(selectCharacterComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => {
                this.totalCharacterComics = collection.data.total;
                this.selectedCharacterComics = collection;
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
                filter(() => this.totalCharacterComics !== this.loadedCharacterComics)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendCharacterComics({
                        offset: this.loadedCharacterComics,
                        id: this.selectedCharacter.id
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
        this.store.dispatch(
            setCharacterComics({
                characterComics: null
            })
        );
        this.store.dispatch(
            setCharacater({
                character: null
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
