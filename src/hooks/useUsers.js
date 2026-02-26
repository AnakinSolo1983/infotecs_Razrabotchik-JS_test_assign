// Импортируем хуки React
import { useEffect, useState } from 'react';

// Импорт функции для получения пользователей с API
import { fetchUsers } from '../api/usersApi';

// Кастомный хук для загрузки пользователей
// params — объект с параметрами запроса (limit, skip, sortBy, order)
export function useUsers(params) {

  // Список пользователей
  const [users, setUsers] = useState([]);

  // Общее количество пользователей (для пагинации)
  const [total, setTotal] = useState(0);

  // Состояние загрузки
  const [loading, setLoading] = useState(false);

  // Состояние ошибки
  const [error, setError] = useState(null);

  useEffect(() => {
    // Создаём AbortController для отмены запроса при размонтировании
    const controller = new AbortController();

    // Асинхронная функция загрузки данных
    async function load() {
      try {
        setLoading(true);   // Включаем индикатор загрузки
        setError(null);     // Сбрасываем предыдущую ошибку

        // Получаем данные с сервера
        const data = await fetchUsers(params);

        // Сохраняем список пользователей
        setUsers(data.users);

        // Сохраняем общее количество
        setTotal(data.total);

      } catch (err) {
        // Если ошибка не связана с отменой запроса — сохраняем её
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        // В любом случае выключаем загрузку
        setLoading(false);
      }
    }

    // Вызываем загрузку
    load();

    // Cleanup-функция:
    // если компонент размонтируется или params изменятся —
    // отменяем предыдущий запрос
    return () => controller.abort();

    // Зависимость:
    // JSON.stringify используется для отслеживания изменений объекта params
    // (так как объект сравнивается по ссылке)
  }, [JSON.stringify(params)]);

  // Возвращаем данные и состояния
  return { users, total, loading, error };
}