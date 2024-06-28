import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export const alertInfos = {
  saved: {
    title: "Save Successful",
    message: "Your changes have been saved successfully.",
    icon: (
      <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
    ),
  },
  error: {
    title: "Insert Error",
    message: "There was an error inserting the data. Please try again.",
    icon: (
      <ExclamationCircleIcon
        className="h-6 w-6 text-red-400"
        aria-hidden="true"
      />
    ),
  },
};
