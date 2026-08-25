// Algorithmic Spanish Number to Words Converter (0 to 1,000,000,000,000+)

const UNITS = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const TEENS = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
const TENS = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const HUNDREDS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

export function numberToSpanish(num) {
  if (num === 0) return 'cero';
  if (num < 0) return 'menos ' + numberToSpanish(Math.abs(num));

  let n = Math.floor(num);
  let result = '';

  // Trillions (Billones in Spanish: 1,000,000,000,000 = 10^12)
  if (n >= 1000000000000) {
    const trillions = Math.floor(n / 1000000000000);
    n %= 1000000000000;
    if (trillions === 1) {
      result += 'un billón ';
    } else {
      result += numberToSpanish(trillions) + ' billones ';
    }
  }

  // Billions / Mil Millones (1,000,000,000 = 10^9)
  if (n >= 1000000000) {
    const billions = Math.floor(n / 1000000000);
    n %= 1000000000;
    if (billions === 1) {
      result += 'mil millones ';
    } else {
      result += numberToSpanish(billions) + ' mil millones ';
    }
  }

  // Millions (Millones: 1,000,000 = 10^6)
  if (n >= 1000000) {
    const millions = Math.floor(n / 1000000);
    n %= 1000000;
    if (millions === 1) {
      result += 'un millón ';
    } else {
      result += numberToSpanish(millions) + ' millones ';
    }
  }

  // Thousands (Mil: 1,000 = 10^3)
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    n %= 1000;
    if (thousands === 1) {
      result += 'mil ';
    } else {
      result += numberToSpanish(thousands) + ' mil ';
    }
  }

  // Hundreds (100 - 999)
  if (n >= 100) {
    if (n === 100) {
      result += 'cien';
      return result.trim();
    }
    const hundreds = Math.floor(n / 100);
    n %= 100;
    result += HUNDREDS[hundreds] + ' ';
  }

  // Tens & Units (0 - 99)
  if (n >= 20) {
    if (n === 20) {
      result += 'veinte';
    } else if (n > 20 && n < 30) {
      const unit = n % 10;
      const veintiUnits = ['', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
      result += veintiUnits[unit];
    } else {
      const tens = Math.floor(n / 10);
      const unit = n % 10;
      result += TENS[tens];
      if (unit > 0) {
        result += ' y ' + UNITS[unit];
      }
    }
  } else if (n >= 10) {
    result += TEENS[n - 10];
  } else if (n > 0) {
    result += UNITS[n];
  }

  return result.trim();
}

export function generateRandomNumberQuiz() {
  const categories = [
    { name: '1 to 20', min: 1, max: 20 },
    { name: '21 to 100', min: 21, max: 100 },
    { name: '100 to 1,000', min: 101, max: 1000 },
    { name: 'Thousands (1,000 - 999,999)', min: 1000, max: 999999 },
    { name: 'Millions (1M - 999M)', min: 1000000, max: 999000000 },
    { name: 'Billions & Trillions', min: 1000000000, max: 5000000000000 },
  ];

  const cat = categories[Math.floor(Math.random() * categories.length)];
  const num = Math.floor(Math.random() * (cat.max - cat.min + 1)) + cat.min;
  const spanish = numberToSpanish(num);

  // Generate 3 wrong options
  const wrongNumbers = new Set();
  while (wrongNumbers.size < 3) {
    const delta = Math.floor((Math.random() - 0.5) * (num * 0.4 || 10)) || 1;
    const wrongNum = Math.max(1, num + delta);
    if (wrongNum !== num) {
      wrongNumbers.add(numberToSpanish(wrongNum));
    }
  }

  const options = [spanish, ...Array.from(wrongNumbers)].sort(() => Math.random() - 0.5);

  return {
    num,
    numFormatted: num.toLocaleString(),
    categoryName: cat.name,
    question: `How do you say "${num.toLocaleString()}" in Spanish?`,
    answer: spanish,
    options,
  };
}
