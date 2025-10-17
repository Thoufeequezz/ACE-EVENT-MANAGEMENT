CREATE OR REPLACE PACKAGE BODY bookings_pkg AS
   PROCEDURE add_booking(
      p_userid           VARCHAR2,
      p_eventid          NUMBER,
      p_bookingstatus    VARCHAR2,
      p_noofparticipants NUMBER,
      p_reservationdate  DATE
   ) IS
      v_count NUMBER;
   BEGIN
      -- Check if the booking already exists
      SELECT COUNT(*) INTO v_count
      FROM Bookings
      WHERE UserID = p_userid
        AND EventID = p_eventid;

      IF v_count > 0 THEN
         RAISE_APPLICATION_ERROR(-20001, 'You are already registered for this event.');
      ELSE
         -- Insert booking
         INSERT INTO Bookings(UserID, EventId, BookingStatus, NoOfParticipants, ReservationDate)
         VALUES (p_userid, p_eventid, p_bookingstatus, p_noofparticipants, p_reservationdate);
      END IF;
   END add_booking;

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
