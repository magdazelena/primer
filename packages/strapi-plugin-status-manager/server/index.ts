import bootstrap from './bootstrap';
import config from './config/index';
import contentTypes from './content-types/index';
import controllers from './controllers/index';
import destroy from './destroy';
import middlewares from './middlewares/index';
import permissions from './permissions';
import register from './register';
import routes from './routes';
import services from './services/index';

export default () => {
  console.log('🔧 ========================================');
  console.log('🔧 Status Manager Plugin: Loading server components...');
  
  try {
    const plugin = {
      register,
      config,
      controllers,
      contentTypes,
      routes,
      services,
      middlewares,
      permissions,
      policies() {},
      bootstrap,
      destroy
    };
    
    console.log('✅ Server components loaded successfully');
    console.log('📦 Controllers:', Object.keys(controllers));
    console.log('📦 Services:', Object.keys(services));
    console.log('📦 Routes:', routes);
    console.log('📦 Content Types:', Object.keys(contentTypes));
    console.log('🔧 ========================================');
    
    return plugin;
  } catch (error) {
    console.error('❌ Error loading server components:', error);
    console.log('🔧 ========================================');
    throw error;
  }
}; 