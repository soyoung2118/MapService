import express from 'express';
import infosController from '../controllers/infosController';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'health check!!',
  });
});

// 위치 데이터 저장
router.post('/infos', infosController.createInfo);

// 전체 위치 데이터 조회
router.get('/infos', infosController.getInfos);

export default router;
