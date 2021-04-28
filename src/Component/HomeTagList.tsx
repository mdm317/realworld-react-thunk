import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LocationDescriptorObject, Location } from "history";
import queryString from "query-string";

interface TagListProp {
  tagList?: string[];
}
export default function HomeTagList({ tagList }: TagListProp): JSX.Element {
  const [activeTag, setactiveTag] = useState("");
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed.tag) {
      setactiveTag(parsed.tag as string);
    }
  }, []);
  const clickTag = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const tagname = (e.target as HTMLElement).id;
    setactiveTag(tagname);
  };
  return (
    <div className="tag-list">
      {tagList &&
        tagList.map((tag) => (
          <Link
            onClick={clickTag}
            to={(location: Location) => {
              const nextLocation: LocationDescriptorObject = {};
              nextLocation.search = `tag=${tag}`;
              return nextLocation;
            }}
            key={tag}
            className="tag-pill tag-default"
            style={activeTag === tag ? { backgroundColor: "#666666" } : {}}
            id={tag}
          >
            {tag}
          </Link>
        ))}
    </div>
  );
}
