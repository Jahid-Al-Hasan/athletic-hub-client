import { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Athletic Hub`;
  }, [title]);

  return null;
};

export default PageTitle;
