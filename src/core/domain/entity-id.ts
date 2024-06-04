import { type UniqueId } from '../contracts/unique-id';

type Id = string | number;

export class EntityId implements UniqueId<EntityId> {
	readonly #value: Id;

	constructor(value: Id) {
		this.#value = value;
	}

	equalsTo(id: EntityId): boolean {
		return this.toString() === id.toString();
	}

	toString(): string {
		return this.#value.toString();
	}

	toNumber(): number {
		return parseInt(this.toString());
	}
}
