CREATE OR REPLACE TRIGGER trg_event_status
BEFORE INSERT OR UPDATE ON Events
FOR EACH ROW
BEGIN
    IF TRUNC(:NEW.StartDate) > TRUNC(SYSDATE) THEN
        :NEW.EventStatus := 'Upcoming';
    ELSIF TRUNC(:NEW.StartDate) <= TRUNC(SYSDATE) AND TRUNC(:NEW.EndDate) >= TRUNC(SYSDATE) THEN
        :NEW.EventStatus := 'Ongoing';
    ELSE
        :NEW.EventStatus := 'Closed';
    END IF;
END;
/