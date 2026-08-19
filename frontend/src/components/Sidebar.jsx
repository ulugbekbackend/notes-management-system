import {
  FaStickyNote,
  FaStar,
  FaArchive,
  FaTrash,
  FaFolder,
} from "react-icons/fa";

import {
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import { useNavigate } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar({

  open,
  setOpen,

  filter,
  setFilter,

  categories,

  selectedCategory,
  setSelectedCategory,

}) {

  const navigate = useNavigate();

  const closeSidebar = () => {

    if (window.innerWidth <= 768) {

      setOpen(false);

    }

  };

  const handleMyNotes = () => {

    setFilter("notes");

    setSelectedCategory(null);

    closeSidebar();

  };

  const handleFavorites = () => {

    setFilter("favorites");

    setSelectedCategory(null);

    closeSidebar();

  };

  const handleArchive = () => {

    setFilter("archive");

    setSelectedCategory(null);

    closeSidebar();

  };

  const handleTrash = () => {

    setFilter("trash");

    setSelectedCategory(null);

    closeSidebar();

  };

  const handleCategory = (id) => {

    setFilter("notes");

    setSelectedCategory(id);

    closeSidebar();

  };

  const handleSettings = () => {

    navigate("/settings");

  };

  const handleLogout = () => {

    if (!window.confirm("Logout?")) return;

    localStorage.clear();

    navigate("/login", {
      replace: true,
    });

  };

  return (

    <>

      {open && (

        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />

      )}

      <aside className={`sidebar ${open ? "show" : ""}`}>

        <div className="sidebar-logo">

          💜

          <span>Notes</span>

        </div>

        {/* TOP MENU */}

        <div className="sidebar-top">

          <button
            className={`sidebar-btn ${
              filter === "notes" &&
              selectedCategory === null
                ? "active"
                : ""
            }`}
            onClick={handleMyNotes}
          >

            <FaStickyNote />

            <span>My Notes</span>

          </button>

          <button
            className={`sidebar-btn ${
              filter === "favorites"
                ? "active"
                : ""
            }`}
            onClick={handleFavorites}
          >

            <FaStar />

            <span>Favorites</span>

          </button>

          <button
            className={`sidebar-btn ${
              filter === "archive"
                ? "active"
                : ""
            }`}
            onClick={handleArchive}
          >

            <FaArchive />

            <span>Archive</span>

          </button>

          <button
            className={`sidebar-btn ${
              filter === "trash"
                ? "active"
                : ""
            }`}
            onClick={handleTrash}
          >

            <FaTrash />

            <span>Trash</span>

          </button>

        </div>

        <hr className="sidebar-divider" />
                {/* ================= CATEGORIES ================= */}

        <div className="category-section">

          <h3 className="category-title">

            Categories

          </h3>

          <div className="category-list">

            {categories.length === 0 ? (

              <p className="empty-category">

                No Categories

              </p>

            ) : (

              categories.map((category) => (

                <button

                  key={category.id}

                  className={`sidebar-btn ${
                    selectedCategory === category.id
                      ? "active"
                      : ""
                  }`}

                  onClick={() =>
                    handleCategory(category.id)
                  }

                >

                  <FaFolder />

                  <span>{category.name}</span>

                </button>

              ))

            )}

          </div>

        </div>

        {/* ================= BOTTOM ================= */}

        <div className="sidebar-bottom">

          <button

            className="sidebar-btn"

            onClick={handleSettings}

          >

            <HiOutlineCog6Tooth />

            <span>Settings</span>

          </button>

          <button

            className="logout-btn"

            onClick={handleLogout}

          >

            <HiOutlineArrowRightOnRectangle />

            <span>Logout</span>

          </button>

        </div>

      </aside>

    </>

  );

}