import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import "./ContentModal.css";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  unavailable,
  img_500,
  unavailableLandscape,
} from "../../Config/Config";
import Carousel from "../Carousel/Carousel";

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
    };

    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(
        data.results.filter(
          (videos) =>
            videos.type === "Trailer" && videos.official === true && videos
        )
      );
    };

    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        className="modal"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className="paper">
              <div className="contentModal">
                <img
                  className="contentModal_Portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="contentModal_Landscape"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <div className="contentModal_About">
                  <span className="contentModal_Title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "--------"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="contentModal_Description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  {video.length ? (
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      href={`https://www.youtube.com/watch?v=${video[0]?.key}`}
                    >
                      Watch Trailer
                    </Button>
                  ) : (
                    <span className="noTrailer">Trailer Not available</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
