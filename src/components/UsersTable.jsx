// Импорт хука состояния из React
import { useState } from 'react';

// Кастомный хук для получения пользователей
import { useUsers } from '../hooks/useUsers';

// Утилита для определения следующего порядка сортировки (asc → desc → null)
import { getNextSortOrder } from '../utils/getNextSortOrder';

// Компоненты
import Pagination from './Pagination';
import UserModal from './UserModal';
import Filters from './Filters';

// Количество пользователей на одной странице
const LIMIT = 10;

export default function UsersTable() {
  // Текущая страница
  const [page, setPage] = useState(1);

  // Состояние сортировки: поле и направление
  const [sort, setSort] = useState({ field: null, order: null });

  // Выбранный пользователь (для модального окна)
  const [selectedUser, setSelectedUser] = useState(null);

  // Состояние фильтров (по полу и имени)
  const [filters, setFilters] = useState({
    gender: '',
    name: ''
  });

  // Получаем данные пользователей через кастомный хук
  const { users, total, loading, error } = useUsers({
    limit: LIMIT,                       // сколько записей загружать
    skip: (page - 1) * LIMIT,           // сколько пропустить (для пагинации)
    sortBy: sort.field,                 // поле сортировки
    order: sort.order                   // направление сортировки
  });

  // Обработчик клика по заголовку колонки (сортировка)
  const handleSort = (field) => {
    const order =
      sort.field === field              // если кликнули по той же колонке
        ? getNextSortOrder(sort.order)  // меняем порядок сортировки
        : 'asc';                        // иначе начинаем с asc

    setSort({
      field: order ? field : null,      // если order null — сбрасываем поле
      order
    });
  };

  // Локальная фильтрация пользователей (по имени и полу)
  const filteredUsers = users.filter(user => {
    // Собираем полное имя и приводим к нижнему регистру
    const fullName =
      `${user.firstName} ${user.lastName}`.toLowerCase();

    return (
      // Если пол не выбран — пропускаем
      (!filters.gender || user.gender === filters.gender) &&

      // Если имя не введено — пропускаем
      (!filters.name || fullName.includes(filters.name.toLowerCase()))
    );
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

      {/* Компонент фильтров */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Состояние загрузки */}
      {loading && <p>Загрузка...</p>}

      {/* Состояние ошибки */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Таблица пользователей */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {/* При клике вызывается сортировка по соответствующему полю */}
            <th onClick={() => handleSort('lastName')}>Фамилия</th>
            <th onClick={() => handleSort('firstName')}>Имя</th>
            <th>Отчество</th>
            <th onClick={() => handleSort('age')}>Возраст</th>
            <th onClick={() => handleSort('gender')}>Пол</th>
            <th onClick={() => handleSort('phone')}>Телефон</th>
            <th>Email</th>
            <th>Страна</th>
            <th>Город</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => (
            <tr
              key={user.id} // уникальный ключ для React
              onClick={() => setSelectedUser(user)} // открываем модалку
              style={{ cursor: 'pointer' }}
            >
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.maidenName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Компонент пагинации */}
      <Pagination
        total={total}   // общее количество пользователей
        limit={LIMIT}   // сколько на странице
        page={page}     // текущая страница
        setPage={setPage}
      />

      {/* Модальное окно отображается только если пользователь выбран */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)} // закрытие модалки
        />
      )}
    </div>
  );
}