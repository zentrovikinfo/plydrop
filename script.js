      // Integrated Google Apps Script URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwmPwjOVGK6qF-xvDED57hos6QAGRMUcGPvq1k5inykzx31wPfrpuOtYy6hotTREFou/exec';

        document.getElementById('waitlistForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('submitBtn');
            const emailValue = document.getElementById('email').value;
            const codeValue = document.getElementById('accessCode').value;

            // Update UI to Loading State
            btn.innerHTML = "SYNCING... <i class='fa-solid fa-circle-notch fa-spin'></i>";
            btn.disabled = true;

            try {
                // Submit data to Google Sheets
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Essential for Google Apps Script Web Apps
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: emailValue, 
                        accessCode: codeValue 
                    })
                });

                // Success Visuals
                btn.innerHTML = "AUTHORIZED ✓";
                btn.style.background = "#2ecc71";
                btn.style.color = "white";
                btn.style.boxShadow = "0 10px 20px rgba(46, 204, 113, 0.4)";
                
                // Clear Form
                document.getElementById('waitlistForm').reset();

            } catch (error) {
                console.error('Submission error:', error);
                btn.innerHTML = "ERROR - TRY AGAIN";
                btn.disabled = false;
            }
        });