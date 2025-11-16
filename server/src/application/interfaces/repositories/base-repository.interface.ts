import type { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<TDomain,TDocument> {
  create(entity: TDomain): Promise<void>;
  findById(id: string): Promise<TDomain | null>;
  findOne(filter: FilterQuery<TDocument>): Promise<TDomain | null>;
  update(id: string, update: UpdateQuery<TDocument>): Promise<TDomain | null>;
  delete(id: string): Promise<void>;
}
