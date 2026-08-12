<p align="center">
  <img src="assets/header.svg" alt="АТМОСФЕРА — Digital-агентство" width="100%">
</p>

<h1 align="center">АТМОСФЕРА</h1>

<p align="center">
  <strong>Лендинг digital-агентства полного цикла</strong><br>
  Лидогенерация · Интеграции · Автоматизация рекламы · Упаковка CRM
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="Stack" src="https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue">
  <img alt="Themes" src="https://img.shields.io/badge/themes-dark%20%7C%20light%20%7C%20bright-orange">
  <img alt="Smooth scroll" src="https://img.shields.io/badge/smooth--scroll-Lenis-cyan">
  <img alt="A11y" src="https://img.shields.io/badge/a11y-WCAG%20AA-success">
  <img alt="Responsive" src="https://img.shields.io/badge/responsive-mobile--first-9cf">
</p>

<p align="center">
  <strong>🌐 Версии:</strong> [English](README.md) · [Русский](README.ru.md) · [Сайт](https://arental.ru/)
</p>

---

**АТМОСФЕРА** — маркетинговый сайт digital-агентства полного цикла. Полностью
статичный проект без зависимостей и сборки (HTML + CSS + чистый JS) с
необязательным плавным скроллом через
[Lenis](https://github.com/darkroomengineering/lenis). Сайт опубликован по
адресу **[arental.ru](https://arental.ru/)**.

## Возможности

- **Многосекционный лендинг** — услуги, кейсы, процесс, карьера, контакты.
- **Три темы** — тёмная / светлая / яркая, сохраняются в `localStorage`.
- **Плавный скролл** — Lenis с корректным фолбэком без JS (`scrollIntoView`).
- **Появление при скролле** — анимации на `IntersectionObserver`, скрыты только
  при активном JS, поэтому контент всегда виден без скриптов.
- **Доступность из коробки** — семантические элементы, `aria-expanded`/
  `aria-controls` у мобильного меню, управляемые с клавиатуры точки слайдера,
  подписи полей формы, поддержка `prefers-reduced-motion`.
- **Адаптивность mobile-first** — бургер-меню, резиновая сетка метрик, адаптивный
  hero.
- **Форма контактов** — открывает почтовый клиент с готовым письмом и показывает
  подтверждение «Спасибо».

## Стек

| Слой | Выбор |
| ---- | ----- |
| Разметка | HTML5 (семантика, `lang="ru"`) |
| Стили | CSS3 custom properties, адаптив, 3 темы |
| Поведение | Vanilla JS (IIFE), `IntersectionObserver`, `localStorage` |
| Улучшение | Lenis (CDN, опционально, под защитой) |
| Хостинг | Статика — GitHub Pages → `arental.ru` (через `CNAME`) |

## Структура репозитория

```
arental_2/
├── index.html              # одностраничный лендинг
├── style.css               # токены, темы, вёрстка, адаптив
├── script.js               # взаимодействия, a11y, плавный скролл
├── favicon.svg
├── partner-it-sports.png
├── CNAME                   # arental.ru
├── assets/
│   ├── header.svg          # анимированный заголовок README (SMIL)
│   └── footer.svg          # анимированный подвал README (SMIL)
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/     # bug_report.yml, feature_request.yml
│   ├── pull_request_template.md
│   └── release.yml
├── README.md
├── README.ru.md
├── LICENSE                 # MIT
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── SUPPORT.md
└── CHANGELOG.md
```

## Быстрый старт

Сборка не требуется.

```bash
# клонировать
git clone https://github.com/bestdeejay-design/arental_2.git
cd arental_2

# локальный предпросмотр
python3 -m http.server 8000
# открыть http://127.0.0.1:8000
```

> Скрипт Lenis загружается по сети. Если он недоступен, сайт автоматически
> переключается на нативный плавный скролл — все функции продолжают работать.

## Темы

Темы задаются классом на `<html>` (`dark` / `light` / `bright`). Выбор
сохраняется в `localStorage` под ключом `arental_theme` и применяется до первой
отрисовки встроенным скриптом, чтобы избежать «вспышки» неправильной темы
(FOUC).

Все цвета вынесены в CSS custom properties в `:root` и блоках тем — добавляйте
новые токены там, а не хардкодьте значения.

## Про доступность

- Якорные секции учитывают `scroll-padding-top`, поэтому фиксированный навбар не
  перекрывает заголовок раздела.
- Мобильное меню управляет `aria-expanded`, переносит фокус на первую ссылку при
  открытии, возвращает фокус на переключатель при закрытии и закрывается по
  `Escape`.
- Точки слайдера — настоящие кнопки (`role="button"`, `tabindex="0"`) с
  поддержкой `Enter`/`Space` и `aria-label`.
- Поля формы связаны с `<label for>` (визуально скрыты через `.sr-only`) и имеют
  доступные имена.
- `prefers-reduced-motion: reduce` отключает переходы и анимации скролла.

## Участие в разработке

См. [CONTRIBUTING.md](CONTRIBUTING.md). Участвуя, вы соглашаетесь с
[Кодексом поведения](CODE_OF_CONDUCT.md). По безопасности — см.
[SECURITY.md](SECURITY.md).

## Лицензия

[MIT](LICENSE) © 2026 Сергей Кузюков (bestdeejay-design).

<p align="center">
  <img src="assets/footer.svg" alt="" width="100%">
</p>
