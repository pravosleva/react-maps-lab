export const specialLog = (header, logType, argsArr) => {
  console.group(header); // eslint-disable-line no-console
  switch (logType) {
    case 'error': argsArr.map((e) => console.error(e)); break; // eslint-disable-line no-console
    case 'warn': argsArr.map((e) => console.warn(e)); break; // eslint-disable-line no-console
    default: argsArr.map((e) => console.log(e)); break; // eslint-disable-line no-console
  }
  console.groupEnd(header); // eslint-disable-line no-console
};

// specialLOG('look', null, ['tst']);
