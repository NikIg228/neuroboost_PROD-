# NeuroBoost Chatbot Backend

Backend API для умного чат-бота NeuroBoost на FastAPI.

## Установка и запуск

1. Установите зависимости:
```bash
pip install -r requirements.txt
```

2. Настройте OpenRouter API ключ в файле `main.py`:
```python
openai.api_key = "your-openrouter-api-key"
openai.api_base = "https://openrouter.ai/api/v1"
```

3. Запустите сервер:
```bash
python main.py
```

Или с uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

- `GET /` - Проверка работы API
- `POST /chat` - Отправка сообщения чат-боту
- `GET /health` - Проверка здоровья API

## Структура данных

Файл `data.json` содержит:
- `services` - список всех услуг
- `faq` - часто задаваемые вопросы
- `company_info` - информация о компании

## Логика работы

1. Если вопрос связан с услугами/сайтом - ищет ответ в локальной базе данных
2. Если вопрос не связан с сайтом - обращается к OpenRouter API (GPT-4)
3. Возвращает ответ в формате JSON

## Настройка CORS

API настроен для работы с фронтендом на портах 3000 и 5173 (Vite dev server).
