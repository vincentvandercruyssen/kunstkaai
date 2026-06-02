/*
  ============================================================
  ABSTRACT QUOTES - app.js
  ============================================================

  Этот файл отвечает за всю логику сайта:
  - получает элементы из HTML
  - отправляет запросы к API
  - показывает загрузку
  - обрабатывает ошибки
  - фильтрует цитаты
  - выводит карточки на страницу
  - добавляет extra interactie:
      1) random quote
      2) load more

  Я специально оставил ОЧЕНЬ подробные комментарии,
  чтобы ты понял не только "что" происходит,
  но и "почему" это делается именно так.
*/


/* ============================================================
   1. ПОЛУЧАЕМ HTML-ЭЛЕМЕНТЫ
   ============================================================

   document.getElementById(...) ищет на странице элемент по id.

   Мы сохраняем ссылки на элементы в переменные,
   чтобы потом удобно ими управлять через JavaScript.
*/

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const results = document.getElementById("results");
const statusMessage = document.getElementById("statusMessage");


/* ============================================================
   2. НАСТРОЙКИ ПРИЛОЖЕНИЯ
   ============================================================

   API_BASE - базовый адрес API.
   Мы используем DummyJSON Quotes API.

   По документации у них есть:
   - /quotes
   - /quotes/random
   - limit и skip

   В этом проекте:
   - для поиска мы забираем все цитаты
   - потом фильтруем их в JavaScript
   - для случайной цитаты используем /quotes/random
*/

const API_BASE = "https://dummyjson.com/quotes";

/*
  cardsPerPage - сколько карточек показывать за один "экран".
  Сначала покажем 6 цитат.
  После нажатия "Load more" будем добавлять ещё 6.
*/
const cardsPerPage = 12;


/* ============================================================
   3. ПЕРЕМЕННЫЕ СОСТОЯНИЯ
   ============================================================

   Это данные, которые меняются во время работы сайта.

   allQuotes:
   - сюда мы сохраним все цитаты, которые придут из API.

   filteredQuotes:
   - сюда попадут уже отфильтрованные цитаты,
     например только те, где встречается "life".

   visibleCount:
   - сколько карточек сейчас нужно показать на экране.
*/

let allQuotes = [];
let filteredQuotes = [];
let visibleCount = cardsPerPage;


/* ============================================================
   4. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ СТАТУСА
   ============================================================

   setStatus(text)
   Нужна, чтобы в одном месте менять текст статуса.

   Например:
   - "Loading quotes..."
   - "Found 12 quotes."
   - "Something went wrong."
*/

function setStatus(text) {
  statusMessage.textContent = text;
}


/* ============================================================
   5. ФУНКЦИЯ ОЧИСТКИ РЕЗУЛЬТАТОВ
   ============================================================

   Перед новым выводом мы часто хотим очистить старое содержимое.
   Для этого используем innerHTML = "".
*/

function clearResults() {
  results.innerHTML = "";
}


/* ============================================================
   6. ФУНКЦИЯ СОЗДАНИЯ ОДНОЙ КАРТОЧКИ
   ============================================================

   createQuoteCard(quoteObject)

   quoteObject - это один объект цитаты, например:
   {
     id: 1,
     quote: "Life isn't about getting and having...",
     author: "Kevin Kruse"
   }

   Функция создаёт HTML-элемент карточки и возвращает его.
*/

function createQuoteCard(quoteObject) {
  /*
    createElement("article") создаёт новый HTML-элемент <article>.
    Это хороший семантический тег для самостоятельной карточки-контента.
  */
  const card = document.createElement("article");
  card.className = "quote-card";

  /*
    Внутрь карточки вставляем:
    - декоративную кавычку
    - сам текст цитаты
    - автора
  */
  card.innerHTML = `
    <p class="quote-mark">“</p>
    <p class="quote-text">${quoteObject.quote}</p>
    <p class="quote-author">— ${quoteObject.author}</p>
  `;

  return card;
}


/* ============================================================
   7. ФУНКЦИЯ ОТОБРАЖЕНИЯ ПУСТОГО СОСТОЯНИЯ
   ============================================================

   Показываем сообщение, если ничего не найдено.
*/

function showEmptyState(message) {
  clearResults();

  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.innerHTML = `<p>${message}</p>`;

  results.appendChild(empty);
  loadMoreBtn.classList.add("hidden");
}


