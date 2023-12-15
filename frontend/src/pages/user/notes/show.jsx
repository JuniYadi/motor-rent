// get id from url with react-router-dom
import { useParams } from "react-router-dom";
import UserNotesForm from "./form";

export default function UserNotesShow() {
  const { id } = useParams();

  return (
    <>
      <UserNotesForm action="show" id={id} />
    </>
  );
}
