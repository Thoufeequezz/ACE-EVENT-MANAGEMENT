CREATE OR REPLACE PACKAGE events_pkg AS
   -- Create
   PROCEDURE add_event(
      p_creator_userid  IN  VARCHAR2,
      p_title           IN  VARCHAR2,
      p_fee             IN  NUMBER,
      p_description     IN  VARCHAR2,
      p_noofseats       IN  NUMBER,
      p_startdate       IN  DATE,
      p_enddate         IN  DATE,
      p_eventstatus     IN  VARCHAR2,
      p_eventtype       IN  VARCHAR2,
      p_eventcategory   IN  VARCHAR2,
      p_venue           IN  VARCHAR2,
      p_eventid         OUT NUMBER,
      P_image           IN VARCHAR2
   );

   -- Read (single event)
   PROCEDURE get_event(
      p_eventid IN NUMBER,
      p_event   OUT SYS_REFCURSOR
   );

   -- Update
   PROCEDURE update_event(
      p_eventid         IN  NUMBER,
      p_title           IN  VARCHAR2,
      p_fee             IN  NUMBER,
      p_description     IN  VARCHAR2,
      p_noofseats       IN  NUMBER,
      p_startdate       IN  DATE,
      p_enddate         IN  DATE,
      p_eventstatus     IN  VARCHAR2,
      p_eventtype       IN  VARCHAR2,
      p_eventcategory   IN  VARCHAR2,
      p_venue           IN  VARCHAR2,
      p_image           IN  VARCHAR2
   );

   -- Delete
   PROCEDURE delete_event(
      p_eventid IN NUMBER
   );

   -- Read all events
   PROCEDURE list_events(
      p_events OUT SYS_REFCURSOR
   );
END events_pkg;
/
