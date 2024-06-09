import { type Request, type Response } from 'express';

import { Controller } from '@/@core/contracts/controller';

import { type SearchNearestPartnerUseCaseInput } from '@/app/dtos/search-nearest-partner';
import { type SearchNearestPartnerUseCase } from '@/app/use-cases/search-nearest-partner';

export class SearchNearestPartnerController extends Controller {
	prefix = '/partners';

	constructor(
		private readonly searchNearestPartnerUseCase: SearchNearestPartnerUseCase,
	) {
		super();

		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.get(this.prefix, this.handle);
	}

	handle = async (request: Request, response: Response): Promise<Response> => {
		const input = request.body as SearchNearestPartnerUseCaseInput;
		const { partner } = await this.searchNearestPartnerUseCase.exec(input);

		return response.status(200).json(partner);
	};
}
