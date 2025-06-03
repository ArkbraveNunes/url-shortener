import { MomentService } from './moment.service';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import { MOMENT_TIMES } from './moment.enum';

describe('MomentService', () => {
  let service: MomentService;

  beforeEach(() => {
    service = new MomentService();
  });

  it('should add Time in the date and return string', () => {
    const result = service.addTime(new Date(), MOMENT_TIMES.HOUR, 1);

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should subtract Time in the date and return string', () => {
    const result = service.subtractTime(new Date(), MOMENT_TIMES.HOUR, 1);

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should validate date and return true', () => {
    const result = service.isValidDate(new Date());

    expect(result).toBe(true);
  });

  it('should validate date and return false', () => {
    const result = service.isValidDate(faker.color.rgb());

    expect(result).toBe(false);
  });

  it('should set date in the first hour', () => {
    const result = service.setFirstHour(new Date());

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should set date in the last hour', () => {
    const result = service.setLastHour(new Date());

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });

  it('should compare date one and two and see if the first date is before the second', () => {
    const result = service.isBeforeDate(
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1)),
    );

    expect(typeof result === 'boolean').toBe(true);
    expect(result).toBe(true);
  });

  it('should compare date one and two and see if the first date is after the second', () => {
    const result = service.isAfterDate(
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(),
    );

    expect(typeof result === 'boolean').toBe(true);
    expect(result).toBe(true);
  });

  it('should format date', () => {
    const result = service.formatDate(new Date().toISOString());

    expect(typeof result === 'string').toBe(true);
    expect(moment(result).isValid()).toBe(true);
  });
});
