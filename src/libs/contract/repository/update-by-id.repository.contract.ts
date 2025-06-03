export interface UpdateByIdRepository<T> {
  updateById(id: string, updateData: Partial<T>): Promise<void>;
}
