BEGIN
    users_pkg.delete_user(
        p_userid => :id
    );
END;