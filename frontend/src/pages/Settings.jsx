import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineArrowLeft, HiOutlineFolder, HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineUser, HiOutlineMoon } from "react-icons/hi";

import {
    getCategories,
    createCategory,
    deleteCategory
} from "../services/categoryService";
import { AuthContext } from "../context/AuthContext";

import "./Settings.css";


export default function Settings(){

    const { user } = useContext(AuthContext);

    const [categories,setCategories] = useState([]);

    const [categoryName,setCategoryName] = useState("");



    useEffect(()=>{

        loadCategories();

    },[]);



    const loadCategories = async()=>{

        try{

            const data = await getCategories();

            setCategories(data);

        }
        catch(error){

            console.error(error);

        }

    };



    const handleAddCategory = async()=>{


        if(categoryName.trim()===""){

            toast.error("Enter category name");

            return;

        }


        try{


            await createCategory({

                name:categoryName

            });



            setCategoryName("");
            toast.success("Category added");
            loadCategories();


        }
        catch(error){

            console.error(error);

            toast.error("Category creation failed");

        }


    };



    const handleDelete = async(id)=>{


        try{

            await deleteCategory(id);
            toast.success("Category deleted");
            loadCategories();

        }
        catch(error){

            console.error(error);
            toast.error("Failed to delete category");

        }


    };




    return (

        <div className="settings-page">

            <Link to="/dashboard" className="settings-back">
                <HiOutlineArrowLeft /> Back to notes
            </Link>

            <h1>Settings</h1>
            <p className="settings-subtitle">Manage your profile and categories.</p>

            <div className="settings-card">

                <div className="settings-card-header">
                    <span className="settings-icon"><HiOutlineUser /></span>
                    <h3>Profile</h3>
                </div>

                <div className="profile-row">
                    <div className="profile-avatar">
                        {(user || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="profile-name">{user || "Unknown"}</p>
                        <p className="profile-hint">Signed in</p>
                    </div>
                </div>

            </div>

            <div className="settings-card">

                <div className="settings-card-header">
                    <span className="settings-icon"><HiOutlineFolder /></span>
                    <h3>Categories</h3>
                </div>

                <div className="category-create">

                    <input
                        type="text"
                        placeholder="New category name..."
                        value={categoryName}
                        onChange={(e)=> setCategoryName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                    />

                    <button onClick={handleAddCategory}>
                        Add
                    </button>

                </div>

                <div className="category-items">

                {
                    categories.length===0 ?

                    <p className="empty-category">No categories yet — add one above.</p>

                    :

                    categories.map((cat)=>(

                        <div className="category-item" key={cat.id}>

                            <span>📁 {cat.name}</span>

                            <button
                                className="category-delete"
                                onClick={()=> handleDelete(cat.id)}
                                aria-label={`Delete ${cat.name}`}
                            >
                                <HiOutlineTrash />
                            </button>

                        </div>

                    ))
                }

                </div>

            </div>

            <div className="settings-card">

                <div className="settings-card-header">
                    <span className="settings-icon"><HiOutlineMoon /></span>
                    <h3>Theme</h3>
                </div>

                <button className="settings-disabled-btn" disabled title="Coming soon">
                    Dark mode — coming soon
                </button>

            </div>

        </div>

    );

}
