const router=require('express').Router();
const {savePrediction,getPrediction}=require('../controllers/PredictionController');

router.post('/savePrediction',savePrediction);
router.get('/getPrediction/:userId',getPrediction);


module.exports=router;