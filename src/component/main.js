import React, { useEffect, useState } from "react";
import axios from "axios";

const main = () => {
  const [usersAPI, setUsersAPI] = useState([]);
  const [userSize, setUserSize] = useState(4);

  const getUsersAPI = async () => {
    await axios.get(`https://koreanjson.com/users`).then((data) => {
      setUsersAPI(data.data);
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const { scrollHeight } = document.documentElement;
      const { scrollTop } = document.documentElement;
      const { clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        setUserSize(userSize + 2);
      }
    });
  });

  const goToWebsite = (idx) => {
    window.open(usersAPI[idx].website, "blank", "width=500,height=600");
  };

  useEffect(() => {
    getUsersAPI();
  }, []);

  return (
    <div>
      {usersAPI.slice(0, userSize).map((user, idx) => {
        const { name, phone, email } = user;
        return (
          <div className="users" key={idx} onClick={() => goToWebsite(idx)}>
            <h2>{name}</h2>
            <div>{phone}</div>
            <div>{email}</div>
          </div>
        );
      })}
    </div>
  );
};

export default main;
