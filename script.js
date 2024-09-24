const apiKey = '72eeb8c8c40a087b535cb191cbe3abc9';
        const topics = ['sports', 'technology', 'education', 'ai', 'chatgpt', 'politics','development','football'];
        const countries = ['au', 'us', 'gb', 'cn', 'in', 'ca' , 'pk', 'se', 'ch', 'ph'];

        function getRandomItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function fetchNews(topic, country) {
            const url = `https://gnews.io/api/v4/search?q=${topic}&apikey=${apiKey}&country=${country}`;
            return fetch(url)
                .then(res => res.json())
                .then(data => data.articles)
                .catch(error => {
                    console.error('Error fetching data:', error);
                    return [];
                });
        }

        function displayNews(articles) {
            const mainDiv = document.querySelector('#main');
            mainDiv.innerHTML = ''; 

            articles.forEach(article => {
                const newsDiv = document.createElement('div');
                newsDiv.classList.add('news-item');

                newsDiv.innerHTML = `
                    <h2>${article.title}</h2>
                    <img src="${article.image}" alt="Image">
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank" class="read-more">Read Full Article</a>
                    <footer class="news-footer">
                        <p>Source: ${article.source.name}</p>
                        <p>Published: ${article.publishedAt}</p>
                    </footer>
                `;

                mainDiv.appendChild(newsDiv);
            });
        }

        function fetchAndDisplayRandomNews() {
            const randomTopic = getRandomItem(topics);
            const randomCountry = getRandomItem(countries);

            fetchNews(randomTopic, randomCountry).then(articles => {
                displayNews(articles);
            });
        }

     
        window.onload = fetchAndDisplayRandomNews;

        function search() {
            const inputValue = document.querySelector('#text').value;
            const inputCountry = document.querySelector('#country').value || 'us';

            fetchNews(inputValue, inputCountry).then(articles => {
                displayNews(articles);
            });
        }
    
        document.getElementById('toggle').addEventListener('click',function(){
            const paragraph = document.querySelector('.paragraph');
            paragraph.style.display = 'block';
        })
            
        