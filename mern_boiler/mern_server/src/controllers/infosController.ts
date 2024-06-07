import { NextFunction, Request, Response } from 'express';
import { Info } from '../types/info';
import infoService from '../services/infoService';
import { HttpException } from '../middlewares/errorHandler';
import { HttpCode } from '../types/httpCode';

export default {
  // 위치 데이터를 받은 다음에 해당 데이터를 바탕으로 데이터베이스에 저장
  // controller에서 요청과 응답에 대한 코드를 작성할 예정이기 때문에, request와 response를 받아줌.
  createInfo: async (req: Request, res: Response, next: NextFunction) => {
    const info = req.body as Info;

    try {
      // info id 를 바탕으로 체크
      const target = await infoService.getInfo(info.id);
      // 해당 info 데이터가 존재할 경우
      if(target) throw new HttpException(HttpCode.CONFLICT, "중복된 데이터");
      // 해당 info 데이터가 존재하지 않을 경우, 데이터베이스에 저장
      await infoService.createInfo(info);
      res.status(HttpCode.OK).json({
        message: 'success',
      })
    } catch (error) {
      next(error);
    }
  },
  getInfos: async (req: Request, res: Response, next: NextFunction) => {},
};
