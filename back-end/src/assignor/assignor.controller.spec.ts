import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService

  const mockAssignorService = {
    create: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AssignorService, useValue: mockAssignorService }],
      controllers: [AssignorController],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a assignor', async () => {
      const dto: CreateAssignorDto = {
        id: 'uuid-123',
        document: '04885552052',
        email: 'jones@gmail.com',
        phone: '5599999999',
        name: 'jones'
      }

      const result = { ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getById', () => {
    it('should return a assignor by id', async () => {
      const id = 'uuid-123';
      const result = {
        id,
        document: '04885552052',
        email: 'jones@gmail.com',
        phone: '5599999999',
        name: 'jones'
      };

      jest.spyOn(service, 'getById').mockResolvedValue(result);

      expect(await controller.getById(id)).toEqual(result);
      expect(service.getById).toHaveBeenCalledWith(id);
    });

    it('should return null if assignor does not exist', async () => {
      const id = 'uuid-nonexistent';

      jest.spyOn(service, 'getById').mockResolvedValue(null);

      expect(await controller.getById(id)).toBeNull();
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a assignor', async () => {
      const id = 'uuid-123';
      const dto: UpdateAssignorDto = { email: 'test@update.com' };
      const result = {
        id,
        document: '04885552052',
        email: 'test@update.com',
        phone: '5599999999',
        name: 'jones'
      }

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a assignor', async () => {
      const id = 'uuid-123';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
