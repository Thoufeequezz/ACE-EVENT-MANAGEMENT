CREATE OR REPLACE PACKAGE users_pkg AS
  -- Create a new user
  PROCEDURE create_user(
    p_fname       IN Users.FName%TYPE,
    p_lname       IN Users.LName%TYPE,
    p_email       IN Users.Email%TYPE,
    p_phoneno     IN Users.PhoneNo%TYPE,
    p_role        IN Users.Role%TYPE,
    p_institution IN Users.Institution%TYPE,
    p_id          IN Users.UserID%TYPE
  );

  -- Read a single user by ID
  PROCEDURE get_user(
    p_userid   IN  Users.UserID%TYPE,
    p_result   OUT SYS_REFCURSOR
  );

  -- Update a user’s info
  PROCEDURE update_user(
    p_userid      IN Users.UserID%TYPE,
    p_fname       IN Users.FName%TYPE,
    p_lname       IN Users.LName%TYPE,
    p_email       IN Users.Email%TYPE,
    p_phoneno     IN Users.PhoneNo%TYPE,
    p_role        IN Users.Role%TYPE,
    p_institution IN Users.Institution%TYPE
  );

  -- Delete a user by ID
  PROCEDURE delete_user(
    p_userid IN Users.UserID%TYPE
  );

  -- List all users
  PROCEDURE list_users(
    p_result OUT SYS_REFCURSOR
  );
END users_pkg;
/
