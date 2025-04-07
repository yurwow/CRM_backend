# Используем официальный Node.js образ
FROM node:16

# Создаем директорию для приложения
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы приложения в контейнер
COPY . .

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
