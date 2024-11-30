import { ulid } from 'ulid';

export interface EntityProps {
  // dynamo keys
  PK: string;
  SK: string;
  GSI1PK?: string;
  GSI1SK?: string;

  // comumn keys
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class EntityClass {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(readonly type: string, props?: EntityProps) {
    this._id = props?.id ?? ulid();
    this._createdAt = props?.createdAt ?? new Date();
    this._updatedAt = props?.updatedAt ?? new Date();
  }


  get id(): string {
    return this._id;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  onUpdated(): void {
    this._updatedAt = new Date();
  }
}

