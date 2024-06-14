import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import bookIMG from "../assets/image1.webp";
import Search from "./Search";
import BookCard from "./BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  console.log(bookIMG)

  const query = `
        query {
            books {
                title
                author
                coverPhotoURL
                readingLevel
            }
        }
    `;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "apollo-require-preflight": "true",
    },
  };

  useEffect(() => {
    const encodedQuery = encodeURIComponent(query);
    axios
      .get(`http://localhost:4000/graphql?query=${encodedQuery}`, config)
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.data.books);
        console.log(response.data.data.books[1].coverPhotoURL.split("/")[1].split(".")[0]);
        //setReadingList(response.data.data.books.slice(0, 3))
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const bookIsInReadingList = (book) => {
    return readingList.some((b) => b.title === book.title);
  };

  const addBookToReadingList = (book) => {
    if (!bookIsInReadingList(book)) {
      setReadingList([...readingList, book]);
    }
  };

  const removeBookFromReadingList = (index) => {
    let tempBooks = [...readingList];
    let removed = tempBooks.splice(index, 1);
    setReadingList(tempBooks);
  };

  const fetchImage = async (fileName) => {
    try {
        const response = await import(`../${fileName}`)
        console.log(response)
        return response.default
    } catch (err) {
        //console.log(err)
    }
}
  return (
    <>
      <h1>Ello Reading List</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={12} md={12}>
          <Search
            books={books}
            addBookToReadingList={addBookToReadingList}
            bookIsInReadingList={bookIsInReadingList}
          />
        </Grid>

        {readingList.length === 0 ? (
          <Grid item xs={12}>
            <h2>Add books to your reading List</h2>
          </Grid>
        ) : (
          readingList.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BookCard
                book={book}
                removeBookFromReadingList={removeBookFromReadingList}
                bookIndex={index}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Home;
