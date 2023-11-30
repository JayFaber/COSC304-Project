<%@ page import="java.sql.*" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF8"%>
<!DOCTYPE html>
<html>
<head>
<title>Ravioli's Grocery Order List</title>
</head>
<body>

<h1>Order List</h1>

<%
//Note: Forces loading of SQL Server driver
try
{	// Load driver class
	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
}
catch (java.lang.ClassNotFoundException e)
{
	out.println("ClassNotFoundException: " +e);
}

// Useful code for formatting currency values:
// NumberFormat currFormat = NumberFormat.getCurrencyInstance();
// out.println(currFormat.format(5.0));  // Prints $5.00

// Make connection
String url = "jdbc:sqlserver://cosc304_sqlserver:1433;DatabaseName=orders;TrustServerCertificate=True";		
String uid = "sa";
String pw = "304#sa#pw";

try ( Connection con = DriverManager.getConnection(url, uid, pw);
Statement stmt = con.createStatement();)  {
	// Write query to retrieve all order summary records
	//ADD CUSTOMER NAME
	NumberFormat currFormat = NumberFormat.getCurrencyInstance();

	String allOrderssql = "SELECT orderId, orderDate, customer.customerId, firstName, lastName, totalAmount "
	+ "FROM ordersummary JOIN customer ON ordersummary.customerId = customer.customerId";
	String itemssql = "SELECT productId, quantity, price FROM orderproduct WHERE orderId = ?";

	PreparedStatement allOrderspstmt = null;
	PreparedStatement itemspstmt = null;
	ResultSet allOrders = null;
	ResultSet items = null;

	allOrderspstmt = con.prepareStatement(allOrderssql);
	itemspstmt = con.prepareStatement(itemssql);

	allOrders = allOrderspstmt.executeQuery();

	out.println("<table border = 1><tr><th>Order Id</th><th>Order Date</th><th>Customer Id</th><th>Customer Name</th><th>Total Amount</th></tr>");
	while (allOrders.next()) {
		out.println("<tr><td>"+allOrders.getString(1)+"</td>"+"<td>"+allOrders.getString(2)+"</td>"+"<td>"+allOrders.getString(3)+"</td>"+"<td>"+allOrders.getString(4)+" "+allOrders.getString(5)+"</td>"+"<td>"+currFormat.format(allOrders.getDouble(6))+"</td>"+"</tr>");
		
		itemspstmt.setInt(1, allOrders.getInt(1));
		items = itemspstmt.executeQuery();
		out.println("<tr align=\"right\"><td colspan = 4><table border = 1><tr><th>ProductId</th><th>Quantity</th><th>Price</th></tr>");
		while (items.next()) {
			out.println("<tr><td>"+items.getString(1)+"</td>"+"<td>"+items.getString(2)+"</td>"+"<td>"+currFormat.format(items.getDouble(3))+"</td>"+"</tr>");
		}
		out.println("</table></tr></td>");
	}
	out.println("</table>");
	
}
catch (SQLException ex) 
{ 	out.println(ex); 
}

// For each order in the ResultSet

	// Print out the order summary information
	// Write a query to retrieve the products in the order
	//   - Use a PreparedStatement as will repeat this query many times
	// For each product in the order
		// Write out product information 

// Close connection
%>

</body>
</html>

