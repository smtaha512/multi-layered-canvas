import { CanvasLayer } from './canvas-layer';
import { CanvasLayerAlreadyExists, CanvasLayerNotFound } from './errors';

export class MultiLayeredCanvas {
  private layers: Array<CanvasLayer> = [];
  private readonly canvas: HTMLCanvasElement;
  private readonly canvas2dContext: CanvasRenderingContext2D | null;

  constructor(selectors: string | HTMLCanvasElement) {
    this.canvas = this.assertCanvas(selectors);
    this.canvas2dContext = this.canvas.getContext('2d');
  }

  push(...layers: CanvasLayer[]): MultiLayeredCanvas {
    layers.forEach((layer) => {
      if (this.getLayer(layer.id)) {
        throw new CanvasLayerAlreadyExists(layer.id);
      }
    });
    this.layers.push(...layers);
    return this;
  }

  getLayer(id: string): CanvasLayer | null {
    const layer = this.layers.find((layer: CanvasLayer) => layer.id === id);
    return layer ?? null;
  }

  at(index: number): CanvasLayer {
    return this.layers[index];
  }

  findIndex(id: string): number {
    return this.layers.findIndex((layer: CanvasLayer) => layer.id === id);
  }

  updateLayer(id: string, update: CanvasLayer): MultiLayeredCanvas {
    const layerIndex = this.findIndex(id);
    if (layerIndex === -1) {
      throw new CanvasLayerNotFound(id);
    }

    this.layers.splice(layerIndex, 1, update);
    return this;
  }

  removeLayer(id: string): MultiLayeredCanvas {
    const layer = this.getLayer(id);
    if (!layer) {
      throw new CanvasLayerNotFound(id);
    }
    this.layers = this.layers.filter((l) => l.id !== id);

    return this;
  }

  render(): void {
    const canvas = this.canvas;
    const context = this.canvas2dContext;
    if (context === null) {
      throw new Error('Context is null');
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.layers.forEach((layer) => {
      layer.renderer(canvas, context);
    });

    return undefined;
  }

  get length(): number {
    return this.layers.length;
  }

  private assertCanvas(selectors: string | HTMLCanvasElement): HTMLCanvasElement {
    if (typeof selectors !== 'string' && typeof selectors !== 'object') {
      throw new TypeError(`Expected string or HTMLCanvasElement got ${typeof selectors}`);
    }

    let canvas: HTMLCanvasElement | null = null;
    if (typeof selectors === 'string') {
      canvas = document.querySelector(selectors) as HTMLCanvasElement;
    }
    if (typeof selectors === 'object') {
      canvas = selectors;
    }
    if (canvas?.tagName !== 'CANVAS') {
      throw new TypeError(`Expected HTMLCanvasElement got ${canvas?.tagName}`);
    }
    return canvas;
  }
}
