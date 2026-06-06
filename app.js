const firebaseConfig = {
    apiKey: "AIzaSyAs-FakeKey_Gibe3ExampleOnly",
    authDomain: "gibe3faultreport.firebaseapp.com",
    projectId: "gibe3faultreport",
    storageBucket: "gibe3faultreport.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form Submission Event
document.getElementById('faultForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "Sending Report...";
    submitBtn.disabled = true;

    // Collect Data
    const reportData = {
        faultyUnit: document.getElementById('faultyUnit').value,
        faultedEquipment: document.getElementById('faultedEquipment').value,
        effectOfFault: document.getElementById('effectOfFault').value,
        interruptionDate: document.getElementById('interruptionDate').value || "N/A",
        interruptionTime: document.getElementById('interruptionTime').value || "N/A",
        restorationDate: document.getElementById('restorationDate').value || "N/A",
        restorationTime: document.getElementById('restorationTime').value || "N/A",
        scadaSignals: document.getElementById('scadaSignals').value || "None",
        groupA: document.getElementById('groupA').value || "N/A",
        groupB: document.getElementById('groupB').value || "N/A",
        groupC: document.getElementById('groupC').value || "N/A",
        groupD: document.getElementById('groupD').value || "N/A",
        remedialAction: document.getElementById('remedialAction').value || "N/A",
        otherComments: document.getElementById('otherComments').value || "None",
        recordedBy: document.getElementById('recordedBy').value,
        submittedTo: document.getElementById('submittedTo').value,
        submissionDate: document.getElementById('submissionDate').value,
        submissionTime: document.getElementById('submissionTime').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firestore Collection named "fault_reports"
    db.collection("fault_reports").add(reportData)
    .then(() => {
        alert("✅ Fault Report Submitted Successfully!");
        document.getElementById('faultForm').reset();
        window.location.href = "reports.html"; // ወደ ሪፖርት ማሳያ ገጽ ይወስደዋል
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("❌ Error submitting report. Please try again.");
    })
    .finally(() => {
        submitBtn.innerText = "Submit Fault Report";
        submitBtn.disabled = false;
    });
});