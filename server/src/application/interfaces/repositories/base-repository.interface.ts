import { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  create(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<any>): Promise<T | null>;
  update(id: string, update: UpdateQuery<any>): Promise<T | null>;
  delete(id: string): Promise<void>;
}
