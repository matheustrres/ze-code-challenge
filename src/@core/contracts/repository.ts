import { type Entity } from '../domain/entity';
import { type EntityId } from '../domain/entity-id';

export interface Repository<DomainEntity extends Entity<EntityId, unknown>> {
	delete(id: string): Promise<void>;
	findById(id: string): Promise<DomainEntity | null>;
	find(): Promise<DomainEntity[]>;
	upsert(domainEntity: DomainEntity): Promise<void>;
}
