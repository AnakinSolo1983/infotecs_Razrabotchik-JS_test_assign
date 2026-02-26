// Компонент UserModal отображает модальное окно с информацией о пользователе
// user: объект с данными пользователя
// onClose: функция для закрытия модального окна
export default function UserModal({ user, onClose }) {
  return (
    // Затемнённый фон (оверлей)
    // При клике по фону модальное окно закрывается
    <div
      onClick={onClose}
      style={{
        position: 'fixed',        // Фиксированное позиционирование поверх всего экрана
        inset: 0,                 // Растягиваем на весь экран (top, right, bottom, left = 0)
        background: 'rgba(0,0,0,0.5)' // Полупрозрачный чёрный фон
      }}
    >
      {/* 
        Внутренний контейнер модального окна.
        stopPropagation() предотвращает всплытие события клика,
        чтобы клик внутри окна не закрывал модалку.
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',     // Белый фон окна
          padding: '20px',         // Внутренние отступы
          maxWidth: '500px',       // Максимальная ширина
          margin: '100px auto'     // Центрирование по горизонтали + отступ сверху
        }}
      >
        {/* Аватар пользователя */}
        <img src={user.image} width="100" />

        {/* Имя и фамилия */}
        <h2>
          {user.firstName} {user.lastName}
        </h2>

        {/* Основная информация о пользователе */}
        <p>Возраст: {user.age}</p>
        <p>Рост: {user.height}</p>
        <p>Вес: {user.weight}</p>
        <p>Email: {user.email}</p>
        <p>Телефон: {user.phone}</p>

        {/* Адрес пользователя */}
        <p>
          Адрес: {user.address.country}, {user.address.city}, {user.address.address}
        </p>

        {/* Кнопка закрытия модального окна */}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}