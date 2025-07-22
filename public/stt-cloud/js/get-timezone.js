const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const timezoneElement = document.getElementById('timezone');
if (timezoneElement) {
    timezoneElement.textContent = timezone;
}