/* ============================================================
   8. ОСНОВНАЯ ФУНКЦИЯ ОТРИСОВКИ
   ============================================================

   renderQuotes()

   Она смотрит на массив filteredQuotes
   и показывает только первые visibleCount элементов.

   Например:
   - всего найдено 20 цитат
   - visibleCount = 6
   => покажем первые 6

   Потом если нажать "Load more":
   - visibleCount станет 12
   => покажем уже 12
*/

function renderQuotes() {
  clearResults();

  /*
    Если после фильтрации ничего не осталось,
    выводим понятное сообщение.
  */
  if (filteredQuotes.length === 0) {
    showEmptyState("No quotes found for this search.");
    setStatus("No results found.");
    return;
  }

  /*
    slice(0, visibleCount)
    берёт часть массива:
    от начала до visibleCount

    Это и есть простая логика "load more".
  */
  const visibleQuotes = filteredQuotes.slice(0, visibleCount);

  /*
    Для каждой цитаты создаём карточку и добавляем её в results.
  */
  visibleQuotes.forEach((quoteObject) => {
    const card = createQuoteCard(quoteObject);
    results.appendChild(card);
  });

  /*
    Если мы ещё НЕ показали все найденные цитаты,
    значит кнопка "Load more" нужна.
    Иначе прячем её.
  */
  if (visibleCount < filteredQuotes.length) {
    loadMoreBtn.classList.remove("hidden");
  } else {
    loadMoreBtn.classList.add("hidden");
  }

  setStatus(`Found ${filteredQuotes.length} quote(s). Showing ${visibleQuotes.length}.`);
}


/* ============================================================
   9. ЗАГРУЗКА ВСЕХ ЦИТАТ С API
   ============================================================

   fetchAllQuotes()

   Здесь используется:
   - async
   - await
   - fetch
   - try...catch

   Почему async?
   Потому что запрос в интернет занимает время.
   Функция будет асинхронной.

   Почему await?
   Потому что мы хотим дождаться ответа от сервера,
   прежде чем идти дальше.

   Почему try...catch?
   Потому что сеть может сломаться,
   сервер может не ответить,
   пользователь может быть офлайн.
   Мы должны красиво обработать ошибку.
*/

async function fetchAllQuotes() {
  /*
    В try мы пишем код, который "может упасть".
    Если что-то пойдёт не так, выполнение перейдёт в catch.
  */
  try {
    setStatus("Loading quotes...");
    clearResults();
    loadMoreBtn.classList.add("hidden");

    /*
      Здесь мы используем encodeURIComponent.

      В данном API поиск по строке напрямую не поддерживается,
      но по заданию важно показать, что ты понимаешь,
      зачем нужна эта функция.

      Мы берём текущий текст из input
      и делаем его "безопасным" для URL.

      Например:
      "Albert Einstein" -> "Albert%20Einstein"
      "life & mind" -> "life%20%26%20mind"

      Дальше мы используем это в адресной строке браузера,
      чтобы сохранять текущий поиск в URL.
    */
    const userQuery = searchInput.value.trim();
    const safeQuery = encodeURIComponent(userQuery);

    /*
      Меняем URL страницы без перезагрузки.
      Так можно обновить страницу и увидеть,
      какая строка поиска была использована.
    */
    const newUrl = userQuery ? `?search=${safeQuery}` : window.location.pathname;
    history.replaceState(null, "", newUrl);

    /*
      limit=0 по документации DummyJSON позволяет получить все элементы.
      Это удобно для маленького учебного проекта.
    */
    const response = await fetch(`${API_BASE}?limit=0`);

    /*
      response.ok === true
      если HTTP-ответ успешный (например 200 OK).

      Если сервер вернул ошибку, например 404/500,
      мы вручную кидаем ошибку через throw.
    */
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    /*
      response.json() тоже асинхронная операция,
      потому что браузеру нужно прочитать и разобрать JSON.
    */
    const data = await response.json();

    /*
      По документации данные лежат в data.quotes
    */
    allQuotes = data.quotes;

    /*
      После загрузки сразу запускаем поиск/фильтрацию.
    */
    applySearch();
  } catch (error) {
    /*
      Любая ошибка из try попадёт сюда.

      error мы выводим в консоль для разработчика,
      а пользователю показываем человеческое сообщение.
    */
    console.error("Error while fetching quotes:", error);

    showEmptyState("Something went wrong while loading the quotes.");
    setStatus("Error: unable to load data from the API.");
  }
}


