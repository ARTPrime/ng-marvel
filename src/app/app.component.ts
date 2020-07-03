import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { AppReadyService } from './core/services/app-ready/app-ready.service';

@Component({
    selector: 'mv-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navItems: Array<UiDropdownItem | UiButton>;
    public navToggle: UiMenuButton;

    constructor(private router: Router, private appReadyService: AppReadyService) {}

    public ngOnInit() {
        // Hide initial loader
        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => this.appReadyService.trigger());
        this.navToggle = {
            fill: 'mv-solid',
            color: 'mv-danger',
            toggle: true
        };
        this.navItems = this.createNavItems();
    }

    public onMenuButtonClick() {
        this.navToggle.toggle = !this.navToggle.toggle;
    }

    private createNavItems(): Array<UiDropdownItem | UiButton> {
        // Add this as a state slice
        return [
            {
                text: 'Home',
                fill: 'mv-outline',
                iconName: 'mv-thecap',
                color: 'mv-light',
                routerLink: ['/home']
            },
            {
                button: {
                    text: 'Characters',
                    fill: 'mv-outline',
                    iconName: 'mv-spidy',
                    color: 'mv-danger'
                },
                children: [
                    {
                        text: 'All characters',
                        routerLink: ['/characters']
                    },
                    {
                        text: 'Character comics',
                        routerLink: ['/characters/comics']
                    },
                    {
                        text: 'Character stories',
                        routerLink: ['/characters/stories']
                    }
                ],
                fill: 'mv-transparent',
                color: 'mv-light'
            },
            {
                button: {
                    text: 'Comics',
                    fill: 'mv-outline',
                    iconName: 'mv-cyclops',
                    color: 'mv-warning'
                },
                children: [
                    {
                        text: 'All comics',
                        routerLink: ['/comics']
                    },
                    {
                        // tslint:disable-next-line: quotemark
                        text: "Comics's characters",
                        routerLink: ['/comics/characters']
                    },
                    {
                        // tslint:disable-next-line: quotemark
                        text: "Comics's stories",
                        routerLink: ['/comics/stories']
                    }
                ],
                fill: 'mv-transparent',
                color: 'mv-light'
            },
            {
                button: {
                    text: 'Stories',
                    fill: 'mv-outline',
                    iconName: 'mv-ironman',
                    color: 'mv-success'
                },
                children: [
                    {
                        text: 'All stories',
                        routerLink: ['/stories']
                    },
                    {
                        text: 'Stories comics',
                        routerLink: ['/stories/comics']
                    }
                ],
                fill: 'mv-transparent',
                color: 'mv-light'
            }
        ];
    }
}
