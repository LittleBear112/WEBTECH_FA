fetch('/items')
.then(res => res.json())
.then(data => {
    const container = document.getElementById('items');
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.title} - ${item.status}`;
        container.appendChild(div);
    });
});