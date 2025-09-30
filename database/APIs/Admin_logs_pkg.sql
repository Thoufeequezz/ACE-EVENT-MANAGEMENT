CREATE OR REPLACE PACKAGE admin_logs_pkg AS
   PROCEDURE add_log(
      p_userid NUMBER,
      p_action VARCHAR2);

   FUNCTION get_logs_by_user(p_userid NUMBER) RETURN SYS_REFCURSOR;
END admin_logs_pkg;
/
