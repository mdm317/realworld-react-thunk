import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../Redux";
import queryString from "query-string";

interface PagenationProp {
  pagePerPagenation: number;
}
export default function Pagenation({
  pagePerPagenation,
}: PagenationProp): JSX.Element {
  const articleCouts = useSelector(
    (state: RootState) => state.article.articlesCounts
  );

  const [pagenationList, setpagenationList] = useState<number[]>([]);

  const match = useRouteMatch();
  const location = useLocation();

  const query = queryString.parse(location.search);

  const currentPage = query.page ? query.page : 1;

  const startPage = Math.floor((Number(currentPage) - 1) / 10) * 10 + 1;

  useEffect(() => {
    const pagenationNum = Math.min(
      10,
      Math.ceil(articleCouts / pagePerPagenation) - startPage + 1
    );

    const newPagenationList = [...Array(pagenationNum).keys()].map(
      (i) => i + startPage
    );

    setpagenationList(newPagenationList);
  }, [articleCouts]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const element = event.target as HTMLElement;

    if (element.id === "pre") {
      if (pagenationList[0] === 1) {
        toast.error("이전 페이지가 없습니다.");
        return;
      }
      const newPagenationList = pagenationList.map((pageidx) => pageidx - 10);
      setpagenationList(newPagenationList);
    } else if (element.id === "nxt") {
      if (
        Math.ceil(articleCouts / pagePerPagenation) <=
        pagenationList[0] + 9
      ) {
        toast.error("다음 페이지가 없습니다.");
        return;
      }
      const newPagenationList = pagenationList.map((pageidx) => pageidx + 10);
      setpagenationList(newPagenationList);
    }
  };
  return (
    <nav>
      <ul className="pagenation" aria-label="pagenation">
        <li className="page-item">
          <a onClick={handleClick} id="pre" className="page-link">
            ◀
          </a>
        </li>
        {pagenationList.map((page) => (
          <li
            key={page}
            className={`page-item +' '+ ${
              page === Number(query.page) ? "active" : ""
            }`}
          >
            {/* <Link to={{ pathname: '/foo', query: { the: 'query' } }}/> */}
            <Link
              to={{
                search: `?page=${page}`,
                pathname: `${match.url}`,
              }}
              className="page-link "
            >
              {page}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <a onClick={handleClick} id="nxt" className="page-link">
            ▶
          </a>
        </li>
      </ul>
    </nav>
  );
}
