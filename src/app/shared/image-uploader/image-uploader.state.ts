import { Media } from '@shared/media';

export class ImageUploaderComponentState {
  public isLoading: boolean;
  public isUploading: boolean;
  public progress: number;
  public image: Media;

  constructor() {
    this.isLoading = false;
    this.isUploading = false;
    this.progress = 0;
    this.image = new Media();
  }
}
