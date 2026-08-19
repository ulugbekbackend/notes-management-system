import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  getNotes,
  deleteNote,
  moveToTrash,
  restoreNote,
  toggleFavorite,
  toggleArchive,
} from "../services/noteService";

import { getCategories } from "../services/categoryService";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import FloatingButton from "../components/FloatingButton";
import Modal from "../components/Modal";

import {
  FaStickyNote,
  FaStar,
  FaArchive,
  FaTrash,
} from "react-icons/fa";

import "./Dashboard.css";

export default function Dashboard() {

  const [showModal, setShowModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const [notes, setNotes] = useState([]);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("notes");

  const [search, setSearch] = useState("");

  //---------------- LOAD NOTES ----------------//

  const loadNotes = async () => {

    try {

      const data = await getNotes();

      setNotes(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  //---------------- LOAD CATEGORIES ----------------//

  const loadCategories = async () => {

    try {

      const data = await getCategories();

      setCategories(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadNotes();

    loadCategories();

  }, []);

  //---------------- MOVE TO TRASH ----------------//

  const handleDelete = async (note) => {

    if (!window.confirm("Move this note to Trash?")) return;

    try {

      const updated = await moveToTrash(note);

      setNotes(

        notes.map(n =>

          n.id === updated.id ? updated : n

        )

      );

    } catch (error) {

      console.error(error);

      toast.error("Operation failed");

    }

  };

  //---------------- RESTORE ----------------//

  const handleRestore = async (note) => {

    try {

      const updated = await restoreNote(note);

      setNotes(

        notes.map(n =>

          n.id === updated.id ? updated : n

        )

      );

    } catch (error) {

      console.error(error);

    }

  };

  //---------------- DELETE FOREVER ----------------//

  const handlePermanentDelete = async (id) => {

    if (!window.confirm("Delete Forever?")) return;

    try {

      await deleteNote(id);

      setNotes(

        notes.filter(n => n.id !== id)

      );

    } catch (error) {

      console.error(error);

    }

  };

  //---------------- FAVORITE ----------------//

  const handleFavorite = async (note) => {

    try {

      const updated = await toggleFavorite(note);

      setNotes(

        notes.map(n =>

          n.id === updated.id ? updated : n

        )

      );

    } catch (error) {

      console.error(error);

    }

  };

  //---------------- ARCHIVE ----------------//

  const handleArchive = async (note) => {

    try {

      const updated = await toggleArchive(note);

      setNotes(

        notes.map(n =>

          n.id === updated.id ? updated : n

        )

      );

    } catch (error) {

      console.error(error);

    }

  };

  //---------------- EDIT ----------------//

  const handleEdit = (note) => {

    setSelectedNote(note);

    setShowModal(true);

  };

  //---------------- SEARCH + FILTER ----------------//

  const filteredNotes = notes.filter((note) => {

    const matchesSearch =

      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      note.content
        .toLowerCase()
        .includes(search.toLowerCase());

    if (!matchesSearch) return false;

    let matchesFilter = false;

    switch (filter) {

      case "favorites":

        matchesFilter =
          note.is_favorite &&
          !note.is_deleted;

        break;

      case "archive":

        matchesFilter =
          note.is_archived &&
          !note.is_deleted;

        break;

      case "trash":

        matchesFilter =
          note.is_deleted;

        break;

      default:

        matchesFilter =
          !note.is_archived &&
          !note.is_deleted;

    }

    if (!matchesFilter) return false;

    if (selectedCategory) {

      return note.category === selectedCategory;

    }

    return true;

  });

  if (loading) {

    return (
      <div className="dashboard-loading">
        <div className="spinner" />
      </div>
    );

  }

  // ===== CONTINUE IN PART 2 =====
    return (

    <Layout
      filter={filter}
      setFilter={setFilter}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    >

      <Navbar />

      <div className="stats-grid">

        <StatsCard
          number={notes.filter(n => !n.is_deleted).length}
          title="Notes"
          icon={<FaStickyNote />}
          color="linear-gradient(135deg,#EC4899,#8B5CF6)"
        />

        <StatsCard
          number={
            notes.filter(
              n => n.is_favorite && !n.is_deleted
            ).length
          }
          title="Favorites"
          icon={<FaStar />}
          color="linear-gradient(135deg,#F5B942,#F59E0B)"
        />

        <StatsCard
          number={
            notes.filter(
              n => n.is_archived && !n.is_deleted
            ).length
          }
          title="Archived"
          icon={<FaArchive />}
          color="linear-gradient(135deg,#38BDF8,#34D399)"
        />

        <StatsCard
          number={
            notes.filter(
              n => n.is_deleted
            ).length
          }
          title="Trash"
          icon={<FaTrash />}
          color="linear-gradient(135deg,#F43F5E,#FB7185)"
        />

      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="notes-grid">

        {filteredNotes.length > 0 ? (

          filteredNotes.map((note) => (

            <NoteCard
              key={note.id}

              id={note.id}

              note={note}

              title={note.title}

              description={note.content}

              date={new Date(note.created_at).toLocaleDateString()}

              favorite={note.is_favorite}

              archived={note.is_archived}

              onDelete={handleDelete}

              onRestore={handleRestore}

              onPermanentDelete={handlePermanentDelete}

              onFavorite={handleFavorite}

              onArchive={handleArchive}

              onEdit={handleEdit}

            />

          ))

        ) : (

          <div className="empty-state">
            <div className="empty-icon">
              {filter === "trash" ? "🗑️" : filter === "favorites" ? "⭐" : filter === "archive" ? "🗄️" : "📝"}
            </div>
            <h3>
              {filter === "trash"
                ? "Trash is empty"
                : filter === "favorites"
                ? "No favorites yet"
                : filter === "archive"
                ? "Nothing archived"
                : "No notes found"}
            </h3>
            <p>
              {search
                ? "Try a different search term."
                : filter === "notes"
                ? "Tap the + button to create your first note."
                : "Notes you organize this way will show up here."}
            </p>
          </div>

        )}

      </div>

      {filter !== "trash" && (

        <FloatingButton

          openModal={() => {

            setSelectedNote(null);

            setShowModal(true);

          }}

        />

      )}

      {showModal && (

        <Modal

          note={selectedNote}

          closeModal={() => {

            setShowModal(false);

            setSelectedNote(null);

            loadNotes();

          }}

        />

      )}

    </Layout>

  );

}