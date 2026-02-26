// Компонент Filters принимает:
// filters — объект с текущими значениями фильтров
// setFilters — функцию для обновления фильтров
export default function Filters({ filters, setFilters }) {
  return (
    // Контейнер с отступом снизу
    <div style={{ marginBottom: '20px' }}>
      
      {/* Поле ввода для поиска по имени */}
      <input
        placeholder="Поиск по имени"   // Текст-подсказка внутри input
        value={filters.name}           // Значение берётся из состояния filters
        onChange={(e) =>
          // При изменении создаём новый объект filters
          // Копируем старые значения (...filters)
          // И обновляем только поле name
          setFilters({ ...filters, name: e.target.value })
        }
      />

      {/* Выпадающий список для фильтрации по полу */}
      <select
        value={filters.gender}         // Текущее выбранное значение
        onChange={(e) =>
          // Аналогично обновляем только поле gender
          setFilters({ ...filters, gender: e.target.value })
        }
      >
        {/* Пустое значение — показать всех */}
        <option value="">Все</option>

        {/* Фильтр по мужскому полу */}
        <option value="male">Мужской</option>

        {/* Фильтр по женскому полу */}
        <option value="female">Женский</option>
      </select>
    </div>
  );
}