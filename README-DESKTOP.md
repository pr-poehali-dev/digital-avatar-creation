# Цифровой Аватар - Desktop версия

## Разработка

Запустить приложение в режиме разработки:
```bash
npm install
npm run electron:dev
```

## Сборка установочного файла

### Windows (.exe)
```bash
npm run electron:build:win
```
Установочный файл будет в папке `release/`

### macOS (.dmg)
```bash
npm run electron:build:mac
```

### Linux (.AppImage)
```bash
npm run electron:build:linux
```

## Полная сборка для всех платформ
```bash
npm run electron:build
```

## Результат

После сборки в папке `release/` появятся установочные файлы:
- **Windows**: `Цифровой Аватар Setup 1.0.0.exe`
- **macOS**: `Цифровой Аватар-1.0.0.dmg`
- **Linux**: `digital-avatar-1.0.0.AppImage`

## Системные требования

- Node.js 18+
- npm или yarn
- Windows 10+, macOS 10.13+, или Linux (Ubuntu 18.04+)

## Особенности desktop-версии

- Работает без браузера как обычная программа
- Автозапуск при включении компьютера (опционально)
- Поддержка системных уведомлений
- Локальное хранение данных
- Работает офлайн (кроме функций требующих интернет)
