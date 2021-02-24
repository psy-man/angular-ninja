import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { NinjaSceneDirective } from './ninja-scene.directive';
import { TileComponent } from './tile/tile.component';
import { Position, Tile } from './ninja.types';


@Component({
  selector: 'ninja-root',
  templateUrl: './ninja-root.component.html'
})
export class NinjaRootComponent implements OnInit, AfterViewInit {
  @ViewChild(NinjaSceneDirective, { read: ViewContainerRef, static: true})
  scene: ViewContainerRef;

  @ViewChild('ninja', { static: true }) ninjaRef: TileComponent;
  @ViewChildren('shuriken') shurikenRefs: QueryList<TileComponent>;

  map: number[][] = [
    [ 1, 1, 1, 1, 1, 1, 1, 1 ],
    [ 1, 0, 1, 0, 0, 0, 0, 1 ],
    [ 1, 0, 1, 1, 0, 1, 1, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 0, 1, 1, 1, 1, 0, 1 ],
    [ 1, 0, 0, 0, 0, 1, 0, 1 ],
    [ 1, 0, 1, 0, 0, 1, 0, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1 ]
  ];

  shurikens: Position[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
    { x: 1, y: 2 },
    { x: 6, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 6, y: 5 },
    { x: 1, y: 6 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 6, y: 6 },
  ];

  @HostListener('document:keydown.ArrowUp')
  onMoveUp(): void {
    this.move(0, -1);
  }
  @HostListener('document:keydown.ArrowDown')
  onMoveDown(): void {
    this.move(0, 1);
  }
  @HostListener('document:keydown.ArrowLeft')
  onMoveLeft(): void {
    this.move(-1, 0);
  }
  @HostListener('document:keydown.ArrowRight')
  onMoveRight(): void {
    this.move(1, 0);
  }

  constructor(private factory: ComponentFactoryResolver) {
  }

  private move(offsetX: number, offsetY: number): void {
    const newX = this.ninjaRef.x + offsetX;
    const newY = this.ninjaRef.y + offsetY;

    if (this.map[newY][newX] === Tile.Floor) {
      this.ninjaRef.x = newX;
      this.ninjaRef.y = newY;

      const shuriken = this.shurikens.find(
        s => s.x === newX && s.y === newY
      );

      if (shuriken) {
        this.shurikens = this.shurikens.filter(s => s !== shuriken);
      }
    }
  }

  ngOnInit(): void {
    this.drawScene();
  }

  ngAfterViewInit(): void {
    this.shurikenRefs.changes.subscribe(() => {
      if (this.shurikenRefs.length === 0) {
        console.log('YOU WON!');
        return;
      }

      console.log(`${ this.shurikenRefs.length } left...`);
    });
  }

  private drawScene(): void {
    for (const [ y, row ] of this.map.entries()) {
      for (const [ x, type ] of row.entries()) {
        this.createTile(type, x, y);
      }
    }
  }

  private createTile(type: Tile, x: number, y: number): void {
    const factory = this.factory.resolveComponentFactory(TileComponent);
    const tile = this.scene.createComponent(factory);

    tile.instance.type = type;
    tile.instance.x = x;
    tile.instance.y = y;
  }
}
