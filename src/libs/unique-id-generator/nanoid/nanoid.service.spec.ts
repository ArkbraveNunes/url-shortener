import { NanoidService } from './nanoid.service';

describe('NanoidService', () => {
  let service: NanoidService;

  beforeEach(() => {
    service = new NanoidService();
  });

  it('should return unique code with lenght === 6', () => {
    const result = service.generateCode(6);

    expect(typeof result === 'string').toBe(true);
    expect(result.split('').length === 6).toBe(true);
  });
});
