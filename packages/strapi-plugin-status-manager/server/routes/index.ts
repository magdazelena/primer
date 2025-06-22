import adminAPIRoutes from './admin-api';

console.log('🔧 Status Manager Plugin: Loading routes...');
console.log('🔧 Status Manager Plugin: Admin API routes:', adminAPIRoutes);

const routes = {
  type: 'admin',
  routes: [
    ...adminAPIRoutes
  ]
}

console.log('🔧 Status Manager Plugin: Final routes configuration:', routes);

export default routes; 