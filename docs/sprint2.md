# Sprint 2 - relationships & referenced data

## 1. More than just a piece of text!

We have authors listed as just a string inside books, but what happens if we want to store more than just an author's name?  Let's create a separate model for authors.  

1. Create a new file `models/author.js`.

2. Authors will get attributes for `name`, `alive`, and `image`.  Create a schema for authors with those three attributes.

  ```js
      
      // models/author.js
      const mongoose = require('mongoose');
      const Schema = mongoose.Schema;

      const AuthorSchema = new Schema({
        name: String,
        // you should fill the rest of this in
      });

  ```

3. Next, create an `Author` model from the schema.  

    ```js
      // models/author.js
      const Author = mongoose.model('Author', AuthorSchema);
    ```

4. Now, export your Author model.

  ```js
  // models/author.js
  module.exports = Author;
  ```

  Now if another file inside the `models` directory used `require('./author.js')`, it would have access to the `Author` model exported here!

5. We exported the `Author` model so it's available elsewhere, but now we need to `require` it in the other file(s) that will use it. First, create a new file in your `models` directory titled `index.js`, and copy and paste the following code inside it:

	```js
	const Author = require('./author.js');
	const Book = require('./book.js');
		
	module.exports = { Author, Book };
	```

  Now since we `require('./models')` in `server.js`, `server.js` automatically gains access to _both_ the `Book` database model _and_ the `Author` database model.  In fact, the object brought in with `require('./models')` will be exactly this:

  ```js
  { "Book": Book,  "Author": Author }
  ```

## 2. Whose book is it anyway?

Now we have a books model and authors has its own model. We want to relate them! Now we'll update books to store an author by reference instead of just storing the name.

Referencing authors is a good choice here because:
* many books might share the same author, and   
* we don't want to have to access every single one of an author's books just to make a change to the author's data. 


1. We'll need to update the book schema. Change the `author` line to store a reference to the author:

  ```js
    var BookSchema = new Schema({
      title: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
      },
      image: String,
      releaseDate: String
    });
  ```

## 3. Reroute! 

Some of our book-related routes won't work anymore since we changed the structure of our data.

1. Now on to `server.js`. Try to change over your routes to use the new structure of books and authors. If you get stuck, here's how to change over a few routes:

  ```js
      // get all books
      app.get('/api/books', function (req, res) {
        // send all books as JSON response
        Book.find()
          // populate fills in the author id with all the author data
          .populate('author')
          .exec(function(err, books){
            if (err) { console.log("index error: " + err); }
            res.json(books);
          });
      });

      // create new book
      app.post('/api/books', function (req, res) {
        // create new book with form data (`req.body`);
        let { title, image releaseDate, author } = req.body 
        let newBook = new Book({ title, image, releaseDate });

        // this code will only add an author to a book if the author already exists
        Author.findOne({name: author}, function(err, author){
          newBook.author = author;
          // add newBook to database
          newBook.save(function(err, book){
            if (err) {
              console.log("create error: " + err);
            }
            console.log("created ", book.title);
            res.json(book);
          });
        });

      });
  ```

## Revise Other CRUD methods to Account for Authors

On your own, use the mongoose methods to replace the other `/api/books*` routes with mongoose commands, taking into account the new referenced data relationship.

Make sure you look back to the lecture notes for info on the most important methods like:
* find
* deleteOne
* new
* save