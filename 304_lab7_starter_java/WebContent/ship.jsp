<%@ page import="java.sql.*" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.Date" %>
<%@ include file="jdbc.jsp" %>

<html>
<head>
<title>Ravioli's Grocery Shipment Processing</title>
</head>
<body>
        
<%@ include file="header.jsp" %>

<%
// TODO: Get order id
String orderId = request.getParameter("orderId");
try 
{
	getConnection();
	// TODO: Check if valid order id in database
	boolean validId = false;
	String validIdsql = "SELECT orderId FROM ordersummary";
	PreparedStatement validIdpstmt = con.prepareStatement(validIdsql);
	ResultSet validIdrst = validIdpstmt.executeQuery();
	while(validIdrst.next()){
		if (orderId.equals(validIdrst.getString(1))){
			validId = true;
		}
	}
	if (validId){
		String ordersql = "SELECT orderId, productId, quantity FROM orderProduct WHERE orderId = ?";
		PreparedStatement orderpstmt = con.prepareStatement(ordersql);
		orderpstmt.setString(1, orderId);
		ResultSet orderrst = orderpstmt.executeQuery();

		String inventorysql = "SELECT productId, warehouseId, quantity FROM productinventory WHERE warehouseId = 1 AND productId = ?";
		PreparedStatement inventorypstmt = null;
		ResultSet inventoryrst = null;
		boolean canOrder = true;
		String productId = null;

		while (orderrst.next()){
			productId = orderrst.getString(2);
			int qtyordered = orderrst.getInt(3);
			inventorypstmt = con.prepareStatement(inventorysql);
			inventorypstmt.setString(1, productId);
			inventoryrst = inventorypstmt.executeQuery();
			inventoryrst.next();
			int qtyinventory = inventoryrst.getInt(3);
			int newInventory = qtyinventory - qtyordered;

			if (newInventory<0){
				canOrder = false;
			}
			if (canOrder){
				out.print("<h3>Ordered product: "+productId+" Qty: "+qtyordered+" Previous inventory: "+qtyinventory+" New inventory: "+newInventory+"</h3>");
			}
			else{
				break;
			}

		}
		if (canOrder){
			out.print("<h2>Shipment successfully processed</h2>");
		}
		else{
			out.print("<h2>Shipment not done. Insufficient inventory for product Id: "+productId+"</h2>");
		}
	}
	else {
		out.print("<h2>INVALID ORDER ID</h2>");
	}
	// TODO: Start a transaction (turn-off auto-commit)
	
	// TODO: Retrieve all items in order with given id
	// TODO: Create a new shipment record.
	// TODO: For each item verify sufficient quantity available in warehouse 1.
	// TODO: If any item does not have sufficient inventory, cancel transaction and rollback. Otherwise, update inventory for each item.
	
	// TODO: Auto-commit should be turned back on
} 
catch (SQLException ex) {
	out.println(ex);
}
// Make sure to close connection
finally
{
	closeConnection();
}
%>                       				

<h2><a href="shop.html">Back to Main Page</a></h2>

</body>
</html>
