import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-3 sm:p-4 bg-white hover:shadow-xl transition-all ease-in-out">
  <div className="flex items-start justify-between">
    <div>
      <h6 className="text-xs sm:text-sm font-medium">{title}</h6>
      <span className="text-xs text-slate-500">
        {moment(date).format('Do MMM YYYY')}
      </span>
    </div>
    <MdOutlinePushPin
      className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
      onClick={onPinNote}
    />
  </div>

  <p className="text-xs text-slate-600 mt-2 sm:mt-3">{content?.slice(0, 60)}</p>

  <div className="flex items-center justify-between mt-2 sm:mt-3">
    <div className="text-xs sm:text-ts text-slate-500 space-x-1">
      {tags.map((item, index) => (
        <span key={index}>#{item}</span>
      ))}
    </div>

    <div className="flex items-center gap-1 sm:gap-2">
      <MdCreate
        className="icon-btn hover:text-green-600"
        onClick={onEdit}
      />
      <MdDelete
        className="icon-btn hover:text-red-500"
        onClick={onDelete}
      />
    </div>
  </div>
</div>
  )
};
export default NoteCard;
