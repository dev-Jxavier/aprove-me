import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService

  const mockPayableService = {
    create: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: PayableService, useValue: mockPayableService }],
      controllers: [PayableController],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a payable', async () => {
      const dto: CreatePayableDto = {
        id: 'uuid-123',
        value: 100,
        emissionDate: new Date(),
        assignorId: 'uuid-assignor',
      };
      const result = { ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getById', () => {
    it('should return a payable by id', async () => {
      const id = 'uuid-123';
      const result = { id, value: 100, emissionDate: new Date(), assignorId: 'uuid-assignor' };

      jest.spyOn(service, 'getById').mockResolvedValue(result);

      expect(await controller.getById(id)).toEqual(result);
      expect(service.getById).toHaveBeenCalledWith(id);
    });

    it('should return null if payable does not exist', async () => {
      const id = 'uuid-nonexistent';

      jest.spyOn(service, 'getById').mockResolvedValue(null);

      expect(await controller.getById(id)).toBeNull();
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a payable', async () => {
      const id = 'uuid-123';
      const dto: UpdatePayableDto = { value: 200 };
      const result = { id, value: 200, emissionDate: new Date(), assignorId: 'uuid-assignor' };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a payable', async () => {
      const id = 'uuid-123';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
