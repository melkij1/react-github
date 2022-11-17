import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hooks/debounce";
import { useSearchUsersQuery } from "../../store/api/index.api";
import s from "./home.module.scss";
const Home = () => {
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debounced = useDebounce(value);
  const { data, isLoading } = useSearchUsersQuery(
    { search: debounced, page },
    {
      skip: debounced.length < 2,
    }
  );

  useEffect(() => {}, [debounced, data]);
  return (
    <div className="main">
      <div className="container">
        <div className={s["home-search"]}>
          <input
            type="text"
            className={s["home-search__input"]}
            placeholder="Search for Github username"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        {isLoading && <div className={s["home-loading"]}>Loading...</div>}
        {!isLoading && data && data.items.length > 0 && (
          <div className={s["home-items"]}>
            {data.items.map((item, index) => (
              <div className={s["home-item"]} key={index}>
                <Link
                  to={`/profile/${item.login}`}
                  className={s["home-item__link"]}
                >
                  <div className={s["home-item__img"]}>
                    <img src={item.avatar_url} alt="" />
                  </div>
                  <span className={s["home-item__link-text"]}>
                    {item.login}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
