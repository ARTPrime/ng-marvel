import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';
import { appendCharacters, getCharacaters, setCharacater } from 'src/app/core/store/actions/characters.actions';
import { setFilterOptions, setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import {
    selectCharacter,
    selectCharacters,
    selectLoadingCharacters
} from 'src/app/core/store/selectors/characters.selectors';
import { selectRouterState } from 'src/app/core/store/selectors/router.selectors';
import { selectFilter } from 'src/app/core/store/selectors/toolbar.selectors';

@Component({
    selector: 'mv-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    public characters$: Observable<Array<MarvelCharacter>>;
    public selectedCharacter: MarvelCharacter;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalCharacters: number;
    public loadedCharacters: number;
    public charactersLoading: boolean;
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
    public ngOnChanges() {}

    public ngOnInit(): void {
        this.store
            .select(selectLoadingCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.charactersLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.characters$ = this.store.select(selectCharacters).pipe(
            map(v => v.data.results.map(r => r as MarvelCharacter)),
            tap(c => (this.loadedCharacters = c.length))
        );
        this.store
            .select(selectCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalCharacters = collection.data.total));
        this.store
            .select(selectCharacter)
            .pipe(takeUntil(this.destroy$))
            .subscribe(c => (this.selectedCharacter = c));
        this.store
            .select(selectFilter)
            .pipe(
                skip(1),
                takeUntil(this.destroy$),
                tap(v => (this.filterBy = v))
            )
            .subscribe(f =>
                this.store.dispatch(
                    getCharacaters({
                        offset: 0,
                        filter: f
                    })
                )
            );
        this.store.dispatch(
            setFilterOptions({
                filterOptions: {
                    button: {
                        text: 'Filter characters by'
                    },
                    children: [
                        {
                            text: 'Characater name',
                            value: 'character'
                        },
                        {
                            text: 'Comic id',
                            value: 'comic'
                        },
                        {
                            text: 'Story id',
                            value: 'story'
                        }
                    ]
                }
            })
        );
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
                        s.includes('characters/comics') || s.includes('characters/stories') ? true : false)
            );
        this.store.dispatch(setSelectedItem(undefined));
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.charactersLoading),
                filter(() => this.totalCharacters > this.loadedCharacters)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendCharacters({
                        offset: this.loadedCharacters,
                        filter: this.filterBy
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }

    public onItemClick(character: MarvelCharacter) {
        this.store.dispatch(
            setCharacater({
                character
            })
        );
        this.router.navigate(['view', character.id], { relativeTo: this.route });
    }

    public getAlphabet(): string[] {
        const letters = [];
        for (let i = 0; i < 26; i++) {
            letters.push((i + 10).toString(36));
        }
        return letters;
    }

    public onAlphabetClick(char: string) {
        this.filterBy = {
            value: char,
            filter: 'character'
        };
        this.store.dispatch(
            getCharacaters({
                offset: 0,
                filter: this.filterBy
            })
        );
    }
}
