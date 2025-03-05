import { addOrder, showOrder } from "../controllers/orderController.js"
import authenticate from "../middlewares/authMiddleware.js"

const router=expression.Router()

router.post('/addorder',authenticate,addOrder)
router.get('/showorder',authenticate,showOrder)

export default router;