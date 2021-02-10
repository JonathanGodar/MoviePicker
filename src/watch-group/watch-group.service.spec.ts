import { Test, TestingModule } from '@nestjs/testing';
import { WatchGroupService } from './watch-group.service';

describe('WatchGroupService', () => {
  let service: WatchGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchGroupService],
    }).compile();

    service = module.get<WatchGroupService>(WatchGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
