import { CanvasLayer } from '../canvas-layer';
import type { Renderer } from '../canvas-layer';

describe('CanvasLayer', () => {
  it('should be defined', () => {
    expect(new CanvasLayer('id', () => {})).toBeDefined();
  });

  it('should have correct id', () => {
    const renderer: Renderer = () => {};
    const canvasLayer = new CanvasLayer('id', renderer);
    expect(canvasLayer.id).toBe('id');
  });

  it('should have correct renderer', () => {
    const renderer: Renderer = () => {};
    const canvasLayer = new CanvasLayer('id', renderer);
    expect(canvasLayer.renderer).toBe(renderer);
  });
});
