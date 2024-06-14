import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import images from "./utils";

const BookCard = ({ book, removeBookFromReadingList, bookIndex }) => {
  return (
    <Card sx={{ minHeight: 510 }} className="bookCard">
      <CardMedia
        component="img"
        alt={book.title}
        height="300"
        width="300"
        image={images[book.coverPhotoURL.split("/")[1].split(".")[0]]}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="left"
          color="#335C6E"
        >
          {book.title}
        </Typography>
        <Typography variant="p" color="text.secondary" textAlign="left">
          <i>By {book.author}</i>
        </Typography>
        <Typography variant="h6" color="#5ACCCC" textAlign="left">
          Level {book.readingLevel}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: "#F76434" }}
          onClick={() => removeBookFromReadingList(bookIndex)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
