const Prediction=require('../models/prediction');

const savePrediction=async(req,res)=>{
    try {
    const { userId,modelId, prediction, confidence } = req.body;

    const newPrediction = new Prediction({
      user_id: userId,
      model: modelId,
      prediction,
      confidence,
      createdAt: new Date()
    });

    await newPrediction.save();

    res.json({ success: true, message: "Prediction saved", prediction: newPrediction });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ success: false, message: "Failed to save prediction" });
  }
}

const getPrediction=async(req,res)=>{
  try{
    const {userId}=req.params;
    const predictions=await Prediction.find({user_id:userId}).sort({createdAt:-1});
    res.json({success:true,predictions});
  }catch(err){
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch predictions"});
  }
}

module.exports={savePrediction,getPrediction};