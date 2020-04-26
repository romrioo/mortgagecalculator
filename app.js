// Listen for submit

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
    console.log(p);
    const r = parseFloat(interest) / 100 / 12; // Converting to % and monthly.
    const n = parseFloat(term) * 12; // Convert years to months.

    // Calculate Monthly Payment
    const pmt =  (p*r) * Math.pow((1+r),n) / (Math.pow((1+r),n) - 1); // Formula for calculating monthly payment.
    const monthlyPayment = pmt.toFixed(2); // 2 decimal digits. $xxx.xx

    //Compute Total Payment
    const totalPayment = pmt * n;

    // Show Results
    document.getElementById("monthlyPayment").innerHTML = "$" + monthlyPayment.toLocaleString();
    document.getElementById("loanAmount").innerHTML = "$" + p.toLocaleString();
    document.getElementById("totalPayment").innerHTML = "$" + totalPayment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    e.preventDefault();
}