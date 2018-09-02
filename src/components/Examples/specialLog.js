export const specialLog = (header, logType, args) => {
  console.group(header); // eslint-disable-line no-console
  switch (logType) {
    case 'error': args.map((e) => console.error(e)); break; // eslint-disable-line no-console
    case 'warn': args.map((e) => console.warn(e)); break; // eslint-disable-line no-console
    case 'table': console.table(args); break; // eslint-disable-line no-console
    default: args.map((e) => console.log(e)); break; // eslint-disable-line no-console
  }
  console.groupEnd(header); // eslint-disable-line no-console
};

// specialLOG('look', null, ['tst']);
