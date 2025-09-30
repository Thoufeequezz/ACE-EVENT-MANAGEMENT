CREATE OR REPLACE PACKAGE BODY bookings_pkg AS
   PROCEDURE add_booking(
      p_userid NUMBER,
      p_eventid NUMBER,
      p_bookingstatus VARCHAR2,
      p_noofparticipants NUMBER,
      p_reservationdate DATE) IS
   BEGIN
      INSERT INTO Bookings(UserID, EventId, BookingStatus, NoOfParticipants, ReservationDate)
      VALUES (p_userid, p_eventid, p_bookingstatus, p_noofparticipants, p_reservationdate);
   END;

   PROCEDURE update_booking(
      p_bookingid NUMBER,
      p_bookingstatus VARCHAR2,
      p_noofparticipants NUMBER,
      p_reservationdate DATE) IS
   BEGIN
      UPDATE Bookings
      SET BookingStatus    = p_bookingstatus,
          NoOfParticipants = p_noofparticipants,
          ReservationDate  = p_reservationdate
      WHERE BookingID = p_bookingid;
   END;

   PROCEDURE delete_booking(p_bookingid NUMBER) IS
   BEGIN
      DELETE FROM Bookings WHERE BookingID = p_bookingid;
   END;

   FUNCTION get_booking(p_bookingid NUMBER) RETURN SYS_REFCURSOR IS
      c SYS_REFCURSOR;
   BEGIN
      OPEN c FOR SELECT * FROM Bookings WHERE BookingID = p_bookingid;
      RETURN c;
   END;
END bookings_pkg;
/
