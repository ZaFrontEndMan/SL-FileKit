// function InfinityFetch(url, options = {}) {
//   // Default headers to include with every request
//   const token = localStorage.getItem('infinity_identity');
//   const defaultHeaders = {
//     'X-Client-Domain': 'erp',
//     Authorization: `Bearer ${token}`
//   };

//   // Merge default headers with any headers provided in options
//   const headers = new Headers(options.headers || {});
//   Object.entries(defaultHeaders).forEach(([key, value]) => {
//     if (!headers.has(key)) {
//       headers.append(key, value);
//     }
//   });

//   // Merge the rest of the options, overriding the headers with our combined headers
//   const newOptions = { ...options, headers };

//   // Call the original fetch with the new URL and modified options
//   let endpoint = url;
//   if (!url?.startsWith('https')) {
//     endpoint = `${process.env.REACT_APP_API_ORIGIN}/${url}`;
//   }
//   return fetch(endpoint, newOptions);
// }

// export default InfinityFetch;
