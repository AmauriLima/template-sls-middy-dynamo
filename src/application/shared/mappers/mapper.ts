export interface Mapper<Entity, RawEntity> {
  toPersistence(data: Entity): unknown;
  toDomain(data: RawEntity): Entity | Promise<Entity>;
  toHttp(data: Entity): unknown;
}

