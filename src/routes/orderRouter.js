import { addOrder, showOrder } from "../controllers/orderController"
import authenticate from "../middlewares/authMiddleware"

const router=expression.Router()

router.post('/addorder',authenticate,addOrder)
router.get('/showorder',authenticate,showOrder)

export default router;