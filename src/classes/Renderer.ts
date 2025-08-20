import type Game from './Game';
import type { Wall } from './Wall';

export default class Renderer {
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private context: CanvasRenderingContext2D;

  constructor(private readonly root: HTMLElement, private game: Game) {
    this.root.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  public render(): void {
    this.clearCanvas();
    this.drawWalls();
    // draw pellets
    // draw characters
  }

  private clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private onResize(): void {
    // TODO: fit the game to the root element, ensure everything is visible
    // this.canvas.width = this.root.offsetWidth;
    // this.canvas.height = this.root.offsetHeight;
    // determine what dimensions to use for rendering the game?
    // calculate the appropriate cell size so that everything fits on screen
    this.canvas.width = 500;
    this.canvas.height = 500;
  }

  // could call this depending on the game mode?
  // then toggle the colors if we are in a certain game mode?
  private drawWalls(): void {
    this.game.walls.forEach((wall) => {
      this.drawWall(wall);
    });
  }

  private drawWall(wall: Wall): void {
    // draw the wall
  }
}
