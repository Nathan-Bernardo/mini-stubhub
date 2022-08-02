import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://mini-stub-hub.xyz/",
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
