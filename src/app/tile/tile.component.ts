import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { Position, Tile } from '../ninja.types';


@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: [ './tile.component.scss' ]
})
export class TileComponent {
  size = 64;

  types = {
    [Tile.Floor]: 'background',
    [Tile.Wall]: 'wall',
  };

  private _type: Tile;
  private _x = 0;
  private _y = 0;
}