/* ============================================================
   10. ФИЛЬТРАЦИЯ ПОИСКА
   ============================================================

   applySearch()

   Эта функция:
   - берёт текст из input
   - приводит его к нижнему регистру
   - ищет совпадения:
       1) в тексте цитаты
       2) в имени автора
   - сохраняет результат в filteredQuotes
   - сбрасывает visibleCount
   - вызывает renderQuotes()
*/

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();

  /*
    Когда начинается новый поиск,
    мы снова хотим показывать только первую "порцию" карточек.
  */
  visibleCount = cardsPerPage;

  /*
    Если строка поиска пустая,
    показываем все цитаты.
  */
  if (query === "") {
    filteredQuotes = [...allQuotes];
    renderQuotes();
    return;
  }

  /*
    filter(...) перебирает массив
    и оставляет только те элементы,
    для которых условие возвращает true.
  */
  filteredQuotes = allQuotes.filter((quoteObject) => {
    const quoteText = quoteObject.quote.toLowerCase();
    const authorName = quoteObject.author.toLowerCase();

    /*
      includes(query) проверяет,
      содержит ли строка нужный текст.
    */
    return quoteText.includes(query) || authorName.includes(query);
  });

  renderQuotes();
}


/* ============================================================
   11. СЛУЧАЙНАЯ ЦИТАТА
   ============================================================

   fetchRandomQuote()

   Это extra interactie для задания.
   Мы делаем отдельный API-запрос на /random
   и показываем только одну карточку.
*/

async function fetchRandomQuote() {
  try {
    setStatus("Loading random quote...");
    clearResults();
    loadMoreBtn.classList.add("hidden");

    const response = await fetch(`${API_BASE}/random`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const randomQuote = await response.json();

    /*
      Когда показываем случайную цитату,
      мы формируем filteredQuotes из одного элемента.
      Так мы используем уже существующую систему renderQuotes().
    */
    filteredQuotes = [randomQuote];
    visibleCount = 1;

    renderQuotes();
    setStatus("Random quote loaded.");
  } catch (error) {
    console.error("Error while fetching random quote:", error);
    showEmptyState("Could not load a random quote.");
    setStatus("Error: random quote failed to load.");
  }
}


/* ============================================================
   12. ЗАГРУЗИТЬ ЕЩЁ
   ============================================================

   По нажатию на кнопку просто увеличиваем число видимых карточек
   и заново перерисовываем блок.
*/

function loadMoreQuotes() {
  visibleCount += cardsPerPage;
  renderQuotes();
}


/* ============================================================
   13. ENTER В ПОЛЕ ВВОДА
   ============================================================

   По заданию Enter тоже должен запускать поиск.

   keydown - событие нажатия клавиши.
   Проверяем: если клавиша Enter -> запускаем fetchAllQuotes()
*/

function handleInputKeydown(event) {
  if (event.key === "Enter") {
    fetchAllQuotes();
  }
}


/* ============================================================
   14. ПОДСТАВИТЬ ПОИСК ИЗ URL
   ============================================================

   Если в адресе есть:
   ?search=life

   Тогда при загрузке страницы мы автоматически подставим
   это значение в input.

   Это не обязательно для задания,
   но выглядит аккуратно и показывает понимание URL-параметров.
*/

function restoreSearchFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const searchFromUrl = params.get("search");

  if (searchFromUrl) {
    searchInput.value = searchFromUrl;
  }
}


/* ============================================================
   15. НАВЕШИВАЕМ ОБРАБОТЧИКИ СОБЫТИЙ
   ============================================================
*/

searchBtn.addEventListener("click", fetchAllQuotes);
randomBtn.addEventListener("click", fetchRandomQuote);
loadMoreBtn.addEventListener("click", loadMoreQuotes);
searchInput.addEventListener("keydown", handleInputKeydown);


/* ============================================================
   16. ПЕРВИЧНАЯ ИНИЦИАЛИЗАЦИЯ
   ============================================================

   Когда страница открывается:
   1) пробуем восстановить строку поиска из URL
   2) загружаем цитаты с API

   Так пользователь сразу видит работающий сайт.
*/

restoreSearchFromUrl();
fetchAllQuotes();