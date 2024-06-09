import { type Request, type Response } from 'express';

import { Controller } from '@/@core/contracts/controller';

import { type CreatePartnerInput } from '@/app/dtos/create-partner';
import { type CreatePartnerUseCase } from '@/app/use-cases/create-partner';

export class CreatePartnerController extends Controller {
	prefix = '/partners';

	constructor(private readonly createPartnerUseCase: CreatePartnerUseCase) {
		super();

		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.post(this.prefix, this.handle);
	}

	handle = async (request: Request, response: Response): Promise<Response> => {
		const input = request.body as CreatePartnerInput;
		const { partner } = await this.createPartnerUseCase.exec(input);

		return response.status(201).json(partner);
	};
}
