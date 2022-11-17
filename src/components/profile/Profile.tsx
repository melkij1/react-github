import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetUserFollowersQuery,
  useGetUserQuery,
  useGetUserReposQuery,
} from "../../store/api/index.api";
import s from "./profile.module.scss";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState("");
  const { data, isLoading } = useGetUserQuery(username, {
    skip: id?.length! < 1,
  });
  const { data: res, isLoading: loading } = useGetUserReposQuery(username, {
    skip: id?.length! < 1,
  });
  const { data: response, isLoading: loadingFollwers } =
    useGetUserFollowersQuery(username, {
      skip: id?.length! < 1,
    });

  useEffect(() => {
    if (id?.length) {
      setUsername(id);
    }
  }, [id]);

  return (
    <div className={s["profile-page"]}>
      {isLoading && <div className={s["profile-page"]}>Загрузка</div>}
      {!isLoading && data && Object.keys(data).length && (
        <div className="container">
          <div className={s["profile-row"]}>
            <div className={s["profile-top"]}>
              <div className={s["profile-user"]}>
                <Link
                  to={data.url}
                  className={s["profile-user__img"]}
                  target="_blank"
                >
                  <img src={data.avatar_url} alt="" />
                </Link>
                <div className={s["profile-user__info"]}>
                  {data.name && data.name.length && (
                    <span className={s["profile-user__name"]}>{data.name}</span>
                  )}
                  {data.login && data.login.length && (
                    <span className={s["profile-user__nick"]}>
                      {data.login}
                    </span>
                  )}

                  {data.bio && data.bio.length && (
                    <div className={s["profile-user__description"]}>
                      {data.bio}
                    </div>
                  )}

                  {data.followers && data.following && (
                    <div className={s["profile-user__followers"]}>
                      <div className={s["profile-user__follower"]}>
                        {data.followers}
                        <span>followers</span>
                      </div>
                      <div className={s["profile-user__follower"]}>
                        {data.following}
                        <span>following</span>
                      </div>
                    </div>
                  )}
                  {data.location && (
                    <div className={s["profile-user__location"]}>
                      {data.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={s["profile-content"]}>
              <div className={s["profile-col"]}>
                {loading && <div>Loading Repositories ...</div>}
                {!loading && res && res.length && (
                  <>
                    <div className={s["profile-col__name"]}>Repositories</div>
                    <ul className={s["profile-list"]}>
                      {res.map((r, index) => (
                        <li className={s["profile-list__item"]} key={r.node_id}>
                          <Link to={r.url}>{r.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className={s["profile-col"]}>
                {loadingFollwers && <div>Loading Followers ...</div>}
                {!loadingFollwers && response && response.length && (
                  <>
                    <div className={s["profile-col__name"]}>Followers</div>
                    <ul className={s["profile-list"]}>
                      {response.map(r => (
                        <li className={s["profile-list__item"]} key={r.node_id}>
                          <Link to={r.url}>{r.login}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
