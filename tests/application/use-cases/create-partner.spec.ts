import { rejects } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { PartnerFoundError } from '@/application/errors/partner-found';
import { CreatePartnerUseCase } from '@/application/use-cases/create-partner';

import { type Position } from '@/core/domain/types';

import { AddressError } from '@/domain/errors/address';
import { CoverageAreaError } from '@/domain/errors/coverage-area';
import { DocumentError } from '@/domain/errors/document';

import { PartnerBuilder } from '#/data/builders/entities/partner';
import {
	type InMemoryPartnersRepository,
	makeInMemoryPartnersRepository,
} from '#/data/repositories/in-memory/partners-repository';

type SUT = {
	partnersRepository: InMemoryPartnersRepository;
	useCase: CreatePartnerUseCase;
};

function makeSUT(): SUT {
	const partnersRepository = makeInMemoryPartnersRepository();

	return {
		partnersRepository,
		useCase: new CreatePartnerUseCase(partnersRepository),
	};
}

describe('CreatePartner use case', () => {
	let sut: SUT;

	beforeEach(() => {
		sut = makeSUT();
	});

	it('should throw if entered document is already in use by another partner', async () => {
		const partner = new PartnerBuilder().build();

		await sut.partnersRepository.upsert(partner);

		const document = partner.getProps().document.props.value;

		rejects(
			() =>
				sut.useCase.exec({
					ownerName: 'John Doe',
					tradingName: 'Zé Delivery',
					address: [30, 30],
					coverageArea: [],
					document,
				}),
			PartnerFoundError.byDocument(document),
		);
	});

	it('should throw if entered document is invalid', () => {
		rejects(
			() =>
				sut.useCase.exec({
					ownerName: 'John Doe',
					tradingName: 'Zé Delivery',
					address: [30, 30],
					coverageArea: [],
					document: '11257245286',
				}),
			new DocumentError('Invalid CPF value.'),
		);
	});

	it('should throw if entered coverage area coordinates are invalid', () => {
		rejects(
			() =>
				sut.useCase.exec({
					ownerName: 'John Doe',
					tradingName: 'Zé Delivery',
					address: [30, 30],
					coverageArea: {} as Position[][][],
					document: '040.365.820-97',
				}),
			new CoverageAreaError(
				'Coverage area coordinates must be an array of numbers.',
			),
		);
	});

	it('should throw if entered address coordinates are invalid', () => {
		rejects(
			() =>
				sut.useCase.exec({
					ownerName: 'John Doe',
					tradingName: 'Zé Delivery',
					address: [],
					coverageArea: [
						[
							[
								[30, 20],
								[45, 40],
								[10, 40],
								[30, 20],
							],
						],
						[
							[
								[15, 5],
								[40, 10],
								[10, 20],
								[5, 10],
								[15, 5],
							],
						],
					],
					document: '040.365.820-97',
				}),
			new AddressError('Address coordinates must be an array of two numbers.'),
		);
	});
});
