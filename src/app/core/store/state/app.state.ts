import { CharactersState } from './characters.state';
import { ComicsState } from './comics.state';
import { NavigationState } from './navigation.state';
import { StoriesState } from './stories.state';

export interface AppState {
    characters?: CharactersState;
    comics?: ComicsState;
    stories?: StoriesState;
    navigation: NavigationState;
}
