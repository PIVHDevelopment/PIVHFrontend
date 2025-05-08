import { Box } from "@mui/material";
import React from "react";
import Index from "../../container/Index";

const Loader = () => {
  return (
    <>
      <div className="app-container">
        <div className="loader-main">
          <Box className="loader-details">
            <div class="loader-ring"></div>
            <Box class="loader-inner">
              <img
                src={Index.pocketPi}
                alt="Loading..."
                className="loader-img"
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Loader;
