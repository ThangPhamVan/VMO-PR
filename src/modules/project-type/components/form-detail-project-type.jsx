import { useState } from "react";
import { FcAbout } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { apiDelete } from "../../../api/api";
import { LoadingSmallSize } from "../../../components/loading/loading-small-size";
import { REACT_APP_API_SERVER_PROJECT_TYPE, TIMEOUT_REDIRECT } from "../../../constants/constants";
export const FormDetailProjectType = ({ dataDetails, setUpdate }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const linkUpdateThenRedirect = "/project-type";
  const sumbitDeleteProjectType = async () => {
    setLoading(true);
    const { _id } = dataDetails;
    const apiProjectType = `${REACT_APP_API_SERVER_PROJECT_TYPE}/${_id}`;
    try {
      const respon = await apiDelete(apiProjectType);
      if (respon.status === 200) {
        setLoading(false);
        setTimeout(() => {
          history.push(linkUpdateThenRedirect);
        }, TIMEOUT_REDIRECT);
      }
    }
    catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="w-10/12 lg:w-11/12 sm:w-11/12 sm:mt-15 sm:ml-0 sm:mb-5 rounded-lg shadow-lg bg-white mt-10 ml-5">
      <div className="flex justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center">
          <FcAbout className="text-2xl mr-2" />
          <span className="font-bold text-gray-700 text-lg">Project Type Information</span>
        </div>
      </div>
      <div>
        <div className="px-10 sm:px-7 py-5 text-gray-600">
          Name: <b>{dataDetails?.name}</b>
        </div>
        <div className="px-10 sm:px-7 py-5 text-gray-600">
          Description : <b>{dataDetails?.description}</b>
        </div>
        <div className="px-10  sm:px-7 py-5 text-gray-600">
          Priority : <span className="text-xl ml-2">{dataDetails?.priorityNumber}</span>
        </div>
        <div className="px-10  sm:px-7   py-5 text-gray-600">
          Status :{" "}
          {dataDetails?.status === "active" ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Active</span>
            </span>
          ) : (
            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Inactive</span>
            </span>
          )}
        </div>
        <div className="px-5 py-4 flex justify-end">
          <button
            onClick={sumbitDeleteProjectType}
            className="border sm:px-3 font-medium border-red-400 bg-red-400 text-white rounded-md px-3 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            {loading ? <LoadingSmallSize size={5} /> : <p>DELETE</p>}
          </button>
          <button
            onClick={() => setUpdate(true)}
            className="border font-medium border-green-600 bg-green-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};
