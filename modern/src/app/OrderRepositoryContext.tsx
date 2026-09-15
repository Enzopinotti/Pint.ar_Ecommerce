import { createContext, useContext, type PropsWithChildren } from "react";
import { demoOrderRepository, type OrderRepository } from "../data/orderRepository";

const OrderRepositoryContext = createContext<OrderRepository>(demoOrderRepository);

export function OrderRepositoryProvider({ children, repository = demoOrderRepository }: PropsWithChildren<{ repository?: OrderRepository }>) {
  return <OrderRepositoryContext.Provider value={repository}>{children}</OrderRepositoryContext.Provider>;
}

export function useOrderRepository(): OrderRepository {
  return useContext(OrderRepositoryContext);
}
