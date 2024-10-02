import NoteCard from "../../Component/Card/NoteCard";
import Navbar from "../../Component/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./addEditNotes";
import { useState } from "react";
import Modal  from 'react-modal';

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown:false,
        type:"add",
        data: null,
    })
  return (
    <div>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">   
        <NoteCard
          title="Meeting on the 7th of April"
          date="3rd Oct 2024"
          content="Meeting on the 7th of April metting on 7th of April"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-gray-500 absolute right-10 bottom-10"
       onClick={()=> {setOpenAddEditModal({isShown:true, type:"add", data:null})}}>
      <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal
        isOpen = {openAddEditModal.isShown}
        onRequestClose = {() => {}}
        style ={{
            overlay:{
                backgroundColor:"rgba(0,0,0,0.2)"
            },
        }}
        contentLabel = ""
        className= "w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      
      >
      <AddEditNotes/>
      </Modal>  
    </div>
  );
};

export default Home;
 