const {Book}=require("../models/book-model")


async function createbook(req,res){
        try {
          if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`; // Save the path to the image
        }
            const book = new Book(req.body);
            await book.save();

            return res.redirect('/books');
          } catch (error) {
            res.status(400).render('error', { message: error.message });
          }
}


  
    async function getAllBooks(req, res){
      try {
        const books = await Book.find();
        res.render('layouts/allbooks', { books });
      } catch (error) {
        res.status(500).render('error', { message: error.message });
      }
    }
  
    // getBookById: async (req, res) => {
    //   try {
    //     const book = await Book.findById(req.params.id);
    //     if (!book) {
    //       return res.status(404).render('error', { message: 'Book not found' });
    //     }
    //     res.render('books/show', { book });
    //   } catch (error) {
    //     res.status(500).render('error', { message: error.message });
    //   }
    // },
  
    // updateBook: async (req, res) => {
    //   try {
    //     const book = await Book.findByIdAndUpdate(
    //       req.params.id,
    //       req.body,
    //       { new: true, runValidators: true }
    //     );
    //     if (!book) {
    //       return res.status(404).render('error', { message: 'Book not found' });
    //     }
    //     res.redirect('/admin/books');
    //   } catch (error) {
    //     res.status(400).render('error', { message: error.message });
    //   }
    // },
  
    // deleteBook: async (req, res) => {
    //   try {
    //     const book = await Book.findByIdAndDelete(req.params.id);
    //     if (!book) {
    //       return res.status(404).render('error', { message: 'Book not found' });
    //     }
    //     res.redirect('/admin/books');
    //   } catch (error) {
    //     res.status(500).render('error', { message: error.message });
    //   }
    // }

module.exports={createbook,getAllBooks}
  