import { query } from "../connect_db.js";
import oracledb from "oracledb";

/**
 * Fetches all events
 */
export async function getEvents() {
    const events_list = await query("./database/API_calls/get_all_events.sql");
    return events_list;
}

/**
 * Creates a new event in the system.
 * @param {string}  CREATORUSERID  
 * @param {string}  TITLE          
 * @param {number}  FEE            
 * @param {string}  DESCRIPTION    
 * @param {number}  NOOFSEATS      
 * @param {Date|string} STARTDATE  
 * @param {Date|string} ENDDATE    
 * @param {string}  EVENTSTATUS    
 * @param {string}  EVENTTYPE      
 * @param {string}  EVENTCATEGORY  
 * @param {string}  VENUE          
 * @returns {Promise<void>}      
 */
export async function create_event(
    CREATORUSERID, 
    TITLE, 
    FEE, 
    DESCRIPTION, 
    NOOFSEATS, 
    STARTDATE, 
    ENDDATE, 
    EVENTSTATUS, 
    EVENTTYPE, 
    EVENTCATEGORY, 
    VENUE,
    IMAGE
) {
    await query("./database/API_calls/add_event.sql", {
        creator_userid: CREATORUSERID,
        title:          TITLE,
        fee:            FEE,
        description:    DESCRIPTION,
        noofseats:      NOOFSEATS,
        startdate:      STARTDATE,
        enddate:        ENDDATE,
        eventstatus:    EVENTSTATUS,
        eventtype:      EVENTTYPE,
        eventcategory:  EVENTCATEGORY,
        venue:          VENUE,
        eventid:        { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        image:          IMAGE
    }, { autoCommit: true });
}

/**
 * Updates an existing event in the system.
 * @param {number}  EVENTID        
 * @param {string}  TITLE          
 * @param {number}  FEE            
 * @param {string}  DESCRIPTION    
 * @param {number}  NOOFSEATS      
 * @param {Date|string} STARTDATE  
 * @param {Date|string} ENDDATE    
 * @param {string}  EVENTSTATUS    
 * @param {string}  EVENTTYPE      
 * @param {string}  EVENTCATEGORY  
 * @param {string}  VENUE          
 * @returns {Promise<void>}
 */
export async function edit_event(
    EVENTID,
    TITLE,
    FEE,
    DESCRIPTION,
    NOOFSEATS,
    STARTDATE,
    ENDDATE,
    EVENTSTATUS,
    EVENTTYPE,
    EVENTCATEGORY,
    VENUE,
    IMAGE
) {
    await query("./database/API_calls/edit_event.sql", {
        eventid:        EVENTID,
        title:          TITLE,
        fee:            FEE,
        description:    DESCRIPTION,
        noofseats:      NOOFSEATS,
        startdate:      STARTDATE,
        enddate:        ENDDATE,
        eventstatus:    EVENTSTATUS,
        eventtype:      EVENTTYPE,
        eventcategory:  EVENTCATEGORY,
        venue:          VENUE,
        image:          IMAGE
    }, { autoCommit: true });
}
