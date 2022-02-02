export type Renderer = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;

export class CanvasLayer {
  constructor(private readonly _id: string, private readonly _renderer: Renderer) {}

  get id(): string {
    return this._id;
  }

  get renderer(): Renderer {
    return Object.freeze(this._renderer);
  }
}
