export class CanvasLayerAlreadyExists extends Error {
  constructor(id?: string) {
    super(`Layer with id ${id} already exists`);
  }
}

export class CanvasLayerNotFound extends Error {
  constructor(id?: string) {
    super(`Layer with id ${id} does not exists`);
  }
}
