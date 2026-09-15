import type { Product } from "../domain/product";
import { demoProducts } from "./demoProducts";

export interface CatalogRepository {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}

export class DemoCatalogRepository implements CatalogRepository {
  async list(): Promise<Product[]> {
    return demoProducts.map((product) => ({ ...product }));
  }

  async getById(id: string): Promise<Product | null> {
    const product = demoProducts.find((item) => item.id === id);
    return product ? { ...product } : null;
  }
}

export const catalogRepository: CatalogRepository = new DemoCatalogRepository();
