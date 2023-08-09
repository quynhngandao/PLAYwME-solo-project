import {
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Card,
  CardMedia,
  Fab,
  Button,
  Tooltip,
  Pagination
 
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// Import the placeholder image
import placeholderImage from "./notfoundcat.gif";
// Import CSS
import "./AnimalItem.css";
import { CurrencyYenTwoTone } from "@mui/icons-material";

const body = {
  color: "primary.dark",
  fontSize: "15px",
  fontWeight: "bold",
  fontFamily: "fraunces",
  verticalAlign: "middle",
};
const title = {
  mt: "3px",
  mb: "7px",
  color: "primary.main",
  fontSize: "1.5em",
  fontFamily: "fraunces",
};

export default function AnimalItem({
  animal,
  styledCard,
  styledCardMedia,
  textLink,
  styledCardMediaNoImage,
  styledHeartIcon,
  styledHeartButton,
  currentPage,
  totalPages,
  handlePageChange,
}) {
  // useSelector to grab animal data from redux store
  const petfinder = useSelector((store) => store.petfinder);
  const user = useSelector((store) => store.user);
   // useDispatch to send animal data to redux store
  const dispatch = useDispatch();

  // handleFavorite
  const handleFavorite = (e, clickedAnimal) => {
    e.preventDefault();
    console.log("button clicked");
    console.log("Clicked Animal Data:", clickedAnimal);

    // conditional statement: if clickedAnimal=true
    // set newAnimal's properties => clickedAnimal's values
    // handleFavorite function => send clickedAnimal data
    if (clickedAnimal && clickedAnimal.id) {
      const newAnimal = {
        id: clickedAnimal.id,
        name: clickedAnimal.name,
        age: clickedAnimal.age,
        breeds: clickedAnimal.breeds.primary,
        location: clickedAnimal.contact.address,
        contact: clickedAnimal.contact.email,
        photos:
          clickedAnimal.photos && clickedAnimal.photos.length > 0
            ? clickedAnimal.photos[0].full
            : "",
        url: clickedAnimal.url,
      };
      // dispatch the saved data to redux store
      dispatch({ type: "ADD_ANIMAL", payload: newAnimal });
    } else {
      console.error("Animal data is missing or incomplete.");
    }
  };

  // Open new tab when picture is clicked
  const openInNewTab = (url) => {
    window.open(url);
  };


  return (
    <>
      {petfinder && (
        <div className="animals">
          {petfinder.map((animal) => (
            <Card key={animal.id} className="card" sx={styledCard}>
              {/* Image */}
              {animal.photos && animal.photos.length > 0 ? (
                <CardActionArea onClick={() => openInNewTab(animal.url)}>
                  <Tooltip title="Click For More Details" placement="top">
                    <CardMedia
                      sx={styledCardMedia}
                      component="img"
                      image={animal.photos[0].full}
                      alt={animal.name}
                    />
                  </Tooltip>
                </CardActionArea>
              ) : (
                // NOT AVAILABLE IMAGE
                <CardActionArea>
                  <a href={animal.url}>
                    <CardMedia
                      sx={styledCardMediaNoImage}
                      component="img"
                      image={placeholderImage}
                      alt="not available"
                    />
                  </a>
                </CardActionArea>
              )}

              {/* Favorite Button */}
              <IconButton
                sx={styledHeartButton}
                onClick={(e) => handleFavorite(e, animal)}
              >
                <Tooltip title="Add to Favorite" placement="left-start">
                  <FavoriteBorderIcon sx={styledHeartIcon} />
                </Tooltip>
              </IconButton>

              {/* DETAILS */}
              <CardContent>
                {/* NAME */}
                <Typography sx={title}>{animal.name}</Typography>
                {/* AGE */}
                <Typography sx={body}>
                  {animal.age} &#x2022; {animal.breeds?.primary}
                </Typography>
                {/* LOCATION */}
                <Typography sx={body}>
                  {animal.contact.address.city}, {animal.contact.address.state}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
