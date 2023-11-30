<%@ page import="java.util.HashMap" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF8"%>
<%@ include file="jdbc.jsp" %>

<html>
<head>
<title>Ravioli's Grocery - Product Information</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<%@ include file="header.jsp" %>

<%
// Make connection
String url = "jdbc:sqlserver://cosc304_sqlserver:1433;DatabaseName=orders;TrustServerCertificate=True";		
String uid = "sa";
String pw = "304#sa#pw";

try ( Connection con = DriverManager.getConnection(url, uid, pw);
Statement stmt = con.createStatement();)  {
    NumberFormat currFormat = NumberFormat.getCurrencyInstance(); 
    // Get product name to search for
    // TODO: Retrieve and display info for the product
    String productId = request.getParameter("id");

    String sql = "SELECT productId, productName, productPrice, productImageURL FROM product WHERE productId = ?";
    PreparedStatement pstmt = con.prepareStatement(sql);
    pstmt.setString(1, productId);
    ResultSet rst = pstmt.executeQuery();
    rst.next();
    out.print("<h2>"+rst.getString(2)+"</h2>");

    out.print("<table><tr>");
    out.print("<th>Id</th><td>"+rst.getString(1)+"</td></tr><tr><th>Price</th><td>"+currFormat.format(rst.getDouble(3))+"</td></tr>");
    boolean hasImage = !rst.getString(4).equals(null);
    if (hasImage){
        out.print("<img src="+rst.getString(4)+">");
        out.print("<img src=\"displayImage.jsp?id="+rst.getString(1)+"\">");
    }
    out.print("</table>");

    // TODO: If there is a productImageURL, display using IMG tag
		
    // TODO: Retrieve any image stored directly in database. Note: Call displayImage.jsp with product id as parameter.
		
    // TODO: Add links to Add to Cart and Continue Shopping
    out.print("<h3><a href=\"addcart.jsp?id="+ rst.getString(1) + "&name=" + rst.getString(2) + "&price=" + rst.getDouble(3) + "\">Add to Cart</a></h3>");
    out.print("<h3><a href=\"listprod.jsp\">Continue Shopping</a>");

    }
catch (SQLException ex) 
{ 	out.println(ex); 
}
%>

</body>
</html>

