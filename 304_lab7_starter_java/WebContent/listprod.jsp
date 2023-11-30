<%@ page import="java.sql.*,java.net.URLEncoder" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF8"%>
<!DOCTYPE html>
<html>
<head>
<title>Ray's Grocery</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<H1 align="center"><font face="cursive" color="#3399FF"><a href="index.jsp">Ravioli's Grocery</a></font></H1>      
<hr>


<h2>Browse Products By Category and Search by Product Name:</h2>

<form method="get" action="listprod.jsp">
<input type="text" name="productName" size="50">
<input type="submit" value="Submit"><input type="reset" value="Reset"> (Leave blank for all products)
</form>

<% // Get product name to search for
String name = request.getParameter("productName");
		
//Note: Forces loading of SQL Server driver
try
{	// Load driver class
	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
}
catch (java.lang.ClassNotFoundException e)
{
	out.println("ClassNotFoundException: " +e);
}

// Variable name now contains the search string the user entered
// Use it to build a query and print out the resultset.  Make sure to use PreparedStatement!

// Make the connection
String url = "jdbc:sqlserver://cosc304_sqlserver:1433;DatabaseName=orders;TrustServerCertificate=True";		
String uid = "sa";
String pw = "304#sa#pw";

try ( Connection con = DriverManager.getConnection(url, uid, pw);
Statement stmt = con.createStatement();){
	NumberFormat currFormat = NumberFormat.getCurrencyInstance(); 

	String sql = "SELECT productId, productName, productPrice FROM product";
	boolean noSearch = name == null || name.equals("");

	PreparedStatement pstmt = null;
	ResultSet rst = null;

	if (noSearch){
		out.print("<h3>All Products</h3>");
		pstmt = con.prepareStatement(sql);
		rst = pstmt.executeQuery();
	}
	else {
		out.print("<h3>Products containing '"+ name + "'</h3>");
		name = "%" + name + "%";
		sql += " WHERE productName LIKE ?";
		pstmt = con.prepareStatement(sql);
		pstmt.setString(1, name);
		rst = pstmt.executeQuery();
	}
	//Print rst
	out.print("<font face=\"Century Gothic\" size=\"3\"><table class=\"table\" border=\"1\"><tr><th class=\"col-md-1\"></th><th>Product Name</th><th>Price</th></tr>");
	while(rst.next()){
		// For each product create a link of the form
		// addcart.jsp?id=productId&name=productName&price=productPrice
		out.print("<td class=\"col-md-1\"><a href=\"addcart.jsp?id="+ rst.getString(1) + "&name=" + rst.getString(2) + "&price=" + rst.getDouble(3) + "\">Add to Cart</a>"
		+"</td><td><a href=\"product.jsp?id="+rst.getString(1)+"\"<font color=\"#0000FF\">"+rst.getString(2)+"</font></td>"+"<td><font color=\"#0000FF\">"+currFormat.format(rst.getDouble(3))+"</font></td></tr>");
		//out.print("<tr><td>"+"<a href=\"addcart.jsp?id="+ rst.getString(1) + "&name=" + rst.getString(2) + "&price=" + rst.getDouble(3) + "\">Add to Cart</a>"
		//+"</td><td>"+ rst.getString(2) +"</td><td>"+ currFormat.format(rst.getDouble(3)) + "</td></tr>");
	}
	out.print("</table>");

}
catch (SQLException ex) 
{ 	out.println(ex); 
}
// Close connection

// Useful code for formatting currency values:
// NumberFormat currFormat = NumberFormat.getCurrencyInstance();
// out.println(currFormat.format(5.0);	// Prints $5.00
%>

</body>
</html>