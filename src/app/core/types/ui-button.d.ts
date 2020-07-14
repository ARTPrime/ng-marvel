declare type UiButtonSmall = 'mv-button-small';
declare type UiButtonCircle = 'mv-button-circle';

declare type UiButton = {
    color?: UiColor;
    fill?: UiFill;
    size?: UiButtonSmall;
    iconName?: UiIcon;
    text?: string;
    routerLink?: string[];
    value?: any;
};

declare type UiMenuButton = UiButton & { toggle: boolean };
