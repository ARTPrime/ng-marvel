declare type UiColorPrimary = 'mv-primary';
declare type UiColorSecondary = 'mv-secondary';
declare type UiColorDanger = 'mv-danger';
declare type UiColorDangerShadow = 'mv-danger-shade';
declare type UiColorWarning = 'mv-warning';
declare type UiColorSuccess = 'mv-success';
declare type UiColorLight = 'mv-light';
declare type UiColorDark = 'mv-dark';
declare type UiColorDarkTint = 'mv-dark-tint';
declare type UiColorDarkShade = 'mv-dark-shade';

declare type UiFillSolid = 'mv-solid';
declare type UiFillOutline = 'mv-outline';
declare type UiFillTransparent = 'mv-transparent';

declare type UiFill = UiFillSolid | UiFillOutline | UiFillTransparent;

declare type UiColor =
    | UiColorPrimary
    | UiColorSecondary
    | UiColorDanger
    | UiColorDangerShadow
    | UiColorWarning
    | UiColorSuccess
    | UiColorLight
    | UiColorDark
    | UiColorDarkShade
    | UiColorDarkTint;
