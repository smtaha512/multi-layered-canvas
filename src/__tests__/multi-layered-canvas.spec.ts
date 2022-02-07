/**
 * @jest-environment jsdom
 */

import { CanvasLayer } from '../canvas-layer';
import { MultiLayeredCanvas } from '../multi-layered-canvas';

describe('MultiLayeredCanvas', () => {
  describe('MultiLayeredCanvas#new', () => {
    it('should create the MultiLayeredCanvas if selector string is passed', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');
      expect(multiLayeredCanvas).toBeDefined();
    });

    it('should create the MultiLayeredCanvas if HTMLCanvasElement is passed', () => {
      document.body.appendChild(document.createElement('canvas'));
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;

      const multiLayeredCanvas = new MultiLayeredCanvas(canvas);
      expect(multiLayeredCanvas).toBeDefined();
    });

    it('throw an error if wrong selector is passed for multi layered canvas creation', () => {
      document.body.appendChild(document.createElement('div'));

      expect(() => new MultiLayeredCanvas('div')).toThrow(`Expected HTMLCanvasElement got DIV`);
    });

    it('throw an error if wrong element is passed for multi layered canvas creation', () => {
      document.body.appendChild(document.createElement('div'));
      const canvas = document.querySelector('div') as unknown as HTMLCanvasElement;

      expect(() => new MultiLayeredCanvas(canvas)).toThrow('Expected HTMLCanvasElement got DIV');
    });
  });

  describe('MultiLayeredCanvas#push', () => {
    it('should push a canvas layer', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.at(0)).toBe(canvasLayer);
    });

    it('should push more than 1 canvas layers', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer1 = new CanvasLayer('layer-1', () => {});
      const canvasLayer2 = new CanvasLayer('layer-2', () => {});
      multiLayeredCanvas.push(canvasLayer1, canvasLayer2);

      expect(multiLayeredCanvas.at(0)).toBe(canvasLayer1);
      expect(multiLayeredCanvas.at(1)).toBe(canvasLayer2);
    });

    it('should add unique layers only', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer1 = new CanvasLayer('layer-1', () => {});
      const canvasLayer2 = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer1, canvasLayer2);

      expect(multiLayeredCanvas.length).toBe(1);
    });

    it('should throw an error if a layer already exists', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer1 = new CanvasLayer('layer-1', () => {});
      const canvasLayer2 = new CanvasLayer('layer-1', () => {});

      expect(() => multiLayeredCanvas.push(canvasLayer1).push(canvasLayer2)).toThrow('layer-1');
    });
  });

  describe('MultiLayeredCanvas#getLayer', () => {
    it('should return a layer by id', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.getLayer('layer-1')).toBe(canvasLayer);
    });

    it('should return null if layer is not present for a particular id', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.getLayer('layer-2')).toBe(null);
    });
  });

  describe('MultiLayeredCanvas#at', () => {
    it('should return a layer by index', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.at(0)).toBe(canvasLayer);
    });

    it('should return null if layer is not present at a particular index', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.at(1)).toBe(null);
    });
  });

  describe('MultiLayeredCanvas#findIndex', () => {
    it('should return the index of layer by id', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.findIndex('layer-1')).toBe(0);
    });

    it('should return null if layer is not present at a particular index', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.findIndex('layer-2')).toBe(-1);
    });
  });

  describe('MultiLayeredCanvas#findIndex', () => {
    it('should return the index of layer by id', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.findIndex('layer-1')).toBe(0);
    });

    it('should return null if layer is not present at a particular index', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(multiLayeredCanvas.findIndex('layer-2')).toBe(-1);
    });
  });

  describe('MultiLayeredCanvas#updateLayer', () => {
    it('should update a given layer', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      const update = new CanvasLayer('layer-1-update', () => {});
      multiLayeredCanvas.updateLayer('layer-1', update);

      expect(multiLayeredCanvas.at(0)).toBe(update);
      expect(multiLayeredCanvas.at(0)).not.toBe(canvasLayer);
    });

    it('should throw an error if layer is not found', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      const update = new CanvasLayer('layer-1-update', () => {});

      expect(() => multiLayeredCanvas.updateLayer('layer-2', update)).toThrow('layer-2');
    });
  });

  describe('MultiLayeredCanvas#removeLayer', () => {
    it('should remove by id', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      multiLayeredCanvas.removeLayer('layer-1');

      expect(multiLayeredCanvas.at(0)).not.toBe(canvasLayer);
    });

    it('should throw an error if layer does not exists', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      const canvasLayer = new CanvasLayer('layer-1', () => {});
      multiLayeredCanvas.push(canvasLayer);

      expect(() => multiLayeredCanvas.removeLayer('layer-2')).toThrow('layer-2');
    });
  });

  describe('MultiLayeredCanvas#height', () => {
    it('should get and set height of the multi layered canvas element', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      multiLayeredCanvas.height = 10;
      expect(multiLayeredCanvas.height).toBe(10);
      expect(document.querySelector('canvas')?.height).toBe(10);
    });
  });

  describe('MultiLayeredCanvas#height', () => {
    it('should get and set width of the multi layered canvas element', () => {
      document.body.appendChild(document.createElement('canvas'));
      const multiLayeredCanvas = new MultiLayeredCanvas('canvas');

      multiLayeredCanvas.width = 10;
      expect(multiLayeredCanvas.width).toBe(10);
      expect(document.querySelector('canvas')?.width).toBe(10);
    });
  });
});
