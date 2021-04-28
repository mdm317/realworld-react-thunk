import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../Redux";

interface PagenationProp {
  pagePerPagenation: number;
  currentPage: number;
  setCurrentPage: (prop: number) => void;
}
export default function PagenationWithRouter({
  pagePerPagenation,
  currentPage,
  setCurrentPage,
}: PagenationProp): JSX.Element {
  const [pagenationList, setpagenationList] = useState<number[]>([]);
  const articleCouts = useSelector(
    (state: RootState) => state.article.articlesCounts
  );
  const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const pagenationNum = Math.min(
    10,
    Math.ceil(articleCouts / pagePerPagenation) - startPage + 1
  );
  useEffect(() => {
    const newPagenationList = [...Array(pagenationNum).keys()].map(
      (i) => i + startPage
    );

    setpagenationList(newPagenationList);
  }, [articleCouts]);

  const handleClickPage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const element = event.target as HTMLElement;
    setCurrentPage(Number(element.innerText));
  };
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const element = event.target as HTMLElement;

    if (element.id === "pre") {
      if (pagenationList[0] === 1) {
        toast.info("이전 페이지가 없습니다.");
        return;
      }
      const newPagenationList = pagenationList.map((pageidx) => pageidx - 10);
      setpagenationList(newPagenationList);
    } else if (element.id === "nxt") {
      if (
        Math.ceil(articleCouts / pagePerPagenation) <=
        pagenationList[0] + 9
      ) {
        toast.info("다음 페이지가 없습니다.");
        return;
      }
      const newPagenationList = pagenationList.map((pageidx) => pageidx + 10);
      setpagenationList(newPagenationList);
    }
  };
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={handleClick} id="pre" className="page-link">
            {" "}
            ◀
          </a>
        </li>
        {pagenationList.map((page) => (
          <li
            key={page}
            className={`page-item +' '+ ${
              page === currentPage ? "active" : ""
            }`}
          >
            <a onClick={handleClickPage} className="page-link ">
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a onClick={handleClick} id="nxt" className="page-link">
            {" "}
            ▶
          </a>
        </li>
      </ul>
    </nav>
  );
}
