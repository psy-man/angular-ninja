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

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }
}
