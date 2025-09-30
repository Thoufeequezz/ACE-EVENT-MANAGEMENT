BEGIN
   events_pkg.add_event(
      p_creator_userid => :creator_userid,
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
      p_eventid        => :eventid,
      P_image          => :image
   );
END;
