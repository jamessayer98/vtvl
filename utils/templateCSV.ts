import headers from '../constants/headers';

const data = headers.join(',');
let templateObjectURL;
if (typeof window !== 'undefined' && window.URL.createObjectURL) {
  const blob = new Blob([data], { type: '' });
  templateObjectURL = window.URL.createObjectURL(blob);
}
export { templateObjectURL };
