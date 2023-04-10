var btn = document.getElementById('btn');
var count_text = document.getElementById('cnt_txt');

var count = localStorage.getItem('count') || 0;
count_text.textContent = count;

btn.addEventListener('click', function() {
    count++;
    localStorage.setItem('count', count);
    count_text.textContent = count;
});
