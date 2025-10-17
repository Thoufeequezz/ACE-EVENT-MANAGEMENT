BEGIN
    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'update_event_status_daily',
        job_type        => 'PLSQL_BLOCK',
        job_action      => '
            BEGIN
                UPDATE Events
                SET EventStatus = CASE
                    WHEN TRUNC(SYSDATE) < TRUNC(StartDate) THEN ''Upcoming''
                    WHEN TRUNC(SYSDATE) BETWEEN TRUNC(StartDate) AND TRUNC(EndDate) THEN ''Ongoing''
                    ELSE ''Closed''
                END;
            END;
        ',
        start_date      => SYSTIMESTAMP,
        repeat_interval => 'FREQ=DAILY; BYHOUR=0; BYMINUTE=0; BYSECOND=0',
        enabled         => TRUE
    );
END;
/
