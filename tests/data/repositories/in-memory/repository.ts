import { type Repository } from '@/core/contracts/repository';
import { type Entity } from '@/core/domain/entity';
import { type EntityId } from '@/core/domain/entity-id';

export class InMemoryCoreRepository<
	DomainEntity extends Entity<EntityId, unknown>,
> implements Repository<DomainEntity>
{
	items: DomainEntity[] = [];

	async delete(id: string): Promise<void> {
		const i = this.items.findIndex((i) => i.id.toString() === id);

		this.items.splice(i, 1);
	}

	async find(): Promise<DomainEntity[]> {
		return this.items;
	}

	async findById(id: string): Promise<DomainEntity | null> {
		return this.items.find((i) => i.id.toString() === id) || null;
	}

	async upsert(domainEntity: DomainEntity): Promise<void> {
		const i = this.items.findIndex((i) => i.id.equalsTo(domainEntity.id));

		if (i !== -1) {
			this.items[i] = domainEntity;
		} else {
			this.items.push(domainEntity);
		}
	}
}
