CREATE OR REPLACE PACKAGE BODY payments_pkg AS
   PROCEDURE add_payment(
      p_bookingid NUMBER,
      p_transactionref VARCHAR2,
      p_paymentstatus VARCHAR2,
      p_amount NUMBER,
      p_paymentmethod VARCHAR2) IS
   BEGIN
      INSERT INTO Payments(
         BookingID, TransactionRef, PaymentStatus, Amount, PaymentMethod)
      VALUES (p_bookingid, p_transactionref, p_paymentstatus, p_amount, p_paymentmethod);
   END;

   PROCEDURE update_payment(
      p_paymentid NUMBER,
      p_paymentstatus VARCHAR2,
      p_amount NUMBER,
      p_paymentmethod VARCHAR2) IS
   BEGIN
      UPDATE Payments
      SET PaymentStatus  = p_paymentstatus,
          Amount         = p_amount,
          PaymentMethod  = p_paymentmethod
      WHERE PaymentID = p_paymentid;
   END;

   PROCEDURE delete_payment(p_paymentid NUMBER) IS
   BEGIN
      DELETE FROM Payments WHERE PaymentID = p_paymentid;
   END;

   FUNCTION get_payment(p_paymentid NUMBER) RETURN SYS_REFCURSOR IS
      c SYS_REFCURSOR;
   BEGIN
      OPEN c FOR SELECT * FROM Payments WHERE PaymentID = p_paymentid;
      RETURN c;
   END;
END payments_pkg;
/
