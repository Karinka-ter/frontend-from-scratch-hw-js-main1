/*
Задание: Реализация интерактивного отсчёта запуска ракеты

Цель задания: Написать код для обработки событий нажатия на кнопки "Старт" и "Отмена", реализуя обратный отсчёт с помощью JavaScript.

Задача:

1. Добавить обработчик событий для кнопки "Старт":

- При нажатии на кнопку "Старт" должен начаться обратный отсчёт с 3 до 1. Значение счётчика должно отображаться в элементе countdownDisplay. Цифра 3 должна отобразиться немедленно.
- Каждую секунду значение счётчика должно уменьшаться на 1.
- Когда счётчик достигнет 0, вместо 0 должен отображаться эмодзи ракеты "🚀" и таймер должен быть остановлен. Пользователь видит: 3 -> 2 -> 1 -> 🚀


2. Добавить обработчик событий для кнопки "Отмена":

- При нажатии на кнопку "Отмена" таймер должен быть остановлен
- В элементе отображения счётчика (countdownDisplay) должно появиться сообщение "Отменено".
- Отмена таймера возможна только во время его работы
- После отмены таймера возможен повторный запуск ракеты

Обратите внимание на корректность работы таймера: повторное нажатие на "Старт" не должно приводить к нескольким одновременно работающим таймерам.

Подсказки:
- 🧙‍♂️ Для выполнения этого задания нужно познакомиться с браузерными функциями setInterval (https://doka.guide/js/setinterval/) и clearInterval(https://doka.guide/js/clearinterval/). Они очень похоже на setTimeout и clearTimeout.
 */

const startButton = document.getElementById('start')
const cancelButton = document.getElementById('cancel')
const countdownDisplay = document.getElementById('countdown')

let isTimerStarted = false


let intervalId = null; // Хранит ID интервала для контроля работы таймера
let initialTime = 3; // Начальное значение отсчёта
let timerId = initialTime; // Текущее значение таймера

// Обработчик для кнопки "Старт"
startButton.addEventListener('click', () => {
    if (intervalId !== null) {
        return; // Если таймер уже запущен, не даём запустить его повторно
    }

    timerId = initialTime; // Сбрасываем таймер к начальному значению
    countdownDisplay.textContent = timerId; // Отображаем 3 немедленно

    // Устанавливаем интервал для обратного отсчёта
    intervalId = setInterval(() => {
        timerId--; // Уменьшаем значение таймера
        countdownDisplay.textContent = timerId; // Обновляем отображение

        // Когда таймер достигает 0, останавливаем его и отображаем ракету
        if (timerId < 1) {
            clearInterval(intervalId); // Останавливаем таймер
            intervalId = null; // Сбрасываем ID интервала, чтобы можно было запустить снова
            countdownDisplay.textContent = "🚀"; // Отображаем ракету
        }
    }, 1000); // Интервал в 1 секунду
});

// Обработчик для кнопки "Отмена"
cancelButton.addEventListener('click', () => {
    if (intervalId !== null) { // Если таймер работает
        clearInterval(intervalId); // Останавливаем таймер
        intervalId = null; // Сбрасываем ID интервала
        countdownDisplay.textContent = "Отменено"; // Отображаем сообщение об отмене
    }
});
