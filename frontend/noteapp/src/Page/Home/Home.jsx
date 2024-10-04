import NoteCard from "../../Component/Card/NoteCard";
import Navbar from "../../Component/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./addEditNotes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Toast from "../../Component/ToastMessage/toast";
import axiosInstance from "../../util/axiosinstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false)

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };
  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Error fetching user info:", error);
      }
    }
  };

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  //Delete Notes
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  //Search Notes
  const onSearchNote =async (query) => {
    try{
      const response = await axiosInstance.get("/search-notes",{
        params:{query},
      });

      if (response.data && response.data.notes){
        setIsSearch(true)
        setAllNotes(response.data.notes);
      }
    } catch(error){
      console.log(error)
    }
  }

  const updateIsPinned = async (noteData) =>{
    const noteId = noteData._id

    try{
      const response = await axiosInstance.put("/update-note-pinned/" + noteId,{
      "isPinned":!noteData.isPinned
      });

      if (response.data && response.data.note){
        showToastMessage("Note Updated Successfully")
        getAllNotes();
      }
    } catch(error){
      console.log(error);
    }
  }

  const handleClearSearch = () =>{
    setIsSearch(false)
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);
  return (
    <div>
  <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

  <div className="container mx-auto px-4 sm:px-6">
    {allNotes.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {allNotes.map((item, index) => (
          <NoteCard
            key={item._id}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => updateIsPinned(item)}
          />
        ))}
      </div>
    ) : (
      ""
    )}
  </div>

  <button
    className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-gray-500 fixed right-6 bottom-6 sm:right-10 sm:bottom-10"
    onClick={() => {
      setOpenAddEditModal({ isShown: true, type: "add", data: null });
    }}
  >
    <MdAdd className="text-2xl sm:text-[32px] text-white" />
  </button>

  <Modal
    isOpen={openAddEditModal.isShown}
    onRequestClose={() => {}}
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0,0.2)",
      },
    }}
    contentLabel=""
    className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
  >
    <AddEditNotes
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={() => {
        setOpenAddEditModal({ isShown: false, type: "add", data: null });
      }}
      getAllNotes={getAllNotes}
      showToastMessage={showToastMessage}
    />
  </Modal>

  <Toast
    isShown={showToastMsg.isShown}
    message={showToastMsg.message}
    type={showToastMsg.type}
    onClose={handleCloseToast}
  />
</div>

  );
};

export default Home;
