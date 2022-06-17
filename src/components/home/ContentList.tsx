import { FC } from "react";
import ListItem, { IListItemProps } from "./ListItem";

interface IContentListProps {
  content: Array<IListItemProps>;
}

const ContentList: FC<IContentListProps> = ({ content }) => {
  return (
    <div className="mt-6 grid gap-10 grid-cols-1 md:grid-cols-2">
      {content.map((item) => (
        <ListItem key={item.to} {...item} />
      ))}
    </div>
  );
};

export default ContentList;
