CREATE OR REPLACE PACKAGE BODY users_pkg AS

  PROCEDURE create_user(
    p_fname       IN Users.FName%TYPE,
    p_lname       IN Users.LName%TYPE,
    p_email       IN Users.Email%TYPE,
    p_phoneno     IN Users.PhoneNo%TYPE,
    p_role        IN Users.Role%TYPE,
    p_institution IN Users.Institution%TYPE,
    p_id          IN Users.UserID%TYPE
  ) IS
  BEGIN
    INSERT INTO Users (FName, LName, Email, PhoneNo, Role, Institution, UserID )
    VALUES (p_fname, p_lname, p_email, p_phoneno, p_role, p_institution, p_id);
  END create_user;

  PROCEDURE get_user(
    p_userid   IN  Users.UserID%TYPE,
    p_result   OUT SYS_REFCURSOR
  ) IS
  BEGIN
    OPEN p_result FOR
      SELECT *
      FROM Users
      WHERE UserID = p_userid;
  END get_user;

  PROCEDURE update_user(
    p_userid      IN Users.UserID%TYPE,
    p_fname       IN Users.FName%TYPE,
    p_lname       IN Users.LName%TYPE,
    p_email       IN Users.Email%TYPE,
    p_phoneno     IN Users.PhoneNo%TYPE,
    p_role        IN Users.Role%TYPE,
    p_institution IN Users.Institution%TYPE
  ) IS
  BEGIN
    UPDATE Users
       SET FName       = p_fname,
           LName       = p_lname,
           Email       = p_email,
           PhoneNo     = p_phoneno,
           Role        = p_role,
           Institution = p_institution
     WHERE UserID      = p_userid;
  END update_user;

  PROCEDURE delete_user(
    p_userid IN Users.UserID%TYPE
  ) IS
  BEGIN
    DELETE FROM Users WHERE UserID = p_userid;
  END delete_user;

  PROCEDURE list_users(
    p_result OUT SYS_REFCURSOR
  ) IS
  BEGIN
    OPEN p_result FOR
      SELECT *
      FROM Users
      ORDER BY DateCreated DESC;
  END list_users;

END users_pkg;
/
