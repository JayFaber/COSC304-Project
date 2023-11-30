<!DOCTYPE html>
<html>
<head>
<title>Administrator Page</title>
</head>
<body>

<%
// TODO: Include files auth.jsp and jdbc.jsp
%>
<%@ include file="auth.jsp" %>
<%@ page import="java.text.NumberFormat" %>
<%@ include file="jdbc.jsp" %>
<%
try 
{
	getConnection();
    NumberFormat currFormat = NumberFormat.getCurrencyInstance(); 
    // TODO: Write SQL query that prints out total order amount by day
    String sql = "SELECT orderDate, SUM(totalAmount) FROM orderSummary GROUP BY orderDate";
    PreparedStatement pstmt = con.prepareStatement(sql);
    ResultSet rst = pstmt.executeQuery();
    out.print("<h2>Administrator Sales Report By Day</h2>");
    out.print("<table border = 1><tr><th>Order Date</th><th>Total Order Amount</th></tr>");
    while(rst.next()){
        String date = rst.getString(1);
        date = date.substring(0, 10);
        out.print("<tr><td>"+date+"</td><td>"+currFormat.format(rst.getDouble(2))+"</td></tr>");
    }
    out.print("</table>");


} 
catch (SQLException ex) {
	out.println(ex);
}
finally
{
	closeConnection();
}	
%>

</body>
</html>

