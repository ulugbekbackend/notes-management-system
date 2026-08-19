import { useState } from "react";

import Sidebar from "./Sidebar";

import "./Layout.css";

export default function Layout({

  children,

  filter,

  setFilter,

  categories,

  selectedCategory,

  setSelectedCategory,

}) {

  const [open, setOpen] = useState(false);

  return (
    <>

      <Sidebar

        open={open}

        setOpen={setOpen}

        filter={filter}

        setFilter={setFilter}

        categories={categories}

        selectedCategory={selectedCategory}

        setSelectedCategory={setSelectedCategory}

      />

      <button
        className="mobile-menu"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      <main className="main-content">

        {children}

      </main>

    </>
  );

}