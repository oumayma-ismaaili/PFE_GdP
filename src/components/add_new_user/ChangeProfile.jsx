import { useRef } from "react";
import { supabase } from "../../config/supabase/supabaseClient";

const ChangeProfile = ({profileImg, setProfileImg}) => {
  const fileInputRef = useRef(null);

  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(`profiles/${fileName}`, file);

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        const publicURL = `https://ulqgsyidxjtobqxhdrpy.supabase.co/storage/v1/object/public/images/profiles/${fileName}`;
        setProfileImg(publicURL);
      }
    }
  };

  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
      <label
        htmlFor="photo"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Photo
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="flex items-center">
          <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            {profileImg ? (
              <img
                src={profileImg}
                className="object-cover w-full h-full"
                alt=""
              />
            ) : (
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
          <button
            type="button"
            onClick={handleChangeClick}
            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Change
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
