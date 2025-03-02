const express=require("express")
const router = express.Router();
const {createbook,getAllBooks}=require("../controllers/book-controller")
const {upload}=require("../middlewares/multer")

router.post('/create',upload.single("image"),createbook);
router.get('/', getAllBooks);
// router.get('/:id', bookController.getBookById);
// router.use(authenticateUser, isAdmin); // Admin only routes below
// router.put('/:id', bookController.updateBook);
// router.delete('/:id', bookController.deleteBook);

module.exports = router;
