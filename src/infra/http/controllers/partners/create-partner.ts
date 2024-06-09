import { type Request, type Response } from 'express';
import z from 'zod';
import { validateRequestBody } from 'zod-express-middleware';

import { Controller } from '@/@core/contracts/controller';

import { type CreatePartnerInput } from '@/app/dtos/create-partner';
import { type CreatePartnerUseCase } from '@/app/use-cases/create-partner';

const multiPolygonSchema = z.array(z.array(z.array(z.array(z.number()))));
const pointSchema = z.array(z.number());

const createPartnerSchema = z.object({
	ownerName: z.string(),
	tradingName: z.string(),
	document: z.string(),
	coverageArea: multiPolygonSchema,
	address: pointSchema,
});

export class CreatePartnerController extends Controller {
	prefix = '/partners';

	constructor(private readonly createPartnerUseCase: CreatePartnerUseCase) {
		super();

		this.$initRoute();
	}

	protected $initRoute(): void {
		this.router.post(
			this.prefix,
			validateRequestBody(createPartnerSchema),
			this.$handle,
		);
	}

	$handle = async (request: Request, response: Response): Promise<Response> => {
		const input = request.body as CreatePartnerInput;
		const { partner } = await this.createPartnerUseCase.exec(input);

		return response.status(201).json(partner);
	};
}
