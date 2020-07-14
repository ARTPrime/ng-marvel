export interface NavigationState {
    navItems: Array<UiDropdownItem | UiButton>;
    isOpen: boolean;
}

export const defaultNavigationState: NavigationState = {
    isOpen: true,
    navItems: [
        {
            button: {
                text: 'Characters'
            },
            children: [
                {
                    text: 'Characters',
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
            ]
        },
        {
            button: {
                text: 'Comics'
            },
            children: [
                {
                    text: 'Comics',
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
            ]
        },
        {
            button: {
                text: 'Stories'
            },
            children: [
                {
                    text: 'Stories characters',
                    routerLink: ['/stories/characters']
                },
                {
                    text: 'Stories comics',
                    routerLink: ['/stories/comics']
                }
            ]
        }
    ]
};
