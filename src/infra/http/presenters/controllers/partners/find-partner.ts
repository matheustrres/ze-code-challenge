import { type Request, type Response } from 'express';

import { Controller } from '@/@core/contracts/controller';

import { type FindPartnerByIdUseCase } from '@/app/use-cases/find-partner';

import { PartnerViewModel } from '@/infra/http/presenters/view-models/partner';

export class FindPartnerByIdController extends Controller {
	prefix = '/partners/:id';

	constructor(private readonly findPartnerUseCase: FindPartnerByIdUseCase) {
		super();

		this.$initRoute();
	}

	protected $initRoute(): void {
		this.router.get(this.prefix, this.$handle);
	}

	$handle = async (request: Request, response: Response): Promise<Response> => {
		const id = Number(request.params['id']);

		const { partner } = await this.findPartnerUseCase.exec({ id });

		return response.status(200).json(PartnerViewModel.toJSON(partner));
	};
}
