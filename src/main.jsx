// Импортируем StrictMode из React — помогает выявлять потенциальные проблемы
import { StrictMode } from 'react';

// Импортируем функцию createRoot для нового API рендеринга React 18+
import { createRoot } from 'react-dom/client';

// Импорт глобальных стилей
import './index.css';

// Импорт главного компонента приложения
import App from './App.jsx';

// Находим корневой элемент в HTML (обычно <div id="root"></div>)
const rootElement = document.getElementById('root');

// Создаём корень React с помощью createRoot
const root = createRoot(rootElement);

// Рендерим приложение внутри StrictMode для выявления потенциальных проблем
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);