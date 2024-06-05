import { type Mock } from 'node:test';

import { type Repository } from '@/core/contracts/repository';
import { type Entity } from '@/core/domain/entity';
import { type EntityId } from '@/core/domain/entity-id';

export type MockedCoreRepository<
	DomainEntity extends Entity<EntityId, unknown>,
> = {
	delete: Mock<Repository<DomainEntity>['delete']>;
	find: Mock<Repository<DomainEntity>['find']>;
	findById: Mock<Repository<DomainEntity>['findById']>;
	upsert: Mock<Repository<DomainEntity>['upsert']>;
};
