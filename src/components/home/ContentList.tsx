import { FC } from "react";
import ListItem from "./ListItem";

interface IContentListProps {
  content: Array<{
    name: string;
    to: string;
  }>;
}

const ContentList: FC<IContentListProps> = ({ content }) => {
  return (
    <ul className="mt-6">
      {content.map((item) => (
        <ListItem key={item.to} {...item} />
      ))}
    </ul>
  );
};

export default ContentList;
