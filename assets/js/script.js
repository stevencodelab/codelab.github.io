document.getElementById('ratingForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Mencegah pengiriman form secara default

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comments = document.getElementById('comments').value;
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'submit_rating.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById('response').innerText = this.responseText;

            // Tambahkan testimonial baru ke section testimonials
            const testimonialContainer = document.querySelector('.swiper-wrapper');
            const newTestimonial = document.createElement('div');
            newTestimonial.classList.add('swiper-slide');

            let stars = '';
            for (let i = 0; i < rating; i++) {
                stars += '★';
            }
            for (let i = rating; i < 5; i++) {
                stars += '☆';
            }

            newTestimonial.innerHTML = `
              <div class="testimonial-item">
                <h3>${name}</h3>
                <h4>${title}</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  ${comments}
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
                <div class="star-rating">${stars}</div>
              </div>
            `;

            testimonialContainer.appendChild(newTestimonial);

            // Reinitialize Swiper untuk menampilkan slide baru
            new Swiper('.swiper', {
              pagination: {
                el: '.swiper-pagination',
              },
            });
        } else {
            document.getElementById('response').innerText = 'An error occurred. Please try again.';
        }
    };

    xhr.send(`name=${name}&title=${title}&rating=${rating}&comments=${comments}`);
});
