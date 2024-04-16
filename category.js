
// const fs = require('fs');
// const { Router } = require("express");
// const  connection = require("./connection");
// const {getAllCategoriesFromDatabase,getCategoryById} = require('./db')
// const multer = require('multer');
// const path = require('path');
// const _ = require('lodash');
// const session = require("express-session");
// const router = Router();

// // function authenticate(req, res, next) {
// //     if (!req.session.authenticated) {
// //         // Handle unauthorized access
// //         return res.status(401).json({ error: 'Unauthorized' });
// //     } else {
// //         // Proceed to the next middleware or route handler
// //         next();
// //     }
// // }



// // router.use(authenticate);

// router.get('/', (req, res) => {
//     const query = 'SELECT * FROM categories';
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             console.error('Error fetching categories from the database:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         return res.json(results);
//     });
// });


// router.get('/:id', async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const category = await getCategoryById(categoryId);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.json(category);
//     } catch (error) {
//         console.error('Error fetching category:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images/'); // Save images to the images folder
//     },
//     filename: function (req, file, cb) {
//         // Generate a unique filename for the image
//         const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
//         cb(null, filename);
//     }
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage: storage });

// // POST /api/category endpoint to create a new category
// router.post('/add', upload.single('image'), (req, res) => {
//     // Check if req.file is defined
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const { place_name, owner_id } = req.body;
//     const imageFileName = req.file.filename;

//     const query = 'INSERT INTO categories (place_name, image_link, owner_id) VALUES (?, ?, ?)';
//     connection.query(query, [place_name, imageFileName, owner_id], (error, results, fields) => {
//         if (error) {
//             // Handle errors
//             console.error('Error creating category:', error);
//             return res.status(500).json({ error: 'Failed to create category' });
//         }

//         res.status(201).json({ message: 'Category created successfully' });
//     });
// });





// // DELETE /api/category/:id endpoint to delete a category by ID
// router.delete('/:id', (req, res) => {
//     const categoryId = req.params.id;

//     // Query to select the image filename of the category to be deleted
//     const selectQuery = 'SELECT image_link FROM categories WHERE id = ?';

//     connection.query(selectQuery, [categoryId], (error, results, fields) => {
//         if (error) {
//             console.error('Error retrieving image filename:', error);
//             return res.status(500).json({ error: 'Failed to delete category' });
//         }

//         if (results.length === 0 || !results[0].image_link) {
//             return res.status(404).json({ error: 'Category not found or image not found' });
//         }

//         const imageFileName = results[0].image_link;

//         // Construct query to delete the category with the specified ID
//         const deleteQuery = 'DELETE FROM categories WHERE id = ?';

//         // Execute the delete query
//         connection.query(deleteQuery, [categoryId], (deleteError, deleteResults, deleteFields) => {
//             if (deleteError) {
//                 console.error('Error deleting category:', deleteError);
//                 return res.status(500).json({ error: 'Failed to delete category' });
//             }

//             // Delete the associated image file from the filesystem
//             fs.unlink(`images/${imageFileName}`, (unlinkError) => {
//                 if (unlinkError) {
//                     console.error('Error deleting image file:', unlinkError);
//                 }
//             });

//             // Category deleted successfully
//             res.status(200).json({ message: 'Category deleted successfully' });
//         });
//     });
// });

// module.exports = router;


