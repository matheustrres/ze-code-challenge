import { type UniqueId } from '../contracts/unique-id';

type Id = number;

export class EntityId implements UniqueId<EntityId> {
	readonly #value: Id;

	constructor(value: Id) {
		this.#value = value;
	}

	equalsTo(id: EntityId): boolean {
		return this.toNumber() === id.toNumber();
	}

	toNumber() {
		return this.#value;
	}
}
