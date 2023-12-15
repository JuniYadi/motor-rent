import { Helmet } from "react-helmet-async";
import { Table, Button } from "react-bootstrap";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

import { APP_NAME } from "../../statics";
import { Link } from "react-router-dom";

export default function Notes() {
  const getNotes = localStorage.getItem("notes");
  const notes = JSON.parse(getNotes);

  const handleClearData = (e) => {
    e.preventDefault();

    localStorage.removeItem("notes");
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>{`My Notes - ${APP_NAME}`}</title>
      </Helmet>

      <h3>My Notes</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes?.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{dayjs(note.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
              <td>
                <Link
                  to={
                    note.status === "private"
                      ? `/v/${note.id}`
                      : `/p/${note.id}`
                  }
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={handleClearData}>Clear Data</Button>
    </>
  );
}
