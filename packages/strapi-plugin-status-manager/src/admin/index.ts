export default {
  register({ strapi }: { strapi: any }) {
    // Add your admin registration logic here
    console.log('🚀 Status Manager Admin Plugin Registered!');
  },
  bootstrap({ strapi }: { strapi: any }) {
    // Add your admin bootstrap logic here
    console.log('🚀 Status Manager Admin Plugin Bootstrap!');
  },
}; 