const format = {
  formatFecha: (date, type) => {
    const dateType = {
      full: { day: "numeric", month: "long", year: "numeric" },
      numeric: { day: "2-digit", month: "2-digit", year: "numeric" },
    };
    return new Intl.DateTimeFormat(
      "es-MX",
      dateType[type ? type : "full"]
    ).format(
      new Date(
        new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
      )
    );
  },

  formatDinero: (monto) =>
    Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(Number(monto)),

  formatMes: (date, convert) =>
    new Intl.DateTimeFormat("es-MX", {
      month: "long",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),
  formatYear: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
    }).format(new Date(date)),

  obtenerDiaMes: (date) =>
    new Date(
      new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
    ).getDate(),

  formatTextoMayusPrimeraLetra: (string) => {
    string = string.toLocaleLowerCase();
    let primeraLetra = string.charAt(0).toLocaleUpperCase();
    let textoEntero = string
      .replace(/\s\w|[á,é,ó,í,ú,ñ]/g, (math) => math.toLocaleUpperCase())
      .slice(1);
    return primeraLetra + textoEntero;
  },

  formatHourMinute: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),
  formatHours: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      // hour12: true,
      hourCycle: "h12",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),

  formatFechaDB: (date) => {
    const f = new Date(date);
    const d = f.getDate();
    const m = f.getMonth();
    const y = f.getFullYear();
    const now = new Date(y, m, d).toISOString().split("T")[0];
    return now;
  },

  formatFechaPractica: (date) =>
    new Date(date).getTime() + new Date().getTimezoneOffset() * 60000,

  zFill: (cantidad) => {
    // const longitud = [0, 0, 0, 0, 0, 0];
    // const textoArr = String(cantidad).split("");
    // const textoCrudo = [...longitud, ...textoArr];
    // textoCrudo.reverse();
    // textoCrudo.splice(7);
    // const textFinal = textoCrudo.reverse().join("");
    // return textFinal;

    const a = pad(Number(cantidad), 7);
    const b = a.split("").slice(0, 7).join("");
    return b;
  },
  numeroSemanaMes: (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);

    // Find the day of the week of the first day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)
    let firstDayOfWeek = firstDayOfMonth.getDay();

    // If the first day of the month is not Sunday (0), find the next Sunday
    if (firstDayOfWeek !== 0) {
      firstDayOfWeek = 7 - firstDayOfWeek;
    }

    // Calculate the number of weeks from the first Sunday to the given date
    const diffInDays = Math.floor(
      (date - firstDayOfMonth) / (1000 * 60 * 60 * 24)
    );
    const numberOfWeeks = Math.ceil((firstDayOfWeek + diffInDays) / 7);

    return numberOfWeeks;
  },
  formatRoute: (text) => {
    return text
      .replace(/\s+$/g, "")
      .replace(/\s/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  },
};
export default format;
