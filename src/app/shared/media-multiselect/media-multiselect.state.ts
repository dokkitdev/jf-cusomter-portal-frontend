import { Media } from '@shared/media';

export class MediaMultiselectComponentState {
  public items: Array<Media>;

  constructor() {
    this.items = [];
  }
}
