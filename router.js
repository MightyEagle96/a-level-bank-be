import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: `Server active. Requested at ${new Date().toDateString()}-${new Date().toTimeString()}`,
  });
});

export default router;
