import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from '@fullcalendar/core'
import { Box, List, ListItem, ListItemText, Paper, Typography,useTheme} from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme"; 
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { add_Event, delete_Event } from "../actions/event";
import { USER } from "../constants/utilConstants";
import secureLocalStorage from "react-secure-storage";

const CalendarSchedule  = () => {
  const user = secureLocalStorage.getItem(USER)
  // const isLoading = useSelector(state => state.professeurReducers.isLoading)

  const calendarEvents = useSelector(state => state.professeurReducers.events)
  //console.log(calendarEvents)
  const dispatch= useDispatch()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState(calendarEvents);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      dispatch(add_Event({title,date:selected.startStr,compte:{id : user.id}}))
      //auto event sera ajoute a la fin du table base donne on a besoin de son id pour 
      const updatedEvent = calendarEvents [calendarEvents.length -1 ]
      calendarApi.addEvent({
        id: updatedEvent?.id,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }

  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      // console.log(selected)
      // console.log(selected.event)
      selected.event.remove();
      dispatch(delete_Event(selected.event.id))
    }
  };

  // if(isLoading){
  //   return (
  //     <div>
  //       <Typography variant="h4" align="center" gutterBottom>
  //         Loading...
  //       </Typography>
  //     </div>
  //   )

  // }

  return (
    <Paper sx={{p:3,borderRadius:5 ,fontFamily:"Nunito"}} elevation={8}>
      <Header title="Calendar" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px" >
          <FullCalendar
            
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={calendarEvents}
            
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CalendarSchedule ;