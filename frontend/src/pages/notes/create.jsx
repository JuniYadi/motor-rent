import { useState } from "react";

import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { API_URL } from "../../statics";

export default function Notes() {
  const [notes, setNotes] = useState({
    title: "",
    content: "",
    ttl: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    const reqs = await axios.post(`${API_URL}/notes`, notes, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (reqs.status === 200) {
      // get id from response
      const id = reqs?.data?.data?.id;

      // get from localstorage
      const getNotes = localStorage.getItem("notes") || "[]";
      // convert to array
      const newNotes = JSON.parse(getNotes);
      // push new id
      newNotes.push({
        id: id,
        createdAt: new Date().toISOString(),
        status: "public",
        title: notes.title,
      });
      // save to localstorage
      localStorage.setItem("notes", JSON.stringify(newNotes));

      // reset form
      setNotes({
        title: "",
        content: "",
        ttl: "",
      });

      // redirect to view page
      window.location.href = `/p/${id}`;
    } else {
      alert("Failed");
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="My Random Notes"
            onChange={(e) => setNotes({ ...notes, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            onChange={(e) => setNotes({ ...notes, content: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Expired</Form.Label>
          <Form.Select
            aria-label="Select Expired"
            onChange={(e) =>
              setNotes({
                ...notes,
                ttl: e.target.value > 0 ? e.target.value : null,
              })
            }
          >
            <option value="">Select Expired Time</option>
            <option value="5">5 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="1440">1 Day</option>
            <option value="10080">1 Week</option>
            <option value="43200">1 Month</option>
            <option value="0">Permanent</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submitForm}>
          Save
        </Button>
      </Form>
    </>
  );
}
