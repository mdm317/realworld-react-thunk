import React from "react";

interface PagenationProp {
  currentPage: number;
  startPage: number;
  endPage: number;
}
export default function Pagenation(): JSX.Element {
  return (
    <nav>
      <ul className="pagination">
        <li v-if="isPre" className="page-item">
          <a className="page-link"> ◀</a>
        </li>

        <li className="page-item">
          <a className="page-link"></a>
        </li>
        <li v-if="isNxt" className="page-item">
          <a className="page-link"> ▶</a>
        </li>
      </ul>
    </nav>
  );
}
