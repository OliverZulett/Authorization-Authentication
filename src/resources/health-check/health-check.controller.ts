import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('basic'))
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  getHelthStatus() {
    return this.healthCheckService.checkHealth();
  }
}
