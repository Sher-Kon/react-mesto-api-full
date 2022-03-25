// middlewares/cors.js

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

const enableCors = (req, res, next) => {  // eslint-disable-line
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }
  next(); // пропускаем запрос дальше
};

const enableAllCors = (req, res, next) => { // eslint-disable-line
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
    res.header('Access-Control-Allow-Origin', '*');
    return res.end();
  }
  next(); // пропускаем запрос дальше
};

const preReqCors = (req, res, next) => {  // eslint-disable-line
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { method } = req.method;
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // eslint-disable-line
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next(); // пропускаем запрос дальше
};

module.exports = {
  enableCors,
  enableAllCors,
  preReqCors,
};
