import { Test, TestingModule } from '@nestjs/testing';
import { Basic } from './basic';

describe('Basic', () => {
  let provider: Basic;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Basic],
    }).compile();

    provider = module.get<Basic>(Basic);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
