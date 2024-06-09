import { type Request, type Response } from 'express';
import z from 'zod';
import { validateRequestBody } from 'zod-express-middleware';

import { Controller } from '@/@core/contracts/controller';

import { type SearchNearestPartnerUseCaseInput } from '@/app/dtos/search-nearest-partner';
import { type SearchNearestPartnerUseCase } from '@/app/use-cases/search-nearest-partner';

import { PartnerViewModel } from '@/infra/http/presenters/view-models/partner';

const searchNearestPartnerSchema = z.object({
	lat: z.number(),
	lng: z.number(),
});

export class SearchNearestPartnerController extends Controller {
	prefix = '/partners';

	constructor(
		private readonly searchNearestPartnerUseCase: SearchNearestPartnerUseCase,
	) {
		super();

		this.$initRoute();
	}

	protected $initRoute(): void {
		this.router.get(
			this.prefix,
			validateRequestBody(searchNearestPartnerSchema),
			this.$handle,
		);
	}

	$handle = async (request: Request, response: Response): Promise<Response> => {
		const input = request.body as SearchNearestPartnerUseCaseInput;
		const { partner } = await this.searchNearestPartnerUseCase.exec(input);

		return response.status(200).json(PartnerViewModel.toJSON(partner));
	};
}
