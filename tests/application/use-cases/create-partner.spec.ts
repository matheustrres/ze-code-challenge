import { deepStrictEqual, rejects } from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { PartnerFoundError } from '@/application/errors/partner-found';
import { CreatePartnerUseCase } from '@/application/use-cases/create-partner';

import { type Position } from '@/core/domain/types';

import { AddressError } from '@/domain/errors/address';
import { CoverageAreaError } from '@/domain/errors/coverage-area';
import { DocumentError } from '@/domain/errors/document';

import { PartnerBuilder } from '#/data/builders/entities/partner';
import {
	type MockedPartnersRepository,
	makeMockedPartnersRepository,
} from '#/data/mocks/repositories/partners-repository';

type SUT = {
	partnersRepository: MockedPartnersRepository;
	useCase: CreatePartnerUseCase;
};

function makeSUT(): SUT {
	const partnersRepository = makeMockedPartnersRepository();

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

	it('should throw if entered document is already in use by another partner', () => {
		const partner = new PartnerBuilder().build();

		sut.partnersRepository.findByDocument.mock.mockImplementationOnce(
			() => partner,
		);

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
		sut.partnersRepository.findById.mock.mockImplementationOnce(() => null);

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
		sut.partnersRepository.findById.mock.mockImplementationOnce(() => null);

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
		sut.partnersRepository.findById.mock.mockImplementationOnce(() => null);

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

	it('should create a new partner', async () => {
		sut.partnersRepository.findById.mock.mockImplementationOnce(() => null);

		const { partner } = await sut.useCase.exec({
			ownerName: 'John Doe',
			tradingName: 'Zé Delivery',
			address: [30, 20],
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
		});

		const { ownerName, tradingName, document } = partner.getProps();

		deepStrictEqual(ownerName, 'John Doe');
		deepStrictEqual(tradingName, 'Zé Delivery');
		deepStrictEqual(document.props.value, '040.365.820-97');
	});
});
