import React, { useEffect, useRef, useState } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';

import {
  ProSidebar,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
} from "@material-ui/core";
import {
  setStorageSection,
  getStorageSection,
} from "../../Commons/storageUtils";
import "./checklist.css";
export default function Freetext() {
  const [checkLists, setCheckLists] = useState([]);
  const activeCheckList = useRef(0);

  useEffect(() => {
    let checkLists = getStorageSection("checklists");
    setCheckLists(checkLists);
  }, []);

  useEffect(() => {
    setStorageSection(checkLists, "checklists");
  }, [checkLists]);

  const addNewCheckList = () => {
    setCheckLists([
      ...checkLists,
      {
        name: "New List",
        content: [],
      },
    ]);
  };

  const changeActiveList = (index) => {
    activeCheckList.current = index;
    setCheckLists([...checkLists]);
  };

  const handleChangeContent = (value) => {
    let currentNotes = [...checkLists];
    currentNotes[activeCheckList.current] = {
      ...currentNotes[activeCheckList.current],
      content: value,
    };
    setCheckLists(currentNotes);
  };

  const deleteNote = (index) => {
    let noteListItem = [...checkLists];
    noteListItem.splice(index, 1);
    setCheckLists(noteListItem);
  };

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const changeNoteName = (index, name) => {};

  const keyPress = (e) =>{
    if(e.keyCode == 13){
        let value =  e.target.value;
     }
  }

  return (
    <div className="page-content">
      <ProSidebar className="sidenav">
        <SidebarHeader>
          <List component="nav" aria-label="" className="align-center new-note">
            <ListItem
              button
              onClick={(note) => {
                addNewCheckList();
              }}
            >
              <Button className="fullwidth" variant="contained">
                New List
              </Button>
            </ListItem>
          </List>
        </SidebarHeader>
        <SidebarContent>
          <List component="nav" className="secondary mailbox folders entries ">
            {checkLists.map((item, index) => {
              return (
                <ListItem
                  disableGutters dense={true}
                  selected={index == activeCheckList.current}
                >
                  <ListItemText
                    onClick={() => {
                      changeActiveList(index);
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
     
        {checkLists && checkLists.length > 0 && (
           <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
             <ListItem
                 key={-1}
                 disablePadding
               >
                 <TextField id="standard-basic" label="Add Items" variant="standard" placeholder="Add items" onKeyDown={keyPress}/>
               </ListItem>
           {/* {checkLists[activeCheckList.current]?.content.map((value) => { */}
           {[1,2,3,4].map((value) => {
             const labelId = `checkbox-list-label-${value}`;
     
             return (
               <ListItem
                 key={value}
                 disablePadding
               >
                 <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                   <ListItemIcon>
                     <Checkbox
                       edge="start"
                       checked={checked.indexOf(value) !== -1}
                       tabIndex={-1}
                       disableRipple
                       inputProps={{ 'aria-labelledby': labelId }}
                     />
                   </ListItemIcon>
                   <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                 </ListItemButton>
               </ListItem>
             );
           })}
         </List>
        )}
      </div>
    </div>
  );
}
