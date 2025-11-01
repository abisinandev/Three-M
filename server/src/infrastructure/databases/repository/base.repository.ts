import { IBaseRepository } from "@application/interfaces/repositories/base-repository.interface";
import { FilterQuery, Model, UpdateQuery } from "mongoose";

export abstract class BaseRepository<TDomain, TDocument>
  implements IBaseRepository<TDomain>
{
  constructor(
    protected readonly model: Model<TDocument>,
    protected readonly mapper: {
      toDomain(doc: TDocument): TDomain;
      toPersistance(domain: TDomain): any;
    },
  ) {}

  async create(entity: TDomain): Promise<void> {
    const data = this.mapper.toPersistance(entity);
    await this.model.create(data);
  }

  async findById(id: string): Promise<TDomain | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.mapper.toDomain(doc);
  }

  async findOne(filter: FilterQuery<any>): Promise<TDomain | null> {
    const doc = await this.model.findOne(filter);
    if (!doc) return null;
    return this.mapper.toDomain(doc);
  }

  async update(id: string, update: UpdateQuery<any>): Promise<TDomain | null> {
    const doc = await this.model.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return null;
    return this.mapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
