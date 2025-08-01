document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('projectSubmitForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Yuklanmoqda...
        `;

        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Avtorizatsiya talab qilinadi. Iltimos, tizimga kiring.');
            }

            // Create FormData object
            const formData = new FormData(form);

            // Send the request
            const response = await fetch('/api/project-uploads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData 
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // If not JSON, it's probably an HTML error page
                const text = await response.text();
                console.error('Server returned HTML instead of JSON:', text);
                throw new Error('Server xatoligi. Iltimos, qaytadan urinib ko\'ring.');
            }
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Loyiha yuklashda xatolik yuz berdi');
            }

            // Show success message with approval notice
            alert('Loyiha muvaffaqiyatli yuklandi! Admin tasdiqlashini kuting. Telegram orqali xabar beramiz.');
            
            // Reset form
            form.reset();
            
            // Redirect to projects page
            window.location.href = '/projects';
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Serverga ulanishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}); 