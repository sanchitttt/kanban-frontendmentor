const router = require('express').Router();
const authRoutes = require('./auth.route');
const verifyAuth = require('../../middlewares/verifyAuth');
const openAiRoutes = require('./openai.routes');
const dashboardRoutes = require('./dashboard.routes');

router.use("/auth", authRoutes);
router.use("/dashboard", verifyAuth, dashboardRoutes);
router.use('/openai', verifyAuth, openAiRoutes);
router.get("/test", (req, res) => {
    res.end('Testing route works!');
})

module.exports = router;

