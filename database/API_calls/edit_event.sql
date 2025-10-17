BEGIN
   events_pkg.update_event(
      p_eventid        => :eventid,
      p_title          => :title,
      p_fee            => :fee,
      p_description    => :description,
      p_noofseats      => :noofseats,
      p_startdate      => :startdate,
      p_enddate        => :enddate,
      p_eventstatus    => :eventstatus,
      p_eventtype      => :eventtype,
      p_eventcategory  => :eventcategory,
      p_venue          => :venue,
      p_image          => :image
   );
END;

