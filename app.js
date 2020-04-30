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
    const monthlyPayment = pmt.toFixed(2); // 2 decimal digits. $xxx.xx

    //Compute Total Payment
    const totalPayment = pmt * n; // Total payback, includes interest.

    // Show Results
    document.getElementById("monthlyPayment").innerHTML = "$" + monthlyPayment.toLocaleString();
    document.getElementById("loanAmount").innerHTML = "$" + p.toLocaleString();
    document.getElementById("totalPayment").innerHTML = "$" + totalPayment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Adds row to the body of the table. To be continued...
    // var newRow=document.getElementById('tbody').insertRow();
    // newRow.innerHTML = "<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>";

    var currentBalance = p; // p is the principle which is the amount of money borrowed. 
    var paymentCounter = 1;
    var totalInterest = 0;
    var towardsEquity = downPayment;

    while(currentBalance > 0) {
        towardsInterest = r*currentBalance; // Calculates interest in monthly payment.
        towardsPrinciple = pmt /*monthly payment*/ - towardsInterest;
        currentBalance -= towardsPrinciple;
        towardsEquity += towardsPrinciple;
        percentEquity = towardsEquity/purchasePrice*100;

        // Display row
        var newRow=document.getElementById('tbody').insertRow();
        newRow.innerHTML = "<td>"+paymentCounter+"</td><td>$"+currentBalance.toFixed(2)+"</td><td>$"+monthlyPayment+"</td><td>$"+towardsInterest.toFixed(2)+"</td><td>$"+towardsPrinciple.toFixed(2)+"</td><td>"+towardsEquity.toFixed(2)+"</td><td>"+percentEquity.toFixed(2)+" %</td>";

        paymentCounter++;

    }  

    e.preventDefault();
}