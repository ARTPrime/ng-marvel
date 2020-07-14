import { RouterState } from '@models/custom-router-serializer.interface';

import { CharactersState } from './characters.state';
import { ComicsState } from './comics.state';
import { NavigationState } from './navigation.state';
import { StoriesState } from './stories.state';
import { ToolbarState } from './toolbar.state';

export interface AppState {
    characters: CharactersState;
    comics: ComicsState;
    stories: StoriesState;
    navigation: NavigationState;
    router: RouterState;
    toolbar: ToolbarState;
}
