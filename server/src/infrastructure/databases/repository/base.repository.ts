import type { IBaseRepository } from "@application/interfaces/repositories/base-repository.interface";
import type {
  FilterQuery,
  Model,
  UpdateQuery,
  Document,
} from "mongoose";

export abstract class BaseRepository<TDomain, TDocument extends Document> implements IBaseRepository<TDomain, TDocument> {

  constructor(
    protected readonly model: Model<TDocument>,
    protected readonly mapper: {
      toDomain(doc: TDocument): TDomain;
      toPersistance(domain: TDomain): Partial<TDocument>;
    },
  ) { }

  async create(entity: TDomain): Promise<void> {
    const data = this.mapper.toPersistance(entity);
    await this.model.create(data);
  }

  async findById(id: string): Promise<TDomain | null> {
    const doc = await this.model.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findOne(filter: FilterQuery<TDocument>): Promise<TDomain | null> {
    console.log("filter ", filter)
    const doc = await this.model.findOne(filter);
    console.log('Document : ', doc)
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async update(id: string, update: UpdateQuery<TDocument>): Promise<TDomain | null> {
    const doc = await this.model.findByIdAndUpdate(id, update, { new: true });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
