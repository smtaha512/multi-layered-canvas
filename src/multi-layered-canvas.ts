import type { CanvasLayer } from './canvas-layer';
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
    const uniqueLayers = this.getUniqueLayers(layers);

    const existingLayer = uniqueLayers.find((layer) => this.getLayer(layer.id)?.id === layer.id);
    if (existingLayer?.id) {
      throw new CanvasLayerAlreadyExists(existingLayer.id);
    }
    this.layers.push(...uniqueLayers);
    return this;
  }

  getLayer(id: string): CanvasLayer | null {
    const layer = this.layers.find((layer: CanvasLayer) => layer.id === id);
    return layer ?? null;
  }

  at(index: number): CanvasLayer {
    return this.layers[index] ?? null;
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

  get height(): number {
    return this.canvas.height;
  }

  set height(height: number) {
    this.canvas.height = height;
  }

  get width(): number {
    return this.canvas.width;
  }

  set width(width: number) {
    this.canvas.width = width;
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

  private getUniqueLayers(layers: CanvasLayer[]): CanvasLayer[] {
    if (layers.length === 1) {
      return layers;
    }
    const uniqueLayerIds = Array.from(new Set(layers.map((layer) => layer.id)));
    return uniqueLayerIds.map((id) => layers.find((layer) => layer.id === id)).filter(Boolean) as CanvasLayer[];
  }
}
