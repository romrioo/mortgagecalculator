document.getElementById("input-loan").addEventListener("submit", calculate);

function calculate(e) {
    // Input Fields
    const cost = document.getElementById("purchasePrice").value;
    const down = document.getElementById("downPayment").value;
    const interest = document.getElementById("interestRate").value;
    const term = document.getElementById("loanTerm").value;

    // Calculate
    const purchasePrice = parseFloat(cost);
    const downPayment = parseFloat(down);
    const p = purchasePrice - downPayment;
    const r = parseFloat(interest) / 100 / 12; // Converting to % and monthly.
    const n = parseFloat(term) * 12; // Convert years to months.

    // Calculate Monthly Payment
    const pmt =  (p*r) * Math.pow((1+r),n) / (Math.pow((1+r),n) - 1); // Formula for calculating monthly payment.
 
    //Compute Total Payment
    const totalPayment = pmt * n; // Total payback, includes interest.
    
    // Calculate Just Interest
    const justInterest = totalPayment - p;

    // Show Results
    document.getElementById("monthlyPayment").innerHTML = "$" + pmt.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("loanAmount").innerHTML = "$" + p.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("totalPayment").innerHTML = "$" + totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("justInterest").innerHTML = "$" + justInterest.toLocaleString(undefined, {maximumFractionDigits: 0});

    // Adds row to the body of the table. To be continued...
    // var newRow=document.getElementById('tbody').insertRow();
    // newRow.innerHTML = "<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>";

    let currentBalance = p; // p is the principle which is the amount of money borrowed. 
    let paymentCounter = 1;
    let totalInterest = 0;
    let towardsEquity = downPayment;

    while(currentBalance > 0) {
        towardsInterest = r*currentBalance; // Calculates interest in monthly payment.
        towardsPrinciple = pmt /*monthly payment*/ - towardsInterest;
        currentBalance -= towardsPrinciple; // currentBalance is the mount of money you still owe. 
        towardsEquity += towardsPrinciple;
        percentEquity = towardsEquity/purchasePrice*100;
        
        // Display row
        let newRow=document.getElementById('tbody').insertRow();
        newRow.innerHTML = "<td><center>"+paymentCounter.toLocaleString()+"</center></td><td><center>$"+
        pmt.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})+"</center></td><td><center>$"+
        towardsInterest.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td><td><center>$"+
        towardsPrinciple.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td><td><center>$"+
        towardsEquity.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td><td><center>"+
        percentEquity.toLocaleString(undefined, {maximumFractionDigits: 0})+" %</center></td><td><center>$"+
        currentBalance.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td>";

        paymentCounter++;

    }  

    e.preventDefault();
}