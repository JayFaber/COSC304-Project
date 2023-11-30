<%@ page import="java.sql.*" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Map" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF8"%>
<!DOCTYPE html>
<html>
<head>
<title>Ravioli's Grocery Order Processing</title>
</head>
<body>

<% 
// Get customer id
String custId = request.getParameter("customerId");
@SuppressWarnings({"unchecked"})
HashMap<String, ArrayList<Object>> productList = (HashMap<String, ArrayList<Object>>) session.getAttribute("productList");

// Make connection
String url = "jdbc:sqlserver://cosc304_sqlserver:1433;DatabaseName=orders;TrustServerCertificate=True";		
String uid = "sa";
String pw = "304#sa#pw";

try ( Connection con = DriverManager.getConnection(url, uid, pw);
Statement stmt = con.createStatement();){
// Determine if valid customer id was entered
	String validIdsql = "SELECT customerId FROM customer";
	PreparedStatement validIdpstmt = null;
	ResultSet validIdrst = null;
	validIdpstmt = con.prepareStatement(validIdsql);
	validIdrst = validIdpstmt.executeQuery();
	boolean validId = false;
	while (validIdrst.next()){
		if (custId.equals(validIdrst.getString(1))){
			validId = true;
		}
	}
	// Determine if there are products in the shopping cart
	boolean hasNoProducts = (productList == null) || (productList.isEmpty());

	// If either are not true, display an error message
	if (hasNoProducts)
	{	out.println("<H1>Your shopping cart is empty!</H1>");
		productList = new HashMap<String, ArrayList<Object>>();
	}

	else if (!validId){
		out.print("<h1>Invalid customer id.  Go back to the previous page and try again.</h1>");
	}

	else {
		out.print("<h1>Your Order Summary</h1>");
		out.print("<table><tr><th>Product Id</th><th>Product Name</th><th>Quantity</th><th>Price</th><th>Subtotal</th></tr>");

		// Save order information to database
		NumberFormat currFormat = NumberFormat.getCurrencyInstance();
		double total = 0;
		String sql = "INSERT INTO ordersummary (customerId, orderDate) VALUES (?, ?)";
		PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
		pstmt.setString(1, custId);
		long millis=System.currentTimeMillis();
		java.sql.Date date = new java.sql.Date(millis); 
		pstmt.setDate(2, date);
		pstmt.executeUpdate();
		ResultSet keys = pstmt.getGeneratedKeys();
		keys.next();
		int orderId = keys.getInt(1);
		/*
		// Use retrieval of auto-generated keys.
		PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);			
		ResultSet keys = pstmt.getGeneratedKeys();
		keys.next();
		int orderId = keys.getInt(1);
		*/

		// Insert each item into OrderProduct table using OrderId from previous INSERT

		// Update total amount for order record

		// Here is the code to traverse through a HashMap
		// Each entry in the HashMap is an ArrayList with item 0-id, 1-name, 2-quantity, 3-price
		String ordersql = "INSERT INTO orderproduct (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)";
		PreparedStatement orderpstmt = null;

		Iterator<Map.Entry<String, ArrayList<Object>>> iterator = productList.entrySet().iterator();
		while (iterator.hasNext())
		{ 
			Map.Entry<String, ArrayList<Object>> entry = iterator.next();
			ArrayList<Object> product = (ArrayList<Object>) entry.getValue();
			String productId = (String) product.get(0);
        	String price = (String) product.get(2);
			double pr = Double.parseDouble(price);
			int qty = ( (Integer)product.get(3)).intValue();
			

			out.print("<tr><td>"+productId+"</td><td>"+ (String) product.get(1) +"</td><td align=\"center\">"+ qty 
			+"</td><td align=\"right\">"+currFormat.format(pr)+"</td><td align=\"right\">"+currFormat.format(pr*qty)+"</td></tr></tr>");

			orderpstmt = con.prepareStatement(ordersql);
			orderpstmt.setInt(1, orderId);
			orderpstmt.setString(2, productId);
			orderpstmt.setInt(3, qty);
			orderpstmt.setDouble(4, pr);

			orderpstmt.executeUpdate();

			total = total + pr*qty;

		}
		//update total
		String updatetotalsql = "UPDATE ordersummary SET totalAmount = ? WHERE orderId = ?";
		PreparedStatement updatetotalpstmt = con.prepareStatement(updatetotalsql);
		updatetotalpstmt.setDouble(1, total);
		updatetotalpstmt.setInt(2, orderId);
		updatetotalpstmt.executeUpdate();

		out.print("<tr><td colspan=\"4\" align=\"right\"><b>Order Total</b></td>"
			+"<td align=\"right\">"+currFormat.format(total)+"</td></tr>");

		out.print("</table>");
		out.print("<h1>Order completed.  Will be shipped soon...</h1>");
		out.print("<h1>Your order reference number is: "+ orderId +"</h1>");

		String getNamesql = "SELECT firstName, lastName FROM customer WHERE customerId = ?";
		PreparedStatement getNamepstmt = con.prepareStatement(getNamesql);
		getNamepstmt.setString(1, custId);
		ResultSet getNamerst = getNamepstmt.executeQuery();
		getNamerst.next();
		String customerName = "" + getNamerst.getString(1) + " " + getNamerst.getString(2);

		out.print("<h1>Shipping to customer: "+custId+" Name: "+customerName+"</h1>");

// Print out order summary

// Clear cart if order placed successfully
		productList.clear();

	}


}
catch (SQLException ex) 
{ 	out.println(ex); 
}
%>
</BODY>
</HTML>

