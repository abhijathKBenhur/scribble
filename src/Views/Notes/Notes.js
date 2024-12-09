import React, { useEffect, useRef, useState } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import "react-quill/dist/quill.snow.css"; // ES6

import {
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  Menu,
  SubMenu,
  MenuItem,
} from "react-pro-sidebar";
import ReactQuill from "react-quill"; // ES6
import {
  List,
  ListItem,
  ListItemText,
  Button,
  setRef,
} from "@material-ui/core";
import "react-pro-sidebar/dist/css/styles.css";
import {
  setStorageSection,
  getStorageSection,
} from "../../Commons/storageUtils";
import "./notes.css";
export default function Freetext() {
  const [notesList, setNotesList] = useState([]);
  const activeNoteIndex = useRef(0);

  useEffect(() => {
    let notesList = getStorageSection("notes");
    setNotesList(notesList);
  }, []);

  useEffect(() => {
    setStorageSection(notesList, "notes");
  }, [notesList]);

  const addNewNote = () => {
    setNotesList([
      ...notesList,
      {
        name: "New note",
        content: "",
      },
    ]);
  };

  const changeActiveNote = (index) => {
    activeNoteIndex.current = index;
    setNotesList([...notesList]);
  };

  const handleChangeContent = (value) => {
    let currentNotes = [...notesList];
    currentNotes[activeNoteIndex.current] = {
      ...currentNotes[activeNoteIndex.current],
      content: value,
    };
    setNotesList(currentNotes);
  };

  const deleteNote = (index) => {
    let noteListItem = [...notesList];
    noteListItem.splice(index, 1);
    setNotesList(noteListItem);
  };

  const changeNoteName = (index, name) => {};
  return (
    <div className="page-content">
      <ProSidebar className="sidenav">
        <SidebarHeader>
          <List component="nav" aria-label="" className="align-center new-note">
            <ListItem
              button
              onClick={(note) => {
                addNewNote();
              }}
            >
              <Button className="fullwidth" variant="contained">
                New note
              </Button>
            </ListItem>
          </List>
        </SidebarHeader>
        <SidebarContent>
          <List component="nav" className="secondary mailbox folders entries ">
            {notesList.map((item, index) => {
              return (
                <ListItem
                  disableGutters dense={true}
                  selected={index == activeNoteIndex.current}
                >
                  <ListItemText
                    onClick={() => {
                      changeActiveNote(index);
                    }}
                    primary={item.name}
                  />
                  <span
                    onClick={() => {
                      deleteNote(index);
                    }}
                  >
                    x
                  </span>
                </ListItem>
              );
            })}
          </List>
        </SidebarContent>
      </ProSidebar>
      <div className="right-content">
        {notesList && notesList.length > 0 && (
          <ReactQuill
            value={notesList[activeNoteIndex.current]?.content}
            onChange={handleChangeContent}
          />
        )}
      </div>
    </div>
  );
}
