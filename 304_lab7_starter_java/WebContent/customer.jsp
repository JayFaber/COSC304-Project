<!DOCTYPE html>
<html>
<head>
<title>Customer Page</title>
</head>
<body>

<%@ include file="auth.jsp"%>
<%@ page import="java.text.NumberFormat" %>
<%@ include file="jdbc.jsp" %>

<%
	String userName = (String) session.getAttribute("authenticatedUser");
%>

<%
try 
{
	getConnection();
	NumberFormat currFormat = NumberFormat.getCurrencyInstance(); 
	// TODO: Print Customer information
	String sql = "SELECT customerId, firstName, lastName, email, phonenum, address, city, state, postalCode, country, userid FROM customer WHERE userid = ?";
	PreparedStatement pstmt = con.prepareStatement(sql);
	pstmt.setString(1, userName);
	ResultSet rst = pstmt.executeQuery();
	rst.next();
	out.print("<h2>Customer Profile</h2>");
	out.print("<table border = 1>");
	out.print("<tr><th>Id</th><td>"+rst.getString(1)+"</td></tr>");
	out.print("<tr><th>First Name</th><td>"+rst.getString(2)+"</td></tr>");
	out.print("<tr><th>Last Name</th><td>"+rst.getString(3)+"</td></tr>");
	out.print("<tr><th>Email</th><td>"+rst.getString(4)+"</td></tr>");
	out.print("<tr><th>Phone</th><td>"+rst.getString(5)+"</td></tr>");
	out.print("<tr><th>Address</th><td>"+rst.getString(6)+"</td></tr>");
	out.print("<tr><th>City</th><td>"+rst.getString(7)+"</td></tr>");
	out.print("<tr><th>State</th><td>"+rst.getString(8)+"</td></tr>");
	out.print("<tr><th>Postal Code</th><td>"+rst.getString(9)+"</td></tr>");
	out.print("<tr><th>Country</th><td>"+rst.getString(10)+"</td></tr>");
	out.print("<tr><th>User id</th><td>"+rst.getString(11)+"</td></tr>");
	out.print("</table>");

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

</body>
</html>

