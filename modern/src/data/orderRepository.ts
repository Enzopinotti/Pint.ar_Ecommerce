import type { OrderDraft } from "../domain/checkout";

export interface OrderResult {
  id: string;
}

export interface OrderRepository {
  submit(order: OrderDraft): Promise<OrderResult>;
}

export class DemoOrderRepository implements OrderRepository {
  async submit(_order: OrderDraft): Promise<OrderResult> {
    const suffix = globalThis.crypto?.randomUUID?.().slice(0, 8).toUpperCase() ?? Date.now().toString(36).toUpperCase();
    return { id: `DEMO-${suffix}` };
  }
}

export const demoOrderRepository: OrderRepository = new DemoOrderRepository();
