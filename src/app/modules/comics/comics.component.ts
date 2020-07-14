import { AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { Observable, Subject } from 'rxjs';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';
import { appendComics, getComics, setComic } from 'src/app/core/store/actions/comics.actions';
import { setFilterOptions, setSelectedItem, toolbarLoading } from 'src/app/core/store/actions/toolbar.actions';
import { selectComic, selectComics, selectLoadingComics } from 'src/app/core/store/selectors/comics.selectors';
import { selectRouterState } from 'src/app/core/store/selectors/router.selectors';
import { selectFilter } from 'src/app/core/store/selectors/toolbar.selectors';

@Component({
    selector: 'mv-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit, AfterViewInit, OnDestroy {
    public comics$: Observable<Array<MarvelComic>>;
    public selectedComic: MarvelComic;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalComics: number;
    public loadedComics: number;
    public comicsLoading: boolean;
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
            .select(selectLoadingComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => {
                this.comicsLoading = v;
                this.store.dispatch(
                    toolbarLoading({
                        loading: v
                    })
                );
            });
        this.comics$ = this.store.select(selectComics).pipe(
            map(v => v.data.results.map(r => r as MarvelComic)),
            tap(c => (this.loadedComics = c.length))
        );
        this.store
            .select(selectComics)
            .pipe(takeUntil(this.destroy$))
            .subscribe(collection => (this.totalComics = collection.data.total));
        this.store
            .select(selectComic)
            .pipe(takeUntil(this.destroy$))
            .subscribe(c => (this.selectedComic = c));
        this.store
            .select(selectFilter)
            .pipe(
                skip(1),
                takeUntil(this.destroy$),
                tap(v => (this.filterBy = v))
            )
            .subscribe(f =>
                this.store.dispatch(
                    getComics({
                        offset: 0,
                        filter: f
                    })
                )
            );
        this.store.dispatch(
            setFilterOptions({
                filterOptions: {
                    button: {
                        text: 'Filter comics by'
                    },
                    children: [
                        {
                            text: 'Comic name',
                            value: 'comic'
                        },
                        {
                            text: 'Character id',
                            value: 'character'
                        },
                        {
                            text: 'Story id',
                            value: 'story'
                        }
                    ]
                }
            })
        );
        this.store.dispatch(setSelectedItem(undefined));
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
                        s.includes('comics/characters') || s.includes('comics/stories') ? true : false)
            );
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.comicsLoading),
                filter(() => this.totalComics > this.loadedComics)
            )
            .subscribe(() => {
                this.store.dispatch(
                    appendComics({
                        offset: this.loadedComics,
                        filter: this.filterBy
                    })
                );
            });
    }

    public ngOnDestroy() {
        this.destroy$.next(true);
    }

    public onItemClick(comic: MarvelComic) {
        this.store.dispatch(
            setComic({
                comic
            })
        );
        this.router.navigate(['view', comic.id], { relativeTo: this.route });
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
            filter: 'comic'
        };
        this.store.dispatch(
            getComics({
                offset: 0,
                filter: this.filterBy
            })
        );
    }
}
