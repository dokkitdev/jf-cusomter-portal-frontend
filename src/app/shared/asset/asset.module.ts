import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetService } from './asset.service';

@NgModule({
  imports: [CommonModule],
  providers: [AssetService]
})
export class AssetModule {}
