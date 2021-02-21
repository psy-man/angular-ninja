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
import { NinjaDirective } from './ninja.directive';
import { TileComponent } from './tile/tile.component';
import { Position, Tile } from './ninja.types';


@Component({
  selector: 'ninja-root',
  templateUrl: './ninja.component.html'
})
export class NinjaComponent implements OnInit, AfterViewInit {
  @ViewChild(NinjaDirective, { read: ViewContainerRef, static: true })
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
  shurikenCollectedSound = new Audio('../assets/shuriken.mp3');

  @HostListener('document:keydown.ArrowUp')
  moveUp(): void {
    this.move(0, -1);
  }

  @HostListener('document:keydown.ArrowDown')
  moveDown(): void {
    this.move(0, 1);
  }

  @HostListener('document:keydown.ArrowLeft')
  moveLeft(): void {
    this.move(-1, 0);
  }

  @HostListener('document:keydown.ArrowRight')
  moveRight(): void {
    this.move(1, 0);
  }

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.shurikenCollectedSound.load();
    this.shurikenCollectedSound.volume = 0.05;

    this.drawScene();
  }

  ngAfterViewInit(): void {
    this.shurikenRefs.changes.subscribe(shurikens => {
      if (shurikens.length === 0) {
        console.log('You WON!');
        return;
      }

      console.log(`Shuriken collected. ${ shurikens.length } left`);
    });
  }

  private move(offsetX: number, offsetY: number): void {
    const newX = this.ninjaRef.x + offsetX;
    const newY = this.ninjaRef.y + offsetY;

    if (this.map[newY][newX] === Tile.Floor) {
      this.collectShuriken(newX, newY);

      this.ninjaRef.x = newX;
      this.ninjaRef.y = newY;
    }
  }


  private collectShuriken(newX: number, newY: number): void {
    const shuriken: any = this.shurikens.find(
      ({ x, y }) => x === newX && y === newY
    );

    if (shuriken) {
      this.shurikenCollectedSound.currentTime = 0;
      this.shurikens = this.shurikens.filter(s => s !== shuriken);
      this.shurikenCollectedSound.play();
    }
  }

  private drawScene(): void {
    for (const [ y, row ] of this.map.entries()) {
      for (const [ x, type ] of row.entries()) {
        this.createTile(type, { x, y });
      }
    }
  }

  private createTile(type: Tile, position: Position): ComponentRef<TileComponent> {
    const factory: ComponentFactory<TileComponent> = this.resolver.resolveComponentFactory(TileComponent);
    const tile: ComponentRef<TileComponent> = this.scene.createComponent(factory);

    tile.instance.type = type;
    tile.instance.x = position.x;
    tile.instance.y = position.y;

    return tile;
  }
}
