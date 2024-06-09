import { type Entity } from '../domain/entity';
import { type EntityId } from '../domain/entity-id';

export interface Mapper<DomainEntity extends Entity<EntityId, unknown>, Model> {
	toDomain(model: Model): DomainEntity;
	toInfra(domainEntity: DomainEntity): Model;
}
