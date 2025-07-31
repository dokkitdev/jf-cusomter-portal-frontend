import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(
    private location: Location,
    private router: Router
  ) {}

  public back(fallbackURL?: string): void {
    if (history.length > 1) {
      this.location.back();
    } else if (fallbackURL) {
      this.router.navigateByUrl(fallbackURL);
    }
  }
}
