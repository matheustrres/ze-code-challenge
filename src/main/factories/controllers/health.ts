import { HealthController } from '@/infra/http/controllers/health';

export function makeHealthController() {
	return new HealthController();
}
