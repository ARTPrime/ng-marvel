declare type ImageSizePortraitSmall = {
    name: 'portrait_small';
    width: 50;
    height: 75;
};
declare type ImageSizePortraitMedium = {
    name: 'portrait_medium';
    width: 100;
    height: 150;
};
declare type ImageSizePortraitXLarge = {
    name: 'portrait_xlarge';
    width: 150;
    height: 225;
};
declare type ImageSizePortraitFantastic = {
    name: 'portrait_fantastic';
    width: 168;
    height: 252;
};
declare type ImageSizePortraitUncanny = {
    name: 'portrait_uncanny';
    width: 300;
    height: 450;
};
declare type ImageSizePortraitIncredible = {
    name: 'portrait_incredible';
    width: 216;
    height: 324;
};

declare type ImageSizeSquareSmall = {
    name: 'standard_small';
    width: 65;
    height: 45;
};
declare type ImageSizeSquareMedium = {
    name: 'standard_medium';
    width: 100;
    height: 100;
};
declare type ImageSizeSquareLarge = {
    name: 'standard_large';
    width: 140;
    height: 140;
};
declare type ImageSizeSquareXLarge = {
    name: 'standard_xlarge';
    width: 200;
    height: 200;
};
declare type ImageSizeSquareFantastic = {
    name: 'standard_fantastic';
    width: 250;
    height: 250;
};
declare type ImageSizeSquareAmazing = {
    name: 'standard_amazing';
    width: 180;
    height: 180;
};

declare type ImageSizeLandscapeSmall = {
    name: 'landscape_small';
    width: 120;
    height: 90;
};
declare type ImageSizeLandscapeMedium = {
    name: 'landscape_medium';
    width: 175;
    height: 130;
};
declare type ImageSizeLandscapeLarge = {
    name: 'landscape_large';
    width: 190;
    height: 140;
};
declare type ImageSizeLandscapeXLarge = {
    name: 'landscape_xlarge';
    width: 270;
    height: 200;
};
declare type ImageSizeLandscapeAmazing = {
    name: 'landscape_amazing';
    width: 250;
    height: 156;
};
declare type ImageSizeLandscapeIncredible = {
    name: 'landscape_incredible';
    width: 464;
    height: 261;
};

declare type ImageSize =
    | ImageSizePortraitSmall
    | ImageSizePortraitMedium
    | ImageSizePortraitXLarge
    | ImageSizePortraitFantastic
    | ImageSizePortraitUncanny
    | ImageSizePortraitIncredible
    | ImageSizeSquareSmall
    | ImageSizeSquareMedium
    | ImageSizeSquareLarge
    | ImageSizeSquareXLarge
    | ImageSizeSquareFantastic
    | ImageSizeSquareAmazing
    | ImageSizeLandscapeSmall
    | ImageSizeLandscapeMedium
    | ImageSizeLandscapeLarge
    | ImageSizeLandscapeXLarge
    | ImageSizeLandscapeAmazing
    | ImageSizeLandscapeIncredible;
