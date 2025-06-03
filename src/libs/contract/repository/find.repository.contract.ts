export interface FindRepository<T> {
  find(params: Record<string, any>): Promise<T[]>;
}
