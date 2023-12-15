// get id from url with react-router-dom
import { useParams } from "react-router-dom";
import NotesForm from "./form";

export default function NotesShow() {
  const { id } = useParams();

  return (
    <>
      <NotesForm action="show" id={id} />
    </>
  );
}
