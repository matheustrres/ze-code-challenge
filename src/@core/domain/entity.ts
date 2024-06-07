import { type EntityId } from './entity-id';
import { Guard } from './logic/guard';

export type CreateEntityProps<Id extends EntityId, Props> = {
	id: Id;
	props: Props;
};

export abstract class Entity<Id extends EntityId, Props> {
	readonly id: Id;
	readonly createdAt: Date;

	readonly #props!: Props;

	protected abstract $validate(): void;

	constructor({ id, props }: CreateEntityProps<Id, Props>) {
		this.#ensureProps(props);

		this.#props = props;

		this.$validate();

		this.id = id;
		this.createdAt = new Date();
	}

	getProps(): Props {
		const copyObj = {
			...this.#props,
		};

		return Object.freeze(copyObj);
	}

	#ensureProps(props: Props): void {
		if (Guard.isEmpty(props)) {
			throw new Error('Entity properties should not be empty');
		}

		if (typeof props !== 'object') {
			throw new TypeError('Entity properties should be an object');
		}
	}
}
