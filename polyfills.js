import 'react-native-url-polyfill/auto';
import { Buffer } from 'buffer';
import process from 'process';

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

if (typeof global.process === 'undefined') {
  global.process = process;
}

// Add any other polyfills here if needed
