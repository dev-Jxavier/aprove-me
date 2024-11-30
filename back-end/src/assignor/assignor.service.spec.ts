import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorService', () => {
  let service: AssignorService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    assignor: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(prismaService.assignor, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prismaService.assignor.create).toHaveBeenCalledWith({ data: dto });
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
      }

      jest.spyOn(prismaService.assignor, 'findUnique').mockResolvedValue(result);

      expect(await service.getById(id)).toEqual(result);
      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if assignor does not exist', async () => {
      const id = 'uuid-nonexistent';

      jest.spyOn(prismaService.assignor, 'findUnique').mockResolvedValue(null);

      expect(await service.getById(id)).toBeNull();
      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({ where: { id } });
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

      jest.spyOn(prismaService.assignor, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prismaService.assignor.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a assignor', async () => {
      const id = 'uuid-123';

      jest.spyOn(prismaService.assignor, 'delete').mockResolvedValue(undefined);

      await service.remove(id);
      expect(prismaService.assignor.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
