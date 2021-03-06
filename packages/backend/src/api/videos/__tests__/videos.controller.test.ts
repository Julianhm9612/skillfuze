import { HttpStatus } from '@nestjs/common';
import { UpdateVideoDTO } from '../dtos/update-video-dto';
import { VideosController } from '../videos.controller';
import { VideosService } from '../videos.service';
import { VideosRepository } from '../videos.repository';
import { CreateVideoDTO } from '../dtos/create-video.dto';
import { Video } from '../video.entity';

jest.mock('../videos.repository');
jest.mock('../videos.service');

describe('Videos Controller', () => {
  let controller: VideosController;
  let service: VideosService;
  let repository: VideosRepository;
  beforeEach(async () => {
    repository = new VideosRepository();
    service = new VideosService(repository);
    controller = new VideosController(service);
    jest.clearAllMocks();
  });

  describe('createOne', () => {
    const createReturn = 'CREATED';
    let res;
    const userId = 1;
    const payload = {
      title: 'Video Title',
    };
    let serviceCreateSpy: jest.SpyInstance;
    beforeEach(async () => {
      serviceCreateSpy = jest.spyOn(service, 'create');
      serviceCreateSpy.mockReturnValue(createReturn);
      res = await controller.createOne({ user: { id: userId } }, payload as CreateVideoDTO);
    });

    it('should call service.create once', async () => {
      expect(serviceCreateSpy).toBeCalledTimes(1);
    });

    it('should  return service.create', async () => {
      expect(res).toBe(createReturn);
    });
  });

  describe('getOne', () => {
    const getOneReturn = 'GET ONE';
    const validId = '1';
    let res: Video;

    let serviceGetOneSpy: jest.SpyInstance;
    beforeEach(async () => {
      serviceGetOneSpy = jest.spyOn(service, 'getOne');
      serviceGetOneSpy.mockReturnValue(getOneReturn);
      res = await controller.getOne(validId);
    });

    it('should call service.getOne', () => {
      expect(serviceGetOneSpy).toBeCalledTimes(1);
    });

    it('should return service.getOne', () => {
      expect(res).toBe(getOneReturn);
    });
  });

  describe('delete', () => {
    const videoId = '1';
    const userId = 1;
    let res: HttpStatus;
    let serviceDeleteSpy: jest.SpyInstance;

    beforeEach(async () => {
      serviceDeleteSpy = jest.spyOn(service, 'delete');
      serviceDeleteSpy.mockReturnValue(HttpStatus.OK);
      res = await controller.delete({ user: { id: userId } }, videoId);
    });

    it('should call service.delete', async () => {
      expect(serviceDeleteSpy).toBeCalledTimes(1);
    });

    it('should return service.delete', () => {
      expect(res).toBe(HttpStatus.OK);
    });
  });

  describe('update', () => {
    const update = 'UPDATED';
    const userId = 1;
    const videoId = '1';
    const payload = {
      title: 'Video Title',
    };
    let res: Video;

    let serviceUpdateSpy: jest.SpyInstance;
    beforeEach(async () => {
      serviceUpdateSpy = jest.spyOn(service, 'update');
      serviceUpdateSpy.mockReturnValue(update);
      res = await controller.update(videoId, { user: { id: userId } }, payload as UpdateVideoDTO);
    });

    it('should call service.update once', () => {
      expect(serviceUpdateSpy).toBeCalledTimes(1);
    });

    it('should return service.update', () => {
      expect(res).toBe(update);
    });
  });

  describe('view', () => {
    const videoId = '1';

    let serviceAddViewSpy: jest.SpyInstance;
    beforeEach(async () => {
      serviceAddViewSpy = jest.spyOn(service, 'addView');
      await controller.view(videoId);
    });

    it('should call service.addView once', () => {
      expect(serviceAddViewSpy).toBeCalledTimes(1);
    });
  });

  describe('getAll', () => {
    let serviceGetAllSpy: jest.SpyInstance;
    beforeEach(async () => {
      serviceGetAllSpy = jest.spyOn(service, 'getAllVideos');
      await controller.getAll(0, 10);
    });

    it('should call service.getAll once', () => {
      expect(serviceGetAllSpy).toBeCalledTimes(1);
    });
  });
});
