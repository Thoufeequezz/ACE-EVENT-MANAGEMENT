BEGIN
   bookings_pkg.add_booking(
      p_userid           => :userid,
      p_eventid          => :eventid,
      p_bookingstatus    => :bookingstatus,
      p_noofparticipants => :noofparticipants,
      p_reservationdate  => :reservationdate
   );
END;
--/
