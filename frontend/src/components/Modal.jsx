import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  createNote,
  updateNote,
} from "../services/noteService";

import { getCategories } from "../services/categoryService";

import "./Modal.css";

function Modal({ closeModal, note }) {

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");

  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories = async () => {

    try {

      const data = await getCategories();

      setCategories(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    if (note) {

      setTitle(note.title);

      setContent(note.content);

      setCategory(note.category || "");

    } else {

      setTitle("");

      setContent("");

      setCategory("");

    }

  }, [note]);

  const handleSave = async () => {

    if (title.trim() === "" || content.trim() === "") {

      toast.error("Please fill all fields.");

      return;

    }

    const noteData = {

      title,

      content,

      category: category || null,

    };

    try {

      if (note) {

        await updateNote(note.id, noteData);

        toast.success("Note updated successfully!");

      } else {

        await createNote(noteData);

        toast.success("Note saved successfully!");

      }

      closeModal();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.title?.[0] ||
        error.response?.data?.detail ||
        "Operation failed. Please try again."
      );

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>

          {note ? "✏ Edit Note" : "📝 New Note"}

        </h2>

        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="8"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="">

            Select Category

          </option>

          {categories.map((cat) => (

            <option
              key={cat.id}
              value={cat.id}
            >

              {cat.name}

            </option>

          ))}

        </select>

        <div className="buttons">

          <button
            className="cancel"
            onClick={closeModal}
          >

            Cancel

          </button>

          <button
            className="save"
            onClick={handleSave}
          >

            {note ? "Update Note" : "Save Note"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default Modal;