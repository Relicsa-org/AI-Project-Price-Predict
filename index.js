// Fallback entry point for Render if the Start Command is accidentally set to 'node index.js'
// This simply redirects execution to the compiled TypeScript server
require('./dist/server.js');
