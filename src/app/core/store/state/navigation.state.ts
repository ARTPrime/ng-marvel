export interface NavigationState {
    navItemsBig: Array<UiDropdownItem | UiButton>;
    navItemsSmall: Array<UiDropdownItem | UiButton>;
    isOpen: boolean;
}

export const defaultNavigationState: NavigationState = {
    isOpen: false,
    navItemsSmall: null,
    navItemsBig: [
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
    ]
};
