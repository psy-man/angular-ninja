import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { Position, Tile } from '../ninja.types';


@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: [ './tile.component.scss' ]
})
export class TileComponent {
  @Input()
  get type(): Tile { return this._type; }
  set type(type: Tile) {
    this._type = type;
    this.hostClass = this.types[type];
  }

  @Input()
  get x(): number { return this._x; }
  set x(x: number) {
    this._x = x;
    this.hostLeft = this.toPx(x * this.size);
  }

  @Input()
  get y(): number { return this._y; }
  set y(y: number) {
    this._y = y;
    this.hostTop = this.toPx(y * this.size);
  }

  @Input() templateRef: TemplateRef<{ $implicit: Position }>;

  @HostBinding('class') hostClass: string;
  @HostBinding('style.top') hostTop: string;
  @HostBinding('style.left') hostLeft: string;

  size = 64;
  @HostBinding('style.width')
  @HostBinding('style.height')
  hostSize = this.toPx(this.size);

  types = {
    [Tile.Floor]: 'background',
    [Tile.Wall]: 'wall',
  };

  private _type: Tile;
  private _x = 0;
  private _y = 0;

  private toPx(size: number): string {
    return `${ size }px`;
  }
}
