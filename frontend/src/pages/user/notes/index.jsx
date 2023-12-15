import { useContext } from "react";
import { UserContext } from "../../../contexts";
import { Helmet } from "react-helmet-async";
import { Table } from "react-bootstrap";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

import { API_URL, APP_NAME } from "../../../statics";
import useSWR from "swr";
import { Link } from "react-router-dom";

export default function UserNotes() {
  const user = useContext(UserContext);

  const { data: notes } = useSWR(
    user && user.tokens ? [`${API_URL}/v1/notes`, user.tokens, null] : null
  );

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
            <th>Status</th>
            <th>Expired</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes?.data?.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{note.status}</td>
              <td>
                {note?.ttl ? dayjs.unix(note.ttl).fromNow() : "Permanent"}
              </td>
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
    </>
  );
}
