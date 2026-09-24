let attendance = {};

function generateQR() {
    let name = document.getElementById("studentName").value.trim();
    let roll = document.getElementById("rollNumber").value.trim();
    if (!name || !roll) { alert("Name aur Roll Number bharo"); return; }

    let qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    document.getElementById("qrDetails").innerHTML = `Name: ${name}<br>Roll Number: ${roll}`;

    new QRCode(qrDiv, {
        text: `${roll}|${name}`,
        width: 180,
        height: 180
    });
    document.getElementById("downloadBtn").style.display = "inline-block";
}

function downloadQR() {
    let img = document.querySelector("#qrcode img");
    let roll = document.getElementById("rollNumber").value;
    if (img) {
        let a = document.createElement("a");
        a.href = img.src;
        a.download = `${roll}_QR.png`;
        a.click();
    }
}

function onScanSuccess(decodedText) {
    let parts = decodedText.split("|");
    let roll = parts[0];
    let name = parts[1] || "Unknown";
    
    if (!attendance[roll]) {
        attendance[roll] = { name: name, count: 1 };
    } else {
        attendance[roll].count++;
    }
    updateTable();
}

function updateTable() {
    let tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";
    for (let roll in attendance) {
        tbody.innerHTML += `<tr>
            <td>${roll}</td>
            <td>${attendance[roll].name}</td>
            <td style="color:green; font-weight:bold;">Present</td>
            <td>${attendance[roll].count}</td>
        </tr>`;
    }
}

// Scanner with Camera + File option
let scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
scanner.render(onScanSuccess);