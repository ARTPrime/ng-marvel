import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageUrlService {
    constructor() {}
    public getImageUrl(size: ImageSize, image: MarvelImage) {
        return `${image.path}/${size.name}.${image.extension}`;
    }
}
