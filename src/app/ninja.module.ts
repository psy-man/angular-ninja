import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NinjaComponent} from './ninja.component';
import { TileComponent } from './tile/tile.component';
import { NinjaDirective } from './ninja.directive';

@NgModule({
  declarations: [
    NinjaComponent,
    TileComponent,

    NinjaDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [NinjaComponent]
})
export class NinjaModule { }
