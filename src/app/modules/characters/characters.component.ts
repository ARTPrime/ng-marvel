import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MvGalleryComponent } from '@shared/components/mv-gallery/mv-gallery.component';
import { MvGalleryItemDirective } from '@shared/directives/mv-gallery-item/mv-gallery-item.directive';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { getCharacaters, setCharacater } from 'src/app/core/store/actions/characters.actions';
import {
    selectCharacter,
    selectCharacters,
    selectLoadingCharacters
} from 'src/app/core/store/selectors/characters.selectors';

@Component({
    selector: 'mv-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit, OnDestroy {
    public characters$: Observable<Array<MarvelCharacter>>;
    public selectedCharacter: MarvelCharacter;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public totalCharacters: number;
    public loadedCharacters: number;
    public charactersLoading: boolean;
    @ViewChild(MvGalleryComponent) private gallery: MvGalleryComponent;
    @ViewChildren(MvGalleryItemDirective) private items: QueryList<MvGalleryItemDirective>;
    public galleryItemSize: ImageSizeLandscapeAmazing = {
        name: 'landscape_amazing',
        width: 250,
        height: 156
    };

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}
    public ngOnInit(): void {
        this.store
            .select(selectLoadingCharacters)
            .pipe(takeUntil(this.destroy$))
            .subscribe(v => (this.charactersLoading = v));
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
            .subscribe(v => (this.selectedCharacter = v));
    }

    public ngAfterViewInit() {
        this.gallery.scrollReachedEnd
            .pipe(
                takeUntil(this.destroy$),
                filter(() => !this.charactersLoading),
                filter(() => this.totalCharacters !== this.loadedCharacters)
            )
            .subscribe(() => {
                this.store.dispatch(
                    getCharacaters({
                        offset: this.loadedCharacters
                    })
                );
            });
        if (this.items.find(i => i.selected)) {
            this.items
                .find(i => i.selected)
                .element.nativeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
        }
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
}
