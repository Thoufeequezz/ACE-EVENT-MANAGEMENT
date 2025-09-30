CREATE OR REPLACE PACKAGE BODY events_pkg AS

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
   ) IS
   BEGIN
      INSERT INTO Events (
         CreatorUserID, Title, Fee, Description, NoOfSeats,
         StartDate, EndDate, EventStatus, EventType, EventCategory, Venue, Image
      ) VALUES (
         p_creator_userid, p_title, p_fee, p_description, p_noofseats,
         p_startdate, p_enddate, p_eventstatus, p_eventtype, p_eventcategory, p_venue, P_image
      )
      RETURNING EventId INTO p_eventid;
   END add_event;


   PROCEDURE get_event(
      p_eventid IN NUMBER,
      p_event   OUT SYS_REFCURSOR
   ) IS
   BEGIN
      OPEN p_event FOR
         SELECT * FROM Events
          WHERE EventId = p_eventid;
   END get_event;


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
      p_venue           IN  VARCHAR2
   ) IS
   BEGIN
      UPDATE Events
         SET Title        = p_title,
             Fee          = p_fee,
             Description  = p_description,
             NoOfSeats    = p_noofseats,
             StartDate    = p_startdate,
             EndDate      = p_enddate,
             EventStatus  = p_eventstatus,
             EventType    = p_eventtype,
             EventCategory= p_eventcategory,
             Venue        = p_venue
       WHERE EventId      = p_eventid;
   END update_event;


   PROCEDURE delete_event(
      p_eventid IN NUMBER
   ) IS
   BEGIN
      DELETE FROM Events
       WHERE EventId = p_eventid;
   END delete_event;


   PROCEDURE list_events(
      p_events OUT SYS_REFCURSOR
   ) IS
   BEGIN
      OPEN p_events FOR
         SELECT * FROM Events
         ORDER BY CreatedAt DESC;
   END list_events;

END events_pkg;
/
