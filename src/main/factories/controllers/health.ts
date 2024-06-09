import { HealthController } from '@/infra/http/presenters/controllers/health';

export function makeHealthController() {
	return new HealthController();
}
