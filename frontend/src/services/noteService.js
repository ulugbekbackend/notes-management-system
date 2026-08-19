import api from "../api/axios";

export const getNotes = async () => {
    const response = await api.get("notes/");
    return response.data;
};

export const createNote = async (note) => {
    const response = await api.post("notes/", note);
    return response.data;
};

export const updateNote = async (id, note) => {
    const response = await api.patch(`notes/${id}/`, note);
    return response.data;
};

export const deleteNote = async (id) => {
    await api.delete(`notes/${id}/`);
};

export const toggleFavorite = async (note) => {

    const response = await api.patch(`notes/${note.id}/`, {
        is_favorite: !note.is_favorite,
    });

    return response.data;
};

export const toggleArchive = async (note) => {

    const response = await api.patch(`notes/${note.id}/`, {
        is_archived: !note.is_archived,
    });

    return response.data;
};
export const moveToTrash = async (note) => {

    const response = await api.patch(`notes/${note.id}/`, {
        is_deleted: true,
    });

    return response.data;
};

export const restoreNote = async (note) => {

    const response = await api.patch(`notes/${note.id}/`, {
        is_deleted: false,
    });

    return response.data;
};