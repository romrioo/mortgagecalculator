document.getElementById("input-loan").addEventListener("submit", calculate);

function calculate(e) {
    // Input Fields
    const cost = document.getElementById("purchasePrice").value;
    const down = document.getElementById("downPayment").value;
    const interest = document.getElementById("interestRate").value;
    const term = document.getElementById("loanTerm").value;

    // Example: Loan = $190,000, $0 down payment, 3% rate, 30 year (360 months) loan term.

    // Calculate
    const purchasePrice = parseFloat(cost); // $190,000
    const downPayment = parseFloat(down); // $0
    const p = purchasePrice - downPayment; // $190,000
    const r = parseFloat(interest) / 100 / 12; // Converting to % and monthly.
    const n = parseFloat(term) * 12; // Convert years to months.

    // Calculate Monthly Payment
    const pmt =  (p*r) * Math.pow((1+r),n) / (Math.pow((1+r),n) - 1); // Formula for calculating monthly payment. = $801 from our example up top.
 
    // Compute Total Payment
    const totalPayment = pmt * n; // Total payback, includes interest. = 801 * 360 = $288,360 
    
    // Calculate Interest
    const justInterest = totalPayment - p; // $288,360 - $190,000 = $98,360
    document.getElementById("justInterest").innerHTML = "$" + justInterest.toLocaleString(undefined, {maximumFractionDigits: 0});

    const percentInterestPaid = justInterest/totalPayment*100;
    document.getElementById("percentinterestpaid").innerHTML = percentInterestPaid.toFixed(0) + " %";
    
    // Calculate Percent Down or Equity
    const percentDown = downPayment / purchasePrice; // $0 divided by $190,000 = $0
    document.getElementById("downP").innerHTML = (percentDown*100).toFixed(1) + " %";
    document.getElementById("twentyPercentDown").innerHTML = "$" + (purchasePrice*0.2).toLocaleString(undefined, {maximumFractionDigits: 0});
    
    // Calculate Private Mortgage Insurance = PMI
    const PMI = p * .008 / 12 // $190,000 * 0.8% / 12 = $126.66 (or $1,520/year). The 0.8% is coming from research as a rule of thumb that PMI costs roughly 0.5% - 1% of total loan.
    // This single formula explains why you should always put 20% down, otherwise you're spending your money away on useless things.
    
    
    function pmtAfterPMI() {
        let newMonthlyTotal;
        if (percentDown < 0.2) {
          newMonthlyTotal = PMI + pmt; // If down payment is less then 20%, then you pay PMI, so your new monthly payment will be = $126 + $801 = $927
          document.getElementById("pmi").innerHTML = "$ " + PMI.toLocaleString(undefined, {maximumFractionDigits: 0});
        } else {
          newMonthlyTotal = pmt;
          document.getElementById("pmi").innerHTML = "$0";
        }
        document.getElementById("pmiPlusMonthlyPayment").innerHTML = "$ " + newMonthlyTotal.toLocaleString(undefined, {maximumFractionDigits: 0});
    }    

    pmtAfterPMI(percentDown) // Calling funciton otherwise it won't run. 

    // Show Results
    document.getElementById("justPrincipal").innerHTML = "$" + p.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("monthlyPayment").innerHTML = "$" + pmt.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("loanAmount").innerHTML = "$" + p.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("totalPayment").innerHTML = "$" + totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("payOffTime").innerHTML = n + " months or " + n/12 + " years."

    // Create array to find 22% equity based on imput parameters
    let equityArray = []; 

    let currentBalance = p; // p is the principle which is the amount of money borrowed. 
    let paymentCounter = 1;
    let towardsEquity = downPayment;
    
    // Example: Loan = $190,000, $0 down payment, 3% rate, 30 year loan term.

    while(currentBalance > 0) {
        towardsInterest = r*currentBalance; // Interest * money borrowed = (0.03/12)*190,000 = $475 first monthly interest installment. 
        towardsPrinciple = pmt - towardsInterest; // $ 801 - $475 = $326 amount going towards principle on the first month. (PMT = Monthly Payment)
        currentBalance -= towardsPrinciple; // currentBalance = $ 190,000 - $326 = $189, 674 new loan balance AKA new principle balance. currentBalance is the mount of money you still owe.
        towardsEquity += towardsPrinciple; // towardsEquity = $0 + $475
        percentEquity = towardsEquity/purchasePrice*100;
        equityArray.push(percentEquity);
        
        // Display row
        let newRow = document.getElementById('regularTabletBody').insertRow(); //additionalTabletBody for additional payments table..
        newRow.innerHTML = "<td><center>"+paymentCounter.toLocaleString()+"</center></td><td><center>$"+
        pmt.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})+"</center></td><td><center>$"+
        towardsInterest.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td><td><center>$"+
        towardsPrinciple.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td><td><center>$"+
        towardsEquity.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td><td><center>"+
        percentEquity.toLocaleString(undefined, {maximumFractionDigits: 1})+" %</center></td><td><center>$"+
        currentBalance.toLocaleString(undefined, {maximumFractionDigits: 0})+"</center></td>";

        paymentCounter++;
    }  
    
    // Finds how many months it takes to reach 22% equity.
    if (equityArray.length = 360) {
      // equityArray.forEach(function (e) {console.log(e)});
      let index = equityArray.findIndex(nr => nr >= 22);
      if (percentDown < 0.2 ) {
        document.getElementById('twentyTwo').innerHTML = Math.floor(index/12) + " years and "  + (index%12) + " months.";
      } else {
        document.getElementById('twentyTwo').innerHTML = "No PMI";
      }
    }
    
    e.preventDefault();
}

// Adding amortization table.

// let newRow=document.getElementById('tbody').insertRow();
// newRow.innerHTML = "<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>";

document.getElementById("amortizationTable1").style.display = 'none';
document.getElementById("amortizationTable2").style.display = 'none';

function hideDisplayHide1() {
    let x = document.getElementById("amortizationTable1");
    if (x.style.display === 'none') {
        x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
}
function hideDisplayHide2() {
    let x = document.getElementById("amortizationTable2");
    if (x.style.display === 'none') {
        x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
}

// Function to delete rows in table. Called when clicking button. 
function clearTable() {
    let oldTable = document.getElementById('regularTabletBody');
    while (oldTable.firstChild) { // While the first child (first row ) of the tbody is True then Remove. 
        // This will remove all children within tbody which in this case are <td> elements.
        oldTable.removeChild(oldTable.firstChild);
        }
}
