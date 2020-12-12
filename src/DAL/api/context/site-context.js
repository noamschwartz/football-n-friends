import React from "react";

const context = {
  user: {
    id: 0,
    name: "",
    email: "",
    image: "",
  },
  setUser: function(newUser) {},
};

const SiteContext = React.createContext(context);

export default SiteContext;
