CREATE OR REPLACE PACKAGE payments_pkg AS
   PROCEDURE add_payment(
      p_bookingid NUMBER,
      p_transactionref VARCHAR2,
      p_paymentstatus VARCHAR2,
      p_amount NUMBER,
      p_paymentmethod VARCHAR2);

   PROCEDURE update_payment(
      p_paymentid NUMBER,
      p_paymentstatus VARCHAR2,
      p_amount NUMBER,
      p_paymentmethod VARCHAR2);

   PROCEDURE delete_payment(p_paymentid NUMBER);

   FUNCTION get_payment(p_paymentid NUMBER) RETURN SYS_REFCURSOR;
END payments_pkg;
/
