import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../Config/Config";
import ContentModal from "../ContentModal/ContentModal";
import "./Card.css";

const Card = ({ id, media_type, poster, title, date, vote_average }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={Math.round(vote_average * 10) / 10}
        color="primary"
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subtitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subtitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default Card;
