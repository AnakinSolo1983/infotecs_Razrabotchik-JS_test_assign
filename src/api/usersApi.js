// Базовый URL для запроса пользователей
const BASE_URL = 'https://dummyjson.com/users';

// Асинхронная функция для получения списка пользователей
export async function fetchUsers({
  limit = 10,     // Количество пользователей на странице (по умолчанию 10)
  skip = 0,       // Сколько пользователей пропустить (для пагинации)
  sortBy = null,  // Поле для сортировки (например: "firstName", "age")
  order = null    // Порядок сортировки: "asc" или "desc"
}) {
  
  // Создаём объект параметров запроса
  const params = new URLSearchParams({
    limit,
    skip
  });

  // Если указаны параметры сортировки, добавляем их в строку запроса
  if (sortBy && order) {
    params.append('sortBy', sortBy);
    params.append('order', order);
  }

  // Выполняем GET-запрос к API с параметрами
  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  // Проверяем успешность ответа (статус 200–299)
  if (!response.ok) {
    // Если запрос завершился ошибкой, выбрасываем исключение
    throw new Error('Ошибка загрузки пользователей');
  }

  // Преобразуем тело ответа в JSON и возвращаем результат
  return await response.json();
}