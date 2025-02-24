const express=require("express")
const router = express.Router();
const {createbook}=require("../controllers/book-controller")

router.post('/',createbook);
// router.get('/', bookController.getAllBooks);
// router.get('/:id', bookController.getBookById);
// router.use(authenticateUser, isAdmin); // Admin only routes below
// router.put('/:id', bookController.updateBook);
// router.delete('/:id', bookController.deleteBook);

module.exports = router;
