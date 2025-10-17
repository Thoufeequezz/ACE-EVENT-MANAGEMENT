CREATE OR REPLACE PACKAGE bookings_pkg AS
   PROCEDURE add_booking(
      p_userid VARCHAR2,
      p_eventid NUMBER,
      p_bookingstatus VARCHAR2,
      p_noofparticipants NUMBER,
      p_reservationdate DATE);

   PROCEDURE update_booking(
      p_bookingid NUMBER,
      p_bookingstatus VARCHAR2,
      p_noofparticipants NUMBER,
      p_reservationdate DATE);

   PROCEDURE delete_booking(p_bookingid NUMBER);

   FUNCTION get_booking(p_bookingid NUMBER) RETURN SYS_REFCURSOR;
END bookings_pkg;
/
