import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

function SingleRepo() {
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    (() => {
      axios
        .get(`https://api.github.com/repos/Ososeh/${name}`, {
          headers: {
            Authorization: "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",
          },
        })
        .then((response) => {
          setRepo(response.data);
        })
        .catch(() => {
          navigate('/ErrorRepo')
        })
        .finally(() => {
          setLoading(false);
        })
    })();
  }, );


  return (
    <div className="w-full">
      {!loading ? (
        <div>
          <Link to={"/"}>
            <button className="bg-slate-500 text-white rounded-md px-5 py-2 m-5 md:mx-20">
              Back
            </button>
          </Link>
          <div className="border max-w-[900px] p-5 md:p-10 border-black rounded-lg my-10 mx-5 md:mx-auto">
            <h1 className="text-2xl md:text-4xl overflow-hidden">{repo.name}</h1>
            <div className="flex flex-col md:flex-row gap-5 justify-between mt-10">
              <div className="flex gap-5 ">
                <img
                  src={repo.owner ? `${repo.owner.avatar_url}` : ""}
                  alt="author picture"
                  className="w-[50px] rounded-full self-center"
                />
                <h1 className="self-center font-bold text-xl">
                  {repo.owner ? `${repo.owner.login}` : ""}
                </h1>
              </div>
              <div className="">
                <p>Date Created: {repo.created_at}</p>
                <p>Default Branch: {repo.default_branch}</p>
                <p>Last commit: {repo.pushed_at}</p>
              </div>
            </div>
            <ul className="text-xl mt-5">
              <a
                href={`https://github.com/Ososeh/${name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="hover:bg-slate-500 hover:text-white hover:border-none">
                 Github Repository
                </li>
              </a>
              <li>Language: {repo.language}</li>
              {repo.description ? <li>{repo.description}</li> : ""}
              <li>Visibility: {repo.visibility}</li>
              <li>Forks: {repo.forks}</li>
              <li>Open issues: {repo.open_issues}</li>
              <li>Watchers: {repo.watchers}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default SingleRepo;
