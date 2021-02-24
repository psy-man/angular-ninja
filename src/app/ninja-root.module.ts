import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NinjaRootComponent} from './ninja-root.component';
import { TileComponent } from './tile/tile.component';
import { NinjaSceneDirective } from './ninja-scene.directive';

@NgModule({
  declarations: [
    NinjaRootComponent,
    TileComponent,

    NinjaSceneDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [NinjaRootComponent]
})
export class NinjaRootModule { }
