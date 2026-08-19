import {
  FaSearch,
} from "react-icons/fa";

import "./SearchBar.css";

export default function SearchBar({
  search,
  setSearch,
}) {

  return (

    <div className="search-box">

      <FaSearch />

      <input
        type="text"
        placeholder="Search your notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

  );

}