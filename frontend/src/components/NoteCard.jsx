import { useState } from "react";

import {
  FaStar,
  FaRegStar,
  FaEllipsisH,
  FaEdit,
  FaArchive,
  FaTrash,
  FaUndo,
} from "react-icons/fa";

import "./NoteCard.css";

export default function NoteCard({
  note,
  id,
  title,
  description,
  date,
  favorite,
  onDelete,
  onFavorite,
  onArchive,
  onEdit,
  onRestore,
  onPermanentDelete,
}) {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="note-card">

      <div className="note-header">

        <h3>{title}</h3>

        <div className="note-actions">

          <button
            type="button"
            className={`fav-btn ${favorite ? "is-fav" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(note);
            }}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? <FaStar /> : <FaRegStar />}
          </button>

          <FaEllipsisH
            className="menu-icon"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (

            <div className="note-menu">

              {note.is_deleted ? (

                <>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onRestore(note);
                    }}
                  >
                    <FaUndo /> Restore
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onPermanentDelete(id);
                    }}
                  >
                    <FaTrash /> Delete Forever
                  </button>
                </>

              ) : (

                <>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(note);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onFavorite(note);
                    }}
                  >
                    <FaStar />
                    {favorite ? " Remove Favorite" : " Favorite"}
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onArchive(note);
                    }}
                  >
                    <FaArchive />
                    {note.is_archived ? " Unarchive" : " Archive"}
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(note);
                    }}
                  >
                    <FaTrash /> Move to Trash
                  </button>
                </>

              )}

            </div>

          )}

        </div>

      </div>

      <p>{description}</p>

      <div className="note-footer">

        <span>{date}</span>

        <span className="tag">
          {note.category_name || "Personal"}
        </span>

      </div>

    </div>
  );
}