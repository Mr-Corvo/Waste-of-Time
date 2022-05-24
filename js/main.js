
window.addEventListener('DOMContentLoaded', (event) => {
   //* Main Variables 
   // /(1000*60*60*24)
   let now = new Date(Date.now()); setInterval(() => now = new Date(Date.now()), 1000);
   let dayMs = 86400000;
   let weekMs = dayMs * 7;
   let weekDay = now.getDay();
   let monthDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
   let monthMs = dayMs * monthDay;
   let yearDay = (new Date(now.getFullYear(), 1, 29).getMonth() == 1) ? 366 : 365;
   let yearMs = dayMs * yearDay;
   let hourMs = dayMs / 24;
   let utc = (new Date().getTimezoneOffset()) * 60 * 1000;
   let morningSleepTime = hourMs * 6;
   let eveningSleepTime = hourMs * 0.5;
   let sleepTime = morningSleepTime + eveningSleepTime;
   let bedTimeHours = 23;
   let bedTimeMinutes = 30;

   //*Tabs
   let linkDayTimer = document.querySelector('.block-tabs__link_timer');
   let linkDayCalendar = document.querySelector('.block-tabs__link_calendar');
   let linkDayLine = document.querySelector('.block-tabs__link_line');
   linkDayTimer.addEventListener('click', (e) => dayDestroy(e));
   linkDayCalendar.addEventListener('click', (e) => dayDestroy(e));
   linkDayLine.addEventListener('click', (e) => dayDestroy(e));

   let dayTimerInterval;
   let dayCalendarInterval;
   let dayLineInterval;
   let weekTimerInterval;
   let weekCalendarInterval;
   let weekLineInterval;
   let monthTimerInterval;
   let monthCalendarInterval;
   let monthLineInterval;
   let yearTimerInterval;
   let yearCalendarInterval;
   let yearLineInterval;

   //*Init and Destroy
   dayTimerInit();
   weekTimerInit();
   monthTimerInit();
   yearTimerInit();
   function dayDestroy(e) {
      if (e.target.closest('.block-tabs__link_calendar')) {
         dayTimerInit(false);
         dayLineInit(false);
         dayCalendarInit();

         weekTimerInit(false);
         weekLineInit(false);
         weekCalendarInit();

         monthTimerInit(false);
         monthLineInit(false);
         monthCalendarInit();

         yearTimerInit(false);
         yearLineInit(false);
         yearCalendarInit();
      }
      if (e.target.closest('.block-tabs__link_timer')) {
         dayCalendarInit(false);
         dayLineInit(false);
         dayTimerInit();

         weekCalendarInit(false);
         weekLineInit(false);
         weekTimerInit();

         monthCalendarInit(false);
         monthLineInit(false);
         monthTimerInit();

         yearCalendarInit(false);
         yearLineInit(false);
         yearTimerInit();
      }
      if (e.target.closest('.block-tabs__link_line')) {
         dayCalendarInit(false);
         dayTimerInit(false);
         dayLineInit();

         weekCalendarInit(false);
         weekTimerInit(false);
         weekLineInit();

         monthCalendarInit(false);
         monthTimerInit(false);
         monthLineInit();

         yearCalendarInit(false);
         yearTimerInit(false);
         yearLineInit();
      }
   }

   //*Day
   //*Timer
   function dayTimerInit(init) {
      dayTimer();
      clearInterval(dayTimerInterval);
      function dayTimer() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let dayHave = new Date((dayMs - (dayTime + sleepTime)) + utc);
         let dayHaveHours = (String(dayHave.getHours()).length > 1) ? dayHave.getHours() : "0" + String(dayHave.getHours());
         let dayHaveMinutes = (String(dayHave.getMinutes()).length > 1) ? dayHave.getMinutes() : "0" + String(dayHave.getMinutes());
         let dayHaveSeconds = (String(dayHave.getSeconds()).length > 1) ? dayHave.getSeconds() : "0" + String(dayHave.getSeconds());
         let dayTimerHave = document.querySelector('.day__iframe_have');
         dayTimerHave.innerHTML = `<span>${dayHaveHours}:${dayHaveMinutes}:${dayHaveSeconds}</span>`;

         let dayWaste = new Date(dayTime + utc);
         let dayWasteHours = (String(dayWaste.getHours()).length > 1) ? dayWaste.getHours() : "0" + String(dayWaste.getHours());
         let dayWasteMinutes = (String(dayWaste.getMinutes()).length > 1) ? dayWaste.getMinutes() : "0" + String(dayWaste.getMinutes());
         let dayWasteSeconds = (String(dayWaste.getSeconds()).length > 1) ? dayWaste.getSeconds() : "0" + String(dayWaste.getSeconds());
         let dayTimerWaste = document.querySelector('.day__iframe_waste');
         dayTimerWaste.innerHTML = `<span>${dayWasteHours}:${dayWasteMinutes}:${dayWasteSeconds}</span>`;
      }
      dayTimerInterval = setInterval(dayTimer, 1000);
      if (init == false) {
         clearInterval(dayTimerInterval);
      }
   }
   //*Calendar 

   function dayCalendarInit(init) {
      if (!document.querySelector('.day__iframe_calendar span')) {
         let dayCalendarIframeWrapper = document.querySelector('.day__iframe_calendar');
         dayCalendar.innerHTML = "";
         let i = 0;
         while (i < (dayMs / (1000 * 60))) {
            dayCalendarIframeWrapper.insertAdjacentHTML("beforeend", "<span></span>");
            i++;
         }
      }
      dayCalendar();
      clearInterval(dayCalendarInterval);
      function dayCalendar() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);
         let dayHave = Math.ceil((dayMs - (dayTime + sleepTime)) / (60 * 1000));
         let dayCalendarIframeNodeList = document.querySelectorAll('.day__iframe_calendar span');
         for (let index = 0; index < dayCalendarIframeNodeList.length; index++) {
            const dayCalendarIframe = dayCalendarIframeNodeList[index];
            if (index < dayHave) {
               dayCalendarIframe.classList.remove('_sleep');
               dayCalendarIframe.classList.remove('_waste');
               dayCalendarIframe.classList.add('_have');
            } else if (index > dayHave - 1 && index < Math.floor(dayTime / (60 * 1000)) + dayHave) {
               dayCalendarIframe.classList.remove('_sleep');
               dayCalendarIframe.classList.remove('_have');
               dayCalendarIframe.classList.add('_waste');
            } else if (index > Math.floor(dayTime / (60 * 1000)) - 1 + dayHave && index < (sleepTime / (60 * 1000)) + Math.floor(dayTime / (60 * 1000)) + dayHave) {
               dayCalendarIframe.classList.remove('_have');
               dayCalendarIframe.classList.remove('_waste');
               dayCalendarIframe.classList.add('_sleep');
            }
         }
      }
      dayCalendarInterval = setInterval(dayCalendar, 60000);
      if (init == false) {
         clearInterval(dayCalendarInterval);
      }
   }
   //*Line
   function dayLineInit(init) {
      dayLine();
      clearInterval(dayLineInterval);
      function dayLine() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);
         let dayHave = (dayMs - (dayTime + sleepTime));
         let dayLineWasteValue = getRoundedNumberWithDecimal(((dayTime / dayMs) * 100)) + "%";
         let dayLineHaveValue = getRoundedNumberWithDecimal(((dayHave / dayMs) * 100)) + "%";
         let dayLineSleepValue = getRoundedNumberWithDecimal(((sleepTime / dayMs) * 100)) + "%";
         let dayLineWaste = document.querySelector('.day__iframe_line ._waste');
         let dayLineHave = document.querySelector('.day__iframe_line ._have');
         let dayLineSleep = document.querySelector('.day__iframe_line ._sleep');
         let num = 38;
         if (getRoundedNumberWithDecimal(((dayTime / dayMs) * 100)) < num) {
            dayLineWaste.classList.add('_small');
         } else {
            dayLineWaste.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((dayHave / dayMs) * 100)) < num) {
            dayLineHave.classList.add('_small');
         } else {
            dayLineHave.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((sleepTime / dayMs) * 100)) < num) {
            dayLineSleep.classList.add('_small');
         } else {
            dayLineSleep.classList.remove('_small');
         }

         dayLineHave.innerHTML = `<span>${dayLineHaveValue}</span>`;
         dayLineWaste.innerHTML = `<span>${dayLineWasteValue}</span>`;
         dayLineSleep.innerHTML = `<span>${dayLineSleepValue}</span>`;
         dayLineHave.style.flex = `0 0 ${dayLineHaveValue}`;
         dayLineWaste.style.flex = `0 0 ${dayLineWasteValue}`;
         dayLineSleep.style.flex = `0 0 ${dayLineSleepValue}`;
      }
      dayLineInterval = setInterval(dayLine, 1000);
      if (init == false) {
         clearInterval(dayLineInterval);
      }
   }

   //*Week
   //*Timer
   function weekTimerInit(init) {
      weekTimer();
      clearInterval(weekTimerInterval);
      function weekTimer() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let weekDayNow = (weekDay == 0) ? 7 : weekDay;
         let fullDaysWaste = (dayMs - sleepTime) * (weekDayNow - 1);
         let fullDaysHave = (dayMs - sleepTime) * (7 - weekDayNow);

         let daysHave = new Date((((dayMs - (dayTime + sleepTime)) + utc) + fullDaysHave) - dayMs);
         let daysHaveDay = (String(daysHave.getDate()) != 0) ? daysHave.getDate() : "0";
         let daysHaveHours = (String(daysHave.getHours()).length > 1) ? daysHave.getHours() : "0" + String(daysHave.getHours());
         let daysHaveMinutes = (String(daysHave.getMinutes()).length > 1) ? daysHave.getMinutes() : "0" + String(daysHave.getMinutes());
         let daysHaveSeconds = (String(daysHave.getSeconds()).length > 1) ? daysHave.getSeconds() : "0" + String(daysHave.getSeconds());
         let weekTimerHave = document.querySelector('.week__iframe_have');
         weekTimerHave.innerHTML = `<span>${daysHaveDay}:${daysHaveHours}:${daysHaveMinutes}:${daysHaveSeconds}</span>`;

         let daysWaste = new Date(((dayTime + utc) + fullDaysWaste) - dayMs);
         let daysWasteDay = (String(daysWaste.getDate()) != 0) ? daysWaste.getDate() : "0";
         let daysWasteHours = (String(daysWaste.getHours()).length > 1) ? daysWaste.getHours() : "0" + String(daysWaste.getHours());
         let daysWasteMinutes = (String(daysWaste.getMinutes()).length > 1) ? daysWaste.getMinutes() : "0" + String(daysWaste.getMinutes());
         let daysWasteSeconds = (String(daysWaste.getSeconds()).length > 1) ? daysWaste.getSeconds() : "0" + String(daysWaste.getSeconds());
         let weekTimerWaste = document.querySelector('.week__iframe_waste');
         weekTimerWaste.innerHTML = `<span>${daysWasteDay}:${daysWasteHours}:${daysWasteMinutes}:${daysWasteSeconds}</span>`;
      }
      weekTimerInterval = setInterval(weekTimer, 1000);
      if (init == false) {
         clearInterval(weekTimerInterval);
      }
   }
   //*Calendar 
   function weekCalendarInit(init) {
      if (!document.querySelector('.week__iframe_calendar span')) {
         let weekCalendarIframeWrapper = document.querySelector('.week__iframe_calendar');
         weekCalendar.innerHTML = "";
         let i = 0;
         while (i < (weekMs / (1000 * 60 * 15))) {
            weekCalendarIframeWrapper.insertAdjacentHTML("beforeend", "<span></span>");
            i++;
         }
      }
      weekCalendar();
      clearInterval(weekCalendarInterval);
      function weekCalendar() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let weekDayNow = (weekDay == 0) ? 7 : weekDay;
         let fullDaysWaste = (dayMs - sleepTime) * (weekDayNow - 1);
         let fullDaysHave = (dayMs - sleepTime) * (7 - weekDayNow);

         let daysWaste = Math.floor((dayTime + fullDaysWaste) / (15 * 60 * 1000));
         let daysHave = Math.ceil((((dayMs - (dayTime + sleepTime))) + fullDaysHave) / (15 * 60 * 1000));
         let daysSleep = (sleepTime * 7) / (15 * 60 * 1000);
         let weekCalendarIframeNodeList = document.querySelectorAll('.week__iframe_calendar span');
         for (let index = 0; index < weekCalendarIframeNodeList.length; index++) {
            const weekCalendarIframe = weekCalendarIframeNodeList[index];
            if (index < daysHave) {
               weekCalendarIframe.classList.remove('_sleep');
               weekCalendarIframe.classList.remove('_waste');
               weekCalendarIframe.classList.add('_have');
            } else if (index > daysHave - 1 && index < daysWaste + daysHave) {
               weekCalendarIframe.classList.remove('_sleep');
               weekCalendarIframe.classList.remove('_have');
               weekCalendarIframe.classList.add('_waste');
            } else if (index > daysWaste - 1 + daysHave && index < daysSleep + daysWaste + daysHave) {
               weekCalendarIframe.classList.remove('_have');
               weekCalendarIframe.classList.remove('_waste');
               weekCalendarIframe.classList.add('_sleep');
            }
         }
      }
      weekCalendarInterval = setInterval(weekCalendar, 900000);
      if (init == false) {
         clearInterval(weekCalendarInterval);
      }
   }
   //*Line
   function weekLineInit(init) {
      weekLine();
      clearInterval(weekLineInterval);
      function weekLine() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let weekDayNow = (weekDay == 0) ? 7 : weekDay;
         let fullDaysWaste = (dayMs - sleepTime) * (weekDayNow - 1);
         let fullDaysHave = (dayMs - sleepTime) * (7 - weekDayNow);

         let daysHave = ((dayMs - (dayTime + sleepTime)) + fullDaysHave);
         let daysWaste = (dayTime + fullDaysWaste);
         let sleepTimeF = sleepTime * 7;

         let weekLineWasteValue = getRoundedNumberWithDecimal(((daysWaste / weekMs) * 100)) + "%";
         let weekLineHaveValue = getRoundedNumberWithDecimal(((daysHave / weekMs) * 100)) + "%";
         let weekLineSleepValue = getRoundedNumberWithDecimal(((sleepTimeF / weekMs) * 100)) + "%";
         let weekLineWaste = document.querySelector('.week__iframe_line ._waste');
         let weekLineHave = document.querySelector('.week__iframe_line ._have');
         let weekLineSleep = document.querySelector('.week__iframe_line ._sleep');
         let num = 38;
         if (getRoundedNumberWithDecimal(((daysWaste / weekMs) * 100)) < num) {
            weekLineWaste.classList.add('_small');
         } else {
            weekLineWaste.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((daysHave / weekMs) * 100)) < num) {
            weekLineHave.classList.add('_small');
         } else {
            weekLineHave.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((sleepTimeF / weekMs) * 100)) < num) {
            weekLineSleep.classList.add('_small');
         } else {
            weekLineSleep.classList.remove('_small');
         }

         weekLineHave.innerHTML = `<span>${weekLineHaveValue}</span>`;
         weekLineWaste.innerHTML = `<span>${weekLineWasteValue}</span>`;
         weekLineSleep.innerHTML = `<span>${weekLineSleepValue}</span>`;
         weekLineHave.style.flex = `0 0 ${weekLineHaveValue}`;
         weekLineWaste.style.flex = `0 0 ${weekLineWasteValue}`;
         weekLineSleep.style.flex = `0 0 ${weekLineSleepValue}`;
      }
      weekLineInterval = setInterval(weekLine, 1000);
      if (init == false) {
         clearInterval(weekLineInterval);
      }
   }

   //*Month
   //*Timer
   function monthTimerInit(init) {
      monthTimer();
      clearInterval(monthTimerInterval);
      function monthTimer() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let monthDayNow = now.getDate();
         let fullDaysWaste = (dayMs - sleepTime) * (monthDayNow - 1);
         let fullDaysHave = (dayMs - sleepTime) * (monthDay - monthDayNow);

         let daysHave = new Date((((dayMs - (dayTime + sleepTime)) + utc) + fullDaysHave) - dayMs);
         let daysHaveDay = (String(daysHave.getDate()) != 0) ? daysHave.getDate() : "0";
         let daysHaveHours = (String(daysHave.getHours()).length > 1) ? daysHave.getHours() : "0" + String(daysHave.getHours());
         let daysHaveMinutes = (String(daysHave.getMinutes()).length > 1) ? daysHave.getMinutes() : "0" + String(daysHave.getMinutes());
         let daysHaveSeconds = (String(daysHave.getSeconds()).length > 1) ? daysHave.getSeconds() : "0" + String(daysHave.getSeconds());
         let monthTimerHave = document.querySelector('.month__iframe_have');
         monthTimerHave.innerHTML = `<span>${daysHaveDay}:${daysHaveHours}:${daysHaveMinutes}:${daysHaveSeconds}</span>`;

         let daysWaste = new Date(((dayTime + utc) + fullDaysWaste) - dayMs);
         let daysWasteDay = (String(daysWaste.getDate()) != 0) ? daysWaste.getDate() : "0";
         let daysWasteHours = (String(daysWaste.getHours()).length > 1) ? daysWaste.getHours() : "0" + String(daysWaste.getHours());
         let daysWasteMinutes = (String(daysWaste.getMinutes()).length > 1) ? daysWaste.getMinutes() : "0" + String(daysWaste.getMinutes());
         let daysWasteSeconds = (String(daysWaste.getSeconds()).length > 1) ? daysWaste.getSeconds() : "0" + String(daysWaste.getSeconds());
         let monthTimerWaste = document.querySelector('.month__iframe_waste');
         monthTimerWaste.innerHTML = `<span>${daysWasteDay}:${daysWasteHours}:${daysWasteMinutes}:${daysWasteSeconds}</span>`;
      }
      monthTimerInterval = setInterval(monthTimer, 1000);
      if (init == false) {
         clearInterval(monthTimerInterval);
      }
   }
   //*Calendar 
   function monthCalendarInit(init) {
      if (!document.querySelector('.month__iframe_calendar span')) {
         let monthCalendarIframeWrapper = document.querySelector('.month__iframe_calendar');
         monthCalendar.innerHTML = "";
         let i = 0;
         while (i < (monthMs / (1000 * 60 * 60))) {
            monthCalendarIframeWrapper.insertAdjacentHTML("beforeend", "<span></span>");
            i++;
         }
      }
      monthCalendar();
      clearInterval(monthCalendarInterval);
      function monthCalendar() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let monthDayNow = now.getDate();
         let fullDaysWaste = (dayMs - sleepTime) * (monthDayNow - 1);
         let fullDaysHave = (dayMs - sleepTime) * (monthDay - monthDayNow);

         let daysWaste = Math.floor((dayTime + fullDaysWaste) / (60 * 60 * 1000));
         let daysHave = Math.ceil((((dayMs - (dayTime + sleepTime))) + fullDaysHave) / (60 * 60 * 1000));
         let daysSleep = (sleepTime * monthDay) / (60 * 60 * 1000);
         let monthCalendarIframeNodeList = document.querySelectorAll('.month__iframe_calendar span');
         for (let index = 0; index < monthCalendarIframeNodeList.length; index++) {
            const monthCalendarIframe = monthCalendarIframeNodeList[index];
            if (index < daysHave) {
               monthCalendarIframe.classList.remove('_sleep');
               monthCalendarIframe.classList.remove('_waste');
               monthCalendarIframe.classList.add('_have');
            } else if (index > daysHave - 1 && index < daysWaste + daysHave) {
               monthCalendarIframe.classList.remove('_sleep');
               monthCalendarIframe.classList.remove('_have');
               monthCalendarIframe.classList.add('_waste');
            } else if (index > daysWaste - 1 + daysHave && index < daysSleep + daysWaste + daysHave) {
               monthCalendarIframe.classList.remove('_have');
               monthCalendarIframe.classList.remove('_waste');
               monthCalendarIframe.classList.add('_sleep');
            }
         }
      }
      monthCalendarInterval = setInterval(monthCalendar, 900000);
      if (init == false) {
         clearInterval(monthCalendarInterval);
      }
   }
   //*Line
   function monthLineInit(init) {
      monthLine();
      clearInterval(monthLineInterval);
      function monthLine() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let monthDayNow = now.getDate();
         let fullDaysWaste = (dayMs - sleepTime) * (monthDayNow - 1);
         let fullDaysHave = (dayMs - sleepTime) * (monthDay - monthDayNow);

         let daysHave = ((dayMs - (dayTime + sleepTime)) + fullDaysHave);
         let daysWaste = (dayTime + fullDaysWaste);
         let sleepTimeF = sleepTime * monthDay;

         let monthLineWasteValue = getRoundedNumberWithDecimal(((daysWaste / monthMs) * 100)) + "%";
         let monthLineHaveValue = getRoundedNumberWithDecimal(((daysHave / monthMs) * 100)) + "%";
         let monthLineSleepValue = getRoundedNumberWithDecimal(((sleepTimeF / monthMs) * 100)) + "%";
         let monthLineWaste = document.querySelector('.month__iframe_line ._waste');
         let monthLineHave = document.querySelector('.month__iframe_line ._have');
         let monthLineSleep = document.querySelector('.month__iframe_line ._sleep');
         let num = 38;
         if (getRoundedNumberWithDecimal(((daysWaste / monthMs) * 100)) < num) {
            monthLineWaste.classList.add('_small');
         } else {
            monthLineWaste.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((daysHave / monthMs) * 100)) < num) {
            monthLineHave.classList.add('_small');
         } else {
            monthLineHave.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((sleepTimeF / monthMs) * 100)) < num) {
            monthLineSleep.classList.add('_small');
         } else {
            monthLineSleep.classList.remove('_small');
         }

         monthLineHave.innerHTML = `<span>${monthLineHaveValue}</span>`;
         monthLineWaste.innerHTML = `<span>${monthLineWasteValue}</span>`;
         monthLineSleep.innerHTML = `<span>${monthLineSleepValue}</span>`;
         monthLineHave.style.flex = `0 0 ${monthLineHaveValue}`;
         monthLineWaste.style.flex = `0 0 ${monthLineWasteValue}`;
         monthLineSleep.style.flex = `0 0 ${monthLineSleepValue}`;
      }
      monthLineInterval = setInterval(monthLine, 1000);
      if (init == false) {
         clearInterval(monthLineInterval);
      }
   }

   //*Year
   //*Timer
   function yearTimerInit(init) {
      let yearDayNow = 0; let i = 0; while (i < now.getMonth()) {yearDayNow += new Date(now.getFullYear(), i + 1, 0).getDate(); i++;}
      yearTimer();
      clearInterval(yearTimerInterval);
      function yearTimer() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let fullDaysWaste = (dayMs - sleepTime) * (yearDayNow + now.getDate() - 1);
         let fullDaysWasteF = dayMs * (Math.floor(fullDaysWaste / dayMs));
         let fullDaysWasteA = fullDaysWaste - fullDaysWasteF;
         let fullDaysHave = (dayMs - sleepTime) * (yearDay - (yearDayNow + now.getDate()));
         let fullDaysHaveF = dayMs * (Math.floor(fullDaysHave / dayMs));
         let fullDaysHaveA = fullDaysHave - fullDaysHaveF;

         let daysHave = new Date((((dayMs - (dayTime + sleepTime)) + utc) + fullDaysWasteA) - dayMs);
         let daysHaveDay = ((fullDaysHaveF / dayMs) != 0) ? (fullDaysHaveF / dayMs) : "0";
         let daysHaveHours = (String(daysHave.getHours()).length > 1) ? daysHave.getHours() : "0" + String(daysHave.getHours());
         let daysHaveMinutes = (String(daysHave.getMinutes()).length > 1) ? daysHave.getMinutes() : "0" + String(daysHave.getMinutes());
         let daysHaveSeconds = (String(daysHave.getSeconds()).length > 1) ? daysHave.getSeconds() : "0" + String(daysHave.getSeconds());
         let yearTimerHave = document.querySelector('.year__iframe_have');
         yearTimerHave.innerHTML = `<span>${daysHaveDay}:${daysHaveHours}:${daysHaveMinutes}:${daysHaveSeconds}</span>`;

         let daysWaste = new Date(((dayTime + utc) + fullDaysWasteA) - dayMs);
         let daysWasteDay = ((fullDaysWasteF / dayMs) != 0) ? (fullDaysWasteF / dayMs) : "0";
         let daysWasteHours = (String(daysWaste.getHours()).length > 1) ? daysWaste.getHours() : "0" + String(daysWaste.getHours());
         let daysWasteMinutes = (String(daysWaste.getMinutes()).length > 1) ? daysWaste.getMinutes() : "0" + String(daysWaste.getMinutes());
         let daysWasteSeconds = (String(daysWaste.getSeconds()).length > 1) ? daysWaste.getSeconds() : "0" + String(daysWaste.getSeconds());
         let yearTimerWaste = document.querySelector('.year__iframe_waste');
         yearTimerWaste.innerHTML = `<span>${daysWasteDay}:${daysWasteHours}:${daysWasteMinutes}:${daysWasteSeconds}</span>`;
      }
      yearTimerInterval = setInterval(yearTimer, 1000);
      if (init == false) {
         clearInterval(yearTimerInterval);
      }
   }
   //*Calendar 
   function yearCalendarInit(init) {
      if (!document.querySelector('.year__iframe_calendar span')) {
         let yearCalendarIframeWrapper = document.querySelector('.year__iframe_calendar');
         yearCalendar.innerHTML = "";
         let i = 0;
         while (i < (yearMs / (1000 * 60 * 60 * 12))) {
            yearCalendarIframeWrapper.insertAdjacentHTML("beforeend", "<span></span>");
            i++;
         }
      }
      let yearDayNow = 0; let i = 0; while (i < now.getMonth()) {yearDayNow += new Date(now.getFullYear(), i + 1, 0).getDate(); i++;}
      yearCalendar();
      clearInterval(yearCalendarInterval);
      function yearCalendar() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);


         let fullDaysWaste = (dayMs - sleepTime) * (yearDayNow + now.getDate() - 1);
         let fullDaysHave = (dayMs - sleepTime) * (yearDay - (yearDayNow + now.getDate()));

         let daysWaste = Math.floor((dayTime + fullDaysWaste) / (12 * 60 * 60 * 1000));
         let daysHave = Math.ceil((((dayMs - (dayTime + sleepTime))) + fullDaysHave) / (12 * 60 * 60 * 1000));
         let daysSleep = (sleepTime * yearDay) / (12 * 60 * 60 * 1000);
         let yearCalendarIframeNodeList = document.querySelectorAll('.year__iframe_calendar span');
         for (let index = 0; index < yearCalendarIframeNodeList.length; index++) {
            const yearCalendarIframe = yearCalendarIframeNodeList[index];
            if (index < daysHave) {
               yearCalendarIframe.classList.remove('_sleep');
               yearCalendarIframe.classList.remove('_waste');
               yearCalendarIframe.classList.add('_have');
            } else if (index > daysHave - 1 && index < daysWaste + daysHave) {
               yearCalendarIframe.classList.remove('_sleep');
               yearCalendarIframe.classList.remove('_have');
               yearCalendarIframe.classList.add('_waste');
            } else if (index > daysWaste - 1 + daysHave && index < daysSleep + daysWaste + daysHave) {
               yearCalendarIframe.classList.remove('_have');
               yearCalendarIframe.classList.remove('_waste');
               yearCalendarIframe.classList.add('_sleep');
            }
         }
      }
      yearCalendarInterval = setInterval(yearCalendar, 900000);
      if (init == false) {
         clearInterval(yearCalendarInterval);
      }
   }
   //*Line
   function yearLineInit(init) {
      let yearDayNow = 0; let i = 0; while (i < now.getMonth()) {yearDayNow += new Date(now.getFullYear(), i + 1, 0).getDate(); i++;}
      yearLine();
      clearInterval(yearLineInterval);
      function yearLine() {
         let dateNow = (now.getHours() >= bedTimeHours && now.getMinutes() >= bedTimeMinutes) ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), bedTimeHours, bedTimeMinutes, 0) : now;
         let dayTimeStart = new Date(1970, 0, 1, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(), dateNow.getMilliseconds()).getTime() - utc;
         let dayTime = ((dayTimeStart < morningSleepTime) ? 0 : (dayTimeStart > (dayMs - eveningSleepTime)) ? dayTimeStart - sleepTime : dayTimeStart - morningSleepTime);

         let fullDaysWaste = (dayMs - sleepTime) * (yearDayNow + now.getDate() - 1);
         let fullDaysHave = (dayMs - sleepTime) * (yearDay - (yearDayNow + now.getDate()));

         let daysHave = ((dayMs - (dayTime + sleepTime)) + fullDaysHave);
         let daysWaste = (dayTime + fullDaysWaste);
         let sleepTimeF = sleepTime * yearDay;

         let yearLineWasteValue = getRoundedNumberWithDecimal(((daysWaste / yearMs) * 100)) + "%";
         let yearLineHaveValue = getRoundedNumberWithDecimal(((daysHave / yearMs) * 100)) + "%";
         let yearLineSleepValue = getRoundedNumberWithDecimal(((sleepTimeF / yearMs) * 100)) + "%";
         let yearLineWaste = document.querySelector('.year__iframe_line ._waste');
         let yearLineHave = document.querySelector('.year__iframe_line ._have');
         let yearLineSleep = document.querySelector('.year__iframe_line ._sleep');
         let num = 38;
         if (getRoundedNumberWithDecimal(((daysWaste / yearMs) * 100)) < num) {
            yearLineWaste.classList.add('_small');
         } else {
            yearLineWaste.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((daysHave / yearMs) * 100)) < num) {
            yearLineHave.classList.add('_small');
         } else {
            yearLineHave.classList.remove('_small');
         }
         if (getRoundedNumberWithDecimal(((sleepTimeF / yearMs) * 100)) < num) {
            yearLineSleep.classList.add('_small');
         } else {
            yearLineSleep.classList.remove('_small');
         }

         yearLineHave.innerHTML = `<span>${yearLineHaveValue}</span>`;
         yearLineWaste.innerHTML = `<span>${yearLineWasteValue}</span>`;
         yearLineSleep.innerHTML = `<span>${yearLineSleepValue}</span>`;
         yearLineHave.style.flex = `0 0 ${yearLineHaveValue}`;
         yearLineWaste.style.flex = `0 0 ${yearLineWasteValue}`;
         yearLineSleep.style.flex = `0 0 ${yearLineSleepValue}`;
      }
      yearLineInterval = setInterval(yearLine, 1000);
      if (init == false) {
         clearInterval(yearLineInterval);
      }
   }
});
//repeatString========================================================================================================================================================================================================
function repeatString(str, n) {
   let newStr = '';
   while (n-- > 0) newStr += str;
   return newStr;
}
//getRoundedNumberWithDecimal=========================================================================================================================================================================================
function getRoundedNumberWithDecimal(num, decimal = 4, method = "round") {
   let item = String("1" + repeatString("0", decimal));
   let result =
      (method == "round") ? (Math.round(num * item) / item)
         : (method == "floor") ? (Math.floor(num * item) / item)
            : (method == "ceil") ? (Math.ceil(num * item) / item)
               : (NaN);
   return result;
}
//Author==============================================================================================================================================================================================================
console.info('%c Coded by Mr.Corvo\nhttps://mister-corvo.com', 'font-size: 20px;color: #c2d6d6;');
//Tabs================================================================================================================================================================================================================
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
   let tab = tabs[index];
   let tabsItems = tab.querySelectorAll("._tabs-item");
   let tabsBlocks = tab.querySelectorAll("._tabs-content");
   for (let index = 0; index < tabsItems.length; index++) {
      let tabsItem = tabsItems[index];
      tabsItem.addEventListener("click", function (e) {
         for (let index = 0; index < tabsItems.length; index++) {
            let tabsItem = tabsItems[index];
            tabsItem.classList.remove('_active');
            tabsBlocks[index].classList.remove('_active');
         }
         tabsItem.classList.add('_active');
         tabsBlocks[index].classList.add('_active');
         e.preventDefault();
      });
   }
}
//====================================================================================================================================================================================================================