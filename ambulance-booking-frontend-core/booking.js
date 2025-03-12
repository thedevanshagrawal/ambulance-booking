const bookingHandleSubmit = async (patientName, appointmentDate, appointmentTime) => {
    const data = {
        patientName,
        appointmentDate,
        appointmentTime
    }
    const res = await fetch("http://localhost:3000/api/ambulance/register-ambulance-booking", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}

function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('appointmentModal'), {
        keyboard: false
    });
    myModal.show();
}

// Handle form submission
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    if (patientName && appointmentDate && appointmentTime) {
        // Display the appointment details
        document.getElementById('displayPatientName').innerText = `Patient Name: ${patientName}`;
        document.getElementById('displayAppointmentDate').innerText = `Appointment Date: ${appointmentDate}`;
        document.getElementById('displayAppointmentTime').innerText = `Appointment Time: ${appointmentTime}`;

        // Show the appointment details section
        document.getElementById('appointmentDetails').style.display = 'block';

        // Close the modal
        const myModal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
        myModal.hide();
        bookingHandleSubmit(patientName, appointmentDate, appointmentTime)
        // Reset the form
        document.getElementById('appointmentForm').reset();
    } else {
        alert('Please fill in all fields.');
    }

});


// Function to close the appointment details
function closeAppointmentDetails() {
    document.getElementById('appointmentDetails').style.display = 'none';

}


function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    myModal.show();
}

document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Appointment confirmed! We will contact you soon.');
    const myModal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
    myModal.hide();
    this.reset();
});