import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  checkHealth() {
    return `I'm Alive`;
  }
}
