import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

describe('PayableService', () => {
  let service: PayableService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    payable: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService, { provide: PrismaService, useValue: mockPrismaService }]
    }).compile();

    service = module.get<PayableService>(PayableService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(prismaService.payable, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prismaService.payable.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('getById', () => {
    it('should return a payable by id', async () => {
      const id = 'uuid-123';
      const result = { id, value: 100, emissionDate: new Date(), assignorId: 'uuid-assignor' };

      jest.spyOn(prismaService.payable, 'findUnique').mockResolvedValue(result);

      expect(await service.getById(id)).toEqual(result);
      expect(prismaService.payable.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if payable does not exist', async () => {
      const id = 'uuid-nonexistent';

      jest.spyOn(prismaService.payable, 'findUnique').mockResolvedValue(null);

      expect(await service.getById(id)).toBeNull();
      expect(prismaService.payable.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update', () => {
    it('should update a payable', async () => {
      const id = 'uuid-123';
      const dto: UpdatePayableDto = { value: 200 };
      const result = { id, value: 200, emissionDate: new Date(), assignorId: 'uuid-assignor' };

      jest.spyOn(prismaService.payable, 'update').mockResolvedValue(result);

      expect(await service.update(id, dto)).toEqual(result);
      expect(prismaService.payable.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a payable', async () => {
      const id = 'uuid-123';

      jest.spyOn(prismaService.payable, 'delete').mockResolvedValue(undefined);

      await service.remove(id);
      expect(prismaService.payable.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
