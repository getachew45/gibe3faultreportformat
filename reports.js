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

const tableBody = document.getElementById('reportsTableBody');

// Fetch Data in Real-time ordered by newest timestamp
db.collection("fault_reports").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
    tableBody.innerHTML = "";
    
    if (querySnapshot.empty) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No reports found in the database.</td></tr>`;
        return;
    }

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Setup Badge style for Effect of fault
        let badgeClass = "badge-others";
        if(data.effectOfFault === "Total Shut Down") badgeClass = "badge-total";
        if(data.effectOfFault === "Partial Shut Down") badgeClass = "badge-partial";
        if(data.effectOfFault === "Transient") badgeClass = "badge-transient";

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${data.submissionDate}</strong><br><small>${data.submissionTime}</small></td>
            <td>${data.faultyUnit}</td>
            <td>${data.faultedEquipment}</td>
            <td><span class="badge ${badgeClass}">${data.effectOfFault}</span></td>
            <td>
                <small><strong>Int:</strong> ${data.interruptionDate} @ ${data.interruptionTime}</small><br>
                <small><strong>Rest:</strong> ${data.restorationDate} @ ${data.restorationTime}</small>
            </td>
            <td><div style="max-width:200px; max-height:60px; overflow-y:auto; font-size:9pt;">${data.scadaSignals}</div></td>
            <td>${data.recordedBy}</td>
            <td><div style="max-width:180px; font-size:9pt;">${data.remedialAction}</div></td>
        `;
        tableBody.appendChild(row);
    });
}, (error) => {
    console.error("Error fetching reports: ", error);
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:red;">Error loading data. Check database permissions.</td></tr>`;
});