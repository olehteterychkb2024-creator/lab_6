const browserInfo = navigator.userAgent;
// save to localstorage
localStorage.setItem('userBrowserInfo', browserInfo);

const footer = document.querySelector('footer');
const infoDiv = document.createElement('div');
infoDiv.style.padding = '10px';
infoDiv.style.fontSize = '12px';
infoDiv.style.textAlign = 'center';
infoDiv.textContent = "Дані з localStorage: " + localStorage.getItem('userBrowserInfo');
footer.appendChild(infoDiv);

fetch(`https://jsonplaceholder.typicode.com/posts/23/comments`)
    .then(response => response.json())
    .then(comments => {
        const commentsSection = document.createElement('section');
        commentsSection.innerHTML = '<h3>Відгуки попередніх роботодавців</h3>';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.style.borderLeft = '3px solid #0056b3';
            commentDiv.style.margin = '10px 0';
            commentDiv.style.padding = '5px 10px';
            commentDiv.innerHTML = `<strong>${comment.email}</strong>: <p>${comment.body}</p>`;
            commentsSection.appendChild(commentDiv);
        });
        document.body.appendChild(commentsSection);
    })
    .catch(error => console.error('Помилка завантаження коментарів:', error));
setTimeout(() => {
// modal window form
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    //form
    modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; width: 300px; position: relative;">
            <span id="closeModal" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-weight: bold;">&times;</span>
            <h3>Зворотній зв'язок</h3>
            <form action="https://formspree.io/f/mwvwwwdz" method="POST" style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" name="name" placeholder="Ім'я" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Номер телефону" required>
                <textarea name="message" placeholder="Ваш текст" required></textarea>
                <button type="submit" style="background: #0056b3; color: white; border: none; padding: 10px; cursor: pointer;">Відправити</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // close window
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.remove();
    });
}, 60000);

//DAY/NIGHT
const themeBtn = document.createElement('button');
themeBtn.textContent = 'Change theme';
themeBtn.style.position = 'fixed';
themeBtn.style.top = '20px';
themeBtn.style.right = '20px';
themeBtn.style.zIndex = '100';
document.body.appendChild(themeBtn);
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

themeBtn.addEventListener('click', toggleTheme);
//AUTO
const currentHour = new Date().getHours();
if (currentHour < 7 || currentHour >= 21) {
    document.body.classList.add('dark-theme'); // Ніч
}