CREATE OR REPLACE PACKAGE BODY admin_logs_pkg AS
   PROCEDURE add_log(
      p_userid NUMBER,
      p_action VARCHAR2) IS
   BEGIN
      INSERT INTO AdminActivityLogs(UserID, Action)
      VALUES (p_userid, p_action);
   END;

   FUNCTION get_logs_by_user(p_userid NUMBER) RETURN SYS_REFCURSOR IS
      c SYS_REFCURSOR;
   BEGIN
      OPEN c FOR SELECT * FROM AdminActivityLogs WHERE UserID = p_userid ORDER BY LogTimestamp DESC;
      RETURN c;
   END;
END admin_logs_pkg;
/
