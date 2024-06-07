import { EntityId } from '@/@core/domain/entity-id';

import { genNumericId } from '@/shared/utils/funcs/numeric-id';

export class PartnerId extends EntityId {
	constructor(value = genNumericId()) {
		super(value);
	}
}
